import { colors } from "@/utils/colors";
import { FC } from "react";
import { Spacer } from "../Spacer";
import { Typography } from "../Typography";
import { wrapperClass } from "./style.css";

interface Props {
  steps: string[];
  current: number;
}

type status = "current" | "previous" | "next";

const statusToColor: { [key in status]: string } = {
  current: colors.primary,
  previous: colors.grey,
  next: colors.grey,
};

export const Stepper: FC<Props> = ({ current, steps }) => {
  return (
    <div
      className={wrapperClass}
      style={{
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: 8,
        alignItems: "flex-end",
      }}
    >
      {steps.map((e, i) => {
        const status: status =
          i > current ? "next" : current === i ? "current" : "previous";
        const color = statusToColor[status];

        return (
          <div key={i} style={{ textAlign: "center" }}>
            <Typography variant="p-xs-sb" color={color}>
              Step {i + 1}
            </Typography>
            <Typography variant="p-xs-r" color={color}>
              {e}
            </Typography>
            <Spacer size={8} />
            <div
              style={{
                height: 8,
                backgroundColor: color,
                borderRadius: 16,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
