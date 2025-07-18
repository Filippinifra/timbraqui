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
        backgroundColor: colors.error,
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
      m: { padding: "8px 16px", gap: 8 },
      s: { padding: "8px 16px", gap: 4 },
    },
  },
});

export const iconRounderWrapperClass = style({
  padding: "8px",
  borderRadius: "50%",
});
