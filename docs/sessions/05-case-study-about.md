# Session 05: Case study, About, visual refresh and polish (v1)

**Date:** 2026-09-28
**Goal:** Finish v1: the ShelfReady case study and earlier work (Part A), then About, How I work, the proof strip, contact and polish (Part B). A favicon and a visual refresh were added mid-session at Olu's request.

## Part A: case study and earlier work (`667f22f`)
- **`/projects/[slug]`** from `content/case-studies/*.mdx` via `lib/case-studies.ts`:
  - frontmatter checked with zod (`slug`, `project`, `summary`, `updated`, `draft`)
  - drafts show in dev only
  - `dynamicParams = false`
  - its own Open Graph image and metadata
- **Case study page:** a header from `projects.ts` (status, one-liner, "For:", tags, headline once it exists), then the MDX body. The Build log section (published posts for the project) and the Links section are generated after the MDX.
- **`content/case-studies/shelfready.mdx`:** CLAUDE.md template sections, marked "in progress". Results say plainly that the before/after eval is still running; the audit before/after is shown as interim.
  - `<ShelfReadyArchitecture />`: two lanes, built from HTML so it stays readable at 375px
  - `<BeforeAfter />`: stat tiles, per the chart-design skill's form guidance (a few numbers read better as tiles than as a chart)
  - Sources: ShelfReady's SPEC.md, DECISIONS.md, session logs and git log, read only
  - Olu approved it and it's published
- **`projects.ts`:** ShelfReady got `demoUrl` and `caseStudy`. The card's Case study link only appears when the case study is visible in that build. Log posts' project links go to the case study when one exists.
- **Earlier work row:** Wherewise, "Live soon", with no link, at Olu's request.

## Favicon (`262d58c`)
- `app/icon.svg`: an "OA" monogram drawn as strokes, not text, so it's sharp at 16px
- `app/apple-icon.tsx`: a 180px PNG of the same mark
- Removed the create-next-app `favicon.ico` (the Vercel triangle)

## Visual refresh (`cedc505`)
- **Medium level (Olu's pick):**
  - tinted neutrals
  - a glow and dot-grid backdrop (`components/backdrop.tsx`, CSS only)
  - gradient headshot ring, name underline and main button
  - full-width tinted bands, section eyebrow labels
  - an accent line and hover lift on in-progress cards
- **First palette (teal/blue) rejected:** Olu felt it "gives LinkedIn vibes". Switched to a violet → rose pair after the reference site's 280°→350° gradient, with violet-tinted neutrals.
- **Contrast:** checked numerically with an oklch → sRGB script. Every text pair is ≥ 5:1 in both themes. The reference site's exact violet (about 3.9:1 on white) was darkened for text.
- **Sticky header dropped:** its blur smeared the dot grid into a visible band.
- **Favicon and all OG images** recolored to match.

## Part B: About, home sections, polish (`46c4bab`)
- **`/about`:** headshot, a three-paragraph bio drafted from CLAUDE.md's positioning (Olu to edit), and links: LinkedIn, GitHub, email, Book a call.
  - **No résumé download (Olu's call).** The résumé he shared also contains a phone number and home address, which CLAUDE.md forbids committing.
- **Home:**
  - **How I work:** four steps, one line each (`content/site.ts`).
  - **Proof strip:**
    - Build stats computed from content: featured projects (→ #work), episodes shipped (→ /log), and a project's headline eval result once one exists (→ its case study).
    - Career stats (`content/career.ts`), from the résumé, with role and years, linking to LinkedIn: $6.8M incremental revenue (Visual Comfort & Co., 2025–present), +22% monthly bookings (Zillow/ShowingTime, 2022–2025), −31% support tickets (Spreetail, 2021–2022).
    - A résumé stat with a typo ("74.3.75k") was avoided.
    - Olu asked for made-up placeholders; used real résumé numbers instead, because invented numbers on a live page would read as claims.
  - **Contact:** gradient-bordered card with Email, Book a call and LinkedIn.
- **Portfolio as a project** (`featured: false`), so its own log posts validate and show in the /log filter without adding a home card.
- **SEO and 404:** `app/sitemap.ts` (home, about, log, case studies, published posts), `app/robots.ts`, and `app/not-found.tsx` (returns HTTP 404).
- **`/log` filter:** it no longer uses `useSearchParams` inside Suspense. The list rendered once as the fallback and again after hydration, which counted as a late LCP. It now renders once and applies `?project=` after mount, with pushState and popstate.
- **Draft post** `portfolio-ep05-v1` (`draft: true`), with its LinkedIn and short versions in `docs/posts/`.
- **CLAUDE.md:** status set to "v1 live", plus palette and career-stat rules.

## Checks
- `npm run lint`, `npm run typecheck` and `npm run build` pass. Every route is static or SSG.
- Screenshots of every page (home, about, log, post, case study, 404) at 375px and 1280px, in light and dark.
- **Lighthouse, live site (www.oluakele.com), run locally:**

| Page | Mobile perf (quiet run) | Desktop perf | A11y | Best practices | SEO |
|---|---|---|---|---|---|
| Home | 93 | 100 | 100 | 100 | 100 |
| About | 96 | 100 | 100 | 100 | 100 |
| Log | 97 | 100 | 100 | 100 | 100 |
| Post (Ep05) | 96 | 100 | 100 | 100 | 100 |
| Case study | 94 | 100 | 100 | 100 | 100 |

- **Accessibility** was 100 on every page in every run.
- **Mobile performance is noisy on this laptop.** Later runs of the same pages dropped as low as 47 while TBT jumped to 3.3s, from local CPU contention. Real LCP in the traces equals first paint (0.4–1.4s). The simulated 2.2–2.6s LCP comes from Lighthouse's throttling model counting JS downloads.
- **PageSpeed Insights' keyless API** was over its daily quota, so Google-side numbers are still to be confirmed at pagespeed.web.dev.
- **What went wrong along the way:**
  - Local servers started with `run_in_background` kept running after the task was stopped (Windows leaves the child `node` processes). 27 were left over and skewed early Lighthouse runs, and one stale dev server crashed after production builds overwrote `.next`. All were stopped.
  - `display: "optional"` for Inter was tried and reverted; it didn't change LCP.

## Decisions
- **Stat tiles, not a chart,** for three before/after numbers.
- **Violet → rose palette** (Olu). Accent darkened for text contrast; one font kept (Inter), unlike the reference site's two.
- **Career stats from the résumé only.** Other résumé versions are used only where their numbers agree.
- **The portfolio is a project with `featured: false`,** instead of a separate list for log projects.

## Next
- Confirm mobile performance on pagespeed.web.dev (home and case study were 93–94 locally).
- Olu: edit the About bio, and approve `portfolio-ep05-v1` (flip `draft`) plus its LinkedIn post.
- Olu: share the other résumés; add only the stats that agree with the current one.
- The ShelfReady eval result goes in `projects.ts` `headline`, and the card, case study and proof strip pick it up.
- Wherewise: add a link and one-liner when it's ready.
