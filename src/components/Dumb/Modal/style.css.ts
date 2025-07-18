import { desktopMediaQuery, tabletMediaQuery } from "@/utils/breakpoints";
import { colors } from "@/utils/colors";
import { zIndexValues } from "@/utils/zIndex";
import { style } from "@vanilla-extract/css";
import { boxShadowClass } from "../boxShadow.css";

export const externalWrapperClass = style({
  width: "100%",
  height: "100%",
  position: "fixed",
  backgroundColor: "rgb(0,0,0,0.5)",
  zIndex: zIndexValues.modal,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const internalWrapperClass = style([
  boxShadowClass,
  {
    backgroundColor: "white",
    maxHeight: "calc(100% - 100px)",
    overflow: "auto",
    borderRadius: 10,
    boxSizing: "border-box",

    margin: "0 12px",
    width: 400,
    padding: 16,

    "@media": {
      [tabletMediaQuery]: {
        margin: "0 16px",
        width: 500,
        padding: 36,
      },
      [desktopMediaQuery]: {
        margin: "0 20px",
        width: 600,
      },
    },
  },
]);

export const iconCloseStyle = style({
  backgroundColor: colors.white,
  borderRadius: "50%",
  padding: 8,
  height: 40,
  width: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.1s",
  border: `1px solid ${colors.grey}`,

  ":hover": {
    backgroundColor: colors.greyExtraLight,
  },
});
