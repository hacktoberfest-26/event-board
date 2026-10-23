import { atTime, todayISO } from "./time";
import type {
  Board,
  EventConfig,
  ResolvedPhase,
  Timeline,
  Urgency,
} from "./types";

/** Turn the configuration into absolute timestamps, once. */
export function buildTimeline(config: EventConfig): Timeline {
  const qp = new URLSearchParams(window.location.search);
  const eventDate = qp.get("date") === "today" ? todayISO() : config.event.date;

  const dayStart = atTime(eventDate, config.event.startsAt);
  let dayEnd = atTime(eventDate, config.event.endsAt);
  if (dayEnd <= dayStart) dayEnd = atTime(eventDate, config.event.endsAt, 1);

  const phases: ResolvedPhase[] = config.agenda
    .map((phase, index) => {
      const start = atTime(eventDate, phase.start);
      let end = atTime(eventDate, phase.end);
      if (end <= start) end = atTime(eventDate, phase.end, 1);
      return { ...phase, index, start, end, startMs: +start, endMs: +end };
    })
    .sort((a, b) => a.startMs - b.startMs);

  return { eventDate, dayStart, dayEnd, phases };
}

/** Where the day is at time `t`. See the Board type for the four states. */
export function resolveBoard(timeline: Timeline, t: number): Board {
  const { phases, dayStart, dayEnd } = timeline;

  const current = phases.find((p) => t >= p.startMs && t < p.endMs) ?? null;
  const next = phases.find((p) => p.startMs > t) ?? null;

  const dayTotal = +dayEnd - +dayStart;
  const dayElapsed = Math.min(dayTotal, Math.max(0, t - +dayStart));

  const base = {
    phases,
    phaseCount: phases.length,
    dayStart,
    dayEnd,
    dayTotal,
    dayElapsed,
    dayProgress: clamp((dayElapsed / dayTotal) * 100),
    dayOver: t >= +dayEnd,
    phaseProgress: 0,
  };

  if (current) {
    const remaining = current.endMs - t;
    return {
      ...base,
      state: "live",
      current,
      next,
      remaining,
      phaseProgress: clamp(
        ((t - current.startMs) / (current.endMs - current.startMs)) * 100,
      ),
      urgency: urgencyOf(remaining),
    };
  }

  if (t < +dayStart) {
    const remaining = +dayStart - t;
    return {
      ...base,
      state: "before",
      current: null,
      next,
      remaining,
      urgency: urgencyOf(remaining),
    };
  }

  if (next) {
    const remaining = next.startMs - t;
    return {
      ...base,
      state: "gap",
      current: null,
      next,
      remaining,
      urgency: urgencyOf(remaining),
    };
  }

  return {
    ...base,
    state: "after",
    current: null,
    next: null,
    remaining: null,
    urgency: "calm",
  };
}

const clamp = (n: number): number => Math.min(100, Math.max(0, n));

const urgencyOf = (remaining: number): Urgency =>
  remaining <= 60_000 ? "now" : remaining <= 300_000 ? "soon" : "calm";
