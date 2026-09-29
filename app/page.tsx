import Image from "next/image";
import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { careerStats } from "@/content/career";
import { earlierWork, projectName, projects } from "@/content/projects";
import { howIWork, site } from "@/content/site";
import { getCaseStudies } from "@/lib/case-studies";
import { countPostsByProject, formatEpisode, getPosts } from "@/lib/log";
import { cn } from "@/lib/utils";
import headshot from "@/public/headshot.jpg";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const buttonSize = "h-11 px-5 text-base";

export default async function Home() {
  const [logCounts, caseStudies, posts] = await Promise.all([
    countPostsByProject(),
    getCaseStudies(),
    getPosts(),
  ]);
  const caseStudyHrefs = Object.fromEntries(
    caseStudies.map((c) => [c.project, `/projects/${c.slug}`]),
  );
  const featured = projects
    .filter((p) => p.featured !== false)
    .sort((a, b) => a.order - b.order);
  // "Now building" follows the featured projects, not posts about this site.
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const latest = posts.find((p) => featuredSlugs.has(p.project));
  const countStatus = (status: string) =>
    featured.filter((p) => p.status === status).length;

  // Proof strip: every number is computed from content and links to its source.
  const buildStats = [
    {
      value: String(featured.length),
      label: `projects (${countStatus("in-progress")} in progress, ${countStatus("planned")} planned)`,
      href: "#work",
    },
    {
      value: String(posts.length),
      label: "episodes shipped and written up in public",
      href: "/log",
    },
    ...featured
      .filter((p) => p.headline && caseStudyHrefs[p.slug])
      .map((p) => ({
        value: p.headline as string,
        label: `${projectName(p.slug)} headline eval result`,
        href: caseStudyHrefs[p.slug],
      })),
  ];

  return (
    <main className="w-full">
      <section
        id="intro"
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
          {featured.map((project) => (
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

      <section
        id="how-i-work"
        aria-labelledby="how-heading"
        className="scroll-mt-8 border-y bg-band"
      >
        <div className="mx-auto max-w-content px-gutter py-section">
          <p className="eyebrow">Product + build</p>
          <h2 id="how-heading" className="mt-2 text-title font-semibold">
            How I work
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howIWork.map((step, i) => (
              <li key={step.title} className="rounded-xl border bg-card p-5">
                <span className="bg-linear-to-r from-brand to-brand-2 bg-clip-text text-sm font-semibold text-transparent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="proof"
        aria-labelledby="proof-heading"
        className="mx-auto max-w-content scroll-mt-8 px-gutter py-section"
      >
        <p className="eyebrow">Proof</p>
        <h2 id="proof-heading" className="mt-2 text-title font-semibold">
          Numbers, with sources
        </h2>
        <p className="mt-3 text-muted-foreground">
          Every number links to where it comes from.
        </p>

        <h3 className="mt-8 text-sm font-semibold text-muted-foreground">
          Building in public
        </h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {buildStats.map((stat) => (
            <li key={stat.label}>
              <Link
                href={stat.href}
                className="group block h-full rounded-xl border bg-card p-5 transition hover:border-brand/50"
              >
                <span className="block text-3xl font-semibold tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground group-hover:text-foreground">
                  {stat.label} <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-sm font-semibold text-muted-foreground">
          Product career
        </h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {careerStats.map((stat) => (
            <li key={stat.label}>
              <a
                href={site.links.linkedin}
                {...external}
                className="group block h-full rounded-xl border bg-card p-5 transition hover:border-brand/50"
              >
                <span className="block text-3xl font-semibold tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm">{stat.label}</span>
                <span className="mt-3 block text-xs text-muted-foreground group-hover:text-foreground">
                  {stat.role}, {stat.company} · {stat.years}
                  <span className="sr-only"> (source: LinkedIn)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="mx-auto max-w-content scroll-mt-8 px-gutter pb-section"
      >
        <div className="rounded-2xl bg-linear-to-br from-brand to-brand-2 p-px shadow-lg shadow-brand/10">
          <div className="rounded-[calc(1rem-1px)] bg-card px-6 py-10 sm:px-10">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-heading" className="mt-2 text-title font-semibold">
              Let&apos;s talk
            </h2>
            <p className="mt-3 max-w-prose text-muted-foreground">
              Hiring a PM who can also build and ship the AI? I&apos;d like to
              hear about the problem.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${site.links.email}`}
                className={cn(
                  buttonVariants(),
                  buttonSize,
                  "bg-linear-to-r from-brand to-brand-2 text-brand-foreground shadow-md shadow-brand/25 hover:opacity-90",
                )}
              >
                Email me
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
          </div>
        </div>
      </section>
    </main>
  );
}
