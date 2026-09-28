import Image from "next/image";
import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { earlierWork, projectName, projects } from "@/content/projects";
import { site } from "@/content/site";
import { getCaseStudies } from "@/lib/case-studies";
import { countPostsByProject, formatEpisode, getLatestPost } from "@/lib/log";
import { cn } from "@/lib/utils";
import headshot from "@/public/headshot.jpg";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const buttonSize = "h-11 px-5 text-base";

export default async function Home() {
  const [latest, logCounts, caseStudies] = await Promise.all([
    getLatestPost(),
    countPostsByProject(),
    getCaseStudies(),
  ]);
  const caseStudyHrefs = Object.fromEntries(
    caseStudies.map((c) => [c.project, `/projects/${c.slug}`]),
  );

  return (
    <main className="w-full">
      <section
        id="about"
        className="mx-auto max-w-content scroll-mt-8 px-gutter pt-8 pb-14 sm:pt-14"
      >
        <div className="inline-block rounded-full bg-linear-to-br from-brand to-brand-2 p-1 shadow-lg shadow-brand/20">
          <Image
            src={headshot}
            alt="Olu Akele, smiling, in a pink button-down shirt"
            width={144}
            height={144}
            preload
            placeholder="blur"
            className="size-28 rounded-full border-4 border-background object-cover sm:size-36"
          />
        </div>
        <h1 className="mt-8 text-display font-semibold">{site.name}</h1>
        <div
          aria-hidden
          className="mt-4 h-1 w-16 rounded-full bg-linear-to-r from-brand to-brand-2"
        />
        <p className="mt-4 text-lg font-medium text-muted-foreground">
          {site.title}
        </p>
        <p className="mt-6 max-w-prose text-lead">{site.pitch}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#work"
            className={cn(
              buttonVariants(),
              buttonSize,
              "bg-linear-to-r from-brand to-brand-2 text-brand-foreground shadow-md shadow-brand/25 hover:opacity-90",
            )}
          >
            See the work
          </a>
          <a
            href={site.links.booking}
            {...external}
            className={cn(
              buttonVariants({ variant: "outline" }),
              buttonSize,
              "bg-card",
            )}
          >
            Book a call
          </a>
          <a
            href={site.links.linkedin}
            {...external}
            className={cn(
              buttonVariants({ variant: "outline" }),
              buttonSize,
              "bg-card",
            )}
          >
            LinkedIn
          </a>
        </div>
      </section>

      <section
        id="now-building"
        aria-label="Now building"
        className="scroll-mt-8 border-y bg-band"
      >
        <p className="mx-auto flex max-w-content items-baseline gap-3 px-gutter py-5 text-muted-foreground">
          <span
            className="size-2 shrink-0 translate-y-[-1px] rounded-full bg-brand shadow-[0_0_0_4px] shadow-brand/20"
            aria-hidden
          />
          <span>
            <span className="font-medium text-foreground">Now building:</span>{" "}
            {latest ? (
              <Link
                href={`/log/${latest.slug}`}
                className="underline-offset-4 hover:text-brand hover:underline"
              >
                {projectName(latest.project)} ·{" "}
                {formatEpisode(latest.episode)} · {latest.title}{" "}
                <span aria-hidden>→</span>
              </Link>
            ) : (
              "ShelfReady, an agent-ready storefront. Build log coming soon."
            )}
          </span>
        </p>
      </section>

      <section
        id="work"
        className="mx-auto max-w-content scroll-mt-8 px-gutter py-section"
        aria-labelledby="work-heading"
      >
        <p className="eyebrow">Selected work</p>
        <h2 id="work-heading" className="mt-2 text-title font-semibold">
          Work
        </h2>
        <p className="mt-3 text-muted-foreground">
          Each project: the customer problem, what I built, and the eval number
          that proves it.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[...projects]
            .sort((a, b) => a.order - b.order)
            .map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                logCount={logCounts[project.slug] ?? 0}
                caseStudyHref={caseStudyHrefs[project.slug]}
              />
            ))}
        </div>

        {earlierWork.length > 0 && (
          <div className="mt-12">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Earlier work
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {earlierWork.map((item) => (
                <li
                  key={item.name}
                  className="rounded-lg border border-dashed px-4 py-3"
                >
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                    {item.name}
                    <span className="rounded-full border px-2 py-0.5 text-xs font-normal text-muted-foreground">
                      {item.note}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.oneLiner}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
