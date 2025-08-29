import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";

export const tooltipWrapperClass = style({
  padding: 8,
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyLight}`,
  borderRadius: 8,
  position: "relative",
});
