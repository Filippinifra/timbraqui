import { style } from "@vanilla-extract/css";

export const infoCardWithContentClasses = style({
  background: "white",
  borderRadius: "16px",
  padding: "1.5rem",
  marginBottom: "2rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  border: "1px solid #f1f5f9",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1rem",
});
