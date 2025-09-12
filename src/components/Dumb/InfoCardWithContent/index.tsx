import { Typography } from "@/components/Dumb/Typography";
import { FC, ReactNode } from "react";
import { header, infoCardWithContentClasses } from "./style.css";

interface Props {
  icon: string;
  title: string;
  description: string;
  iconGradient?: string;
  children: ReactNode;
}

export const InfoCardWithContent: FC<Props> = ({
  icon,
  title,
  description,
  iconGradient = "linear-gradient(45deg, #3b82f6, #1d4ed8)",
  children,
}) => {
  return (
    <div className={infoCardWithContentClasses}>
      <div className={header}>
        <div
          style={{
            background: iconGradient,
            borderRadius: "12px",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>{icon}</span>
        </div>
        <div>
          <Typography variant="h4" style={{ color: "#1e293b", margin: 0 }}>
            {title}
          </Typography>
          <Typography variant="p-s-r" color="#64748b" style={{ margin: 0 }}>
            {description}
          </Typography>
        </div>
      </div>
      {children}
    </div>
  );
};
