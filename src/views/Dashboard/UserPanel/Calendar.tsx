import { IconButton } from "@/components/Dumb/IconButton";
import { Spacer } from "@/components/Dumb/Spacer";
import { Tooltip } from "@/components/Dumb/Tooltip";
import { Typography } from "@/components/Dumb/Typography";
import { colors } from "@/utils/colors";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { FC, useMemo, useState } from "react";

dayjs.locale("it");

type CalendarProps = {
  registrations: Array<{ id: string; date: string }> | undefined;
};

export const Calendar: FC<CalendarProps> = ({ registrations }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const { cells, weekdayHeaders, registrationsByDay } = useMemo(() => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startWeekdaySundayBased = startOfMonth.day();
    const startWeekdayMondayBased = (startWeekdaySundayBased + 6) % 7; // 0 Mon ... 6 Sun
    const daysInMonth = endOfMonth.date();

    const byDay = new Map<string, string[]>();
    (registrations || []).forEach((r) => {
      const d = dayjs(r.date);
      if (
        d.month() === currentMonth.month() &&
        d.year() === currentMonth.year()
      ) {
        const key = d.format("YYYY-MM-DD");
        const times = byDay.get(key) || [];
        times.push(d.format("HH:mm"));
        byDay.set(key, times);
      }
    });

    const c: Array<{ label: string; dateKey?: string }> = [];
    for (let i = 0; i < startWeekdayMondayBased; i++) c.push({ label: "" });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = startOfMonth.date(d);
      const dateKey = date.format("YYYY-MM-DD");
      c.push({ label: String(d), dateKey });
    }
    while (c.length % 7 !== 0) c.push({ label: "" });

    return {
      cells: c,
      weekdayHeaders: ["L", "M", "M", "G", "V", "S", "D"],
      registrationsByDay: byDay,
    };
  }, [currentMonth, registrations]);

  const hasAnyThisMonth = (registrations || []).some((r) => {
    const d = dayjs(r.date);
    return (
      d.month() === currentMonth.month() && d.year() === currentMonth.year()
    );
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            icon="ChevronLeft"
            onClick={() => setCurrentMonth((m) => m.subtract(1, "month"))}
          />
          <IconButton
            icon="ChevronRight"
            onClick={() => setCurrentMonth((m) => m.add(1, "month"))}
          />
          <Typography variant="p-m-sb">
            {currentMonth.format("MMMM YYYY")}
          </Typography>
        </div>
      </div>
      <Spacer size={8} />

      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 6,
            maxWidth: 680,
          }}
        >
          {weekdayHeaders.map((wd, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <Typography variant="p-s-r" color="#64748b">
                {wd}
              </Typography>
            </div>
          ))}
          {cells.map((c, idx) => {
            const times = c.dateKey
              ? registrationsByDay.get(c.dateKey) || []
              : [];

            const timesInOut = times.reduce((acc, _, i) => {
              if (i % 2 === 0)
                acc.push(times.slice(i, i + 2) as [string, string]);
              return acc;
            }, [] as [string, string][]);

            const isHit = Boolean(times.length);

            const timesOdd = times.length % 2 !== 0;

            return (
              <div
                key={idx}
                style={{
                  minHeight: 90,
                  borderRadius: 8,
                  background: timesOdd
                    ? colors.warningLight
                    : isHit
                    ? "#eff6ff"
                    : "#f8fafc",
                  border: timesOdd
                    ? `1px solid ${colors.warning}`
                    : isHit
                    ? "1px solid #93c5fd"
                    : "1px solid #e2e8f0",
                  padding: 6,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="p-s-sb"
                    color={isHit ? "#2563eb" : "#64748b"}
                  >
                    {c.label}
                  </Typography>
                </div>
                {!!timesInOut.length && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                      marginTop: 4,
                    }}
                  >
                    {timesInOut.slice(0, 3).map((t, i) => (
                      <Typography
                        key={i}
                        variant="p-xs-r"
                        color={!t[1] ? colors.error : "#2563eb"}
                      >
                        {`${t[0]} → ${t[1] || ""}`}
                      </Typography>
                    ))}
                    <Tooltip
                      content={
                        <div>
                          {timesInOut.slice(3).map((t, i) => (
                            <Typography
                              key={i}
                              variant="p-xs-r"
                              color={!t[1] ? colors.error : "#2563eb"}
                            >
                              {`${t[0]} → ${t[1] || ""}`}
                            </Typography>
                          ))}
                        </div>
                      }
                    >
                      {timesInOut.length > 3 && (
                        <Typography variant="p-xs-r" color="#64748b">
                          +{timesInOut.length - 3}
                        </Typography>
                      )}
                    </Tooltip>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ height: 18 }}>
          {!hasAnyThisMonth ? (
            <>
              <Spacer size={8} />
              <Typography variant="p-s-r" color="lightgray">
                Nessuna timbratura questo mese
              </Typography>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
