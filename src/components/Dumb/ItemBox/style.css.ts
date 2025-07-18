import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";

export const wrapperClass = style({
  border: `2px solid ${colors.primaryLight}`,
  cursor: "pointer",
  display: "grid",
  gridTemplateColumns: "30px 1fr",
  borderRadius: 8,
  padding: 16,
  backgroundColor: colors.white,
  gap: 8,
  textAlign: "right",
  width: "100%",
  transition: "0.4s",

  ":hover": {
    filter: "brightness(0.97)",
  },

  ":disabled": {
    cursor: "not-allowed",
  },
});

export const disabledSelectedClass = style({
  ":disabled": {
    border: `2px solid ${colors.disabledDark}`,
  },
});

export const disabledUnselectedClass = style({
  ":disabled": {
    border: `2px solid ${colors.disabled}`,
  },
});

export const checkedWrapperClass = style({
  border: `2px solid ${colors.primary}`,
});
