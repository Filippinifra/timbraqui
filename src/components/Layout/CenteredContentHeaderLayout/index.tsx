import { FC, ReactNode } from "react";
import { centralWrapperClass } from "./style.css";

export const CenteredContentHeaderLayout: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "auto",
          }}
        ></div>
      </div>
      <div className={centralWrapperClass}>{children}</div>
    </>
  );
};
