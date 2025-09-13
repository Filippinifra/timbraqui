import { style } from "@vanilla-extract/css";

export const timbraturaCard = style({
  background: "white",
  borderRadius: "20px",
  padding: "2rem",
  marginBottom: "2rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  border: "1px solid #f1f5f9",
});

export const timbraturaHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
});

export const timbraturaIcon = style({
  borderRadius: "12px",
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const statisticsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
  marginBottom: "2rem",
});

export const calendarCard = style({
  background: "white",
  borderRadius: "20px",
  padding: "2rem",
  marginBottom: "2rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  border: "1px solid #f1f5f9",
});

export const calendarHeader = style({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  marginBottom: "1.5rem",
});

export const calendarGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "8px",
  marginBottom: "1rem",
});

export const calendarDayHeader = style({
  textAlign: "center",
  padding: "0.5rem",
  fontWeight: "600",
  color: "#64748b",
  fontSize: "0.875rem",
});

export const calendarDay = style({
  aspectRatio: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  border: "1px solid transparent",
});

export const calendarDayToday = style({
  background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
  color: "white",
  fontWeight: "600",
});

export const calendarDayOtherMonth = style({
  color: "#cbd5e1",
});

export const calendarDayHasRegistrations = style({
  background: "#f0f9ff",
  borderColor: "#3b82f6",
});

export const calendarDayHover = style({
  ":hover": {
    background: "#f8fafc",
    borderColor: "#e2e8f0",
  },
});
