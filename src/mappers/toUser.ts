import { User, UserApi } from "@/types/User";

export const toUser = (u: UserApi): User => ({
  createdAt: u.created_at,
  email: u.email,
  id: u.id,
  name: u.name,
  orgId: u.org_id,
  surname: u.surname,
});

export const toUserApi = (u: User): UserApi => ({
  created_at: u.createdAt,
  email: u.email,
  id: u.id,
  name: u.name,
  org_id: u.orgId,
  surname: u.surname,
});
