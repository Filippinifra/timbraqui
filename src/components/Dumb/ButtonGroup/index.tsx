import { colors } from "@/utils/colors";
import { FC } from "react";
import { Icon, Icons } from "../Icon";
import { Typography } from "../Typography";
import { buttonClasses, iconRounderWrapperClass } from "./style.css";

interface Props {
  items: {
    checked: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label?: string;
    icon?: Icons;
  }[];
}

export const ButtonGroup: FC<Props> = ({ items }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        backgroundColor: colors.primaryLight,
        borderRadius: 4,
        width: "fit-content",
      }}
    >
      {items.map(({ label, icon, onClick, checked }, i) => {
        const color = checked ? colors.primary : colors.primary;
        const iconNoChild = icon && !label;

        return (
          <button
            className={`${buttonClasses[checked ? "primary" : "secondary"]} ${
              iconNoChild ? iconRounderWrapperClass : ""
            }`}
            onClick={onClick}
            style={{
              ...(i === 0 && {
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }),
              ...(i === items.length - 1 && {
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
              }),
            }}
            key={`button-group-${label}-${i}`}
          >
            {icon && <Icon name={icon} color={color} />}
            {label && (
              <Typography variant="p-s-sb" color={color}>
                {label}
              </Typography>
            )}
          </button>
        );
      })}
    </div>
  );
};
