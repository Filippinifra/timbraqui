import { keyframes, style } from "@vanilla-extract/css";

const keyframesShimmer = keyframes({
  "0%": {
    backgroundPosition: " -80vw 0",
  },
  "100%": {
    backgroundPosition: "80vw 0",
  },
});

export const placeholderClass = style({
  background: "linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)",
  backgroundSize: "80vw 100%",
  animation: `${keyframesShimmer} 2s infinite linear`,
});
