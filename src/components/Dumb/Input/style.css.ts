import { colors } from "@/utils/colors";
import { recipe } from "@vanilla-extract/recipes";
import { softBoxShadowClass } from "../boxShadow.css";

export const inputClass = recipe({
  base: [
    softBoxShadowClass,
    {
      borderRadius: 4,
      fontSize: 16,
      lineHeight: "20px",
      width: "100%",
      boxSizing: "border-box",
      border: `1px solid ${colors.greyLight}`,
      outline: "none",

      backgroundColor: colors.white,
      transition: "0.1s",
      outlineColor: "transparent",

      ":disabled": {
        backgroundColor: colors.greyLight,
      },
    },
  ],

  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
      },
      false: {
        ":hover": {
          outline: `1px solid ${colors.primaryLight}`,
        },

        ":focus": {
          border: `1px solid ${colors.primary}`,
        },
      },
    },
    error: {
      true: { border: `1px solid ${colors.error}` },
      false: {},
    },
    size: {
      m: { height: 38, padding: "8px 8px" },
      s: { height: 32, padding: "6px 6px" },
    },
  },
});
