import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const createSupbaseWithClerkClient = (accessToken: string | null) => {
  const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: async (url, options = {}) => {
        const headers = new Headers(options?.headers);
        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }

        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });

  return client;
};
