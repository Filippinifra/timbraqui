import { colors } from "@/utils/colors";
import { style, styleVariants } from "@vanilla-extract/css";

const base = style({
  all: "unset",
  cursor: "pointer",
  textAlign: "center",
  padding: "4px 8px",
  display: "flex",
  gap: 8,
  height: "fit-content",
  justifyContent: "center",
  alignItems: "center",
  transition: "0.05s",
  outlineColor: "transparent",

  ":disabled": {
    cursor: "not-allowed",
  },
});

export const buttonClasses = styleVariants({
  primary: [
    base,
    {
      backgroundColor: colors.primaryLight,
      ":hover": { backgroundColor: colors.primaryLight },
      ":focus": { outline: `1px solid ${colors.primaryLight}` },
    },
  ],
  secondary: [
    base,
    {
      backgroundColor: colors.secondary,
      ":hover": { outline: `1px solid ${colors.primaryLight}` },
      ":disabled": { backgroundColor: colors.disabled },
      ":focus": { outline: `1px solid ${colors.primaryLight}` },
    },
  ],
});

export const iconRounderWrapperClass = style({
  padding: "8px",
  borderRadius: "50%",
});
