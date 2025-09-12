import { style } from "@vanilla-extract/css";

export const userInfoDesktop = style({
  display: "none",
  "@media": {
    "screen and (min-width: 768px)": {
      display: "block",
    },
  },
});
