import type { Formatters } from "./types";

export function todayISO(): string {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

/** "HH:MM" on a given YYYY-MM-DD, in local time. */
export function atTime(dateISO: string, hhmm: string, dayOffset = 0): Date {
  const [h, m] = hhmm.split(":").map(Number);
  const [Y, M, D] = dateISO.split("-").map(Number);
  return new Date(Y, M - 1, D + dayOffset, h, m || 0, 0, 0);
}

const two = (n: number): string => String(n).padStart(2, "0");

export interface CountdownParts {
  text: string;
  unit: string;
}

export function countdownParts(ms: number): CountdownParts {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0
    ? { text: `${h}:${two(m)}:${two(s)}`, unit: "" }
    : { text: `${two(m)}:${two(s)}`, unit: "min" };
}

export function humanDuration(ms: number): string {
  const minutes = Math.max(0, Math.floor(ms / 60000));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${two(m)}m` : `${m}m`;
}

export function createFormatters(locale: string): Formatters {
  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const short = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return {
    clock: (d) => clock.format(d),
    hhmm: (d) => short.format(d),
    date: (d) => date.format(d),
  };
}
