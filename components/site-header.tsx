import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { ViewSwitch } from "@/components/view-switch";
import { nav, site } from "@/content/site";
import { getLatestFeaturedPost } from "@/lib/now-building";
import { projectName } from "@/content/projects";

export async function SiteHeader() {
  const latest = await getLatestFeaturedPost();

  return (
    <header className="top wrap mono">
      <Link href="/" className="u-link">
        {site.name} / Portfolio 2026
      </Link>
      <nav aria-label="Main">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="u-link">
            {item.label}
          </Link>
        ))}
      </nav>
      <span className="top-right">
        {latest && (
          <Link href={`/log/${latest.slug}`} className="avail">
            <span className="dot" aria-hidden />
            Now building: {projectName(latest.project)}
          </Link>
        )}
        <ViewSwitch />
        <ThemeToggle />
      </span>
    </header>
  );
}
