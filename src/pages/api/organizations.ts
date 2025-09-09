import { getSupabaseClient } from "@/auth/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = await getSupabaseClient(req, res);

  if (!supabase)
    return res.status(500).json({ error: "Supabase client not initialized" });

  if (req.method === "GET") {
    if (req.query.id) {
      const { data, error } = await supabase
        .from("organizations")
        .select()
        .eq("id", req.query.id as string);
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    }
  }

  return res.status(405).end(`Method ${req.method} Not Allowed`);
};
