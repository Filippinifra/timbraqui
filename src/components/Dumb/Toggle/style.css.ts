import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const toggleWrapperClass = style({
  display: "inline-block",
  width: 36,
  height: 20,
  background: colors.white,
  borderRadius: 16,
  border: "none",
  position: "relative",
  cursor: "pointer",
  padding: 0,
  outline: `2px solid ${colors.primaryLight}`,

  ":hover": {
    outline: `3px solid ${colors.primaryLight}`,
  },
  transition: "0.1s",
});

export const dotClass = recipe({
  base: {
    position: "absolute",
    top: 2,
    width: 16,
    height: 16,
    background: colors.white,
    borderRadius: "50%",
    transition: "left 0.2s ease",
  },

  variants: {
    active: {
      true: {
        backgroundColor: colors.primary,
        left: 18,

        ":hover": {
          background: colors.primaryDark,
        },
      },
      false: {
        backgroundColor: colors.primaryLight,
        left: 2,
      },
    },
  },
});
