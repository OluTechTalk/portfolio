# Session 09: Two ways to read (Simple / Technical) + Off the clock

**Date:** 2026-10-28
**Goal:** Make the site readable by anyone in 30 seconds without losing the technical depth (brief: `docs/REDESIGN.md`), and add a short personal section. Three parts, each committed and pushed.

## Plan (approved)
- How it works: both versions are server-rendered as `.v-s` / `.v-t` spans; CSS shows one from `<html data-view>`. A pre-paint script sets it (`?view=` wins and is remembered, then localStorage, then Simple). No JavaScript → Simple.
- Part 1: the switch, the `{ simple, technical }` content model, glossary tooltips.
- Part 2: Simple copy for every page, from a table Olu edits first; Proof meanings; fix the ShelfReady chart overlap.
- Part 3: Off the clock (Running, Giants counter, Spurs) on home and /about.

## Part 1: the switch
- `lib/copy.ts`: `Copy = string | { simple, technical }`; a plain string means the same words work for both readers. `text()` for metadata and preview images (Simple).
- `components/txt.tsx` renders a Copy; `components/term.tsx` is a glossary term (dotted underline, tooltip on hover, focus or tap, Escape hides it, meaning is the button's description); `content/glossary.ts` has the five terms from the brief. Mark a term in Simple copy as `[[term]]` or `[[shown|term]]`.
- `components/view-switch.tsx`: "Explain it: Simply · Technically", `role="switch"`, styled from `data-view` so it's right before hydration; fade out, swap, fade in (none with reduced motion); clears `?view=` once the visitor flips. One-time hint "Prefer the technical details? Flip this." until flipped or dismissed.
- Content: copy fields in `projects.ts`, `site.ts` (pitch, focus, role, statement, process steps) and `career.ts` (plus a Simple-only `meaning`) accept Copy. Only the brief's approved examples differ so far: hero paragraph and the ShelfReady card.
- Checks: lint, typecheck, build. Screenshots at 1440 and 375, light and dark, Simple and Technical. The hint was invisible in dark mode (fixed: inverted colors) and ran off-screen on mobile (fixed: left-anchored). Server HTML has no `data-view`, so the page is Simple without JavaScript.
