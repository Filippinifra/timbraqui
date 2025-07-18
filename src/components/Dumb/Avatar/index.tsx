import { colors, getRandomUserColor } from "@/utils/colors";
import { FC } from "react";
import { Typography } from "../Typography";
import { initialsWrapperClass } from "./style.css";

interface Props {
  onClick?: () => void;
  email: string;
}

export const Avatar: FC<Props> = ({ onClick, email }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "relative",
        cursor: "inherit",
      }}
    >
      <div
        onClick={onClick}
        style={{
          backgroundColor:
            email !== "" ? getRandomUserColor(email) : colors.greyLight,
        }}
        className={initialsWrapperClass({ onClick: Boolean(onClick) })}
      >
        <Typography variant="p-s-r">
          {email.substring(0, 2).toUpperCase()}
        </Typography>
      </div>
    </div>
  );
};
