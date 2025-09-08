import {
  checkSupabaseAndMethodExist,
  supabaseCheckError,
  supabaseLogicReturnApi,
  withApiProtection,
} from "@/auth/api";
import { RegistrationApi } from "@/types/Registration";
import { calculateDistance } from "@/utils/geolocation";

export default withApiProtection((req, res) =>
  checkSupabaseAndMethodExist(req, res, async (supabase) => {
    if (req.method === "GET") {
      if (req.query.user_id) {
        return supabaseLogicReturnApi(
          res,
          async () =>
            await supabase
              .from("registrations")
              .select("*")
              .eq("user_id", req.query.user_id as string)
        );
      } else if (req.query.org_id) {
        const orgId = String(req.query.org_id);

        const { data: users, error: usersErr } = await supabase
          .from("users")
          .select("id")
          .eq("org_id", orgId);
        supabaseCheckError(res, usersErr);

        const userIds = (users ?? []).map((u) => u.id);

        return supabaseLogicReturnApi(
          res,
          async () =>
            await supabase
              .from("registrations")
              .select("*")
              .in("user_id", userIds)
        );
      }
    } else if (req.method === "POST") {
      const body = req.body as RegistrationApi & {
        userLat?: number;
        userLng?: number;
      };

      if (body.userLat && body.userLng) {
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("org_id")
          .eq("id", body.user_id)
          .single();

        if (userError) {
          return res.status(400).json({ error: "User not found" });
        }

        const { data: organization, error: orgError } = await supabase
          .from("organizations")
          .select("lat, lng, max_meter_registrations")
          .eq("id", user.org_id)
          .single();

        if (orgError) {
          return res.status(400).json({ error: "Organization not found" });
        }

        if (organization.lat && organization.lng) {
          const distance = calculateDistance(
            organization.lat,
            organization.lng,
            body.userLat,
            body.userLng
          );

          if (distance > organization.max_meter_registrations) {
            return res.status(400).json({
              error: "Sei troppo lontano dalla posizione di timbratura",
              distance: Math.round(distance),
              maxDistance: organization.max_meter_registrations,
            });
          }
        }
      }

      const { userLat, userLng, ...registrationData } = body;

      return supabaseLogicReturnApi(
        res,
        async () =>
          await supabase.from("registrations").insert(registrationData)
      );
    } else if (req.method === "DELETE") {
      return supabaseLogicReturnApi(
        res,
        async () =>
          await supabase
            .from("registrations")
            .delete()
            .eq("id", req.body.id as string)
      );
    }
  })
);
