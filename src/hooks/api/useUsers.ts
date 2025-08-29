import { toUser } from "@/mappers/toUser";
import { UserApi } from "@/types/User";
import useSWR from "swr";

export const useUsers = (orgId: string) => {
  const { data, isLoading, error, mutate } = useSWR<UserApi[]>(
    orgId ? `/api/users?org_id=${orgId}` : null
  );

  const users = data?.map(toUser);

  return {
    users,
    usersLoading: isLoading,
    usersError: error,
    refreshUsers: mutate,
  };
};
