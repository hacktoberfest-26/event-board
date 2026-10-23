import cn from "classnames";

import { countdownParts } from "../lib/time";
import type { Urgency } from "../lib/types";

interface CountdownProps {
  label: string | null;
  remaining: number;
  until: string | null;
  urgency: Urgency;
}

export default function Countdown({
  label,
  remaining,
  until,
  urgency,
}: CountdownProps) {
  const { text, unit } = countdownParts(remaining);

  return (
    <div className="mt-1">
      <div className="mb-1 font-mono text-overline font-medium uppercase tracking-[0.18em] text-paper/60">
        {label}
      </div>

      <div
        className={cn(
          "flex items-baseline gap-2 font-mono text-display font-bold tabular-nums tracking-[-0.045em]",
          {
            "text-paper": urgency === "calm",
            "text-ochre": urgency === "soon",
            "text-orange animate-breathe": urgency === "now",
          },
        )}
      >
        {text}
        {unit && (
          <small className="text-[0.26em] font-medium tracking-[0.04em] text-paper/60">
            {unit}
          </small>
        )}
      </div>

      {until && (
        <div className="mt-4 font-mono text-caption font-medium tracking-[0.08em] text-paper/60">
          {until}
        </div>
      )}
    </div>
  );
}
