import { colors } from "@/utils/colors";
import { recipe } from "@vanilla-extract/recipes";
import { softBoxShadowClass } from "../boxShadow.css";

export const textareaClass = recipe({
  base: [
    softBoxShadowClass,
    {
      padding: "8px 8px",
      borderRadius: 4,
      fontSize: 16,
      lineHeight: "20px",
      width: "100%",
      boxSizing: "border-box",
      border: `1px solid ${colors.primaryLight}`,
      outline: "none",
      height: 38,
      resize: "vertical",
      minHeight: 80,
      maxHeight: 240,
      backgroundColor: colors.white,

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
  },
});
