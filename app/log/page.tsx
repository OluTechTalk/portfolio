import type { Metadata } from "next";
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
    <main className="page wrap">
      <header className="page-head">
        <p className="meta-line mono">
          <span>Built in public</span>
          <span>One post per episode</span>
          <a href="/log/rss.xml">RSS</a>
        </p>
        <h1 className="display page-title">Build log</h1>
        <p className="lede">
          The product call, what I built, what broke, and the number. Every
          episode, written up.
        </p>
      </header>
      <LogFilter posts={posts} options={options} />
    </main>
  );
}
