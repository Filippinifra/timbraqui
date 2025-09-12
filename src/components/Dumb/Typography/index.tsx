import { FONT } from "@/utils/text";
import { CSSProperties, FC, JSX, ReactNode } from "react";
import { typographyClasses } from "./style.css";

export type variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p-l-r"
  | "p-m-r"
  | "p-m-sb"
  | "p-s-r"
  | "p-s-sb"
  | "p-xs-r"
  | "p-xs-sb";

interface Props {
  variant: variant;
  color?: string;
  children: string | ReactNode;
  style?: CSSProperties;
  component?: string;
  ellipsis?: true | 0 | 1 | 2;
  href?: string;
  target?: string;
}

export const Typography: FC<Props> = ({
  variant,
  color,
  children,
  component,
  style,
  ellipsis,
  href,
  target,
}) => {
  const Component =
    typeof children === "string"
      ? ((component ||
          componentVariant[variant]) as keyof JSX.IntrinsicElements)
      : "div";

  const getEllipsisLines = () => {
    if (ellipsis === true) {
      return 1;
    } else if (ellipsis !== undefined) {
      return ellipsis;
    } else {
      return 0;
    }
  };

  return (
    <Component
      href={href}
      target={target}
      className={typographyClasses({
        variant,
        ellipsisLines: getEllipsisLines(),
      })}
      style={{
        color,
        fontFamily: FONT.style.fontFamily,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

const componentVariant: { [id in variant]: string } = {
  h1: "h1",
  h2: "h1",
  h3: "h2",
  h4: "h3",
  "p-l-r": "p",
  "p-m-r": "p",
  "p-m-sb": "p",
  "p-s-r": "p",
  "p-s-sb": "p",
  "p-xs-r": "p",
  "p-xs-sb": "p",
};
