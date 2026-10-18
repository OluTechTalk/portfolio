import { z } from "zod";

// The log post frontmatter schema, shared by lib/log.ts (the site build) and
// scripts/import-posts.mjs (which runs under plain Node, so this file imports
// only zod and takes the project slugs as an argument).

// YAML may hand back an unquoted date as a Date; normalize to YYYY-MM-DD.
const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

// LogPost from CLAUDE.md, plus `draft`. Unknown keys are rejected so typos
// fail the build instead of silently dropping a field.
export function makeLogPostSchema(projectSlugs: [string, ...string[]]) {
  return z.strictObject({
    slug: z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, digits, dashes"),
    project: z.enum(projectSlugs),
    episode: z.number().int().min(0),
    title: z.string().min(1),
    date: isoDate,
    summary: z.string().min(1),
    pmTakeaway: z.string().min(1),
    buildTakeaway: z.string().min(1),
    metric: z.string().min(1).optional(),
    linkedinUrl: z.url().optional(),
    commit: z.url().optional(),
    draft: z.boolean(),
  });
}
