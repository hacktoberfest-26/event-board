import { useMemo } from "react";

import { EVENT_CONFIG } from "../event.config";
import Agenda from "./components/Agenda";
import DayTimer from "./components/DayTimer";
import InfoCard from "./components/InfoCard";
import Masthead from "./components/Masthead";
import Stage from "./components/Stage";
import { useNow } from "./hooks/useNow";
import { useProjector } from "./hooks/useProjector";
import { buildTimeline, resolveBoard } from "./lib/schedule";
import { createFormatters } from "./lib/time";

export default function App() {
  const timeline = useMemo(() => buildTimeline(EVENT_CONFIG), []);
  const fmt = useMemo(
    () => createFormatters(EVENT_CONFIG.display?.locale ?? "en-GB"),
    [],
  );

  const now = useNow(timeline.eventDate);
  useProjector();

  const board = useMemo(() => resolveBoard(timeline, now), [timeline, now]);

  return (
    <>
      <div className="board grid h-screen w-full grid-cols-[minmax(0,1fr)_40rem] grid-rows-[auto_minmax(0,1fr)_auto] gap-6 p-6">
        <Masthead
          event={EVENT_CONFIG.event}
          hosts={EVENT_CONFIG.hosts}
          now={new Date(now)}
          fmt={fmt}
        />

        <Stage board={board} event={EVENT_CONFIG.event} fmt={fmt} />

        <Agenda board={board} now={now} fmt={fmt} />

        <footer className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6">
          <DayTimer board={board} fmt={fmt} />
          <InfoCard
            items={EVENT_CONFIG.info}
            seconds={EVENT_CONFIG.display?.infoRotationSeconds ?? 14}
          />
        </footer>
      </div>

      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink px-6 py-2 font-mono text-micro text-paper transition-opacity duration-300 hint">
        F fullscreen / R reload
      </div>
    </>
  );
}
