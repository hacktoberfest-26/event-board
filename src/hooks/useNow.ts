import { useCallback, useEffect, useMemo, useState } from "react";

import { atTime } from "../lib/time";

// Read once: the URL does not change while the board is open
const query = new URLSearchParams(window.location.search);
const simStart = query.get("now");
const speed = Math.max(1, Number(query.get("speed")) || 1);

/**
 * The current time, re-read from the system clock on every tick.
 * Nothing is accumulated. With `?now=` it starts from a pretend time and runs
 * forward from there.
 */
export function useNow(eventDate: string, intervalMs = 250): number {
  const sim = useMemo(
    () =>
      simStart
        ? { base: +atTime(eventDate, simStart), booted: Date.now() }
        : null,
    [eventDate],
  );

  const read = useCallback(
    () => (sim ? sim.base + (Date.now() - sim.booted) * speed : Date.now()),
    [sim],
  );

  const [now, setNow] = useState(read);

  useEffect(() => {
    setNow(read());
    const id = setInterval(() => setNow(read()), intervalMs);
    return () => clearInterval(id);
  }, [read, intervalMs]);

  return now;
}
