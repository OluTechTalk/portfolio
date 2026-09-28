import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  return (
    <header>
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-4 px-gutter py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight whitespace-nowrap"
        >
          <span
            aria-hidden
            className="size-2.5 rounded-full bg-linear-to-br from-brand to-brand-2"
          />
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-3">
          <ul className="flex items-center gap-3 text-sm font-medium sm:gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
