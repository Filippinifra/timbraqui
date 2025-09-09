import { toRegistration } from "@/mappers/toRegistration";
import { RegistrationApi } from "@/types/Registration";
import useSWR from "swr";

export type RegistrationActions = "add" | "edit" | "remove";

export const useUserRegistrations = (userId: string) => {
  const { data, isLoading, mutate } = useSWR<RegistrationApi[]>(
    `/api/registrations?user_id=${userId}`
  );

  const refreshRegistrations = (
    registrationsToChange: RegistrationApi,
    action: RegistrationActions
  ) => {
    const result = (valueQueued: RegistrationApi[] | undefined) => {
      switch (action) {
        case "add": {
          return [...(valueQueued || []), registrationsToChange];
        }
        case "edit": {
          return valueQueued?.map((r) =>
            r.id === registrationsToChange.id ? registrationsToChange : r
          );
        }
        case "remove": {
          return valueQueued?.filter(
            ({ id }) => id !== registrationsToChange.id
          );
        }
      }
    };

    return mutate(result, { revalidate: false });
  };

  return {
    registrations: data ? data.map(toRegistration) : undefined,
    registrationsLoading: isLoading,
    refreshRegistrations,
  };
};

export const useOrganizationRegistrations = (orgId: string) => {
  const { data, isLoading, mutate } = useSWR<RegistrationApi[]>(
    `/api/registrations?org_id=def`
  );

  const refreshRegistrations = (
    registrationsToChange: RegistrationApi,
    action: RegistrationActions
  ) => {
    const result = (valueQueued: RegistrationApi[] | undefined) => {
      switch (action) {
        case "add": {
          return [...(valueQueued || []), registrationsToChange];
        }
        case "edit": {
          return valueQueued?.map((r) =>
            r.id === registrationsToChange.id ? registrationsToChange : r
          );
        }
        case "remove": {
          return valueQueued?.filter(
            ({ id }) => id !== registrationsToChange.id
          );
        }
      }
    };

    return mutate(result, { revalidate: false });
  };

  return {
    registration: data ? data.map(toRegistration) : undefined,
    registrationLoading: isLoading,
    refreshRegistrations,
  };
};
