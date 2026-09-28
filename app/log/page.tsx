import type { Metadata } from "next";
import { Suspense } from "react";

import { LogEntries } from "@/components/log-entries";
import { LogFilter } from "@/components/log-filter";
import { projectName } from "@/content/projects";
import { getPosts } from "@/lib/log";

export const metadata: Metadata = {
  title: "Build log · Olu Akele",
  description:
    "One post per episode: the product call, what I built, what broke, and the number.",
  alternates: {
    canonical: "/log",
    types: { "application/rss+xml": "/log/rss.xml" },
  },
};

export default async function LogPage() {
  const posts = await getPosts();
  const options = [...new Set(posts.map((p) => p.project))].map((slug) => ({
    slug,
    name: projectName(slug),
  }));

  return (
    <main className="mx-auto w-full max-w-content px-gutter pt-10 pb-section sm:pt-16">
      <h1 className="text-display font-semibold">Build log</h1>
      <p className="mt-4 max-w-prose text-lead text-muted-foreground">
        One post per episode: the product call, what I built, what broke, and
        the number.{" "}
        <a
          href="/log/rss.xml"
          className="text-base font-medium text-foreground underline underline-offset-4 hover:text-brand"
        >
          RSS
        </a>
      </p>
      <div className="mt-10">
        {/* The static HTML carries the full list; the filter takes over in the browser. */}
        <Suspense fallback={<LogEntries posts={posts} />}>
          <LogFilter posts={posts} options={options} />
        </Suspense>
      </div>
    </main>
  );
}
