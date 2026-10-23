import cn from "classnames";
import { Fragment, type ReactNode } from "react";

import { humanDuration } from "../lib/time";
import type { Board, EventMeta, Formatters, PhaseType } from "../lib/types";
import Countdown from "./Countdown";
import PhaseBar from "./PhaseBar";
import UpNext from "./UpNext";

const KIND_LABEL: Record<PhaseType, string> = {
  logistics: "Logistics",
  ceremony: "Main stage",
  talk: "Talk",
  sprint: "Hack",
  break: "Break",
};

function MetaLine({ parts }: { parts: ReactNode[] }) {
  return (
    <p className="m-0 flex flex-wrap items-center gap-x-6 gap-y-2 text-lead font-medium text-paper/60">
      {parts.filter(Boolean).map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="text-paper/40">/</span>}
          {part}
        </Fragment>
      ))}
    </p>
  );
}

interface StageView {
  type: PhaseType;
  eyebrow: string;
  kind: string | null;
  title: string;
  meta: ReactNode[];
  countdownLabel: string | null;
  until: string | null;
  note: string | null;
}

/** What the big panel says. */
function buildView(board: Board, event: EventMeta, fmt: Formatters): StageView {
  if (board.state === "live") {
    const { current } = board;
    return {
      type: current.type,
      eyebrow: "Happening now",
      kind: KIND_LABEL[current.type],
      title: current.title,
      meta: [
        current.speaker && (
          <b className="font-bold text-paper">{current.speaker}</b>
        ),
        current.location,
        `${fmt.hhmm(current.start)} - ${fmt.hhmm(current.end)}`,
      ],
      countdownLabel: "Ends in",
      until: `until ${fmt.hhmm(current.end)}`,
      note: current.note ?? null,
    };
  }

  if (board.state === "before") {
    return {
      type: "logistics",
      eyebrow: "Starting soon",
      kind: null,
      title: `${event.name} ${event.edition}`,
      meta: [
        <>
          Doors open at{" "}
          <b className="font-bold text-paper">{fmt.hhmm(board.dayStart)}</b>
        </>,
        event.venue,
      ],
      countdownLabel: "Starts in",
      until: `doors at ${fmt.hhmm(board.dayStart)}`,
      note: "Get on the wifi while you wait",
    };
  }

  if (board.state === "gap") {
    const { next } = board;
    return {
      type: "break",
      eyebrow: "Free time",
      kind: null,
      title: "Break",
      meta: [
        <>
          Back with <b className="font-bold text-paper">{next.title}</b>
        </>,
      ],
      countdownLabel: "Back in",
      until: `resuming at ${fmt.hhmm(next.start)}`,
      note: null,
    };
  }

  return {
    type: "ceremony",
    eyebrow: "That's a wrap",
    kind: null,
    title: "Thank you!",
    meta: [
      `${board.phaseCount} phases`,
      `${humanDuration(+board.dayEnd - +board.dayStart)} together`,
      "see you next edition",
    ],
    countdownLabel: null,
    until: null,
    note: "Keep the open source spirit alive!",
  };
}

interface StageProps {
  board: Board;
  event: EventMeta;
  fmt: Formatters;
}

export default function Stage({ board, event, fmt }: StageProps) {
  const view = buildView(board, event, fmt);

  return (
    <main
      data-type={view.type}
      className="stage-surface flex min-w-0 flex-col justify-center gap-7 rounded-[0.9rem] border border-paper/15 px-14 py-12 transition-[background] duration-500"
    >
      <div className="flex items-center gap-4 font-mono text-caption font-semibold uppercase tracking-[0.16em] text-(--accent)">
        <span className="h-[1.1rem] w-[1.1rem] shrink-0 rounded-full bg-(--accent) animate-pulse-ring" />
        <span>{view.eyebrow}</span>
        {view.kind && (
          <span className="rounded-[0.35rem] bg-(--accent-chip) px-[0.7em] py-[0.25em] tracking-widest">
            {view.kind}
          </span>
        )}
      </div>

      <h1
        className={cn(
          "m-0 font-display font-extrabold leading-[0.95] tracking-tight text-balance",
          {
            "text-headline-xs": view.title.length > 48,
            "text-headline-sm":
              view.title.length > 28 && !(view.title.length > 48),
            "text-headline":
              !(view.title.length > 28) && !(view.title.length > 48),
          },
        )}
      >
        {view.title}
      </h1>

      <MetaLine parts={view.meta} />

      {board.state !== "after" && (
        <>
          <Countdown
            label={view.countdownLabel}
            remaining={board.remaining}
            until={view.until}
            urgency={board.urgency}
          />
          <PhaseBar progress={board.phaseProgress} />
          <UpNext phase={board.next} fmt={fmt} />
        </>
      )}

      {view.note && (
        <p className="m-0 flex items-start gap-4 text-body text-ochre">
          <span className="shrink-0 font-mono">→</span>
          <span>{view.note}</span>
        </p>
      )}
    </main>
  );
}
