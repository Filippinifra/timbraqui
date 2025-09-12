import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const base = style({
  all: "unset",
  cursor: "pointer",
  textAlign: "center",

  borderRadius: 8,
  display: "flex",

  height: "fit-content",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  outline: "none",
  outlineColor: "white",

  ":disabled": {
    cursor: "not-allowed",
  },
  transition: "0.1s",
});

export const buttonClasses = recipe({
  base,

  variants: {
    variant: {
      primary: {
        backgroundColor: colors.primary,
        ":hover": {
          outline: `2px solid ${colors.primaryLight}`,
          backgroundColor: colors.primaryDark,
        },
        ":disabled": { backgroundColor: colors.disabled },
        ":focus": { outline: `2px solid ${colors.primaryLight}` },
      },
      secondary: {
        backgroundColor: colors.greyExtraLight,
        ":hover": { outline: `2px solid ${colors.primaryLight}` },
        ":disabled": { backgroundColor: colors.disabled },
        ":focus": { outline: `2px solid ${colors.primaryLight}` },
      },
      distructive: {
        backgroundColor: colors.errorDark,
        ":hover": { outline: `2px solid ${colors.errorLight}` },
        ":disabled": { backgroundColor: colors.disabled },
        ":focus": { outline: `2px solid ${colors.errorLight}` },
      },
      tertiary: {
        border: `1px solid ${colors.graySemiLight}`,
        ":hover": {
          outline: `2px solid ${colors.primaryLight}`,
          backgroundColor: colors.greyExtraLight,
        },
        ":disabled": { backgroundColor: colors.disabled },
        ":focus": { outline: `2px solid ${colors.primaryLight}` },
      },
      success: {
        backgroundColor: colors.success,
        ":hover": {
          outline: `2px solid ${colors.successLight}`,
          backgroundColor: colors.successDark,
        },
        ":disabled": { backgroundColor: colors.disabled },
        ":focus": { outline: `2px solid ${colors.successLight}` },
      },
      warning: {
        backgroundColor: colors.warning,
        ":hover": {
          outline: `2px solid ${colors.warningLight}`,
          backgroundColor: colors.warningDark,
        },
        ":disabled": { backgroundColor: colors.disabled },
        ":focus": { outline: `2px solid ${colors.warningLight}` },
      },
    },
    disabled: {
      true: {
        ":hover": {
          outline: "none",
        },
        ":focus": { outline: "none" },
        cursor: "not-allowed",
      },
      false: {},
    },
    size: {
      s: { padding: "6px 12px", gap: 4 },
      m: { padding: "8px 16px", gap: 8 },
      l: { padding: "12px 24px", gap: 12 },
      xl: {
        padding: "16px 32px",
        gap: 16,
      },
    },
    special: {
      rounded: {
        borderRadius: "50px",
        boxShadow: "0 8px 32px rgba(59,130,246,0.3)",
        transition: "all 0.3s ease",
        minWidth: "200px",
        ":hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 40px rgba(59,130,246,0.4)",
        },
      },
      none: {},
    },
  },
});

export const iconRounderWrapperClass = style({
  padding: "8px",
  borderRadius: "50%",
});
