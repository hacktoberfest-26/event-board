import cn from "classnames";
import { useEffect, useRef } from "react";

import type { Board, Formatters, ResolvedPhase } from "../lib/types";

type SlotStatus = "past" | "current" | "next" | "future";

function statusOf(phase: ResolvedPhase, board: Board, now: number): SlotStatus {
  if (board.current?.index === phase.index) return "current";
  if (board.next?.index === phase.index) return "next";
  return phase.endMs <= now ? "past" : "future";
}

interface AgendaProps {
  board: Board;
  now: number;
  fmt: Formatters;
}

export default function Agenda({ board, now, fmt }: AgendaProps) {
  const scroller = useRef<HTMLOListElement>(null);
  const settled = useRef(false);
  const focused = board.current?.index ?? board.next?.index ?? 0;

  // Keep the live row in the middle of the panel as the day moves on
  useEffect(() => {
    const box = scroller.current;
    const row = box?.querySelector<HTMLLIElement>(`[data-index="${focused}"]`);
    if (!box || !row) return;

    box.scrollTo({
      top: Math.max(
        0,
        row.offsetTop - box.clientHeight / 2 + row.offsetHeight / 2,
      ),
      behavior: settled.current ? "smooth" : "auto",
    });
    settled.current = true;
  }, [focused]);

  return (
    <aside className="row-span-2 flex min-h-0 flex-col rounded-[0.9rem] border border-paper/15 bg-panel-soft pb-5 pt-9">
      <div className="flex items-baseline justify-between gap-4 border-b border-paper/15 px-9 pb-6">
        <h2 className="m-0 font-display text-subtitle font-extrabold uppercase leading-none tracking-tight">
          Agenda
        </h2>
        <span className="font-mono text-overline font-medium tabular-nums tracking-widest text-paper/40">
          {board.phaseCount} phases / {fmt.hhmm(board.dayStart)}-
          {fmt.hhmm(board.dayEnd)}
        </span>
      </div>

      <ol ref={scroller} className="min-h-0 flex-1 overflow-hidden px-6 py-4">
        {board.phases.map((phase) => {
          const status = statusOf(phase, board, now);
          return (
            <li
              key={phase.index}
              data-index={phase.index}
              data-type={phase.type}
              data-status={status}
              className="group grid grid-cols-[7.2rem_1fr] gap-x-6 rounded-[0.6rem] border-l-[3px] border-transparent px-4 py-[1.15rem] transition-[background,opacity] duration-300 data-[status=next]:bg-paper/5 data-[status=past]:opacity-40 data-[status=current]:border-l-(--accent) data-[status=current]:bg-(--accent-soft)"
            >
              <div className="pt-[0.1em] font-mono text-caption font-semibold tabular-nums tracking-tight text-paper/60 group-data-[status=current]:text-paper">
                {fmt.hhmm(phase.start)}
              </div>

              <div className="flex items-baseline gap-3 text-body font-semibold leading-snug">
                <span
                  className={cn({
                    "line-through decoration-1": status === "past",
                    "font-extrabold": status === "current",
                  })}
                >
                  {phase.title}
                </span>
                {status === "current" && (
                  <span className="shrink-0 rounded-[0.3rem] bg-(--accent) px-[0.55em] py-[0.15em] font-mono text-micro font-bold uppercase tracking-widest text-ink">
                    now
                  </span>
                )}
              </div>

              {(phase.speaker || phase.location) && (
                <div className="col-start-2 mt-[0.15rem] text-caption text-paper/40">
                  {[phase.speaker, phase.location].filter(Boolean).join(" / ")}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
