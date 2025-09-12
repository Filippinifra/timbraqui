import { Typography } from "@/components/Dumb/Typography";
import { BUSINESS_EMAIL, BUSINESS_NAME } from "@/utils/businessInfo";
import { colors } from "@/utils/colors";
import { Routes } from "@/utils/routes";

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: colors.greyExtraLight,
        padding: 16,
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Typography variant="p-s-r">
        {BUSINESS_NAME} - {BUSINESS_EMAIL}
      </Typography>
      <Typography variant="p-m-r">
        <Typography
          variant="p-m-r"
          href={Routes.termsConditionsGDPR}
          color={colors.primary}
          component="a"
        >
          Termini e Condizioni
        </Typography>
        {" | "}
        <Typography
          variant="p-m-r"
          href={Routes.cookies}
          color={colors.primary}
          component="a"
        >
          Cookie Policy
        </Typography>
      </Typography>
    </footer>
  );
};
