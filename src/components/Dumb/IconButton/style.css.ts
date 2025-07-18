import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const wrapperIconStyle = recipe({
  base: {
    display: "inline-flex",
    position: "relative",
    padding: 4,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.1s",
    outline: "none",
    outlineColor: "white",
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: colors.primary,
        ":hover": {
          backgroundColor: colors.primaryDark,
          outline: `2px solid ${colors.primaryLight}`,
        },
        ":focus": { outline: `2px solid ${colors.primaryLight}` },
      },
      secondary: {
        backgroundColor: colors.greysBlack,
        ":hover": {
          outline: `2px solid ${colors.primary}`,
        },
        ":focus": { outline: `2px solid ${colors.primary}` },
      },
      tertiary: {
        backgroundColor: colors.white,
        border: `1px solid ${colors.darkerHue}`,
        ":hover": {
          outline: `2px solid ${colors.primaryLight}`,
        },
        ":focus": { outline: `2px solid ${colors.primaryLight}` },
      },
    },
    size: {
      m: {
        height: 24,
        width: 24,
      },
      l: { height: 32, width: 32 },
      xl: { height: 40, width: 40 },
    },
  },
});

export const dotWarningClass = style({
  height: 8,
  width: 8,
  position: "absolute",
  bottom: 1,
  right: 1,
  backgroundColor: colors.warning,
  borderRadius: "50%",
  outline: `1px solid ${colors.white}`,
});
