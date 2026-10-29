# Olu Akele — Portfolio Site

Personal portfolio for Olu Akele, a product manager by trade, positioned as a **forward deployed product manager**: the space between a forward deployed engineer and a product manager. The site shows both sides. On the product side, Olu frames the customer problem, sets strategy and runs the roadmap. On the builder side, he ships the system himself and proves it works with evals.

The site's job: in under 60 seconds, a hiring manager should see (1) how Olu thinks about a problem as a PM, (2) that he builds it himself, and (3) the measured result, with proof it's real (live demo, repo, video, build log).

## Current status
<!-- /end-session updates this block. Keep it to 5 lines. -->
- Phase: **v2 live** + session 09 (docs/REDESIGN.md): Simple/Technical switch (Simple default), Simple copy everywhere, Off the clock (Running, Giants counter, Spurs) on home + /about
- Last session: 09-simple-technical
- Next target: ShelfReady Ep08 (P6 Ship) → Loom as videoUrl, case study from its docs/CASE_STUDY.md, Groq results, Ep08 + launch posts
- Domain: **oluakele.com** (Porkbun). DNS stays at Porkbun; records come from Vercel's Domains page.
- Waiting on Olu: approve draft post portfolio-ep06-two-audiences; Red Pen posts need `commit` as a URL before they import; LinkedIn series per docs/posts/SCHEDULE.md (send URLs → linkedinUrl); PageSpeed mobile score; résumé download on hold; Wherewise "Live soon"

## Positioning (updated Oct 17)
- **Role line:** "Built to multiply output. AI-built, eval-proven." (Oct 18; title: AI product builder). Olu uses AI to build solutions that multiply output and performance and address customer needs. "Forward deployed PM" is no longer the headline.
- **No job-search signal** in public UI (no "Open to PM roles"); the top bar shows "Now building" instead.
- **Both halves, every time.** Each project and each log entry shows the PM thinking (who it's for, the problem, the trade-offs, the roadmap) *and* the builder proof (what shipped, the eval number, what broke). Never one without the other.
- **Differentiator:** a PM who builds, measures with evals, and documents every step in public.

## Stack
- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui, the same stack and design system as the project apps, so everything looks like one body of work
- MDX for case studies (`content/case-studies/*.mdx`) and log posts (`content/log/*.mdx`)
- Deployed on Vercel Hobby with a custom domain `oluakele.com` (registrar: Porkbun, DNS stays at Porkbun); each project lives on its own subdomain (e.g. `shelfready.oluakele.com`)
- No database, no CMS, no client-side data fetching. Static pages only.

## Pages (all v1)
- `/`: home (sections below)
- `/projects/[slug]`: case study page rendered from MDX
- `/log`: build-in-public feed, one post per episode, filterable by project. **Required for v1.**
- `/log/[slug]`: a single log post
- `/about`: bio, headshot, résumé PDF download, links (GitHub, LinkedIn, email, booking)

## Home page, in order
1. **Hero:** headshot, name, title line, one-paragraph pitch, 3 buttons: *See the work* · *Book a call* (Google Calendar appointment page) · *LinkedIn*.
2. **Now building:** the latest log post (e.g. "ShelfReady · Episode 03: Audit shipped") with a link. Reads from `content/log`, so it updates on its own.
3. **Project cards:** headline number first, then one-liner, tags, Demo / Repo / Video / Case study / "N log posts" links.
4. **How I work (4 steps, PM + builder):** Frame the problem and the customer → Plan the roadmap and trade-offs → Build the AI into the real system → Prove it with evals, then iterate.
5. **Proof strip:** counters from content (episodes shipped, evals run, projects), plus talks or wins once they exist. Every number links to its source. No unlinked claims.
6. **Contact:** email, LinkedIn, booking link.

## Hero copy (draft; Olu will edit)
**Forward deployed product manager · AI product builder**
I'm a product manager who builds. I work inside messy real-world systems (catalogs, APIs, databases), figure out what the customer needs, ship the AI that does it, and prove it works with evals. Every step is documented in public.

## Stats (to discuss with Olu)
Only stats with a source. Two kinds:
- **Build stats (automatic):** from content: episodes shipped, eval tasks run, headline eval deltas.
- **PM career stats (Olu supplies):** e.g. products launched, adoption or revenue impact, team size. Each one needs a role and year next to it, and should match the résumé. Live in `content/career.ts`. Source of truth (Olu, Oct 17): `Oluwaseye_Akele_Resume_CO.pdf`; every number must match it, and the home Proof section leads with its AI results. Never invent placeholder stats.

## Content model
**Two ways to read (Oct 28, docs/REDESIGN.md):** copy fields take `Copy = string | { simple, technical }` (lib/copy.ts) and render with `<Txt>`; Simple is the default view, Technical keeps the original wording. Simple copy: plain English, no acronyms, about an 8th-grade reading level, never a changed number. Glossary terms in Simple copy: `[[term]]` or `[[shown|term]]` (content/glossary.ts).

Project data lives in `content/projects.ts` and log posts live in `content/log/*.mdx`. Pages read from these; never hard-code details in components.

```ts
export type Project = {
  slug: string;                 // "shelfready"
  title: string;                // "ShelfReady — Agent-Ready Storefront"
  oneLiner: string;             // one sentence, plain language
  customer: string;             // who it's for, e.g. "Shopify merchants selling to AI shopping agents"
  status: "shipped" | "in-progress" | "planned";
  headline?: string;            // the eval number, e.g. "Agent shopping success 41% → 88%"
  tags: string[];               // "MCP", "Shopify", "Evals", "Product strategy", ...
  demoUrl?: string;
  repoUrl?: string;
  videoUrl?: string;            // Loom
  caseStudy?: string;           // MDX slug
  order: number;
};

// Frontmatter of each content/log/*.mdx
export type LogPost = {
  slug: string;                 // "shelfready-ep02-catalog"
  project: string;              // Project.slug
  episode: number;              // 2
  title: string;
  date: string;                 // ISO
  summary: string;              // one sentence, used on cards and for social previews
  summarySimple?: string;       // plain-English summary for the Simple view of /log
  pmTakeaway: string;           // the product lesson in one line
  buildTakeaway: string;        // the technical lesson in one line
  metric?: string;              // e.g. "150 products seeded, 52 messy"
  linkedinUrl?: string;         // added after the post goes out
  commit?: string;              // commit or PR link as proof
  draft: boolean;               // true: shows in `npm run dev`, never in production builds
};
// Validated with zod in lib/log.ts; a bad post fails the build.
```

Seed projects, in site order (Oct 17, v2; replaces the earlier lists). Build details and "what counts as done" are in `docs/case-studies.md`; planned builds show no numbers until measured. Site build numbers follow this order (docs/DECISIONS.md):
1. ShelfReady — Agent-Ready Storefront (`shelfready`, live, real numbers)
2. Red Pen — Support copilot with an eval harness (`redpen`, planned; repo github.com/OluTechTalk/redpen; case-studies.md Build 01)
3. Roadmap scorer (`roadmap-scorer`, planned; Build 03)
4. Restaurant allergen assistant, working title (`allergen-assistant`, planned)
5. Model router (`model-router`, planned; Build 02)
- Next up (quiet row, no links): Activation flow (Build 04), Weekly digest (covers the weekly metrics reviewer), Interview synthesiser, OpenAPI → Agent Toolkit
- Earlier work: Wherewise (relocation recommender), "Live soon", no link
- Removed: Eval & Monitoring Harness (became Red Pen), Trustworthy Ask-Your-Data Analyst

**Build order:** Red Pen → Roadmap scorer → allergen assistant → Model router, then Next up. Python for eval and analysis repos, TypeScript for anything with a UI.

`Project.dataNote?: "real" | "synthetic" | "anonymised" | "simulated"` shows as a small label on plates and case studies once set; leave it unset for planned builds.

## Case study rules
From `docs/case-studies.md`, "Ground rules":
1. **Every number on the portfolio comes from a run Olu did.** The prototype placeholders (54% to 88%, -74%, 11 to 5, 22% to 31%) stay off the site until a measured run replaces them.
2. **Label the data.** Synthetic data is called synthetic (`dataNote`); real data from a job needs permission and anonymising.
3. **No invented users.** No real users → report eval and simulation results, not adoption or retention.
4. **Keep the receipts.** Every eval run is saved as CSV/JSON with date, model, prompt version and score; charts are drawn from these files.
5. **One case-study format.** Problem, Bet, Result, plus role, tools and time spent (the case-file plates).
- No case study page until a build ships.

`Project` also carries the plate fields: `build`, `kind`, `meta`, `problem`, `bet`, `result`, `metric` (measured only), `plate` (artifact + color).

## Case study MDX template
Sections, in order: **Customer & problem** · **Strategy & scope** (what I chose not to build, and why) · **What I built** (architecture diagram) · **Key decisions & trade-offs** · **Results** (headline number + before/after chart) · **What broke** · **Roadmap / next steps** · **Build log** (links to every episode post) · **Links**.

## Log post template
Every episode gets one post. The source material is the repo's session log, DECISIONS.md and commits. The full template (site post, LinkedIn post, short post, video notes) is in `docs/POST_TEMPLATE.md`. New posts start as `draft: true`.

**Import pipeline:** the build repos write `docs/posts/NN-slug.md`; `npm run import-posts` reads `../shelfready` and `../redpen` (read only), refuses anything that looks like a secret, validates frontmatter with `lib/log-schema.ts`, and writes `content/log/<slug>.mdx` (draft: true) plus `docs/posts/<slug>.linkedin.md`, `.short.md`, `.video.md`. Existing slugs are never overwritten. Olu approves each post; then flip `draft: false` and push. Older hand-written social posts are `docs/posts/<slug>.md`.

## Design rules
- **Editorial redesign (Oct 17)** per `docs/design/portfolio-design-brief.md` and the reference prototype `docs/design/portfolio-hedgehog.html`: stacked condensed name + arched photo, ticker, offset case-file plates (Problem / Bet / Result), quill-spike bands, process rail, About strip, Index, ink contact block as the site footer. Styles live in `app/editorial.css`.
- **Fonts:** Archivo (display, width 62%), Instrument Sans (body), DM Mono (utility), all via `next/font` (self-hosted). This replaces the earlier one-font rule.
- **Palette A (Olu, Oct 17):** tuned from the hero photo with the brief's matcher: espresso ink, lavender paper, berry-rose band, amber signal; plates amber / rose-buff / dusty rose / ink. Tokens in `app/globals.css`. No teal/LinkedIn-blue. Keep every text pair ≥ 4.5:1 (all measured ≥ 5.1).
- **Photos:** `public/photos/` (hero arch = olu-hero.jpg; About strip = olu-about-1/2.jpg; olu-side.jpg spare).
- Project cards lead with the headline number, not the tech stack.
- "In progress" and "planned" cards are shown on purpose; they signal momentum. Style them clearly but quietly.
- Every page must score 95+ on Lighthouse performance and accessibility. Images via `next/image`, alt text on everything (including the headshot).
- Mobile first: the home page must read well at 375px wide.
- Each log post has Open Graph tags (title, summary, image) so links shared to LinkedIn preview well.

## Rules
- Small slices; propose a plan and wait for OK before touching more than 3 files.
- No analytics or tracking scripts without asking (Vercel Web Analytics is fine if asked).
- No personal info beyond what's in this file; never commit the résumé source with a phone number or home address.
- Keep dependencies minimal; ask before adding a package.
- Log posts never include secrets, keys, store IDs or env values, even redacted.

## Commands
- `npm run dev` · `npm run build` · `npm run import-posts` (add `--dry-run` to preview) · `npm run lint && npm run typecheck` before every commit

## Session workflow
- Start with `/start-session`, end with `/end-session` (same commands as the ShelfReady repo; copy `.claude/commands/` over).
- Session logs go in `docs/sessions/`.

## Next.js agent notes
This Next.js version has breaking changes; follow the rules in AGENTS.md.

@AGENTS.md
