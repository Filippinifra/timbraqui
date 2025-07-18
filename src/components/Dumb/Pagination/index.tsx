import { colors } from "@/utils/colors";
import { FC } from "react";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { pageButtonClass, wrapperClass } from "./style.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
}

function getPages(
  currentPage: number,
  totalPages: number,
  maxPagesToShow: number
): (number | string)[] {
  if (totalPages <= maxPagesToShow + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= maxPagesToShow - 2) {
    return [
      ...Array.from({ length: maxPagesToShow }, (_, i) => i + 1),
      "...",
      totalPages,
    ];
  }
  if (currentPage >= totalPages - (maxPagesToShow - 3)) {
    return [
      1,
      "...",
      ...Array.from(
        { length: maxPagesToShow },
        (_, i) => totalPages - maxPagesToShow + 1 + i
      ),
    ];
  }
  return [
    1,
    "...",
    ...Array.from(
      { length: maxPagesToShow - 2 },
      (_, i) => currentPage - 1 + i
    ),
    "...",
    totalPages,
  ];
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPagesToShow = 5,
}) => {
  const pages = getPages(currentPage, totalPages, maxPagesToShow);

  return (
    <div className={wrapperClass}>
      <Button
        variant="tertiary"
        icon="ChevronLeft"
        size="s"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {pages.map((p, i) => {
          const isCurrentPage = p === currentPage + 1;

          return typeof p === "number" ? (
            <button
              onClick={() => onPageChange(p - 1)}
              style={{
                backgroundColor: isCurrentPage ? colors.primary : colors.white,
              }}
              className={pageButtonClass}
            >
              <Typography
                variant="p-s-r"
                color={isCurrentPage ? colors.white : colors.black}
              >
                {String(p)}
              </Typography>
            </button>
          ) : (
            <span key={`ellipsis-${i}`} style={{ margin: "0 8px" }}>
              ...
            </span>
          );
        })}
      </div>
      <Button
        variant="tertiary"
        icon="ChevronRight"
        size="s"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
