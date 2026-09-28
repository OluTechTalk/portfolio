# Session 01: Scaffold + "coming soon" page

**Date:** 2026-09-28
**Goal:** Minimal "coming soon" page, pushed to GitHub, ready to import into Vercel and connect to oluakele.com.

## What was done
- Scaffolded with `create-next-app@latest` (Next.js 16.3.6, App Router, TypeScript, Tailwind v4, ESLint, `@/*` alias, no `src/`).
- Initialized shadcn/ui with defaults (style `base-nova`, base color neutral). Added `components.json`, `components/ui/button.tsx`, `lib/utils.ts`. The `cn` helper now comes from the `cn` package (shadcn's own, from `shadcn-ui/cn`) instead of clsx + tailwind-merge.
- CLAUDE.md: project context from `portfolio-CLAUDE.md`, with `@AGENTS.md` kept at the bottom (the Next.js agent rules that `create-next-app` generated).
- `app/page.tsx`: name, title line, hero paragraph from CLAUDE.md, the "coming soon" line, and LinkedIn and email links.
- `app/layout.tsx`: removed the Geist Google fonts, set the page `<title>`, meta description and `metadataBase` (https://oluakele.com), and `color-scheme: light dark`.
- `app/globals.css`: system font stack for sans and mono. Dark mode now follows the OS setting (`prefers-color-scheme`) instead of a `.dark` class, because there's no theme toggle yet.
- `package.json`: added `typecheck` (`next typegen && tsc --noEmit`). `lint` (`eslint`) already existed.

## Checks
- `npm run lint && npm run typecheck && npm run build` all pass. `/` prerenders as static content.
- The built HTML has the expected title, meta description and color-scheme tag.

## Decisions
- **System dark mode, no toggle.** It's enough for a one-page placeholder. If a toggle is added later, switch the `dark` custom variant back to a class and add a theme provider.
- **System font.** No web-font download, which keeps the page fast. Revisit if the full site uses one Google font.

## Next
- Import the repo into Vercel (framework preset: Next.js, no env vars).
- Add oluakele.com in Vercel → Domains, and create the DNS records it shows in Porkbun.
- Remove the unused starter SVGs in `public/` when the real site is built.
