import { Placeholder } from "@/components/Dumb/Placeholder";
import { Typography } from "@/components/Dumb/Typography";
import { colors } from "@/utils/colors";
import { Routes } from "@/utils/routes";
import { SignIn, SignUp } from "@clerk/nextjs";
import { FC } from "react";

export const AuthView: FC<{ type: "login" | "register" }> = ({ type }) => {
  return (
    <div
      style={{
        margin: 0,
        backgroundColor: colors.greyExtraLight,
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, .90), rgba(255, 255, 255, .90)), url(/office.jpg)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ padding: "0 16px", textAlign: "center" }}>
          <Typography variant="p-xs-sb" color={colors.grey}>
            Continuando accetti automaticamente la nostra{" "}
            <Typography
              variant="p-xs-sb"
              color={colors.grey}
              component="a"
              style={{ textDecoration: "underline" }}
              href={Routes.cookies}
            >
              Cookie policy
            </Typography>
            {" e i nostri "}
            <Typography
              variant="p-xs-sb"
              color={colors.grey}
              component="a"
              style={{ textDecoration: "underline" }}
              href={Routes.termsConditionsGDPR}
            >
              Termini e condizioni
            </Typography>
          </Typography>
        </div>
        {type === "login" ? (
          <SignIn
            signUpUrl={Routes.register}
            fallbackRedirectUrl={Routes.dashboard}
            fallback={<Placeholder height={526} width={"100%"} />}
          />
        ) : (
          <SignUp
            signInUrl={Routes.login}
            fallbackRedirectUrl={Routes.dashboard}
            signInFallbackRedirectUrl={Routes.dashboard}
            fallback={<Placeholder height={606} width={"100%"} />}
          />
        )}
      </div>
    </div>
  );
};
