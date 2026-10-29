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
- Lighthouse after Part 1 (live, mobile): home 95, log 99, post 97, case study 95, About 87–91; desktop 99–100; accessibility 100 everywhere. A local A/B on /about with and without the switch scored the same range (74–90), so the switch isn't the cause; About's LCP is the bio text, delayed by the shared React startup.

## Part 2: Simple copy
- Olu approved the audit table as proposed. Simple copy for the hero accent line, Focus, ticker, statement, About strip, every card (subtitle, Problem, Bet, Result, tag, caption), Next up, Index, process steps, the ShelfReady case study (lede, Result box, "For", plus an "In plain English" box in Simple), the About bio (moved to `content/site.ts`), and the log intro.
- Proof: a plain `meaning` line under each of the 12 numbers, Simple only. No number changed.
- Log: optional `summarySimple` in post frontmatter (schema updated); Simple rows show it and hide the takeaways; posts themselves stay as written.
- Glossary terms in use: AI agents (Focus), test/eval (Model router, About), A/B test (Activation flow), assistant/agent (Weekly digest).
- Chart: values now sit inside the bars and the bars top out lower, so the tag never covers a number; the cropped "Products agent-ready" label is gone (the caption says it). The chart has a text alternative now.
- Fixed along the way: `.tag span` and `.track span` also styled the new inner spans (tiny tag, double ticker padding); scoped to direct children. The case study's "Built with" row reads "What it is" in Simple.
- Lighthouse after Part 2 (live): mobile home 93, about 96, log 99, post 92, case study 91; desktop 98–100 except /log 73 with CLS 0.503. Cause: before the web fonts load, the wider fallback font plus the new switch made the header wrap at ~1350px, then unwrap. Fix: below 1500px the switch hides its "Explain it:" prefix (the accessible name keeps it) and the header gap is 24px. Local desktop: /log 99, CLS 0.
