import { colors } from "@/utils/colors";
import { FC } from "react";
import { Spacer } from "../Spacer";
import { Typography } from "../Typography";

export const FormError: FC<{ meta: { error?: string; touched?: boolean } }> = ({
  meta,
}) => {
  const metaError = meta.error;

  return metaError && meta.touched ? (
    <>
      <Spacer size={8} />
      <Typography variant="p-xs-r" color={colors.error}>
        {metaError}
      </Typography>
    </>
  ) : (
    <div style={{ height: 20 }} />
  );
};
