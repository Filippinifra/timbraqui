import { colors } from "@/utils/colors";
import { recipe } from "@vanilla-extract/recipes";

export const initialsWrapperClass = recipe({
  base: {
    minWidth: 32,
    height: 32,
    width: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.black,
    boxShadow: "0px 0px 12px -8px #000000",
    fontSize: 12,
    transition: "0.4s",
    outline: "none",
    outlineColor: "transparent",
  },

  variants: {
    onClick: {
      true: {
        cursor: "pointer",

        ":hover": {
          outline: `1px solid ${colors.greyLight}`,
        },
      },
      false: {
        cursor: "inherit",
      },
    },
  },
});
