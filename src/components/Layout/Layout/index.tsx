import { Button } from "@/components/Dumb/Button";
import { Typography } from "@/components/Dumb/Typography";
import { useUserInfo } from "@/context/UserInfoContext";
import { BUSINESS_NAME } from "@/utils/businessInfo";
import { Routes, StaticRoutes } from "@/utils/routes";
import { zIndexValues } from "@/utils/zIndex";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { Footer } from "../Footer";
import { userInfoDesktop } from "./style.css";

const fromRouteToPageName: { [key in StaticRoutes]: string } = {
  [Routes.dashboard]: "Dashboard",
  [Routes.termsConditionsGDPR]: "Termini e Condizioni",
  [Routes.cookies]: "Cookie Policy",
  [Routes.home]: "Home",
  [Routes.login]: "Accedi",
  [Routes.register]: "Registrati",
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserInfo();
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <header
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          position: "sticky",
          top: 0,
          zIndex: zIndexValues.header,
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: "0.5rem",
              borderRadius: "12px",
              transition: "all 0.2s ease",
            }}
            onClick={() => router.push(Routes.home)}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
              }}
            >
              <Image
                src="/logo-transparent.png"
                alt="TimbraQui"
                width={28}
                height={28}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="p-m-sb"
                style={{
                  color: "#1e293b",
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: "700",
                }}
              >
                {BUSINESS_NAME}
              </Typography>
              <Typography
                variant="p-xs-r"
                style={{
                  color: "#64748b",
                  margin: 0,
                  fontSize: "0.85rem",
                }}
              >
                {fromRouteToPageName[router.route as StaticRoutes]}
              </Typography>
            </div>
          </button>
          {user.email && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(45deg, #10b981, #059669)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                }}
              >
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className={userInfoDesktop}>
                <Typography
                  variant="p-s-sb"
                  style={{
                    color: "#1e293b",
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  {user.name} {user.surname}
                </Typography>
                <Typography
                  variant="p-xs-r"
                  style={{
                    color: "#64748b",
                    margin: 0,
                    fontSize: "0.8rem",
                  }}
                >
                  {user.email}
                </Typography>
              </div>
              <SignOutButton>
                <Button variant="tertiary">Esci</Button>
              </SignOutButton>
            </div>
          )}
        </div>
      </header>
      <div style={{ padding: "2rem", maxWidth: 1200, margin: "auto" }}>
        {children}
      </div>
      <div style={{ padding: "2rem", maxWidth: 1200, margin: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};
