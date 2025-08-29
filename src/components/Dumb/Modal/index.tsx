import { isBrowser } from "@/utils/browser";
import { colors } from "@/utils/colors";
import { zIndexValues } from "@/utils/zIndex";
import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../IconButton";
import { Spacer } from "../Spacer";
import { Typography } from "../Typography";
import { externalWrapperClass, internalWrapperClass } from "./style.css";

interface Props {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export const Modal: FC<Props> = ({
  children,
  visible,
  onClose,
  subtitle,
  title,
}) => {
  const portalEl = isBrowser ? document.getElementById("portal") : null;

  useEffect(() => {
    if (isBrowser) {
      if (visible) {
        // when modal substitute another modal without timout useEffect of first
        // modal run after second one and cause overlow auto event if second modal is opened
        setTimeout(() => {
          document.body.style.overflow = "hidden";
        }, 50);
      } else {
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  useEffect(() => {
    const close = (e: globalThis.KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return visible && portalEl
    ? createPortal(
        <div className={externalWrapperClass} onClick={onClose}>
          <div
            className={internalWrapperClass}
            id="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div
                onClick={onClose}
                style={{
                  cursor: "pointer",
                  position: "fixed",
                  zIndex: zIndexValues.modal,
                }}
              >
                <IconButton
                  icon="X"
                  size="xl"
                  variant="tertiary"
                  onClick={onClose}
                />
              </div>
            </div>
            {(title || subtitle) && (
              <>
                <Spacer size={8} />
                <div style={{ maxWidth: "calc(100% - 48px)" }}>
                  {title && (
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <Typography variant="h2">{title}</Typography>
                    </div>
                  )}
                  {subtitle && (
                    <Typography variant="p-xs-r" color={colors.grey}>
                      {subtitle}
                    </Typography>
                  )}
                </div>
                <Spacer size={16} />
              </>
            )}
            {children}
          </div>
        </div>,
        portalEl
      )
    : null;
};
