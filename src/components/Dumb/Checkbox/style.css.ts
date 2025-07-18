import { colors } from "@/utils/colors";
import { style } from "@vanilla-extract/css";

export const checkboxClass = style({
  appearance: "none",
  width: "20px",
  height: "20px",
  border: "2px solid #333",
  borderRadius: "4px",
  position: "relative",
  cursor: "pointer",
  transition: "background-color 0.3s, border-color 0.3s",

  ":checked": {
    borderColor: colors.primary,
  },

  ":before": {
    content: '""',
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "2px",
    opacity: 0,
    transition: "opacity 0.3s",
  },

  ":hover": {
    borderColor: colors.primary,
  },
});
