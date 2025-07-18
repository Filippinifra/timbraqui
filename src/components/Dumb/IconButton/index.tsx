import { colors } from "@/utils/colors";
import { FC } from "react";
import { Icon, Icons } from "../Icon";
import { dotWarningClass, wrapperIconStyle } from "./style.css";

type IconVariant = "primary" | "secondary" | "tertiary";

interface Props {
  icon: Icons;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: IconVariant;
  warning?: boolean;
  size?: "m" | "l" | "xl";
}

const fromVariantToIconColor: { [key in IconVariant]: string } = {
  primary: colors.white,
  secondary: colors.white,
  tertiary: colors.darkerHue,
};

export const IconButton: FC<Props> = ({
  icon,
  onClick,
  variant = "primary",
  warning,
  size = "m",
}) => {
  return (
    <div className={wrapperIconStyle({ variant, size })} onClick={onClick}>
      <Icon name={icon} color={fromVariantToIconColor[variant]} size={size} />
      {warning && <div className={dotWarningClass} />}
    </div>
  );
};
