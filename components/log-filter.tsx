"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { LogEntries } from "@/components/log-entries";
import type { LogPost } from "@/lib/log";
import { cn } from "@/lib/utils";

type Option = { slug: string; name: string };

// Filtering runs in the browser so /log stays a static page;
// ?project=<slug> keeps filtered views linkable.
export function LogFilter({
  posts,
  options,
}: {
  posts: LogPost[];
  options: Option[];
}) {
  const active = useSearchParams().get("project");
  const selected = options.some((o) => o.slug === active) ? active : null;
  const shown = selected ? posts.filter((p) => p.project === selected) : posts;

  const chips = [{ slug: null, name: "All" }, ...options];

  return (
    <>
      <nav aria-label="Filter by project" className="mb-8">
        <ul className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const isActive = chip.slug === selected;
            return (
              <li key={chip.slug ?? "all"}>
                <Link
                  href={chip.slug ? `/log?project=${chip.slug}` : "/log"}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                    isActive
                      ? "border-brand bg-brand text-brand-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {chip.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <LogEntries posts={shown} />
    </>
  );
}
