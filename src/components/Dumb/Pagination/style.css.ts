import { colors } from "@/utils/colors";
import { zIndexValues } from "@/utils/zIndex";
import { style } from "@vanilla-extract/css";

export const wrapperClass = style({
  position: "fixed",
  display: "flex",
  gap: 4,
  alignItems: "center",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  justifyContent: "space-between",
  zIndex: zIndexValues.pagination,
  maxWidth: 862,
  width: "100%",
  padding: 8,
  border: `1px solid ${colors.graySemiLight}`,
  borderRadius: 16,
  backgroundColor: colors.white,
});

export const pageButtonClass = style({
  width: 36,
  height: 36,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});
