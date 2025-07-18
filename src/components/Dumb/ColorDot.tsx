import { FC } from "react";

export const ColorDot: FC<{
  color: string;
  small?: boolean;
}> = ({ color, small }) => {
  return (
    <div
      style={{
        height: small ? 16 : 24,
        width: small ? 16 : 24,
        backgroundColor: color,
        borderRadius: "50%",
      }}
    />
  );
};
