import { Database } from "@/types/supabase";
import {
  PostgrestError,
  PostgrestSingleResponse,
  SupabaseClient,
} from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { BUSINESS_DOMAINS } from "../utils/businessInfo";
import { createSupbaseWithClerkClient } from "./supabaseClient";

export const supabaseCheckError = async (
  res: NextApiResponse,
  error: PostgrestError | null
) => {
  if (error) {
    return res.status(500).json({ message: error.message || "Unknown error" });
  }
};

export const supabaseLogicReturnApi = async <T>(
  res: NextApiResponse,
  method: () => Promise<PostgrestSingleResponse<T>>
) => {
  if (method) {
    const { data, error } = await method();

    supabaseCheckError(res, error);

    return res.status(200).json(data);
  }
};

export const checkSupabaseAndMethodExist = async (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (supabase: SupabaseClient<Database>) => Promise<void> | void
) => {
  const supabase = await getSupabaseClient(req);

  if (supabase) {
    await callback(supabase);

    // handle ERR_STREAM_WRITE_AFTER_END error in production server log
    if (res.writableEnded) {
      return;
    }

    return res.status(405).json({ message: "Method not allowed" });
  } else {
    return res.status(500).json({ message: "Supabase not initialized" });
  }
};

export const getSupabaseClient = async (req: NextApiRequest) => {
  const clerkToken = req.headers.clerk;
  const supabase = createSupbaseWithClerkClient(
    typeof clerkToken === "string" ? clerkToken : ""
  );
  return supabase;
};

export const getBaseUrlOrigin = (req: NextApiRequest) =>
  `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;

export type NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>;

export function withApiProtection(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const origin = req.headers.referer || "";

    if (
      process.env.NODE_ENV !== "development" &&
      !BUSINESS_DOMAINS.some((domain) => origin.startsWith(domain))
    ) {
      return res.status(403).json({ error: "Access denied: invalid origin" });
    }

    return handler(req, res);
  };
}
