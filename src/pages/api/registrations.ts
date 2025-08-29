import {
  checkSupabaseAndMethodExist,
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
              .select()
              .eq("user_id", req.query.user_id as string)
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
