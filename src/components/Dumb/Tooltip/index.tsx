import React, { ReactNode, useEffect, useRef, useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css"; // o i tuoi stili
import { tooltipWrapperClass } from "./style.css";

interface Props {
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  content: ReactNode;
  children: ReactNode;
  offset?: [number, number];
}

export const Tooltip: React.FC<Props> = ({
  children,
  content,
  placement = "top",
  offset = [0, 8],
}) => {
  const [isLockedVisible, setIsLockedVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible: isHoverVisible,
  } = usePopperTooltip({
    placement,
    offset,
    trigger: "hover",
    closeOnOutsideClick: false,
    interactive: true,
  });

  const isVisible = isLockedVisible || isHoverVisible;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsLockedVisible(false);
      }
    };

    if (isLockedVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLockedVisible]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLockedVisible((prev) => !prev);
  };

  return (
    <div
      ref={wrapperRef}
      style={{ display: "inline-flex" }}
      onClick={handleClick}
    >
      <div
        ref={setTriggerRef}
        style={{ display: "inline-flex", cursor: "pointer" }}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps()}
          className={tooltipWrapperClass}
        >
          {content}
        </div>
      )}
    </div>
  );
};
