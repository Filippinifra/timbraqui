import { colors } from "@/utils/colors";
import { FC, useState } from "react";
import { ColorDot } from "../ColorDot";
import { IconButton } from "../IconButton";

export const dotColors = [
  "#e99c9d",
  "#ebc5c5",
  "#ebe2c5",
  "#f5f6aa",
  "#d8ebc5",
  "#c5ebeb",
  "#cac5eb",
  "#d8c5eb",
  "#c5ebcf",
  "#d8b6b0",
  "#ececec",
  "#f6e8d5",
  "#faf9f8",
  "#d4f1d5",
  "#f6faf6",
  "#ebd3c5",
  "#e7ebc5",
  "#caebc5",
  "#c5ebdd",
  "#c5ddeb",
  "#c5cfeb",
  "#e7c5eb",
  "#ebc5e2",
  "#ebc5d3",
];

export const ColorsPicker: FC<{
  color: string;
  onSetColor: (v: string) => void;
  mini?: boolean;
}> = ({ color, onSetColor, mini }) => {
  const [page, setPage] = useState(0);
  const onChangePage = (next: boolean) => {
    if (page === 2 && next) {
      setPage(0);
    } else if (page === 0 && !next) {
      setPage(2);
    } else if (next) {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };

  const PrevButton = () => (
    <IconButton
      icon="ChevronLeft"
      variant="tertiary"
      size={mini ? "m" : "m"}
      onClick={() => onChangePage(true)}
    />
  );

  const NextButton = () => (
    <IconButton
      icon="ChevronRight"
      variant="tertiary"
      size={mini ? "m" : "m"}
      onClick={() => onChangePage(false)}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: mini ? "column" : "row",
      }}
    >
      {!mini && <PrevButton />}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          padding: 8,
          maxWidth: 360,
          ...(mini && {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 16,
          }),
        }}
      >
        {dotColors.slice(0 + 8 * page, 0 + 8 * page + 8).map((dotColor) => {
          const isSameColor = color === dotColor;

          return (
            <button
              style={{
                outline: isSameColor
                  ? `2px solid ${colors.black}`
                  : `2px solid ${colors.graySemiLight}`,
                padding: isSameColor ? 4 : 0,
                borderRadius: "50%",
              }}
              onClick={() => onSetColor(dotColor)}
              type="button"
              key={`color-${dotColor}`}
            >
              <ColorDot color={dotColor} small={isSameColor} />
            </button>
          );
        })}
      </div>
      {!mini && <NextButton />}
      {mini && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 16,
          }}
        >
          <PrevButton />
          <NextButton />
        </div>
      )}
    </div>
  );
};
