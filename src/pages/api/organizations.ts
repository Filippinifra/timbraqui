import {
  checkSupabaseAndMethodExist,
  supabaseLogicReturnApi,
  withApiProtection,
} from "@/auth/api";

export default withApiProtection((req, res) =>
  checkSupabaseAndMethodExist(req, res, async (supabase) => {
    if (req.method === "GET") {
      if (req.query.id) {
        return supabaseLogicReturnApi(
          res,
          async () =>
            await supabase
              .from("organizations")
              .select()
              .eq("id", req.query.id as string)
        );
      }
    }
  })
);
