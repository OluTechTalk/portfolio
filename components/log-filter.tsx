"use client";

import { useEffect, useState } from "react";

import { LogEntries } from "@/components/log-entries";
import type { LogPost } from "@/lib/log";
import { cn } from "@/lib/utils";

type Option = { slug: string; name: string };

// Filtering runs in the browser so /log stays a static page, and
// ?project=<slug> keeps filtered views linkable. The first render always shows
// every post (same as the static HTML), so hydration keeps the server-rendered
// list instead of replacing it; the URL filter is applied after mount.
export function LogFilter({
  posts,
  options,
}: {
  posts: LogPost[];
  options: Option[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      const p = new URLSearchParams(window.location.search).get("project");
      setSelected(options.some((o) => o.slug === p) ? p : null);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [options]);

  function choose(slug: string | null) {
    setSelected(slug);
    const url = slug ? `/log?project=${slug}` : "/log";
    window.history.pushState(null, "", url);
  }

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
                <a
                  href={chip.slug ? `/log?project=${chip.slug}` : "/log"}
                  onClick={(e) => {
                    e.preventDefault();
                    choose(chip.slug);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                    isActive
                      ? "border-transparent bg-linear-to-r from-brand to-brand-2 text-brand-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {chip.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <LogEntries posts={shown} />
    </>
  );
}
