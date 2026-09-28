import { projectName } from "@/content/projects";
import { site } from "@/content/site";
import { formatEpisode, getPosts } from "@/lib/log";

export const dynamic = "force-static";

function escape(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((post) => {
      const url = `${site.url}/log/${post.slug}`;
      const title = `${projectName(post.project)} ${formatEpisode(post.episode)}: ${post.title}`;
      return `    <item>
      <title>${escape(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${site.name} · Build log`)}</title>
    <link>${site.url}/log</link>
    <atom:link href="${site.url}/log/rss.xml" rel="self" type="application/rss+xml" />
    <description>One post per episode: the product call, what I built, what broke, and the number.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
