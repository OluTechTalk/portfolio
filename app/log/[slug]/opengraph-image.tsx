import { ImageResponse } from "next/og";

import { projectName } from "@/content/projects";
import { site } from "@/content/site";
import { formatEpisode, getPost, getPosts } from "@/lib/log";

export const alt = "Build log post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = await getPost(slug);
  const post = found?.post;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#ffffff",
          color: "#0a0a0a",
          borderTop: "16px solid #8535ce",
        }}
      >
        <div style={{ fontSize: 32, color: "#8535ce", display: "flex" }}>
          {post
            ? `${projectName(post.project)} · ${formatEpisode(post.episode)}`
            : "Build log"}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            display: "flex",
          }}
        >
          {post?.title ?? site.name}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#525252",
          }}
        >
          <span>{site.name}</span>
          <span>oluakele.com/log</span>
        </div>
      </div>
    ),
    size,
  );
}
