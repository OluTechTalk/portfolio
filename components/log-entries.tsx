import Link from "next/link";

import { projectName } from "@/content/projects";
import { formatDate, formatEpisode } from "@/lib/format";
import type { LogPost } from "@/lib/log";

export function LogEntries({ posts }: { posts: LogPost[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts yet.</p>;
  }

  return (
    <ol className="divide-y border-y">
      {posts.map((post) => (
        <li key={post.slug} className="py-8">
          <article>
            <p className="text-sm text-muted-foreground">
              {projectName(post.project)} · {formatEpisode(post.episode)} ·{" "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.draft && (
                <span className="ml-2 rounded-full border border-dashed px-2 py-0.5 text-xs">
                  Draft
                </span>
              )}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              <Link
                href={`/log/${post.slug}`}
                className="hover:text-brand"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-muted-foreground">{post.summary}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium">PM takeaway</dt>
                <dd className="mt-1 text-muted-foreground">
                  {post.pmTakeaway}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Build takeaway</dt>
                <dd className="mt-1 text-muted-foreground">
                  {post.buildTakeaway}
                </dd>
              </div>
            </dl>
          </article>
        </li>
      ))}
    </ol>
  );
}
