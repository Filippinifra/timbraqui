import {
  checkSupabaseAndMethodExist,
  supabaseCheckError,
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
              .eq("deleted", false)
              .eq("org_id", req.query.org_id as string)
        );
      } else {
        return supabaseLogicReturnApi(
          res,
          async () =>
            await supabase
              .from("users")
              .select()
              .eq("deleted", false)
              .eq("email", req.query.email as string)
        );
      }
    }

    if (req.method === "POST") {
      const body = req.body as UserApi;

      const { data: organizations, error: organizationErr } = await supabase
        .from("organizations")
        .select("max_users_active, admin_id")
        .eq("id", body.org_id);
      supabaseCheckError(res, organizationErr);

      const { data: users, error: usersErr } = await supabase
        .from("users")
        .select("id")
        .eq("active", true)
        .eq("org_id", body.org_id);
      supabaseCheckError(res, usersErr);

      if (
        body.active &&
        users?.length &&
        organizations &&
        users.length - organizations[0].admin_id.length >=
          organizations[0].max_users_active
      ) {
        return res.status(400).json({ error: "Max users active reached" });
      }

      return supabaseLogicReturnApi(
        res,
        async () => await supabase.from("users").insert(body)
      );
    }

    if (req.method === "PUT") {
      const body = req.body as UserApi;

      const { data: organizations, error: organizationErr } = await supabase
        .from("organizations")
        .select("max_users_active, admin_id")
        .eq("id", body.org_id);
      supabaseCheckError(res, organizationErr);

      const { data: users, error: usersErr } = await supabase
        .from("users")
        .select("id")
        .eq("active", true)
        .eq("org_id", body.org_id);
      supabaseCheckError(res, usersErr);

      if (
        body.active &&
        users?.length &&
        organizations &&
        users.length - organizations[0].admin_id.length >=
          organizations[0].max_users_active
      ) {
        return res.status(400).json({ error: "Max users active reached" });
      }

      return supabaseLogicReturnApi(
        res,
        async () => await supabase.from("users").update(body).eq("id", body.id)
      );
    }

    if (req.method === "DELETE") {
      const id = req.query.id as string;

      return supabaseLogicReturnApi(
        res,
        async () =>
          await supabase
            .from("users")
            .update({ deleted: true, active: false })
            .eq("id", id)
      );
    }
  })
);
