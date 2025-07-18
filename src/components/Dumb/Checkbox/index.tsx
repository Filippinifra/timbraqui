import { colors } from "@/utils/colors";
import { FC, ReactNode } from "react";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { checkboxClass } from "./style.css";

interface Props {
  checked: boolean;
  onChange: (newValue: boolean) => void;
  disabled?: boolean;
  children: string | ReactNode;
}

export const Checkbox: FC<Props> = ({
  checked,
  children,
  disabled,
  onChange,
}) => {
  const onChangeHandler = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      onClick={onChangeHandler}
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <div style={{ position: "relative", height: 20 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChangeHandler}
          disabled={disabled}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          className={checkboxClass}
        />
        {checked && (
          <div style={{ position: "absolute", top: 1, left: 3, height: 16 }}>
            <Icon name="Check" color={colors.primary} />
          </div>
        )}
      </div>
      {typeof children === "string" ? (
        <Typography variant="p-xs-r">{children}</Typography>
      ) : (
        children
      )}
    </div>
  );
};
