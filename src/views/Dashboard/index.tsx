import { Button } from "@/components/Dumb/Button";
import { Placeholder } from "@/components/Dumb/Placeholder";
import { Spacer } from "@/components/Dumb/Spacer";
import { Typography } from "@/components/Dumb/Typography";
import { CenteredContentHeaderLayout } from "@/components/Layout/CenteredContentHeaderLayout";
import { useUserInfo } from "@/context/UserInfoContext";
import { useOrganization } from "@/hooks/api/useOrganization";
import { BUSINESS_EMAIL, BUSINESS_NAME } from "@/utils/businessInfo";
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

  if (!user.id || !user.active) {
    return (
      <CenteredContentHeaderLayout>
        <div style={{ textAlign: "center", margin: "auto", padding: "0 16px" }}>
          <Typography variant="p-m-sb">Utente non abilitato</Typography>
          <Spacer size={8} />
          <Typography variant="p-s-r" color="#64748b">
            {"Contatta l'amministratore a "}
            <span style={{ fontWeight: 800 }}>{BUSINESS_EMAIL}</span>
            {" per abilitare il tuo account"}
          </Typography>
          <Spacer size={16} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SignOutButton>
              <Button variant="tertiary">Esci</Button>
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

  const isAdmin = organization.adminId.some((id) => id === user.id);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#ededed",
          position: "sticky",
          top: 0,
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            padding: 32,
          }}
        >
          <Typography variant="h1">{BUSINESS_NAME} - Dashboard</Typography>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Typography variant="p-m-r">
              {user.name} {user.surname}
            </Typography>
            <SignOutButton>
              <Button variant="secondary">Esci</Button>
            </SignOutButton>
          </div>
        </div>
      </div>
      <div style={{ padding: 32, maxWidth: 1000, margin: "auto" }}>
        <Spacer size={24} />
        <Typography variant="h3">La mia organizzazione</Typography>
        <Spacer size={8} />
        <div
          style={{
            padding: 16,
            background: "#f1f5f9",
            borderRadius: 8,
            width: 300,
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
    </div>
  );
};
