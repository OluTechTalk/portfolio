import Link from "next/link";

import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const statusLabel: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  planned: "Planned",
};

export function ProjectCard({
  project,
  logCount,
  caseStudyHref,
}: {
  project: Project;
  logCount: number;
  caseStudyHref?: string; // only set when the case study is published in this build
}) {
  const planned = project.status === "planned";
  const links = [
    project.demoUrl && { label: "Demo", href: project.demoUrl },
    project.repoUrl && { label: "Repo", href: project.repoUrl },
    project.videoUrl && { label: "Video", href: project.videoUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <article
      id={`project-${project.slug}`}
      className={cn(
        "relative flex scroll-mt-8 flex-col overflow-hidden rounded-xl border p-6",
        planned
          ? "border-dashed bg-card/40"
          : "bg-card shadow-sm transition duration-200 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10 motion-safe:hover:-translate-y-0.5",
      )}
    >
      {!planned && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand to-brand-2"
        />
      )}
      {/* The eval number leads once it exists; until then the status does. */}
      <div className="flex items-start justify-between gap-4">
        {project.headline && (
          <p className="text-lg font-semibold tracking-tight text-brand">
            {project.headline}
          </p>
        )}
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
            planned ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {project.status === "in-progress" && (
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
          )}
          {statusLabel[project.status]}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight">
        {project.title}
      </h3>
      <p className="mt-2 text-muted-foreground">{project.oneLiner}</p>
      <p className="mt-3 text-sm">
        <span className="font-medium">For:</span>{" "}
        <span className="text-muted-foreground">{project.customer}</span>
      </p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>

      {(links.length > 0 || caseStudyHref || logCount > 0) && (
        <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-medium">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-brand"
              >
                {link.label}
                <span className="sr-only"> for {project.title}</span>
              </a>
            </li>
          ))}
          {caseStudyHref && (
            <li>
              <Link
                href={caseStudyHref}
                className="underline underline-offset-4 hover:text-brand"
              >
                Case study
                <span className="sr-only"> for {project.title}</span>
              </Link>
            </li>
          )}
          {logCount > 0 && (
            <li>
              <Link
                href={`/log?project=${project.slug}`}
                className="underline underline-offset-4 hover:text-brand"
              >
                {logCount} log {logCount === 1 ? "post" : "posts"}
                <span className="sr-only"> for {project.title}</span>
              </Link>
            </li>
          )}
        </ul>
      )}
    </article>
  );
}
