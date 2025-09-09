import { getSupabaseClient } from "@/auth/supabaseClient";
import { UserApi } from "@/types/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = await getSupabaseClient(req, res);

  if (!supabase)
    return res.status(500).json({ error: "Supabase client not initialized" });

  if (req.method === "GET") {
    if (req.query.org_id) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("deleted", false)
        .eq("org_id", req.query.org_id as string);

      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("deleted", false)
        .eq("email", req.query.email as string)
        .single();

      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    }
  }

  if (req.method === "POST") {
    const body = req.body as UserApi;

    const { data: organizations, error: organizationErr } = await supabase
      .from("organizations")
      .select("max_users_active, admin_id")
      .eq("id", body.org_id);

    if (organizationErr)
      return res.status(400).json({ error: organizationErr.message });

    const { data: users, error: usersErr } = await supabase
      .from("users")
      .select("id")
      .eq("active", true)
      .eq("org_id", body.org_id);

    if (usersErr) return res.status(400).json({ error: usersErr.message });

    if (
      body.active &&
      users?.length &&
      organizations &&
      users.length - organizations[0].admin_id.length >=
        organizations[0].max_users_active
    ) {
      return res.status(400).json({ error: "Max users active reached" });
    }

    const { data, error } = await supabase.from("users").insert(body);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const body = req.body as UserApi;

    const { data: organizations, error: organizationErr } = await supabase
      .from("organizations")
      .select("max_users_active, admin_id")
      .eq("id", body.org_id);

    if (organizationErr)
      return res.status(400).json({ error: organizationErr.message });

    const { data: users, error: usersErr } = await supabase
      .from("users")
      .select("id")
      .eq("active", true)
      .eq("org_id", body.org_id);

    if (usersErr) return res.status(400).json({ error: usersErr.message });

    if (
      body.active &&
      users?.length &&
      organizations &&
      users.length - organizations[0].admin_id.length >=
        organizations[0].max_users_active
    ) {
      return res.status(400).json({ error: "Max users active reached" });
    }

    const { data, error } = await supabase
      .from("users")
      .update(body)
      .eq("id", body.id);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const id = req.query.id as string;

    const { data, error } = await supabase
      .from("users")
      .update({ deleted: true, active: false })
      .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).end(`Method ${req.method} Not Allowed`);
};
