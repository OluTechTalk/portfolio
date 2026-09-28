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

  return (
    <main className="mx-auto w-full max-w-content px-gutter pt-10 pb-section sm:pt-16">
      <article className="max-w-prose">
        <p className="text-sm text-muted-foreground">
          <Link href={`/log?project=${post.project}`} className="hover:text-brand">
            {project}
          </Link>{" "}
          · {formatEpisode(post.episode)} ·{" "}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.draft && (
            <span className="ml-2 rounded-full border border-dashed px-2 py-0.5 text-xs">
              Draft
            </span>
          )}
        </p>
        <h1 className="mt-3 text-title font-semibold sm:text-4xl sm:leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lead text-muted-foreground">{post.summary}</p>

        <aside
          aria-label="Takeaways"
          className="mt-8 rounded-xl border border-l-4 border-l-brand bg-card p-5"
        >
          <dl className="grid gap-4">
            <div>
              <dt className="text-sm font-semibold">PM takeaway</dt>
              <dd className="mt-1">{post.pmTakeaway}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold">Build takeaway</dt>
              <dd className="mt-1">{post.buildTakeaway}</dd>
            </div>
            {post.metric && (
              <div>
                <dt className="text-sm font-semibold">The number</dt>
                <dd className="mt-1 font-medium text-brand">{post.metric}</dd>
              </div>
            )}
          </dl>
        </aside>

        <div className="mt-8">
          <Content />
        </div>

        <footer className="mt-12 space-y-6 border-t pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {post.commit && (
              <li>
                <a
                  href={post.commit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-brand"
                >
                  Proof: the commit
                </a>
              </li>
            )}
            {post.linkedinUrl && (
              <li>
                <a
                  href={post.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-brand"
                >
                  Discuss on LinkedIn
                </a>
              </li>
            )}
            <li>
              <Link
                href={projectHref}
                className="underline underline-offset-4 hover:text-brand"
              >
                About the {project} project
              </Link>
            </li>
          </ul>

          <nav
            aria-label="Episodes"
            className="grid gap-4 text-sm sm:grid-cols-2"
          >
            {prev ? (
              <Link
                href={`/log/${prev.slug}`}
                className="rounded-lg border p-4 hover:border-brand"
              >
                <span className="text-muted-foreground">
                  ← {formatEpisode(prev.episode)}
                </span>
                <span className="mt-1 block font-medium">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/log/${next.slug}`}
                className="rounded-lg border p-4 text-right hover:border-brand"
              >
                <span className="text-muted-foreground">
                  {formatEpisode(next.episode)} →
                </span>
                <span className="mt-1 block font-medium">{next.title}</span>
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </main>
  );
}
