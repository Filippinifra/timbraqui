import { InfoCard } from "@/components/Dumb/InfoCard";
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
      {/* ADMIN DASHBOARD OVERVIEW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <InfoCard
          icon="👥"
          title={`${users?.length || 0}`}
          description="Utenti Attivi"
          variant="centered"
          iconGradient="linear-gradient(45deg, #3b82f6, #1d4ed8)"
        />

        <InfoCard
          icon="📊"
          title={`${organization.maxUsersActive}`}
          description="Limite Utenti"
          variant="centered"
          iconGradient="linear-gradient(45deg, #10b981, #059669)"
        />

        <InfoCard
          icon="📍"
          title={`${organization.maxMeterRegistrations}m`}
          description="Raggio Timbratura"
          variant="centered"
          iconGradient="linear-gradient(45deg, #f59e0b, #d97706)"
        />

        <InfoCard
          icon="⚙️"
          title="Admin"
          description="Ruolo"
          variant="centered"
          iconGradient="linear-gradient(45deg, #8b5cf6, #7c3aed)"
        />
      </div>

      <UsersPanel organization={organization} />
      <Spacer size={32} />
      <OrganizationRegistrationsPanel
        organization={organization}
        users={users || []}
      />
    </div>
  );
};
