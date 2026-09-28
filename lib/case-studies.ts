import { readdir } from "node:fs/promises";
import path from "node:path";

import type { ComponentType } from "react";
import { z } from "zod";

import { projects } from "@/content/projects";

const DIR = path.join(process.cwd(), "content", "case-studies");

// Same rule as the log: drafts show in `npm run dev`, never in production.
const includeDrafts = process.env.NODE_ENV !== "production";

const projectSlugs = projects.map((p) => p.slug) as [string, ...string[]];

const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

export const caseStudySchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, digits, dashes"),
  project: z.enum(projectSlugs),
  summary: z.string().min(1),
  updated: isoDate,
  draft: z.boolean(),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;

type CaseStudyModule = { default: ComponentType; frontmatter: unknown };

let cache: Promise<CaseStudy[]> | undefined;

async function loadAll(): Promise<CaseStudy[]> {
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".mdx"));
  return Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod: CaseStudyModule = await import(
        `@/content/case-studies/${slug}.mdx`
      );
      const parsed = caseStudySchema.safeParse(mod.frontmatter);
      if (!parsed.success) {
        throw new Error(
          `content/case-studies/${file}: invalid frontmatter\n${z.prettifyError(parsed.error)}`,
        );
      }
      if (parsed.data.slug !== slug) {
        throw new Error(
          `content/case-studies/${file}: slug "${parsed.data.slug}" must match the file name`,
        );
      }
      return parsed.data;
    }),
  );
}

/** Case studies visible in this build. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  cache ??= loadAll();
  const all = await cache;
  return includeDrafts ? all : all.filter((c) => !c.draft);
}

export async function getCaseStudy(slug: string) {
  const study = (await getCaseStudies()).find((c) => c.slug === slug);
  if (!study) return undefined;
  const mod: CaseStudyModule = await import(
    `@/content/case-studies/${slug}.mdx`
  );
  return { study, Content: mod.default };
}

/** Case-study URL for a project, or undefined if none is visible in this build. */
export async function caseStudyHref(projectSlug: string) {
  const study = (await getCaseStudies()).find(
    (c) => c.project === projectSlug,
  );
  return study ? `/projects/${study.slug}` : undefined;
}
