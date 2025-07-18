import { checkRouteReturnUser } from "@/auth/checkRouteReturnUserTranslations";
import { useUserInfo } from "@/context/UserInfoContext";
import { SignOutButton } from "@clerk/nextjs";
import { GetServerSideProps } from "next";

const Dashboard = () => {
  const { user, loading } = useUserInfo();

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!user.id) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#f8fafc",
        }}
      >
        <h2 style={{ color: "#dc2626", fontWeight: 700, fontSize: "1.5rem" }}>
          Utente non abilitato
        </h2>
        <p style={{ color: "#64748b", marginTop: 8 }}>
          Contatta l'amministratore per abilitare il tuo account.
        </p>
        <div style={{ marginTop: 24 }}>
          <SignOutButton>Esci</SignOutButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      Dashboard <SignOutButton>Esci</SignOutButton>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  checkRouteReturnUser(ctx);
