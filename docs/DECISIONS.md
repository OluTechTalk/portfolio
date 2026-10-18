# Decisions

## 2026-10-17: `yaml` as a declared devDependency for the post importer
`npm run import-posts` has to read the frontmatter of the sibling repos' posts before the site's zod schema can check it. `yaml` (2.9.1) is the parser `remark-mdx-frontmatter` already uses to read frontmatter for the site, so it was already installed; declaring it pins what the script relies on instead of leaning on a transitive dependency. No new code is downloaded. The MDX compile check was left out to avoid declaring `@mdx-js/mdx` too: `npm run build` after each import catches a post that won't compile.

## 2026-10-17: Build numbers follow site order
`docs/case-studies.md` numbers its builds 01–04 (Red Pen is its "Build 01"). The site already shows ShelfReady as Build 01, so the home plates and Index number by site order instead: 01 ShelfReady, 02 Red Pen, 03 Roadmap scorer, 04 Restaurant allergen assistant, 05 Model router. Two cards labeled "Build 01" would read as a mistake.

## 2026-10-17: The log schema lives in `lib/log-schema.ts`
The importer runs under plain Node (type stripping), which can't resolve the `@/` alias. The schema moved to a file that imports only zod and takes the project slugs as an argument, so the site build and the importer validate posts with the same rules.
