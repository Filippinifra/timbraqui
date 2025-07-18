import { Tables } from "./supabase";

export type User = {
  id: string;
  createdAt: string;
  orgId: string;
  name: string;
  surname: string;
  email: string;
};

export type UserApi = Tables<"users">;
