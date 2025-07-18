import { colors } from "@/utils/colors";
import { FC } from "react";

export const Divider: FC<{ color?: string }> = ({ color }) => (
  <hr style={{ borderTop: `1px solid ${color || colors.greyLight}` }} />
);
