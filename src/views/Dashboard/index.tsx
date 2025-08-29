import { Button } from "@/components/Dumb/Button";
import { Placeholder } from "@/components/Dumb/Placeholder";
import { Spacer } from "@/components/Dumb/Spacer";
import { Typography } from "@/components/Dumb/Typography";
import { CenteredContentHeaderLayout } from "@/components/Layout/CenteredContentHeaderLayout";
import { useUserInfo } from "@/context/UserInfoContext";
import { useOrganization } from "@/hooks/api/useOrganization";
import { BUSINESS_EMAIL } from "@/utils/businessInfo";
import { colors } from "@/utils/colors";
import { SignOutButton } from "@clerk/nextjs";
import { AdminPanel } from "./AdminPanel";
import { UserPanel } from "./UserPanel";

export const DashboardView = () => {
  const { user, loading } = useUserInfo();
  const { organization, orgLoading, orgError } = useOrganization(user.orgId);

  if (loading) {
    return <Placeholder width="100%" height="100vh" />;
  }

  if (!user.id) {
    return (
      <CenteredContentHeaderLayout>
        <div style={{ textAlign: "center", margin: "auto", padding: "0 16px" }}>
          <Typography variant="p-m-sb">Utente non abilitato</Typography>
          <Spacer size={8} />
          <Typography variant="p-s-r" color="#64748b">
            {`Contatta l'amministratore a <span>${BUSINESS_EMAIL}</span> per abilitare il tuo account.`}
          </Typography>
          <Spacer size={16} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SignOutButton>
              <Button>Esci</Button>
            </SignOutButton>
          </div>
        </div>
      </CenteredContentHeaderLayout>
    );
  }

  if (orgLoading) return <div>Caricamento dati organizzazione...</div>;
  if (orgError)
    return <div>{"Errore nel caricamento dell'organizzazione."}</div>;
  if (!organization) return <div>Organizzazione non trovata.</div>;

  const isAdmin = user.id === organization.adminId;

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1">Dashboard</Typography>
        <SignOutButton>
          <Button>Esci</Button>
        </SignOutButton>
      </div>
      <Spacer size={24} />
      <Typography variant="p-m-r">La mia organizzazione</Typography>
      <Spacer size={8} />
      <div
        style={{
          padding: 16,
          background: "#f1f5f9",
          borderRadius: 8,
          width: "fit-content",
          minWidth: 300,
        }}
      >
        <Typography variant="p-m-r" color={colors.primary}>
          {organization.name}
        </Typography>
        <Spacer size={4} />
        <Typography variant="p-s-r" color="#64748b">
          Indirizzo: {organization.address}
        </Typography>
      </div>
      <Spacer size={32} />
      {isAdmin ? (
        <AdminPanel organization={organization} />
      ) : (
        <UserPanel organization={organization} />
      )}
    </div>
  );
};
