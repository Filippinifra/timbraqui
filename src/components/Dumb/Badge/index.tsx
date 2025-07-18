import { colors } from "@/utils/colors";
import { FC, ReactNode } from "react";
import { Icon, Icons } from "../Icon";
import { Typography } from "../Typography";
import { badgeClasses } from "./style.css";

type SpecialColors = "gray";

interface Props {
  color?: string | SpecialColors;
  children?: string | ReactNode;
  icon?: Icons;
}

const fromSpecialColorToColorObject: {
  [key in SpecialColors]: { color: string; backgroundColor: string };
} = {
  gray: { color: colors.darkerHue, backgroundColor: "#f0f0f0" },
};

export const Badge: FC<Props> = ({ color = "gray", children, icon }) => {
  const isSpecialColor = (color: string): color is SpecialColors =>
    Object.keys(fromSpecialColorToColorObject).includes(color);

  const colorObject = isSpecialColor(color)
    ? fromSpecialColorToColorObject[color]
    : { backgroundColor: color, color: colors.black };

  return (
    <div
      className={badgeClasses()}
      style={{ backgroundColor: colorObject.backgroundColor }}
    >
      {icon && <Icon color={colorObject.color} name={icon} />}
      {children && (
        <Typography variant="p-xs-r" color={colorObject.color} ellipsis>
          {children}
        </Typography>
      )}
    </div>
  );
};
