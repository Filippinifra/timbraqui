import { CSSProperties, FC } from "react";
import { placeholderClass } from "./styles.css";

interface Props {
  height?: number | string;
  width?: number | string;
  style?: CSSProperties;
}

export const Placeholder: FC<Props> = ({ width, height, style }) => (
  <div className={placeholderClass} style={{ width, height, ...style }} />
);
