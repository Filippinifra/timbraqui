import { useEffect, useState } from "react";

export const useWindowSize = (
  onResize?: ({ width, height }: { width: number; height: number }) => void
) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({
        width,
        height,
      });

      onResize?.({ width, height });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [onResize]);

  return windowSize;
};
