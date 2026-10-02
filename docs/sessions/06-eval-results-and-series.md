# Session 06: Career stats, ShelfReady eval results, Episodes 06–07, LinkedIn series

**Date:** 2026-09-29 → 2026-10-02
**Goal:** Bring the site up to date with ShelfReady's eval and playground episodes, settle the career stats, and plan how the backlog of posts goes out on LinkedIn.

## What was done
- **Career stats** (`a8896b1`):
  - Olu shared 10 more résumé versions. The three live stats appear in none of them, but Olu chose the 2026-09-28 résumé as the source of truth, so they stay.
  - Added what that résumé omits, from the other versions: **$400M+** logistics operation on AI fulfillment across 7 distribution centers (Spreetail, in all 10 versions), and **−10%** costs on $31M managed (Arcadis, 8 of 10). The About bio now lists Arcadis.
  - Saved to memory: `career-stats-source.md`. Date differences between versions are ignored, per Olu.
- **Portfolio post published** (`5df109d`): `portfolio-ep05-v1`.
  - The palette story was corrected: the teal refresh was rejected from preview screenshots and never shipped.
  - "Now building" now picks the latest post from **featured** projects, so posts about this site don't replace the ShelfReady line.
- **ShelfReady eval results** (`4ac72d5`), from ShelfReady's committed Episode 06 session log, DECISIONS.md, README and git log:
  - **Card headline** (Olu chose option C): "0 wrong products in 360 agent sessions · readiness 94.1 → 98.3". The Demo link now goes to the live `/playground`.
  - **`proofStat`:** a new optional `Project` field, a short version of the result for the home proof strip ("0 wrong products bought in 360 ShelfReady agent eval sessions").
  - **Case study:**
    - Results: six before/after tiles, the "data *and* tools" finding (search fix: 92.5–95% → 97.5–100%), and its limits (multi-answer tasks; clean products score a perfect 100)
    - P5 added to What I built
    - Three new decisions and two new What broke items
    - A new roadmap
- **Episode 06 post** (`shelfready-ep06-eval`): drafted, approved and published (`e197878`).
- **Episode 07 post** (`shelfready-ep07-playground`): drafted after ShelfReady committed its session log (`567cc0c`), then published (`e46f3fd`). It cites ShelfReady's "public-ready" commit for the MCP endpoint now failing closed.
- **LinkedIn series** (`docs/posts/SCHEDULE.md`). Olu hadn't posted any episodes yet, so the backlog goes out as a series rather than daily or in build order:
  - a results-first anchor post, then Parts 1–6 on Tue/Wed/Thu, Oct 6–20
  - Episodes 00+01 and 06+07 merged into one post each
  - "Part N of 6" framing, and links in a first comment

## Checks
- `npm run lint`, `npm run typecheck` and `npm run build` pass on every commit.
- Screenshots of the home card, the proof strip and the case study results at desktop width and 375px.
- Each published post is live (HTTP 200), "Now building" follows the newest featured post, and RSS includes the published posts and leaves out drafts.
- Every short post is 280 characters or less. Secret scans on the new posts and case study found nothing.
- PageSpeed Insights' keyless API stayed over quota, so mobile performance on Google's servers is still unconfirmed.

## Decisions
- **Headline C over the literal eval delta.** "98.9% → 99.4%" undersells the work. "0 wrong products in 360 sessions" is accurate and strong, and the case study explains the small delta.
- **Short `proofStat` separate from `headline`.** A long headline doesn't fit a stat tile.
- **ShelfReady posts only from committed session logs,** so every post has a commit to link as proof.
- **LinkedIn backlog as a results-first series,** about 3 a week, with transparent "built over a week" framing.

## Next
- Olu: post the series from `SCHEDULE.md` (anchor Tue Oct 6). After each post, send its URL so it goes into `linkedinUrl`.
- Olu: run pagespeed.web.dev on oluakele.com (mobile) and share the score.
- ShelfReady Episode 08 (P6 Ship): when its session log lands, add the Loom as the card's Video link, update the case study from ShelfReady's `docs/CASE_STUDY.md`, add the Groq results, and draft the Episode 08 and launch posts.
