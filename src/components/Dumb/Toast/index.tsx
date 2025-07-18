import { ToastVariant } from "@/context/ToastContext";
import { colors } from "@/utils/colors";
import { FC, ReactNode } from "react";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { wrapperClass } from "./style.css";

interface Props {
  children: string | ReactNode;
  variant: ToastVariant;
  fullScreen?: boolean;
}

export const Toast: FC<Props> = ({ children, variant, fullScreen }) => {
  const IconResult = () => (
    <Icon
      name={variant === "success" ? "Check" : "FileWarning"}
      color={variant === "success" ? colors.success : colors.error}
      size={fullScreen ? "xl" : undefined}
    />
  );

  return (
    <div className={wrapperClass({ variant, fullScreen })}>
      {fullScreen ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <IconResult />
          {children}
        </div>
      ) : (
        <>
          <IconResult />
          <Typography
            variant="p-xs-r"
            color={variant === "success" ? colors.success : colors.error}
          >
            {children}
          </Typography>
        </>
      )}
    </div>
  );
};
