import { getSupabaseClient } from "@/auth/supabaseClient";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");
  const { userId, getToken } = getAuth(req);

  const supabase = await getSupabaseClient(req, res);

  if (!supabase)
    return res.status(500).json({ error: "Supabase client not initialized" });

  try {
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });

    const tokenParsed = JSON.parse(
      Buffer.from(
        (supabaseAccessToken || "").split(".")[1],
        "base64url"
      ).toString()
    );

    const { data, error } = await supabase
      .from("users")
      .update({ clerk_id: userId })
      .eq("email", tokenParsed.email)
      .is("clerk_id", null)
      .select("id, org_id");

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      claimedCount: data?.length ?? 0,
    });
  } catch (e: any) {
    return res
      .status(e?.status ?? 500)
      .json({ error: e?.message ?? "Internal error" });
  }
}
