/** The shapes the board is built on. */

export type PhaseType = "logistics" | "ceremony" | "talk" | "sprint" | "break";

/** A phase as written in event.config.ts: times are "HH:MM" strings. */
export interface Phase {
  start: string;
  end: string;
  type: PhaseType;
  title: string;
  speaker?: string;
  location?: string;
  note?: string;
}

/** The same phase once its times are absolute. */
export interface ResolvedPhase extends Omit<Phase, "start" | "end"> {
  index: number;
  start: Date;
  end: Date;
  startMs: number;
  endMs: number;
}

export interface InfoItem {
  icon: string;
  label: string;
  value: string;
  hint?: string;
}

export interface Host {
  name: string;
  logo: string;
  /** REM */
  height?: number;
}

export interface EventMeta {
  name: string;
  edition: string;
  venue: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM */
  startsAt: string;
  /** HH:MM */
  endsAt: string;
}

export interface DisplaySettings {
  infoRotationSeconds?: number;
  locale?: string;
}

export interface EventConfig {
  event: EventMeta;
  agenda: Phase[];
  info: InfoItem[];
  hosts: Host[];
  display?: DisplaySettings;
}

export interface Timeline {
  eventDate: string;
  dayStart: Date;
  dayEnd: Date;
  phases: ResolvedPhase[];
}

export type Urgency = "calm" | "soon" | "now";

interface BoardBase {
  phases: ResolvedPhase[];
  phaseCount: number;
  dayStart: Date;
  dayEnd: Date;
  dayTotal: number;
  dayElapsed: number;
  dayProgress: number;
  dayOver: boolean;
  phaseProgress: number;
  urgency: Urgency;
}

/**
 * Where the day is at a given moment.
 *
 *   before  doors have not opened yet
 *   live    a phase is running
 *   gap     between two phases, free time
 *   after   everything is done
 */
export type Board = BoardBase &
  (
    | {
        state: "live";
        current: ResolvedPhase;
        next: ResolvedPhase | null;
        remaining: number;
      }
    | {
        state: "before";
        current: null;
        next: ResolvedPhase | null;
        remaining: number;
      }
    | { state: "gap"; current: null; next: ResolvedPhase; remaining: number }
    | { state: "after"; current: null; next: null; remaining: null }
  );

export interface Formatters {
  clock: (d: Date) => string;
  hhmm: (d: Date) => string;
  date: (d: Date) => string;
}
