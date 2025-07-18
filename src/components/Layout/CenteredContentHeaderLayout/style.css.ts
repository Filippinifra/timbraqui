import { style } from "@vanilla-extract/css";

export const centralWrapperClass = style({
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  flexDirection: "column",
  gap: 8,
});
