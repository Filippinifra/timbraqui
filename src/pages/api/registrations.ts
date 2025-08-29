import {
  checkSupabaseAndMethodExist,
  supabaseCheckError,
  supabaseLogicReturnApi,
  withApiProtection,
} from "@/auth/api";
import { RegistrationApi } from "@/types/Registration";

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
      const body = req.body as RegistrationApi;

      return supabaseLogicReturnApi(
        res,
        async () => await supabase.from("registrations").insert(body)
      );
    }
  })
);
