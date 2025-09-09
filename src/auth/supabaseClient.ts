import { Database } from "@/types/supabase";
import { getAuth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

export const getSupabaseClient = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, getToken } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const supabaseAccessToken = await getToken({
    template: "supabase",
  });

  if (!supabaseAccessToken) {
    return res.status(500).json({ error: "Missing Supabase token" });
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );

  if (!supabase) {
    return res.status(500).json({ error: "Supabase client not initialized" });
  }

  return supabase;
};
