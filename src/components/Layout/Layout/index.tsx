import { Button } from "@/components/Dumb/Button";
import { Typography } from "@/components/Dumb/Typography";
import { useUserInfo } from "@/context/UserInfoContext";
import { BUSINESS_NAME } from "@/utils/businessInfo";
import { colors } from "@/utils/colors";
import { Routes, StaticRoutes } from "@/utils/routes";
import { zIndexValues } from "@/utils/zIndex";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { Footer } from "../Footer";

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
    <div>
      <header
        style={{
          backgroundColor: colors.greyExtraLight,
          position: "sticky",
          top: 0,
          zIndex: zIndexValues.header,
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            padding: "24px 32px",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
            onClick={() => router.push(Routes.home)}
          >
            <Image
              src="/logo-transparent.png"
              alt="TimbraQui"
              width={32}
              height={32}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="p-s-sb">{BUSINESS_NAME}</Typography>
              <Typography variant="p-xs-r">
                {fromRouteToPageName[router.route as StaticRoutes]}
              </Typography>
            </div>
          </button>
          {user.email && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Typography variant="p-m-r">
                {user.name} {user.surname}
              </Typography>
              <SignOutButton>
                <Button variant="tertiary">Esci</Button>
              </SignOutButton>
            </div>
          )}
        </div>
      </header>
      <div style={{ padding: 32, maxWidth: 1000, margin: "auto" }}>
        {children}
      </div>
      <div style={{ padding: 32, maxWidth: 1000, margin: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};
