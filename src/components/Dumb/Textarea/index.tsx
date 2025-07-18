import { FONT } from "@/utils/text";
import { FC, FormEvent, KeyboardEvent } from "react";
import { textareaClass } from "./style.css";

interface Props {
  placeholder?: string;
  name?: string;
  value: string | number;
  autocomplete?: string;
  disabled?: boolean;
  onChange: (e: FormEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: FC<Props> = ({
  placeholder,
  name,
  value,
  autocomplete,
  onChange,
  onKeyDown,
  disabled,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={(e) => onChange(e)}
      onKeyDown={(e) => {
        if (onKeyDown) {
          onKeyDown(e);
        }
      }}
      style={{ fontFamily: FONT.style.fontFamily }}
      autoComplete={autocomplete}
      disabled={disabled}
      className={textareaClass({ disabled })}
    />
  );
};
