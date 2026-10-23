import cn from "classnames";

import { useRotation } from "../hooks/useRotation";
import type { InfoItem } from "../lib/types";
import Icon from "./Icon";

interface InfoCardProps {
  items: InfoItem[];
  seconds: number;
}

export default function InfoCard({ items, seconds }: InfoCardProps) {
  const index = useRotation(items.length, seconds);
  if (!items.length) return null;

  return (
    <section className="flex items-center gap-7 overflow-hidden rounded-[0.9rem] border border-paper/15 bg-panel-soft px-9 py-7">
      {/* Keyed on the index so React remounts it and the fade replays */}
      <div
        key={index}
        className="flex min-w-0 flex-1 items-center gap-7 animate-fade-swap"
      >
        <div
          className="grid h-[5.4rem] w-[5.4rem] shrink-0 place-items-center rounded-[0.8rem] bg-sky/20 text-subtitle text-sky"
          aria-hidden="true"
        >
          <Icon name={items[index].icon} />
        </div>

        <div className="min-w-0">
          <div className="font-mono text-overline font-semibold uppercase tracking-[0.16em] text-paper/40">
            {items[index].label}
          </div>
          <div className="truncate text-lead font-bold leading-tight text-paper">
            {items[index].value}
          </div>
          {items[index].hint && (
            <div className="truncate text-caption text-paper/60">
              {items[index].hint}
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 gap-2" aria-hidden="true">
        {items.map((_, i) => (
          <i
            key={i}
            className={cn(
              "h-[0.65rem] w-[0.65rem] rounded-full transition-colors duration-300",
              {
                "bg-sky": i === index,
                "bg-paper/20": i !== index,
              },
            )}
          />
        ))}
      </div>
    </section>
  );
}
