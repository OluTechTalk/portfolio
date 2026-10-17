import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projectName } from "@/content/projects";
import { caseStudyHref } from "@/lib/case-studies";
import {
  formatDate,
  formatEpisode,
  getAdjacentPosts,
  getPost,
  getPosts,
} from "@/lib/log";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

// Anything not generated above (including drafts in production) is a 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/log/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = await getPost(slug);
  if (!found) return {};
  const { post } = found;
  const title = `${post.title} · ${projectName(post.project)} ${formatEpisode(post.episode)}`;
  return {
    title,
    description: post.summary,
    alternates: { canonical: `/log/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/log/${post.slug}`,
      title,
      description: post.summary,
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title, description: post.summary },
  };
}

export default async function LogPostPage({
  params,
}: PageProps<"/log/[slug]">) {
  const { slug } = await params;
  const found = await getPost(slug);
  if (!found) notFound();
  const { post, Content } = found;
  const { prev, next } = await getAdjacentPosts(post);
  // The case study when one is published, otherwise the project card on home.
  const projectHref =
    (await caseStudyHref(post.project)) ?? `/#project-${post.project}`;
  const project = projectName(post.project);

  const external = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <main className="page wrap">
      <article>
        <header className="page-head">
          <p className="meta-line mono">
            <Link href={`/log?project=${post.project}`}>{project}</Link>
            <span>{formatEpisode(post.episode)}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.draft && <span className="pill dashed">Draft</span>}
          </p>
          <h1 className="display post-title">{post.title}</h1>
          <p className="lede">{post.summary}</p>
        </header>

        <div className="article-grid">
          <aside className="article-side" aria-label="Takeaways">
            <dl className="takeaways">
              <div>
                <dt className="mono">PM takeaway</dt>
                <dd>{post.pmTakeaway}</dd>
              </div>
              <div>
                <dt className="mono">Build takeaway</dt>
                <dd>{post.buildTakeaway}</dd>
              </div>
              {post.metric && (
                <div className="number">
                  <dt className="mono">The number</dt>
                  <dd>{post.metric}</dd>
                </div>
              )}
            </dl>
            <div>
              <span className="side-label mono">Proof and links</span>
              <ul className="side-list mono">
                {post.commit && (
                  <li>
                    <a href={post.commit} {...external}>
                      The commit ↗
                    </a>
                  </li>
                )}
                {post.linkedinUrl && (
                  <li>
                    <a href={post.linkedinUrl} {...external}>
                      Discuss on LinkedIn ↗
                    </a>
                  </li>
                )}
                <li>
                  <Link href={projectHref}>About {project}</Link>
                </li>
              </ul>
            </div>
          </aside>

          <div className="prose-ed">
            <Content />
          </div>
        </div>

        <nav aria-label="Episodes" className="ep-nav mono">
          {prev && (
            <Link href={`/log/${prev.slug}`}>
              <span>← {formatEpisode(prev.episode)}</span>
              <span className="ep-title">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link href={`/log/${next.slug}`} className="next">
              <span>{formatEpisode(next.episode)} →</span>
              <span className="ep-title">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
