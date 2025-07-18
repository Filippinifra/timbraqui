import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";

export const tabsWrapperClass = style({
  display: "block",
  gap: "24px",
  position: "relative",
  borderBottom: `1px solid ${colors.greyLight}`,
});

export const tabItemClass = style({
  padding: "16px",
  display: "inline-block",
});

export const tabItemActiveClass = style({
  borderBottom: `2px solid ${colors.primary}`,
  marginBottom: -1,
});

export const tabItemInactiveClass = style({
  marginBottom: 1,
});
