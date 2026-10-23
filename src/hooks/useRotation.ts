import { useEffect, useState } from "react";

/** Cycles 0..count-1 on a timer. Used by the service info card. */
export function useRotation(count: number, seconds: number): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count <= 1) return undefined;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % count),
      Math.max(4, seconds) * 1000,
    );
    return () => clearInterval(id);
  }, [count, seconds]);

  return count > 0 ? index % count : 0;
}
