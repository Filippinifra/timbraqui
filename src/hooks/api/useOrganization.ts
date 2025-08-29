import { toOrganization } from "@/mappers/toOrganization";
import { OrganizationApi } from "@/types/Organization";
import useSWR from "swr";

export type RegistrationActions = "add" | "edit" | "remove";

export const useOrganization = (orgId: string) => {
  const { data, isLoading, error, mutate } = useSWR<OrganizationApi[]>(
    orgId ? `/api/organizations?id=${orgId}` : null
  );

  return {
    organization: data ? toOrganization(data[0]) : undefined,
    orgLoading: isLoading,
    orgError: error,
    refreshOrganization: mutate,
  };
};
