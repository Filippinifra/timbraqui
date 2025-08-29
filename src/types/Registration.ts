import { Tables } from "./supabase";

export type Registration = {
  id: string;
  createdAt: string;
  userId: string;
  date: string;
};

export type RegistrationApi = Tables<"registrations">;
