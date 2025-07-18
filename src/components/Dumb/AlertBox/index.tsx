import { colors } from "@/utils/colors";
import { FC, ReactNode } from "react";
import { Icon, Icons } from "../Icon";
import { Typography } from "../Typography";
import { wrapperClass } from "./style.css";

type Variant = "info" | "warning";

const fromVariantToObject: {
  [key in Variant]: { icon: Icons; color: string };
} = {
  info: {
    color: colors.info,
    icon: "Info",
  },
  warning: { color: colors.warning, icon: "FileWarning" },
};

export const AlertBox: FC<{ children: ReactNode; variant?: Variant }> = ({
  children,
  variant = "info",
}) => {
  return (
    <div className={wrapperClass({ variant })}>
      <Icon
        name={fromVariantToObject[variant].icon}
        color={fromVariantToObject[variant].color}
      />
      <Typography variant="p-xs-r">{children}</Typography>
    </div>
  );
};
