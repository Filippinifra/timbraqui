import { Spacer } from "@/components/Dumb/Spacer";
import { useUsers } from "@/hooks/api/useUsers";
import { Organization } from "@/types/Organization";
import { OrganizationRegistrationsPanel } from "./OrganizationRegistrationsPanel";
import { UsersPanel } from "./UsersPanel";

export const AdminPanel = ({
  organization,
}: {
  organization: Organization;
}) => {
  const { users } = useUsers(organization.id);

  return (
    <div>
      <UsersPanel organization={organization} />
      <Spacer size={24} />
      <OrganizationRegistrationsPanel
        organization={organization}
        users={users || []}
      />
    </div>
  );
};
