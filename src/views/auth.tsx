import { Panel } from "@/components/Dumb/Panel";
import { Placeholder } from "@/components/Dumb/Placeholder";
import { Spacer } from "@/components/Dumb/Spacer";
import { Typography } from "@/components/Dumb/Typography";
import { CenteredContentHeaderLayout } from "@/components/Layout/CenteredContentHeaderLayout";
import { colors } from "@/utils/colors";
import { Routes } from "@/utils/routes";
import { SignIn, SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const AuthView: FC<{ type: "login" | "register" }> = ({ type }) => {
  const { locale } = useRouter();

  return (
    <CenteredContentHeaderLayout>
      <div style={{ maxWidth: 400, width: "100%" }}>
        <Spacer size={32} />
        <Panel>
          <Typography variant="h2">
            {type === "login" ? "Accedi" : "Registrati"}
          </Typography>
          <Spacer size={8} />
          <Typography variant="p-s-r" color={colors.grey}>
            Da qui puoi accedere all'applicazione
          </Typography>
          <Spacer size={32} />
          {type === "login" ? (
            <SignIn
              path={Routes.login}
              routing="path"
              signUpUrl={Routes.register}
              fallbackRedirectUrl={Routes.dashboard}
              fallback={<Placeholder height={526} width={"100%"} />}
            />
          ) : (
            <SignUp
              path={Routes.register}
              routing="path"
              signInUrl={Routes.login}
              fallback={<Placeholder height={606} width={"100%"} />}
            />
          )}
          <Spacer size={16} />
          <Link
            href={{
              pathname: type === "login" ? Routes.register : Routes.login,
            }}
            locale={locale}
            style={{ textAlign: "center", textDecoration: "underline" }}
          >
            <Typography variant="p-xs-r">
              {type === "login"
                ? "Devi accedere per la prima volta"
                : "Devi accedere"}
            </Typography>
          </Link>
        </Panel>
        <Spacer size={16} />
        <div style={{ margin: "auto", textAlign: "center" }}>
          <Typography variant="p-xs-r" color={colors.grey}>
            Privacy policy{" "}
            <Link href={{ pathname: Routes.cookies }} locale={locale}>
              <Typography
                variant="p-xs-r"
                component="span"
                color={colors.grey}
                style={{ textDecoration: "underline" }}
              >
                Cookie policy
              </Typography>
            </Link>
          </Typography>
        </div>
      </div>
    </CenteredContentHeaderLayout>
  );
};
