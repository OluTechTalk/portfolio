import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/content/projects";
import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { formatDate, formatEpisode } from "@/lib/format";
import { getPosts } from "@/lib/log";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getCaseStudies()).map((c) => ({ slug: c.slug }));
}

// Drafts (and anything else not generated above) 404 in production.
export const dynamicParams = false;

const statusLabel = {
  shipped: "Shipped",
  "in-progress": "In progress",
  planned: "Planned",
} as const;

async function load(slug: string) {
  const found = await getCaseStudy(slug);
  if (!found) return undefined;
  const project = projects.find((p) => p.slug === found.study.project);
  if (!project) return undefined;
  return { ...found, project };
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = await load(slug);
  if (!found) return {};
  const title = `${found.project.title} · Case study`;
  return {
    title,
    description: found.study.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${slug}`,
      title,
      description: found.study.summary,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: found.study.summary,
    },
  };
}

const linkClass = "underline underline-offset-4 hover:text-brand";

export default async function CaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const found = await load(slug);
  if (!found) notFound();
  const { study, project, Content } = found;

  // Build log lists every post for this project visible in this build.
  const posts = (await getPosts())
    .filter((p) => p.project === project.slug)
    .sort((a, b) => a.episode - b.episode);

  const links = [
    project.demoUrl && { label: "Live demo", href: project.demoUrl },
    project.repoUrl && { label: "Source on GitHub", href: project.repoUrl },
    project.videoUrl && { label: "Video walkthrough", href: project.videoUrl },
  ].filter((l): l is { label: string; href: string } => Boolean(l));

  return (
    <main className="mx-auto w-full max-w-content px-gutter pt-10 pb-section sm:pt-16">
      <article className="max-w-prose">
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Case study</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
              project.status === "planned"
                ? "text-muted-foreground"
                : "text-foreground",
            )}
          >
            {project.status === "in-progress" && (
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            )}
            {statusLabel[project.status]}
          </span>
          <span>
            Updated <time dateTime={study.updated}>{formatDate(study.updated)}</time>
          </span>
          {study.draft && (
            <span className="rounded-full border border-dashed px-2 py-0.5 text-xs">
              Draft
            </span>
          )}
        </p>
        <h1 className="mt-3 text-title font-semibold sm:text-4xl sm:leading-tight">
          {project.title}
        </h1>
        {project.headline && (
          <p className="mt-4 text-xl font-semibold text-brand">
            {project.headline}
          </p>
        )}
        <p className="mt-4 text-lead text-muted-foreground">
          {project.oneLiner}
        </p>
        <p className="mt-3 text-sm">
          <span className="font-medium">For:</span>{" "}
          <span className="text-muted-foreground">{project.customer}</span>
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Content />
        </div>

        <section aria-labelledby="build-log" className="mt-10">
          <h2
            id="build-log"
            className="mb-3 text-title font-semibold"
          >
            Build log
          </h2>
          {posts.length > 0 ? (
            <ol className="divide-y border-y">
              {posts.map((post) => (
                <li key={post.slug} className="py-3">
                  <Link
                    href={`/log/${post.slug}`}
                    className="group block"
                  >
                    <span className="text-sm text-muted-foreground">
                      {formatEpisode(post.episode)} · {formatDate(post.date)}
                    </span>
                    <span className="block font-medium group-hover:text-brand">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-muted-foreground">No posts yet.</p>
          )}
        </section>

        {links.length > 0 && (
          <section aria-labelledby="links" className="mt-10">
            <h2 id="links" className="mb-3 text-title font-semibold">
              Links
            </h2>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
