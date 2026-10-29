# Portfolio redesign brief: two ways to read + off the clock

Oct 28, 2026. Feedback from Olu's wife: the site is too technical for a non-technical reader. Goal: anyone (Olu's mom) understands what he does in 30 seconds, and an engineer can still get every detail. The site itself demonstrates the skill: making complex things simple without losing the depth.

## What the live site does well (keep)
- Strong editorial look: big type, headshot, the lavender/orange palette, the case-study cards with charts.
- Real numbers with sources (Proof section, ShelfReady 78% → 99.3%).
- Clear structure: Work, Process, About, Index, Log, Contact.

## What makes it hard for a non-technical reader
- **Jargon up top:** "AI-BUILT, EVAL-PROVEN", "Focus: AI-built products, agents, evals". "Eval" is never explained.
- **Marquee:** "DISCOVERY/ AGENTS/ EVALS/ ROADMAPS/..." reads as a keyword list.
- **Card subtitles:** "AI AGENTS + MCP + SHOPIFY", "LLM + RAG + PYTHON", "LLM ROUTING". These are meaningless to most visitors and lead each card.
- **"Agent-ready"** is the headline number but isn't explained in plain words.
- **Proof section:** dense metrics (SKUs, ARR, multivariate tests) with no one-line "what this means".
- **Visual bug:** on the ShelfReady chart, the "99.3% AGENT-READY" label overlaps the 99.3% value on the After bar.

## Decision: a separate "Simple / Technical" switch
- A two-way switch in the header next to the theme button. Label idea: **"Explain it: Simply · Technically"**.
- **Simple is the default.** Light/dark stays purely about colors (dark-mode users must not be pushed into the technical version).
- Remember the choice per visitor (localStorage, wrapped in try/catch) and support `?view=technical` so Olu can send engineers a link that opens in technical mode.
- Switching animates gently (cross-fade), with no layout jump. The page must still read fully with JavaScript off (server renders Simple).
- A small one-time hint near the switch: "Prefer the technical details? Flip this."

## How content changes
Every piece of copy that's technical gets a `simple` and a `technical` version. Technical = today's copy (keep it). Simple = plain English, no acronyms, 8th-grade reading level, a concrete everyday comparison where it helps.

Applies to: hero tagline and paragraph, Focus line, marquee, each case-study card (subtitle, Problem, Bet, Result), chart captions, Process steps, Proof items (add a one-line plain meaning under each number), About page, and the log post summaries (posts themselves stay as written).

Example (ShelfReady card, Simple):
- **Subtitle:** Helping online stores get found by AI shopping assistants
- **Problem:** More people now ask an AI assistant to shop for them. When a product's details are vague or missing, the assistant skips it, and the store never knows why.
- **Bet:** Check every product the way an AI shopper would, fix what's missing, and have a person approve each change. Then test real AI shopping before and after.
- **Result:** Almost every product is now fully readable by an AI shopper: 99.3%, up from 78%. In 360 test shopping trips, the AI never bought the wrong item.

Example (hero, Simple): "I'm a product manager who builds with AI. I take messy, complicated problems, make them simple, build the fix, and test it so the results are real, not just a nice demo."

Plain glossary (Simple mode shows these as small dotted-underline tooltips where the term appears; Technical mode hides them):
- **Eval:** a test that scores how often the AI gets it right
- **Agent:** an AI that does tasks for you, not just answers questions
- **MCP:** a standard way to let AI assistants use a company's tools
- **RAG:** the AI looks things up in trusted documents before answering
- **A/B test:** showing two versions to real users to see which works better

## New: "Off the clock" (personal touches)
A short, warm section on the home page (just above Contact) and a fuller version on the About page. Three cards, same visual style as the rest of the site:

1. **Running.** One or two lines in Olu's voice about why he runs (placeholder until Olu supplies a favorite race, distance or a line). Optional later: a Strava link.
2. **New York Giants.** A live counter: **"Days since the Giants' last Super Bowl: N"**, counting from Super Bowl XLVI, Feb 5, 2012. Playful line, e.g. "Still counting. Still watching every Sunday." Computed in the browser after load so it's always correct (no hydration mismatch).
3. **Tottenham Hotspur.** "Spurs taught me patience: 17 years between trophies, and I kept showing up. Then Bilbao: Europa League champions, May 21, 2025." Tie it back: "Same in product: keep shipping through the hard seasons."

Keep it to these three. Personal, not cluttered. No team logos or crests (trademarks); use team colors and type only.

## Facts used (verified Oct 28, 2026)
- NY Giants' last Super Bowl win: Super Bowl XLVI, Feb 5, 2012.
- Tottenham's last trophy: 2025 UEFA Europa League, 1–0 vs Manchester United in Bilbao, May 21, 2025; their first trophy since the 2008 League Cup.

## Prompt for Claude Code (paste into the portfolio session)
```
Redesign: "two ways to read" + "Off the clock". Read CLAUDE.md and the latest docs/sessions log first, then read docs/REDESIGN.md (I'll paste the brief into it). Plan first and wait for my OK; this touches many files, so work in 3 parts and commit + push after each.

PART 1: Simple / Technical switch
- Header switch next to the theme toggle: "Explain it: Simply · Technically". Simple is the default. Light/dark stays colors only.
- Remember the choice per visitor (localStorage in try/catch) and support ?view=technical. Server renders Simple so the page reads fully without JavaScript. Cross-fade on switch, no layout shift, accessible (role="switch", aria-checked, keyboard).
- Content model: every technical string becomes { simple, technical } in content/ (projects.ts, site.ts, proof data, process steps). Today's copy becomes `technical`. Don't hard-code copy in components.
- Glossary tooltips (Eval, Agent, MCP, RAG, A/B test) shown in Simple mode only, as dotted-underline terms with an accessible tooltip.

PART 2: Rewrite copy in Simple
- Audit every page (home, about, case study pages, log index) and list each technical phrase with your proposed Simple version in a table. Use the ShelfReady and hero examples in docs/REDESIGN.md as the standard: plain English, no acronyms, short sentences, about an 8th-grade reading level.
- Show me the table and wait for my edits before applying. Never change a number; only explain it. Proof items get a one-line plain meaning under each number in Simple mode.
- Fix the ShelfReady chart: the "99.3% AGENT-READY" label overlaps the 99.3% value on the After bar.

PART 3: Off the clock
- Three cards above Contact on home, and a fuller version on /about: Running, New York Giants, Tottenham Hotspur, with the copy in docs/REDESIGN.md.
- Giants card: live "Days since the Giants' last Super Bowl" counter from 2012-02-05, computed client-side after mount (no hydration mismatch). No team logos or crests; team colors and type only.
- Ask me for a running line (favorite race or distance) and use a clearly marked placeholder until I answer.

Each part: check 375px, light and dark, both Simple and Technical; lint, typecheck and build pass; Lighthouse performance and accessibility stay 95+. Write docs/sessions/NN-simple-technical.md, update Current status in CLAUDE.md, and draft a log post (project: portfolio, draft: true) about designing one site for two audiences.
```
