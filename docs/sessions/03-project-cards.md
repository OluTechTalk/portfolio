# Session 03: Project cards

**Date:** 2026-09-28
**Goal:** Fill the home page's `#work` section with project cards read from `content/projects.ts`.

## What was done
- `components/project-card.tsx`: one card per `Project`. From top to bottom:
  - the headline eval number in teal (once one exists), next to a status badge
  - the title and one-liner
  - "For:" the customer, which is the PM half of the card
  - tags
  - links: Demo, Repo and Video open in a new tab. Case study goes to `/projects/[slug]`. Each link only appears when the field is set.
- **Status styling:**
  - in-progress: solid border, card background and a teal dot on the badge
  - planned: dashed border and muted text, so it's clearly marked but quiet
  - shipped: solid border, no dot
- `app/page.tsx`: the `#work` section now has an intro line ("Each project: the customer problem, what I built, and the eval number that proves it.") and a grid of the projects sorted by `order`. It's 1 column on phones and 2 from `sm` up.
- `content/projects.ts`: Olu confirmed the placeholder one-liners, customers and tags, so the TODO was removed.

## Checks
- `npm run lint`, `npm run typecheck` and `npm run build` pass. `/` is still static.
- Screenshots of the production build at 375px in dark mode and at 1280px in light mode: no overflow, and the cards stack and wrap cleanly.

## Decisions
- **No placeholder headline.** The first version showed "Eval results in progress" or "Up next" in the headline slot, which only repeated the status badge. The slot now appears only when `headline` is set, and until then the status badge leads the card.
- **No "N log posts" link yet.** There are no log posts. Add it when `content/log` exists and the count can be computed from it.
- **Screen readers:** card links include hidden text ("Repo for ShelfReady…"), so a screen reader can tell repeated link names apart.

## Next
- `/log` and `/log/[slug]` with MDX in `content/log`. Then have the "Now building" line read the latest post, and give each card its "N log posts" link.
- Add ShelfReady's headline number (`headline`) once its evals have run.
- Run Lighthouse on the live site.
