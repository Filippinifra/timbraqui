import { desktopMediaQuery, tabletMediaQuery } from "@/utils/breakpoints";
import { style } from "@vanilla-extract/css";

export const formGridWrapperClass = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,

  "@media": {
    [tabletMediaQuery]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
});

export const formGridWrapperSidebarClass = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,

  "@media": {
    [desktopMediaQuery]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
});
