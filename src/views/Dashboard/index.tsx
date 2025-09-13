import { Button } from "@/components/Dumb/Button";
import { InfoCardWithContent } from "@/components/Dumb/InfoCardWithContent";
import { Placeholder } from "@/components/Dumb/Placeholder";
import { Typography } from "@/components/Dumb/Typography";
import { CenteredContentHeaderLayout } from "@/components/Layout/CenteredContentHeaderLayout";
import { Layout } from "@/components/Layout/Layout";
import { useUserInfo } from "@/context/UserInfoContext";
import { useOrganization } from "@/hooks/api/useOrganization";
import { BUSINESS_EMAIL } from "@/utils/businessInfo";
import { colors } from "@/utils/colors";
import { SignOutButton } from "@clerk/nextjs";
import { AdminPanel } from "./AdminPanel";
import { UserPanel } from "./UserPanel";
import {
  disabledAccountCard,
  disabledAccountIcon,
  errorCard,
  errorIcon,
  loadingContainer,
  loadingSpinner,
  organizationContent,
  warningCard,
  warningIcon,
  welcomeBlur1,
  welcomeBlur2,
  welcomeContent,
  welcomeHeader,
  welcomeSection,
} from "./styles.css";

export const DashboardView = () => {
  const { user, loading } = useUserInfo();
  const { organization, orgLoading, orgError } = useOrganization(user.orgId);

  if (loading) {
    return <Placeholder width="100%" height="100vh" />;
  }

  if (!user.id || !user.active) {
    return (
      <CenteredContentHeaderLayout>
        <div className={disabledAccountCard}>
          <div className={disabledAccountIcon}>
            <span style={{ fontSize: "2rem" }}>⚠️</span>
          </div>
          <Typography
            variant="h3"
            style={{ color: "#1e293b", marginBottom: "1rem" }}
          >
            Account Non Abilitato
          </Typography>
          <Typography
            variant="p-m-r"
            color="#64748b"
            style={{ lineHeight: "1.6", marginBottom: "2rem" }}
          >
            Il tuo account non è ancora stato abilitato dall'amministratore.
            <br />
            Contatta{" "}
            <span style={{ fontWeight: "700", color: colors.primary }}>
              {BUSINESS_EMAIL}
            </span>{" "}
            per richiedere l'abilitazione.
          </Typography>
          <SignOutButton>
            <Button variant="tertiary">Esci dall'Account</Button>
          </SignOutButton>
        </div>
      </CenteredContentHeaderLayout>
    );
  }

  if (orgLoading) {
    return (
      <Layout>
        <div className={loadingContainer}>
          <div style={{ textAlign: "center" }}>
            <div className={loadingSpinner} />
            <Typography variant="p-m-r" color="#64748b">
              Caricamento organizzazione...
            </Typography>
          </div>
        </div>
      </Layout>
    );
  }

  if (orgError) {
    return (
      <Layout>
        <div className={errorCard}>
          <div className={errorIcon}>
            <span style={{ fontSize: "1.5rem" }}>❌</span>
          </div>
          <Typography
            variant="h3"
            style={{ color: "#dc2626", marginBottom: "0.5rem" }}
          >
            Errore di Caricamento
          </Typography>
          <Typography variant="p-m-r" color="#7f1d1d">
            Non è stato possibile caricare i dati dell'organizzazione.
          </Typography>
        </div>
      </Layout>
    );
  }

  if (!organization) {
    return (
      <Layout>
        <div className={warningCard}>
          <div className={warningIcon}>
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
          </div>
          <Typography
            variant="h3"
            style={{ color: "#d97706", marginBottom: "0.5rem" }}
          >
            Organizzazione Non Trovata
          </Typography>
          <Typography variant="p-m-r" color="#92400e">
            L'organizzazione associata al tuo account non è stata trovata.
          </Typography>
        </div>
      </Layout>
    );
  }

  const isAdmin = organization.adminId.some((id) => id === user.id);

  return (
    <Layout>
      <div className={welcomeSection}>
        <div className={welcomeBlur1} />
        <div className={welcomeBlur2} />
        <div className={welcomeContent}>
          <div className={welcomeHeader}>
            <div>
              <Typography
                variant="h2"
                style={{
                  color: "white",
                  margin: 0,
                  background: "linear-gradient(45deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ciao, {user.name}!
              </Typography>
              <Typography
                variant="p-m-r"
                style={{ opacity: 0.9, margin: 0 }}
                color={colors.white}
              >
                {isAdmin ? "Amministratore" : "Dipendente"} •{" "}
                {organization.name}
              </Typography>
            </div>
          </div>
          <Typography
            variant="p-l-r"
            style={{ opacity: 0.8, lineHeight: "1.6" }}
            color={colors.white}
          >
            {isAdmin
              ? "Gestisci il tuo team e monitora le presenze in tempo reale"
              : "Timbra il tuo ingresso e uscita, visualizza le tue presenze"}
          </Typography>
        </div>
      </div>

      {/* ORGANIZATION INFO CARD */}
      <InfoCardWithContent
        icon="🏢"
        title={organization.name}
        description="La tua organizzazione"
      >
        <div className={organizationContent}>
          <Typography
            variant="p-s-sb"
            color="#475569"
            style={{ marginBottom: "0.5rem" }}
          >
            📍 Indirizzo
          </Typography>
          <Typography variant="p-m-r" color="#1e293b">
            {organization.address}
          </Typography>
        </div>
      </InfoCardWithContent>

      {/* MAIN CONTENT */}
      {isAdmin ? <AdminPanel organization={organization} /> : <UserPanel />}
    </Layout>
  );
};
