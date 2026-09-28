# Olu Akele — Portfolio Site

Personal portfolio for Olu Akele, a product manager by trade, positioned as a **forward deployed product manager**: the space between a forward deployed engineer and a product manager. The site shows both sides. On the product side, Olu frames the customer problem, sets strategy and runs the roadmap. On the builder side, he ships the system himself and proves it works with evals.

The site's job: in under 60 seconds, a hiring manager should see (1) how Olu thinks about a problem as a PM, (2) that he builds it himself, and (3) the measured result, with proof it's real (live demo, repo, video, build log).

## Current status
<!-- /end-session updates this block. Keep it to 5 lines. -->
- Phase: Episode 02 done (design system: Inter + teal accent, header/footer, theme toggle, home hero, Now building line, OG image)
- Last session: 02-design-hero
- Next target: Episode 03, project cards in #work from content/projects.ts
- Domain: **oluakele.com** (Porkbun). DNS stays at Porkbun; records come from Vercel's Domains page.
- Blockers: Olu to confirm project one-liners/customers/tags in content/projects.ts (TODO)

## Positioning (decided Sep 27)
- **Title line:** Forward deployed product manager · AI product builder
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
- **PM career stats (Olu supplies):** e.g. products launched, adoption or revenue impact, team size. Each one needs a role and year next to it, and should match the résumé.

## Content model
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
  pmTakeaway: string;           // the product lesson in one line
  buildTakeaway: string;        // the technical lesson in one line
  metric?: string;              // e.g. "150 products seeded, 52 messy"
  linkedinUrl?: string;         // added after the post goes out
  commit?: string;              // commit or PR link as proof
};
```

Seed projects in this order:
1. ShelfReady — Agent-Ready Storefront (in-progress)
2. OpenAPI → Agent Toolkit (planned)
3. Trustworthy Ask-Your-Data Analyst (planned)
4. Eval & Monitoring Harness (planned)
5. Earlier work: Relocation Recommender, Wearwise (Olu will supply links and one-liners)

## Case study MDX template
Sections, in order: **Customer & problem** · **Strategy & scope** (what I chose not to build, and why) · **What I built** (architecture diagram) · **Key decisions & trade-offs** · **Results** (headline number + before/after chart) · **What broke** · **Roadmap / next steps** · **Build log** (links to every episode post) · **Links**.

## Log post template
Every episode gets one post. The source material is the repo's session log, DECISIONS.md and commits. The full template and the matching LinkedIn post are in `episode-content-kit.md`.

## Design rules
- Clean and fast: system font or one Google font, lots of whitespace, light + dark mode.
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
- `npm run dev` · `npm run build` · `npm run lint && npm run typecheck` before every commit

## Session workflow
- Start with `/start-session`, end with `/end-session` (same commands as the ShelfReady repo; copy `.claude/commands/` over).
- Session logs go in `docs/sessions/`.

## Next.js agent notes
This Next.js version has breaking changes; follow the rules in AGENTS.md.

@AGENTS.md
