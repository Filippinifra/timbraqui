import React, { FC } from "react";
import { Typography } from "./Typography";

interface Props {
  headers: string[];
  values?: React.JSX.Element[][];
  padding?: string;
  maxWidth?: string;
}

export const Table: FC<Props> = ({
  headers,
  values,
  padding = "8px",
  maxWidth = "100%",
}) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          borderCollapse: "collapse",
          maxWidth,
          width: "100%",
        }}
      >
        <thead>
          <tr>
            {headers.map((e) => (
              <th style={{ textAlign: "left", padding }} key={`header-${e}`}>
                <Typography variant="p-s-r">{e}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values?.map((row, i) => {
            return (
              <tr
                key={`row-${i}`}
                style={{ borderTop: "1px solid rgb(242, 245, 248)" }}
              >
                {row.map((col, i) => (
                  <td key={`col-${i}`} style={{ padding }}>
                    {col}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
