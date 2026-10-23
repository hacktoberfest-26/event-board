interface PhaseBarProps {
  progress: number;
}

export default function PhaseBar({ progress }: PhaseBarProps) {
  return (
    <div
      className="relative h-[0.8rem] overflow-hidden rounded-full bg-ink/35"
      role="progressbar"
      aria-label="Phase progress"
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full rounded-full bg-(--accent) transition-[width] duration-700 ease-out"
        style={{ width: `${progress.toFixed(2)}%` }}
      />
    </div>
  );
}
