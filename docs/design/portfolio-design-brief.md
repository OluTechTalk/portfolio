# Portfolio website: design brief

Handoff for Claude Code. It describes the concept, visual system, layout and content model for an AI product manager's portfolio. A working reference prototype is in `portfolio-hedgehog.html` (single file, open it in a browser). Match its structure and feel, and adapt it to the project's framework.

Case-study content and build details live in `../case-studies.md`.

---

## 1. Concept

An editorial, Readymag-style portfolio where **the layout carries the PM context**. Each case study is shown as the product artifact itself (an eval chart, a cost chart, a roadmap board, a funnel), with a short Problem / Bet / Result file underneath. A visitor who only skims the pictures should still understand what was built and what moved.

**Audience:** Hiring managers and recruiters for senior and AI product manager roles. First pass is a 60-second skim. The second pass reads one case study in depth.

**Personality:** Bold, warm, a little playful, precise about numbers. Big condensed type, a natural hedgehog-derived palette, quill-spike edges, and restrained motion.

## 2. Principles

1. **Structure is information.** Plates are real charts and boards from the work, not decoration. Build numbers (01 to 04) follow the actual build order.
2. **Real numbers only.** Every headline figure comes from a results file. Until then, show "sample" next to it. Never ship invented metrics.
3. **One bold move per section.** The giant name, the moss statement band and the ink contact block are the loud moments. Everything else stays quiet.
4. **Type is the personality.** Heavy, extra-condensed display type, a clean text face and a mono utility face.
5. **Motion supports reading.** Content is fully visible without scrolling or JavaScript. Motion only adds to it.

## 3. Page structure

| # | Section | What it does |
|---|---|---|
| 1 | Top bar (mono) | Name / Portfolio year, section links, status dot "Open to PM roles" |
| 2 | Hero | Stacked name (line 1 solid, line 2 outlined), role line "Product manager for **AI products**", arched portrait photo, intro sentence, focus facts, rotating "scroll" badge |
| 3 | Ticker | Ink band with scrolling PM verbs: Discovery / Evals / Roadmaps / Experiments / Launch / Retention |
| 4 | Case studies | Four offset plates on a 12-column grid (see section 5) |
| 5 | Quill spikes + statement | Sawtooth edge into a moss band, one large statement line, then the 6-step process rail |
| 6 | About | Short bio plus two offset photo slots |
| 7 | Index | Ruled list of all builds: number, name, type, outcome. Planned builds use outlined names and "Planned" |
| 8 | Quill spikes + contact | Ink band, giant "Let's ship something **useful.**", email shown as text with a Copy button, colophon |

Optional later: a page per case study with the full write-up, the chart from real data, and links to the repo and the Artifact.

## 4. Visual system

### Colour tokens (hedgehog palette)

Sampled from typical hedgehog colouring: dark quill tips, pale quill bands, buff face fur, moss and leaf litter. **Retune from the owner's photos** (see 4.4).

```css
:root {
  --quill: #231910;        /* dark quill tip: text, chart strokes */
  --bg: #E2DFCC;           /* lichen paper */
  --fg: #231910;
  --muted: #6A604D;
  --rule: rgba(35, 25, 16, 0.2);
  --accent: #4B5A2A;       /* moss: statement band, hover rows */
  --on-accent: #F1EBD7;
  --accent-text: #4B5A2A;  /* accent used as text on --bg */
  --ink-bg: #231910;       /* ticker, contact */
  --ink-fg: #E2DFCC;
  --signal: #E08A1E;       /* autumn leaf: highlights, status dot, focus ring */
  --chip: #F3EDDA;         /* pale quill band: metric tags */
  --plate-amber: #E39A2D;
  --plate-buff: #CDA06A;   /* face and belly fur */
  --plate-ink: #231910;
  --plate-sage: #A9B27A;
}
/* Dark theme: redefine tokens only */
--bg: #16110B; --fg: #EDE4CF; --muted: #A89C84; --rule: rgba(237,228,207,.2);
--accent: #38441E; --accent-text: #B5C27E; --ink-bg: #251B12; --ink-fg: #EDE4CF; --plate-ink: #33261A;
```

Rules: style components only through tokens. Support light and dark themes via `prefers-color-scheme` plus an optional `data-theme` override. Plate colours stay the same in both themes. Keep body text contrast at 4.5:1 or higher and large display text at 3:1 or higher.

### Typography (Google Fonts)

| Role | Face | Use |
|---|---|---|
| Display | **Archivo** variable, width 62%, weight 800 to 900, uppercase, line-height 0.86 | Name, section titles, plate titles, statement |
| Body | **Instrument Sans** 400 to 600 | Paragraphs, Problem/Bet/Result text |
| Utility | **DM Mono** 400 to 500, 0.75rem, uppercase, letter-spacing 0.08em | Labels, meta lines, tags, nav |

Scale (fluid with `clamp`): name up to ~15rem (fit to its column with JS so any name length works), section titles up to 9rem, statement up to 6rem, plate titles up to 2.75rem, body 1rem to 1.5rem. Use the outlined style (`-webkit-text-stroke`, transparent fill) for the name's second line and one emphasised word in the statement.

### Layout

- Max width 1480px, side gutter at least 24px (use `max(24px, env(safe-area-inset-*))`)
- 12-column grid for plates with offset placements: 01 at cols 1 to 7 (5:4), 02 at cols 9 to 12 dropped lower (3:4), 03 at cols 2 to 6 (1:1), 04 at cols 7 to 12 (4:3)
- Section padding `clamp(56px, 9vw, 128px)`
- Below 800px: single column, slight width offsets kept for rhythm, process rail 3 by 2, index rows stack

### 4.4 Matching the palette to photos

The prototype has a working palette matcher: it samples a photo (k-means, 7 clusters) and maps the clusters to roles. Use the same mapping when tuning by hand:

| Role | Pick from the photo |
|---|---|
| `--quill` / `--fg` | Darkest cluster, lightness pushed to ~10% |
| `--bg` | Lightest cluster's hue, saturation 10 to 28%, lightness ~86% |
| `--accent` | Most colourful mid-tone cluster, darkened until cream text on it reaches 6:1 |
| `--signal` | Next colourful cluster at least 35° of hue away, lightness ~52% |
| Plates | Signal (lighter), a third photo colour, quill, and a pale accent |

Decide on one hero photo as the palette source and keep it fixed. Do not re-tune per visitor in production.

### Signature motif: quill spikes

A sawtooth edge where a band starts (statement and contact), in the band's own colour, built with two `linear-gradient`s (45° and 315°), tile 40px, height 20px. The photo placeholder uses diagonal quill banding (`repeating-linear-gradient` of quill, buff and chip).

## 5. Components

### Case-file plate

```
figure.plate
  .frame (aspect ratio per slot, plate colour background)
    .tag   -> big metric ("54% to 88%") + mono label ("Eval pass rate")
    .art   -> the artifact: SVG chart or HTML board drawn from results data
  figcaption
    title + "Build 0N"
    meta line (mono): tools / type of work
    dl: Problem / Bet / Result (ruled rows, mono labels)
```

Artifacts per build:
- **01 Support copilot:** line chart of pass rate by prompt version (V1 to Vn) with a dashed ship-gate line. Data: `results/v*.csv`
- **02 Model router:** two bars, cost per task before and after, delta in display type. Data: `results/routing.csv`
- **03 Roadmap scorer:** Now / Next / Later board on the dark plate
- **04 Activation flow:** horizontal funnel bars, final step highlighted in accent

Charts are drawn to scale from the data files, use tokens for colours, and leave room for labels.

### Process rail
Six buttons (Frame, Discover, Prototype, Evaluate, Ship, Learn). The selected one is inverted. A panel shows the step name in display type, one sentence, and "Artifact: ..." in mono. Use `aria-current` and an `aria-live` panel.

### Index row
Grid: number | name (display) | type (muted) | outcome (mono, right-aligned). On hover the row fills with the accent colour and shifts in by 16px.

### Contact
Show the email as selectable text with a Copy button (clipboard with a select-text fallback). Do not rely on `mailto:` alone.

## 6. Motion

- Reveal on scroll: translate up 32px, 0.9s ease-out. **No opacity-0 start states.**
- Parallax inside chart plates (art scaled 1.26, shifted by scroll position). HTML boards stay static.
- Name letters thin from weight 900 to 200 on hover.
- Ticker loops (34s), badge rotates (24s), status dot pulses.
- `prefers-reduced-motion`: turn all of the above off.

## 7. Photos

- Owner supplies 3 or more photos. Slots: hero arch (4:5), about strip (two at 4:5)
- Export AVIF or WebP with a JPEG fallback, 1600px on the long edge, under 300KB each
- Real alt text describing the photo. Keep faces clear of overlaid text
- Use `object-fit: cover` and set `object-position` for each photo's focal point

## 8. Content model

```ts
type CaseStudy = {
  build: number;            // 1-4, matches build order
  slug: string;
  title: string;            // "Support copilot"
  meta: string;             // "Claude Code + Claude API / eval harness"
  metric: { value: string; label: string; sample: boolean };
  problem: string;
  bet: string;
  result: string;
  artifact: "line" | "bars" | "roadmap" | "funnel";
  dataFile: string;         // results file the chart is drawn from
  plateColor: "amber" | "sage" | "ink" | "buff";
  status: "done" | "planned";
  links?: { repo?: string; artifact?: string };
};
```

Keep content in `content/case-studies.json` (or MDX) so the plates, index and per-case pages read from one source. Show "(sample)" automatically when `metric.sample` is true.

## 9. Tech notes

- Static-first. Astro or plain HTML/CSS/JS is enough; a heavy framework is unnecessary. No animation libraries are needed.
- Performance: LCP under 2.5s, fonts with `display=swap` and real fallbacks, images lazy-loaded except the hero
- SEO: title "[Name] / AI Product Manager", meta description, Open Graph image (name plus hero photo on lichen)
- Accessibility: visible focus ring (signal colour), keyboard-operable rail, semantic headings, colour never the only signal
- No horizontal scroll at 375px

## 10. Acceptance checklist

- [ ] All 8 sections built and readable with JS off
- [ ] Name fits its column at any length (fit-text)
- [ ] Plates drawn from data files, with "(sample)" shown where numbers aren't measured
- [ ] Light and dark themes both checked
- [ ] Reduced motion respected
- [ ] Photos placed, palette tuned to the chosen hero photo
- [ ] Phone (375px) and desktop (1440px) checked, no sideways scroll
- [ ] Lighthouse: performance 90+, accessibility 95+

## 11. Needed from the owner

1. Full name as it should appear
2. Contact email and links (LinkedIn, GitHub)
3. Hero and about photos, plus which one sets the palette
4. Real results for each build, or confirmation to show "sample"
5. Two-line bio for About
