# Session 02: Design system + home hero

**Date:** 2026-09-28
**Goal:** Design tokens, site header and footer with a theme toggle, the real home hero, and share metadata. This replaces the coming-soon page.

## What was done
- **Font:** Inter via `next/font/google` (self-hosted at build time), exposed as `--font-inter` and used as `font-sans`.
- **Color:** kept shadcn's neutral palette and added one `brand` accent, teal (`bg-brand`, `text-brand`, `text-brand-foreground`). Light mode uses teal-700 (`oklch(0.511 0.096 186)`, about 5.5:1 on white). Dark mode uses a softened teal (`oklch(0.74 0.12 182)`) with dark text on buttons. Focus rings use the accent too.
- **Theme:** the `dark` variant is class-based again. An inline script in `app/layout.tsx` sets `.dark` before first paint, from the saved choice in `localStorage.theme` or else the system setting, and keeps following the system live until the visitor picks a theme. The toggle is `components/theme-toggle.tsx`. Its sun/moon icon is picked by CSS, so there's no hydration mismatch. No new packages (didn't use `next-themes`).
- **Scale tokens** in `globals.css` `@theme`: `text-display`, `text-title`, `text-lead`, `max-w-content` (60rem), `max-w-prose` (40rem), `px-gutter`, `py-section`. Smooth scrolling unless the visitor prefers reduced motion.
- **Layout:** `components/site-header.tsx` (name, Work · Log · About, toggle) and `components/site-footer.tsx` (LinkedIn, GitHub, email, © 2026). Nav points at home sections for now: `/#work`, `/#now-building`, `/#about`.
- **Content:**
  - `content/site.ts`: name, title line, pitch and all links (LinkedIn, GitHub, email, booking). Components read from here.
  - `content/projects.ts`: the `Project` type from CLAUDE.md, with 4 projects seeded (ShelfReady in-progress, 3 planned). One-liners, customers and tags are placeholders, marked `TODO(Olu)`.
- **Hero** (`app/page.tsx`):
  - Headshot: `next/image` with a static import, blur placeholder and `preload`. `priority` is deprecated in Next 16.
  - Text: name, title line and pitch.
  - Buttons: See the work (accent-colored, jumps to `#work`), Book a call and LinkedIn. The last two open in a new tab.
  - Below it: the "Now building" line and an empty `#work` section with a heading for Episode 03's cards.
- **Metadata:** title, description, Open Graph and Twitter tags. `app/opengraph-image.tsx` generates a 1200×630 card (headshot, name, title line, teal top bar) with `next/og`.
- **Headshot fix:** it had been saved as `publicheadshot.jpg` in the project root (a dropped backslash) and was moved to `public/headshot.jpg`.

## Checks
- `npm run lint`, `npm run typecheck` and `npm run build` pass. `/` and `/opengraph-image` are static.
- **Screenshots** from headless Chrome of the production build:
  - At 375px, light and dark: no horizontal overflow, the nav fits on one line, and the buttons stack full-width.
  - At desktop width: the buttons sit in a row.
  - Headless Chrome won't make a window narrower than 504px, so the 375px checks rendered the page inside a 375px-wide frame.
- **Open Graph:** the tags are in the HTML, and the preview image renders. Its title line overflowed at first and was fixed to wrap.
- **Not tested:** clicking the theme toggle (no browser automation in this session). Lighthouse wasn't run either.

## Decisions
- **No `next-themes`.** A 1-line inline script plus a CSS-only icon does the job without a dependency.
- **Accent used sparingly:** the main button, link hover, focus ring and the Now building dot.
- **The OG image uses the default `next/og` font**, not Inter, to avoid shipping a font file. Revisit if the card should match the site font exactly.

## Next
- Olu: confirm the project copy in `content/projects.ts`.
- Episode 03: project cards in `#work` (headline number first; in-progress and planned cards styled quietly).
- Run Lighthouse on the deployed site (target 95+ performance and accessibility).
- Remove the unused starter SVGs in `public/`.
