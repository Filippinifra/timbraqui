import { Registration, RegistrationApi } from "@/types/Registration";

export const toRegistration = (r: RegistrationApi): Registration => ({
  createdAt: r.created_at,
  date: r.date,
  id: r.id,
  userId: r.user_id,
});

export const toRegistrationApi = (r: Registration): RegistrationApi => ({
  created_at: r.createdAt,
  date: r.date,
  id: r.id,
  user_id: r.userId,
});
