import { FONT } from "@/utils/text";
import { it } from "date-fns/locale";
import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const days = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
const months = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

interface Props {
  value: DateRange | undefined;
  error?: boolean;
  onChange: (r: DateRange | undefined) => void;
  datesDisabled: (date: Date) => boolean;
}

export const DatePicker: FC<Props> = ({ value, onChange, datesDisabled }) => {
  useEffect(() => {
    if (
      value?.from &&
      value.to &&
      dayjs(value?.from).isAfter(dayjs(value?.to))
    ) {
      onChange({ from: value.to, to: value.from });
    }
  }, [value, onChange]);

  return (
    <div
      style={{
        borderRadius: 4,
        width: "fit-content",
        padding: 4,
        minHeight: 346,
      }}
    >
      <DayPicker
        mode="range"
        selected={value}
        onSelect={(dr) => {
          if (
            dr?.from &&
            value?.from &&
            dayjs(value.from).isAfter(dayjs(dr.from))
          ) {
            onChange({ from: dr.from, to: dr.from });
          } else {
            onChange(dr);
          }
        }}
        styles={{
          root: { fontFamily: FONT.style.fontFamily },
        }}
        disabled={datesDisabled}
        locale={{
          ...it,
          localize: {
            ...it.localize,
            day: (n: number) => days[n],
            month: (n: number) => months[n],
          },
        }}
      />
    </div>
  );
};
