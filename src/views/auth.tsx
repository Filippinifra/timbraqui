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
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 8,
      }}
    >
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
  );
};
