import { Registration } from "@/types/Registration";

const toLocalDay = (iso: string, timeZone: string): string => {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  }).formatToParts(d);

  const y = parts.find((p) => p.type === "year")?.value ?? "0000";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const day = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${day}`;
};

const toLocalHM = (iso: string, timeZone: string): string => {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).formatToParts(d);

  const hh = parts.find((p) => p.type === "hour")?.value ?? "00";
  const mm = parts.find((p) => p.type === "minute")?.value ?? "00";
  return `${hh}:${mm}`;
};

export function groupRegistrationsByDay(
  regs: ReadonlyArray<Registration>,
  options?: { timeZone?: string } // es. { timeZone: "Europe/Rome" }
) {
  const timeZone = options?.timeZone ?? "Europe/Rome";

  // day -> userId -> array di timestamp ISO
  const buckets: Record<string, Record<string, string[]>> = {};

  for (const r of regs) {
    const day = toLocalDay(r.date, timeZone);
    if (!buckets[day]) buckets[day] = {};
    if (!buckets[day][r.userId]) buckets[day][r.userId] = [];
    buckets[day][r.userId].push(r.date);
  }

  // giorni in ordine decrescente
  const daysDesc = Object.keys(buckets).sort((a, b) => b.localeCompare(a));

  // costruzione risultato
  const result = [];

  for (const day of daysDesc) {
    const perUser = buckets[day];
    const items = [];

    for (const [userId, times] of Object.entries(perUser)) {
      // ordino i timbri cronologicamente
      times.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

      // accoppio a coppie (in, out)
      for (let i = 0; i < times.length; i += 2) {
        const inTime = times[i];
        const outTime = times[i + 1];

        items.push({
          userId,
          in: toLocalHM(inTime, timeZone),
          out: outTime ? toLocalHM(outTime, timeZone) : null,
        });
      }
    }

    // opzionale: ordino le coppie per ora di entrata
    items.sort((a, b) => a.in.localeCompare(b.in));

    result.push({ day, items });
  }

  return result;
}
