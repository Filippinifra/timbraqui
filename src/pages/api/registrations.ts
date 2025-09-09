import { getSupabaseClient } from "@/auth/supabaseClient";
import { RegistrationApi } from "@/types/Registration";
import { calculateDistance } from "@/utils/geolocation";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = await getSupabaseClient(req, res);

  if (!supabase)
    return res.status(500).json({ error: "Supabase client not initialized" });

  if (req.method === "GET") {
    if (req.query.user_id) {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", req.query.user_id as string);

      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    } else if (req.query.org_id) {
      const orgId = String(req.query.org_id);

      const { data: users, error: usersErr } = await supabase
        .from("users")
        .select("id")
        .eq("org_id", orgId);

      if (usersErr) return res.status(400).json({ error: usersErr.message });

      const userIds = (users ?? []).map((u) => u.id);

      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .in("user_id", userIds);

      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
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

    const { data, error } = await supabase
      .from("registrations")
      .insert(registrationData);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const { data, error } = await supabase
      .from("registrations")
      .delete()
      .eq("id", req.body.id as string);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).end(`Method ${req.method} Not Allowed`);
};
