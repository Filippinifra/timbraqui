import { style } from "@vanilla-extract/css";

export const panelHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "2rem",
  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column",
      gap: "1rem",
    },
  },
});

export const panelTitle = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  gap: "1rem",
});

export const panelActions = style({
  display: "flex",
  justifyContent: "flex-end",
  "@media": {
    "screen and (max-width: 768px)": {
      justifyContent: "stretch",
      width: "100%",
    },
  },
});

export const panelActionsMobile = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",
  "@media": {
    "screen and (min-width: 769px)": {
      display: "none",
    },
  },
});

export const panelActionsDesktop = style({
  display: "flex",
  gap: "0.5rem",
  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
    },
  },
});

export const buttonFullWidth = style({
  width: "100%",
  justifyContent: "center",
});
