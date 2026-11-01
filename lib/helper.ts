// app/lib/booking.ts

export type MeetingFormat = "virtual" | "in-person";

export type ConfirmedQuery = {
  id?: string;
  consultant?: string;
  day?: string;
  time?: string;
  format?: MeetingFormat;
};

export const TIMES = [
  "09:00 AM",
  "10:30 AM",
  "11:00 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
];

export function parseConfirmedQuery(search: string): Partial<ConfirmedQuery> {
  const sp = new URLSearchParams(search);
  const formatParam = sp.get("format") ?? undefined;
  const format: MeetingFormat | undefined =
    formatParam === "virtual" || formatParam === "in-person"
      ? formatParam
      : undefined;

  return {
    id: sp.get("id") ?? undefined,
    consultant: sp.get("consultant") ?? undefined,
    day: sp.get("day") ?? undefined,
    time: sp.get("time") ?? undefined,
    format,
  };
}

export function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function addOneHourRange(timeLabel: string) {
  // Expects like "10:30 AM"
  const m = timeLabel.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return { start: timeLabel, end: "" };

  const hh = Number(m[1]);
  const mm = Number(m[2]);
  const mer = m[3].toUpperCase() as "AM" | "PM";

  const base = new Date(
    2026,
    6,
    1,
    mer === "PM" ? (hh % 12) + 12 : hh % 12,
    mm,
  );
  const end = new Date(base.getTime() + 60 * 60 * 1000);

  const fmt = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return { start: fmt.format(base), end: fmt.format(end) };
}