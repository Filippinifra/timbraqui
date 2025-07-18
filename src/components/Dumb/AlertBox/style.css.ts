import { colors } from "@/utils/colors";
import { recipe } from "@vanilla-extract/recipes";

export const wrapperClass = recipe({
  base: {
    padding: 8,
    borderRadius: 8,
    display: "flex",
    gap: 16,
  },

  variants: {
    variant: {
      info: {
        backgroundColor: colors.infoLight,
        border: `2px solid ${colors.info}`,
      },
      warning: {
        backgroundColor: colors.warningLight,
        border: `2px solid ${colors.warning}`,
      },
    },
  },
});
