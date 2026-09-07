# Long Game — Lanky BJJ

Mobile-first web app for tall, thin, lanky, underweight Brazilian Jiu-Jitsu beginners. Guide + progress tracker with real technique content, session logging, and a 12-week starter curriculum.

**Product name:** Long Game (working nickname: Lanky Guard)

## Who it's for

Athletes like Jay (example defaults: **6'4", 148 lbs**) who need a game based on leverage, frames, open guard, and long-limb submissions — not smash pressure.

## Features (v1)

- **Home / dashboard** — greeting, weekly sessions, streak, next recommended focus, quick nav
- **Profile** — height/weight/notes with lanky defaults + copy on how long frames play
- **Technique guide** — 6 modules with technique cards (why it fits, steps/cues, mistakes, status)
- **Progress** — log sessions (date, drills, notes, minutes); technique statuses; weekly stats
- **Curriculum** — 12-week checklist with persistent checkoffs
- **Polish** — dark athletic mobile UI, large tap targets, empty states, educational disclaimer

All progress is stored in the browser via **localStorage** (no backend).

## Tech

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Client-side persistence (`localStorage` key: `long-game-lankybjj-v1`)

## Data model

- `Profile` — name, height, weight, notes
- `TechniqueProgress` — techniqueId → Learning / Drilling / Can Hit In Rolls
- `SessionLog` — date, notes, drills, duration
- `CurriculumProgress` — checklist itemId → boolean

## Run locally

```bash
cd lankybjj
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```


## Main routes

| Route | Screen |
|-------|--------|
| `/` | Home dashboard |
| `/profile` | Profile & frame notes |
| `/techniques` | Technique guide modules |
| `/techniques/[id]` | Technique detail + status |
| `/progress` | Session log & weekly stats |
| `/curriculum` | 12-week starter checklist |

## Push to GitHub

This project was built locally. To publish to `https://github.com/wcosmo1/lankybjj`:

```bash
cd lankybjj
git init
git add .
git commit -m "Initial Long Game lanky BJJ app"
git branch -M main
git remote add origin https://github.com/wcosmo1/lankybjj.git
git push -u origin main
```

If the remote already has commits, pull/rebase first or use a fresh empty repo.

## Disclaimer

Educational grappling guidance only. Not medical, nutrition, or professional coaching advice. Train under qualified instructors.

## License

Private / personal project unless otherwise stated.
