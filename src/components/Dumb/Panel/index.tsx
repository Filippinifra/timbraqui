import { colors } from "@/utils/colors";
import { FC, ReactNode } from "react";

export const Panel: FC<{ children: ReactNode; contentCentered?: boolean }> = ({
  children,
  contentCentered,
}) => {
  return (
    <div
      style={{
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
        ...(contentCentered && {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }),
        border: `1px solid ${colors.greyLight}`,
      }}
    >
      {children}
    </div>
  );
};
