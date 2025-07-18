import { colors } from "@/utils/colors";
import { FC } from "react";
import { Typography } from "../Typography";
import { dotClass, toggleWrapperClass } from "./style.css";

interface ToggleProps {
  active: boolean;
  onChange: (v: boolean) => void;
  title?: string;
  subTitle?: string;
}

export const Toggle: FC<ToggleProps> = ({
  active,
  onChange,
  subTitle,
  title,
}) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "36px auto", gap: 12 }}>
      <button onClick={() => onChange(!active)} className={toggleWrapperClass}>
        <span className={dotClass({ active })} />
      </button>
      {(title || subTitle) && (
        <div>
          {title && <Typography variant="p-xs-r">{title}</Typography>}
          {subTitle && (
            <Typography variant="p-xs-r" color={colors.grey}>
              {subTitle}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};
