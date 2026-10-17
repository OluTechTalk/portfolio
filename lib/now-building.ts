import { projects } from "@/content/projects";
import { getPosts } from "@/lib/log";

/** Newest published post from a featured project (not posts about this site). */
export async function getLatestFeaturedPost() {
  const featured = new Set(
    projects.filter((p) => p.featured !== false).map((p) => p.slug),
  );
  return (await getPosts()).find((p) => featured.has(p.project));
}
