# Hacktoberfest 26 Event Board

Live room board for **Hacktoberfest Fest @H-FARM**: the current phase, how long is
left, the agenda and the 12-hour day timer.

It shows, in order of importance:

- how long is left in the current phase;
- the phase itself, with speaker, location and a progress bar;
- the full agenda, current phase highlighted, finished ones struck through;
- the day timer: how much of the planned 12 hours has gone;
- rotating service information for attendees.

It re-reads the real clock four times a second, so it can sit open for twelve
hours, sleep, or be reloaded without losing its place.

Built with Vite, TypeScript, React, Tailwind CSS v4 and FontAwesome.

---

## Quick start

```bash
pnpm install
pnpm dev
```

Open <http://localhost:8099>, press `F` for fullscreen, and leave it there.

**Keys on the laptop driving the projector:** `F` fullscreen, `R` reload. The
mouse pointer hides itself after three seconds, and the page asks the system to
keep the screen awake.

### Scripts

| Script               | What it does                                                  |
| -------------------- | ------------------------------------------------------------- |
| `pnpm dev`           | dev server with hot reload                                    |
| `pnpm typecheck`     | run TypeScript over the project, no build                     |
| `pnpm build`         | typecheck, then build into `dist/` - what GitHub Pages serves |
| `pnpm build:offline` | typecheck, then one self-contained `dist-offline/index.html`  |
| `pnpm preview`       | serve the production build locally                            |
| `pnpm format`        | format every file with Prettier                               |
| `pnpm format:check`  | check formatting without writing (handy in CI)                |

---

## Configuring the event

**`event.config.ts` in the repo root is the only file you need to edit.**

```js
event: {
  name: 'Hacktoberfest Fest',
  venue: 'H-FARM Campus / Roncade',
  date: '2026-10-24',
  startsAt: '09:00',
  endsAt: '21:00',
}
```

### Agenda

One entry per phase, in chronological order. If you leave a gap between two
phases, the board handles it on its own as free time and counts down to the
restart.
Times are "HH:MM" strings in the venue's local time.

```js
{ start: '10:30', end: '12:00', type: 'sprint', title: 'Hack time',
  speaker: 'Name Surname', location: 'Open space', note: 'Mentors walking around' }
```

`speaker`, `location` and `note` are optional. `type` sets the colour and badge:

| `type`      | Badge      | Colour |
| ----------- | ---------- | ------ |
| `logistics` | Logistics  | Paper  |
| `ceremony`  | Main stage | Orange |
| `talk`      | Talk       | Sky    |
| `sprint`    | Hack       | Ochre  |
| `break`     | Break      | Pink   |

### Service information

Rotates in the bottom right every 14 seconds (`display.infoRotationSeconds`).

`icon` takes a [FontAwesome](https://fontawesome.com/icons) name. These are
the currently available icons: `wifi`, `github`, `circle-question`, `qrcode`
and `hashtag`. Anything else is rendered as plain text, so an emoji works too.

To add one, import it in `src/components/Icon.tsx` and put it in the `ICONS`
map. Icons are tree-shaken, so only what that map references is bundled:

```jsx
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const ICONS = {
  // ...
  "mug-hot": faMugHot,
};
```

Keep `value` short: it is the big line, and it is set to truncate rather than
wrap. Long strings like a full URL belong in `hint` underneath.

---

## Host logos

```js
hosts: [
  { name: "Fabricode", logo: "fc-logo-white.svg", height: 3.2 },
  { name: "H-FARM", logo: "h-farm-logo-white.png", height: 3.2 },
];
```

`logo` is a filename in `src/assets/logos/` (SVG, PNG or WebP, the folder is
globbed). `height` is in rem and optional, 3 by default.

---

## Testing the board

Three URL parameters, meant for a dry run in the room:

| Parameter     | Effect                                             |
| ------------- | -------------------------------------------------- |
| `?date=today` | use today's date instead of the configured one     |
| `?now=14:35`  | pretend it is 14:35, then run forward in real time |
| `?speed=60`   | one real second counts as one minute on the board  |

```
# mid hack time
http://localhost:8099/?date=today&now=11:25

# watch a phase change
http://localhost:8099/?date=today&now=12:12&speed=60

# the closing screen
http://localhost:8099/?date=today&now=21:20
```

With no parameters the board uses the real date and time.

---

## Deploying

`.github/workflows/pages.yml` builds and publishes to GitHub Pages on every
push to `main`.

The address to open in the room is then:

```
https://hacktoberfest-26.github.io/event-board/
```

### Offline version

```bash
pnpm build:offline
```

That produces a **single** `dist-offline/index.html` with the scripts, styles,
fonts and logos inlined.
Every CI run also attaches that file to the run summary as the
`event-board-offline` artifact.

---

## Brand notes

Colours, fonts and logos follow the
[Hacktoberfest brand guidelines](https://hacktoberfest.com/brand/) for the 2026 edition.

Fonts are redistributed under the SIL Open Font License.
See [`src/assets/fonts/LICENSE.md`](src/assets/fonts/LICENSE.md).
