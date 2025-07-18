import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const base = style({
  margin: 0,
  color: colors.black,
  overflow: "hidden",
});

export const typographyClasses = recipe({
  base,

  variants: {
    variant: {
      h1: { fontSize: 33, lineHeight: "125%", fontWeight: "bold" },
      h2: { fontSize: 26, lineHeight: "125%", fontWeight: "bold" },
      h3: { fontSize: 20, lineHeight: "125%", fontWeight: "bold" },
      "p-m-r": { fontSize: 16, lineHeight: "125%", fontWeight: "regular" },
      "p-m-sb": { fontSize: 16, lineHeight: "125%", fontWeight: "bold" },
      "p-s-r": { fontSize: 14, lineHeight: "125%", fontWeight: "regular" },
      "p-s-sb": { fontSize: 14, lineHeight: "125%", fontWeight: "bold" },
      "p-xs-r": { fontSize: 12, lineHeight: "125%", fontWeight: "regular" },
      "p-xs-sb": { fontSize: 12, lineHeight: "125%", fontWeight: "bold" },
    },

    ellipsisLines: {
      0: { whiteSpace: "pre-line" },
      1: { textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" },
      2: {
        whiteSpace: "initial",
        display: "-webkit-box",
        "-webkit-line-clamp": "2",
        "-webkit-box-orient": "vertical",
      },
    },
  },
});

export const ellipsisClass = style({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});
