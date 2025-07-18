import { tabletMediaQuery } from "@/utils/breakpoints";
import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const base = style({
  width: "auto",
  padding: "12px 16px",
  borderRadius: 4,
  maxWidth: "100%",
  display: "flex",
  alignItems: "center",
  gap: 16,
});

export const wrapperClass = recipe({
  base,
  variants: {
    variant: {
      success: {
        backgroundColor: colors.successLight,
      },
      error: {
        backgroundColor: colors.errorLight,
      },
    },

    fullScreen: {
      true: {
        maxWidth: 300,
        maxHeight: 400,
        width: "calc(100vw - 40px)",
        height: "calc(100vh - 40px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      false: {
        "@media": {
          [tabletMediaQuery]: {
            maxWidth: 300,
          },
        },
      },
    },
  },
});
