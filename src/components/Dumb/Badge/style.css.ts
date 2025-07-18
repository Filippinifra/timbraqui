import { recipe } from "@vanilla-extract/recipes";

export const badgeClasses = recipe({
  base: {
    borderRadius: 16,
    padding: "4px 8px",
    display: "flex",
    gap: 4,
    width: "fit-content",
    height: "fit-content",
  },
});
