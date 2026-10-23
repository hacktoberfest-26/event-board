import type { Formatters, ResolvedPhase } from "../lib/types";

interface UpNextProps {
  phase: ResolvedPhase | null;
  fmt: Formatters;
}

export default function UpNext({ phase, fmt }: UpNextProps) {
  if (!phase) return null;

  return (
    <div className="flex items-center gap-6 border-t border-paper/15 pt-6 text-lead text-paper/60">
      <span className="font-mono text-overline font-semibold uppercase tracking-[0.16em] text-paper/40">
        Up next
      </span>
      <span className="font-mono font-semibold tabular-nums text-paper">
        {fmt.hhmm(phase.start)}
      </span>
      <span className="font-semibold text-paper">{phase.title}</span>
    </div>
  );
}
