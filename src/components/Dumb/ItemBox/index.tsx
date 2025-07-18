import { colors } from "@/utils/colors";
import { FC, MouseEvent } from "react";
import { Icon, Icons } from "../Icon";
import { Typography } from "../Typography";
import {
  checkedWrapperClass,
  disabledSelectedClass,
  disabledUnselectedClass,
  wrapperClass,
} from "./style.css";

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  checked: boolean;
  icon: Icons;
  title: string;
  disabled?: boolean;
  subTitle?: string;
}

const getIconColor = (disabled: boolean, checked: boolean) => {
  if (disabled && checked) {
    return colors.disabledDark;
  } else if (disabled) {
    return colors.disabledDark;
  } else if (checked) {
    return colors.primary;
  } else {
    return colors.primaryLight;
  }
};

export const ItemBox: FC<Props> = ({
  onClick,
  icon,
  title,
  subTitle,
  checked,
  disabled = false,
}) => {
  return (
    <button
      className={`${wrapperClass} ${checked ? checkedWrapperClass : ""} ${
        !disabled
          ? ""
          : checked
          ? disabledSelectedClass
          : disabledUnselectedClass
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name={icon} color={getIconColor(disabled, checked)} size="l" />
      <div>
        <Typography variant="p-m-sb" color={colors.black}>
          {title}
        </Typography>
        {subTitle && (
          <Typography variant="p-xs-r" color={colors.grey}>
            {subTitle}
          </Typography>
        )}
      </div>
    </button>
  );
};
