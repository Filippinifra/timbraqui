import { colors } from "@/utils/colors";
import { FC } from "react";
import { Icon, Icons } from "../Icon";
import { Typography, variant as TypographyVariants } from "../Typography";
import { buttonClasses, iconRounderWrapperClass } from "./style.css";

type variant = "primary" | "secondary" | "distructive" | "tertiary";
type size = "m" | "s" | "l";

interface Props {
  variant?: variant;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button";
  children?: string;
  icon?: Icons;
  fullWidth?: boolean;
  size?: size;
}

const fromSizeToTypographyVariant: { [key in size]: TypographyVariants } = {
  l: "h3",
  m: "p-m-r",
  s: "p-s-r",
};

export const Button: FC<Props> = ({
  variant = "primary",
  onClick,
  icon,
  children,
  disabled = false,
  type,
  fullWidth,
  size = "m",
}) => {
  const getColor = () => {
    if (disabled) {
      return colors.disabledDark;
    }
    if (variant === "primary") {
      return colors.white;
    }
    if (variant === "distructive") {
      return colors.white;
    }
    if (variant === "tertiary") {
      return colors.black;
    }
    return colors.grey;
  };

  const iconNoChild = icon && !children;

  return (
    <button
      className={`${buttonClasses({ variant, disabled, size })} ${
        iconNoChild ? iconRounderWrapperClass : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{ width: fullWidth ? "-webkit-fill-available" : "auto" }}
    >
      {icon && (
        <Icon name={icon} size={size === "m" ? "xl" : "l"} color={getColor()} />
      )}
      {children && (
        <Typography
          variant={fromSizeToTypographyVariant[size]}
          color={getColor()}
        >
          {children}
        </Typography>
      )}
    </button>
  );
};
