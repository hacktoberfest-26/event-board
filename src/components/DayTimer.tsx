import { humanDuration } from "../lib/time";
import type { Board, Formatters } from "../lib/types";

interface DayTimerProps {
  board: Board;
  fmt: Formatters;
}

export default function DayTimer({ board, fmt }: DayTimerProps) {
  const { dayElapsed, dayTotal, dayProgress, dayOver, dayStart, dayEnd } =
    board;
  const hours = Math.max(1, Math.round(dayTotal / 3_600_000));

  return (
    <section className="rounded-[0.9rem] border border-paper/15 bg-panel-soft px-9 py-7">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <span className="font-mono text-overline font-semibold uppercase tracking-[0.16em] text-paper/60">
          Day timer
        </span>
        <span className="font-mono text-lead font-bold tabular-nums tracking-tight">
          {humanDuration(dayElapsed)}{" "}
          <span className="font-medium text-paper/40">
            / {humanDuration(dayTotal)}
          </span>
        </span>
      </div>

      <div
        className="relative h-[1.4rem] overflow-hidden rounded-full bg-ink/35"
        role="progressbar"
        aria-label="Day progress"
        aria-valuenow={Math.round(dayProgress)}
      >
        {/* One tick per hour */}
        <div className="absolute inset-0 flex" aria-hidden="true">
          {Array.from({ length: hours }, (_, i) => (
            <i
              key={i}
              className="flex-1 border-r border-forest/55 last:border-r-0"
            />
          ))}
        </div>
        <div
          className="h-full rounded-full bg-linear-to-r from-sky via-ochre to-pink transition-[width] duration-700 ease-out"
          style={{ width: `${dayProgress.toFixed(2)}%` }}
        />
      </div>

      <div className="mt-3 flex justify-between font-mono text-overline font-medium tabular-nums tracking-[0.06em] text-paper/40">
        <span>{fmt.hhmm(dayStart)}</span>
        <span>
          {dayOver
            ? "event complete"
            : `${Math.round(dayProgress)}% / ${humanDuration(dayTotal - dayElapsed)} left`}
        </span>
        <span>{fmt.hhmm(dayEnd)}</span>
      </div>
    </section>
  );
}
