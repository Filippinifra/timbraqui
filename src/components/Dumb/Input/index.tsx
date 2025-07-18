import { colors } from "@/utils/colors";
import { FONT } from "@/utils/text";
import { FC, FormEvent, KeyboardEvent, RefObject } from "react";
import { Icon, Icons } from "../Icon";
import { inputClass } from "./style.css";

interface Props {
  type?: string;
  placeholder?: string;
  name?: string;
  value: string | number;
  autocomplete?: string;
  step?: number;
  disabled?: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  size?: "m" | "s";
  iconRight?: Icons;
  iconLeft?: Icons;
  onClickLeftIcon?: () => void;
  onClickRightIcon?: () => void;
  ref?: RefObject<HTMLInputElement | null> | null;
}

export const Input: FC<Props> = ({
  type,
  placeholder,
  name,
  value,
  autocomplete,
  step,
  onChange,
  onKeyDown,
  disabled = false,
  error,
  size = "m",
  iconRight,
  iconLeft,
  onClickLeftIcon,
  onClickRightIcon,
  ref,
}) => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{
          fontFamily: FONT.style.fontFamily,
          paddingLeft: iconLeft ? 32 : undefined,
          paddingRight: iconRight ? 32 : undefined,
        }}
        autoComplete={autocomplete}
        step={step}
        disabled={disabled}
        className={inputClass({ disabled, error, size })}
        ref={ref}
      />
      {iconLeft && (
        <button
          style={{ position: "absolute", left: 8, top: 8 }}
          onClick={onClickLeftIcon}
        >
          <Icon name={iconLeft} size="l" color={colors.darkerHue} />
        </button>
      )}
      {iconRight && (
        <button
          style={{ position: "absolute", right: 8, top: 8 }}
          onClick={onClickRightIcon}
        >
          <Icon name={iconRight} size="l" color={colors.darkerHue} />
        </button>
      )}
    </div>
  );
};
