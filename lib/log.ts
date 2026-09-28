import { readdir } from "node:fs/promises";
import path from "node:path";

import type { ComponentType } from "react";
import { z } from "zod";

import { projects } from "@/content/projects";

const LOG_DIR = path.join(process.cwd(), "content", "log");

// Drafts are visible in `npm run dev` and never in production builds.
const includeDrafts = process.env.NODE_ENV !== "production";

const projectSlugs = projects.map((p) => p.slug) as [string, ...string[]];

// YAML may hand back an unquoted date as a Date; normalize to YYYY-MM-DD.
const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

// LogPost from CLAUDE.md, plus `draft`. Unknown keys are rejected so typos
// fail the build instead of silently dropping a field.
export const logPostSchema = z.strictObject({
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

export type LogPost = z.infer<typeof logPostSchema>;

type LogModule = { default: ComponentType; frontmatter: unknown };

let cache: Promise<LogPost[]> | undefined;

async function loadAllPosts(): Promise<LogPost[]> {
  const files = (await readdir(LOG_DIR)).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod: LogModule = await import(`@/content/log/${slug}.mdx`);
      const parsed = logPostSchema.safeParse(mod.frontmatter);
      if (!parsed.success) {
        throw new Error(
          `content/log/${file}: invalid frontmatter\n${z.prettifyError(parsed.error)}`,
        );
      }
      if (parsed.data.slug !== slug) {
        throw new Error(
          `content/log/${file}: slug "${parsed.data.slug}" must match the file name`,
        );
      }
      return parsed.data;
    }),
  );
  return posts.sort(
    (a, b) => b.date.localeCompare(a.date) || b.episode - a.episode,
  );
}

/** Posts visible in this build, newest first. */
export async function getPosts(): Promise<LogPost[]> {
  cache ??= loadAllPosts();
  const posts = await cache;
  return includeDrafts ? posts : posts.filter((p) => !p.draft);
}

export async function getPost(slug: string) {
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) return undefined;
  const mod: LogModule = await import(`@/content/log/${slug}.mdx`);
  return { post, Content: mod.default };
}

export async function getLatestPost(): Promise<LogPost | undefined> {
  return (await getPosts())[0];
}

/** Previous and next episode within the same project. */
export async function getAdjacentPosts(post: LogPost) {
  const siblings = (await getPosts())
    .filter((p) => p.project === post.project)
    .sort((a, b) => a.episode - b.episode);
  const i = siblings.findIndex((p) => p.slug === post.slug);
  return { prev: siblings[i - 1], next: siblings[i + 1] };
}

export async function countPostsByProject(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const post of await getPosts()) {
    counts[post.project] = (counts[post.project] ?? 0) + 1;
  }
  return counts;
}

export { formatDate, formatEpisode } from "@/lib/format";
