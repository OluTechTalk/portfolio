import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { getCaseStudies } from "@/lib/case-studies";
import { getPosts } from "@/lib/log";

// Published content only: drafts are already excluded in production builds.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([
    getPosts(),
    getCaseStudies(),
  ]);
  const latest = posts[0]?.date;

  return [
    { url: site.url, lastModified: latest },
    { url: `${site.url}/about` },
    { url: `${site.url}/log`, lastModified: latest },
    ...caseStudies.map((c) => ({
      url: `${site.url}/projects/${c.slug}`,
      lastModified: c.updated,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/log/${p.slug}`,
      lastModified: p.date,
    })),
  ];
}
