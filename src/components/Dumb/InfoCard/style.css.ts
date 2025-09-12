import { recipe } from "@vanilla-extract/recipes";

export const infoCardClasses = recipe({
  base: {
    background: "white",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "1px solid #f1f5f9",
  },

  variants: {
    variant: {
      default: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
      },
      centered: {
        textAlign: "center",
      },
      withContent: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
      },
    },

    iconSize: {
      small: {},
      medium: {},
      large: {},
    },
  },
});
