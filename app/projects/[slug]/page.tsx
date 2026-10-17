import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/content/projects";
import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { formatDate, formatEpisode } from "@/lib/format";
import { getPosts } from "@/lib/log";

export async function generateStaticParams() {
  return (await getCaseStudies()).map((c) => ({ slug: c.slug }));
}

// Drafts (and anything else not generated above) 404 in production.
export const dynamicParams = false;

const statusLabel = {
  shipped: "Shipped",
  "in-progress": "In progress",
  planned: "Planned",
  next: "Next",
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

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="page wrap">
      <article>
        <header className="page-head">
          <p className="meta-line mono">
            <span>Case study{project.build ? ` · Build ${pad(project.build)}` : ""}</span>
            <span className="pill">
              {project.status === "in-progress" && <span className="dot" aria-hidden />}
              {statusLabel[project.status]}
            </span>
            <span>
              Updated <time dateTime={study.updated}>{formatDate(study.updated)}</time>
            </span>
            {study.draft && <span className="pill dashed">Draft</span>}
          </p>
          <h1 className="display page-title">{project.title.split(" — ")[0]}</h1>
          <p className="lede">{project.oneLiner}</p>
        </header>

        <div className="article-grid">
          <aside className="article-side" aria-label="At a glance">
            <dl className="takeaways">
              {project.headline && (
                <div className="number">
                  <dt className="mono">Result</dt>
                  <dd>{project.headline}</dd>
                </div>
              )}
              <div>
                <dt className="mono">For</dt>
                <dd>{project.customer}</dd>
              </div>
              {project.meta && (
                <div>
                  <dt className="mono">Built with</dt>
                  <dd>{project.meta}</dd>
                </div>
              )}
            </dl>
            <ul className="tags mono" aria-label="Tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {links.length > 0 && (
              <div>
                <span className="side-label mono">Links</span>
                <ul className="side-list mono">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          <div>
            <div className="prose-ed">
              <Content />
              <h2 id="build-log">Build log</h2>
            </div>
            {posts.length > 0 ? (
              <ol className="ruled log-list">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/log/${post.slug}`} className="row">
                      <span className="mono">
                        {formatEpisode(post.episode)}
                        <br />
                        {formatDate(post.date)}
                      </span>
                      <span className="entry">
                        <span className="ep-title">{post.title}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="muted">No posts yet.</p>
            )}
            {links.length > 0 && (
              <div className="prose-ed">
                <h2 id="links">Links</h2>
                <ul>
                  {links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
