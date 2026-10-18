# Session 08: Add the new builds and the content pipeline

**Date:** 2026-10-17
**Goal:** Reconcile the build list with `portfolio-add-builds-v2.md` (Red Pen replaces the support copilot card; allergen assistant added; Next up row), add `dataNote`, and build `npm run import-posts` to pull drafts from the sibling repos.

## Plan
1. Docs: `docs/case-studies.md` (moved from `docs/design/`), `docs/POST_TEMPLATE.md` replaced with the version that has video notes (copied from Red Pen's `docs/post-template.md`, identical source).
2. `content/projects.ts`: ShelfReady, then Red Pen, Roadmap scorer, allergen assistant, Model router as plates; Activation flow, Weekly digest, Interview synthesiser, OpenAPI → Agent Toolkit as Next up. Optional `dataNote`, unset for planned builds.
3. Home: five plates, a quieter Next up row under them (no links); `dataNote` label on plates and case studies. Check 375px and dark mode.
4. `scripts/import-posts.mjs`: reads `../shelfready/docs/posts` and `../redpen/docs/posts` (read only), validates frontmatter with the existing zod schema, safety-checks for secrets, writes `content/log/<slug>.mdx` with `draft: true` plus `.linkedin.md`, `.short.md`, `.video.md` next to the social posts.
5. CLAUDE.md: build order, seed list, case study rules, language rule. Lint, typecheck, build, commit locally. No push until Olu says OK.

## What was done
- **Builds:** Red Pen replaces the support copilot card (repo linked). Restaurant allergen assistant added (working title) with a new "ask the kitchen" outline sketch. Roadmap scorer and Model router kept. Activation flow moved to Next up; Weekly metrics reviewer renamed Weekly digest; OpenAPI → Agent Toolkit added to Next up. No numbers on any planned build.
- **Build numbers** follow site order (01 ShelfReady … 05 Model router), not `docs/case-studies.md` numbering, so there aren't two "Build 01" cards (docs/DECISIONS.md).
- **Home:** five plates, a quieter Next up row under them (titles and one-liners, no links), Repo/Video links on plates. On mobile, planned plates are full width with shorter art.
- **`dataNote`:** optional field, shown as a small label on plates and a pill on case studies. Unset everywhere for now.
- **`npm run import-posts`** (`scripts/import-posts.mjs`): secret check (AQ., sk-, shpat_, .myshopify.com, client_secret, ANTHROPIC_API_KEY=value), frontmatter validated by the shared `lib/log-schema.ts`, existing slugs never overwritten, `--dry-run` and `--root` options. `yaml` declared as a devDependency (already installed via remark-mdx-frontmatter).
- **Docs:** `docs/case-studies.md` (moved), `docs/POST_TEMPLATE.md` (video notes version), `docs/DECISIONS.md` (new), CLAUDE.md (seed list, build order, case study rules, pipeline).

## Checks
- Fixture run (scratchpad): a valid post imported with all three social files; a post with an `sk-` key and a `.myshopify.com` domain refused; an unknown project rejected; an existing slug left alone.
- Real run: ShelfReady has no `docs/posts` yet (skipped). Red Pen `01-data.md` and `02-draft.md` skipped: `commit` is a local hash ("bb4eaa0 (local repo, not yet pushed)"), and the schema needs a URL. Nothing imported.
- Lint, typecheck and build pass. Home screenshots at 1440 and 375, light and dark.

## Next
- Olu: OK the card copy, then push.
- Red Pen: once its commits are pushed, put the commit URL in each post (or leave `commit` out), then rerun `npm run import-posts`.
