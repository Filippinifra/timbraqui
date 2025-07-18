import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";
import { placeholderClass } from "./Placeholder/styles.css";

export const ImageWithLoader: FC<ImageProps & { autoDimensions?: boolean }> = (
  props
) => {
  const [loaded, setLoaded] = useState(props.priority || false);
  const [paddingTop, setPaddingTop] = useState("0");

  const { autoDimensions } = props;

  return (
    <div
      style={{
        position: "relative",
        ...(autoDimensions && { paddingTop: paddingTop }),
        zIndex: 0,
      }}
    >
      <Image
        {...props}
        alt={props.alt || ""}
        className={[
          loaded ? undefined : placeholderClass,
          props.className ? props.className : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
        onLoad={({ target }) => {
          const { naturalWidth, naturalHeight } = target as HTMLImageElement;
          setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight})`);
          setLoaded(true);
        }}
        fill={autoDimensions}
      />
    </div>
  );
};
