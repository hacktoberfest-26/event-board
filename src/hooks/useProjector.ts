import { useEffect } from "react";

/** Keeps the display awake for as long as the board is on screen. */
function useWakeLock(): void {
  useEffect(() => {
    let lock: WakeLockSentinel | null = null;
    let released = false;

    const acquire = async (): Promise<void> => {
      try {
        const next = (await navigator.wakeLock?.request("screen")) ?? null;
        if (released) void next?.release();
        else lock = next;
      } catch {
        /* Not supported, or denied. The board works either way. */
      }
    };

    const onVisibility = (): void => {
      if (document.visibilityState === "visible") void acquire();
    };

    void acquire();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      released = true;
      document.removeEventListener("visibilitychange", onVisibility);
      void lock?.release().catch(() => {});
    };
  }, []);
}

/** F toggles fullscreen, R reloads. */
function useShortcuts(): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      const key = event.key.toLowerCase();
      if (key === "f") {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen();
      }
      if (key === "r") window.location.reload();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}

/** Hides the mouse pointer three seconds after it stops moving. */
function useIdleCursor(): void {
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>;

    const onMouseMove = (): void => {
      document.body.classList.add("show-cursor");
      clearTimeout(idle);
      idle = setTimeout(
        () => document.body.classList.remove("show-cursor"),
        3000,
      );
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      clearTimeout(idle);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
}

/** The small comforts of a screen that has to survive a whole day. */
export function useProjector(): void {
  useWakeLock();
  useShortcuts();
  useIdleCursor();
}
