import { Typography } from "@/components/Dumb/Typography";
import { FC, ReactNode } from "react";
import { infoCardClasses } from "./style.css";

type variant = "default" | "centered" | "withContent";
type iconSize = "small" | "medium" | "large";

interface Props {
  icon: string;
  title: string;
  description: string;
  value?: string | number;
  variant?: variant;
  iconSize?: iconSize;
  children?: ReactNode;
  iconGradient?: string;
}

export const InfoCard: FC<Props> = ({
  icon,
  title,
  description,
  value,
  variant = "default",
  iconSize = "medium",
  children,
  iconGradient = "linear-gradient(45deg, #3b82f6, #1d4ed8)",
}) => {
  return (
    <div className={infoCardClasses({ variant })}>
      <div>
        <div
          style={{
            background: iconGradient,
            borderRadius: iconSize === "small" ? "50%" : "12px",
            width:
              iconSize === "small"
                ? "40px"
                : iconSize === "medium"
                ? "48px"
                : "56px",
            height:
              iconSize === "small"
                ? "40px"
                : iconSize === "medium"
                ? "48px"
                : "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: variant === "centered" ? "0 auto 1rem auto" : "0",
          }}
        >
          <span
            style={{
              fontSize:
                iconSize === "small"
                  ? "1.2rem"
                  : iconSize === "medium"
                  ? "1.5rem"
                  : "1.8rem",
            }}
          >
            {icon}
          </span>
        </div>
        {variant !== "centered" && (
          <div>
            <Typography variant="h4" style={{ color: "#1e293b", margin: 0 }}>
              {title}
            </Typography>
            <Typography variant="p-s-r" color="#64748b" style={{ margin: 0 }}>
              {description}
            </Typography>
          </div>
        )}
      </div>

      {variant === "centered" && (
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ color: "#1e293b", margin: "0 0 0.25rem 0" }}
          >
            {value || title}
          </Typography>
          <Typography variant="p-s-r" color="#64748b" style={{ margin: 0 }}>
            {description}
          </Typography>
        </div>
      )}

      {children}
    </div>
  );
};
