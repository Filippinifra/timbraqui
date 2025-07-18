import { colors } from "@/utils/colors";
import { FC } from "react";
import { Icon } from "../Icon";
import { Spacer } from "../Spacer";
import { Tooltip } from "../Tooltip";
import { Typography } from "../Typography";

export const FieldTitle: FC<{
  title?: string;
  error?: string;
  isRequired?: boolean;
}> = ({ title, error, isRequired }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          height: 16,
        }}
      >
        {title ? (
          <Typography variant="p-xs-sb" ellipsis>
            {title}
            {isRequired ? "*" : ""}
          </Typography>
        ) : (
          <div />
        )}
        {error && (
          <Tooltip
            content={
              <Typography variant="p-xs-r" color={colors.error}>
                {error}
              </Typography>
            }
          >
            <Icon name="FileWarning" color={colors.error} />
          </Tooltip>
        )}
      </div>
      <Spacer size={4} />
    </>
  );
};
