import { Tables } from "./supabase";

export type Organization = {
  id: string;
  createdAt: string;
  address: string;
  name: string;
  adminId: string;
  place: { lat: number; lng: number } | null;
};

export type OrganizationApi = Tables<"organizations">;
