import {
  checkSupabaseAndMethodExist,
  supabaseLogicReturnApi,
  withApiProtection,
} from "@/auth/api";
import { UserApi } from "@/types/User";

export default withApiProtection((req, res) =>
  checkSupabaseAndMethodExist(req, res, async (supabase) => {
    if (req.method === "GET") {
      if (req.query.org_id) {
        return supabaseLogicReturnApi(
          res,
          async () =>
            await supabase
              .from("users")
              .select()
              .eq("organization_id", req.query.org_id as string)
        );
      } else {
        return supabaseLogicReturnApi(
          res,
          async () =>
            await supabase
              .from("users")
              .select()
              .eq("email", req.query.email as string)
        );
      }
    }

    if (req.method === "POST") {
      const body = req.body as UserApi;

      return supabaseLogicReturnApi(
        res,
        async () => await supabase.from("users").insert(body)
      );
    }

    if (req.method === "PUT") {
      const body = req.body as UserApi;

      return supabaseLogicReturnApi(
        res,
        async () => await supabase.from("users").update(body).eq("id", body.id)
      );
    }
  })
);
