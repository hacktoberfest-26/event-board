import hacktoberfestLogo from "../assets/logos/hacktoberfest-2026-horizontal-white.svg";
import type { EventMeta, Formatters, Host } from "../lib/types";

const HOST_LOGOS = import.meta.glob("../assets/logos/*.{svg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const hostLogo = (file: string): string | undefined =>
  HOST_LOGOS[`../assets/logos/${file}`];

interface MastheadProps {
  event: EventMeta;
  hosts: Host[];
  now: Date;
  fmt: Formatters;
}

export default function Masthead({ event, hosts, now, fmt }: MastheadProps) {
  return (
    <header className="col-span-2 flex items-center gap-10 border-b border-paper/15 pb-5">
      <img
        src={hacktoberfestLogo}
        alt={`Hacktoberfest ${event.edition}`}
        className="h-[3.4rem] w-auto shrink-0"
      />

      <div className="flex flex-col gap-0.5 border-l border-paper/15 pl-10">
        <div className="font-display text-title font-extrabold uppercase leading-none tracking-tight">
          {event.name}
        </div>
        <div className="font-mono text-overline font-medium uppercase tracking-[0.06em] text-paper/60">
          {event.venue} / {fmt.date(now)}
        </div>
      </div>

      <div className="flex-1" />

      <div className="font-mono text-title font-semibold tabular-nums tracking-tight">
        {fmt.clock(now)}
      </div>

      <div className="flex items-center gap-8 border-l border-paper/15 pl-10">
        <span className="rotate-180 font-mono text-micro font-medium uppercase tracking-[0.14em] text-paper/40 [writing-mode:vertical-rl]">
          Hosts
        </span>
        {hosts.map((host) => (
          <img
            key={host.name}
            src={hostLogo(host.logo)}
            alt={host.name}
            style={{ height: `${host.height ?? 3}rem` }}
            className="w-auto max-w-[16rem] object-contain"
          />
        ))}
      </div>
    </header>
  );
}
