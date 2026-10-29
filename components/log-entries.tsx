import Link from "next/link";

import { Txt } from "@/components/txt";
import { projectName } from "@/content/projects";
import { formatDate, formatEpisode } from "@/lib/format";
import type { LogPost } from "@/lib/log";

export function LogEntries({ posts }: { posts: LogPost[] }) {
  if (posts.length === 0) {
    return <p className="muted">No posts yet.</p>;
  }

  return (
    <ol className="ruled log-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/log/${post.slug}`} className="row">
            <span className="mono">
              {projectName(post.project)}
              <br />
              {formatEpisode(post.episode)}
              <br />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.draft && (
                <>
                  <br />
                  <span className="pill dashed">Draft</span>
                </>
              )}
            </span>
            <article className="entry">
              <h2>{post.title}</h2>
              {/* Simple: the plain summary only. Technical: summary + takeaways. */}
              <p>
                <Txt c={{ simple: post.summarySimple ?? post.summary, technical: post.summary }} />
              </p>
              <dl className="v-t">
                <div>
                  <dt className="mono">PM takeaway</dt>
                  <dd>{post.pmTakeaway}</dd>
                </div>
                <div>
                  <dt className="mono">Build takeaway</dt>
                  <dd>{post.buildTakeaway}</dd>
                </div>
              </dl>
            </article>
          </Link>
        </li>
      ))}
    </ol>
  );
}
