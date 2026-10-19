import Image from "next/image";
import Link from "next/link";

import { FitName } from "@/components/fit-name";
import { PlateArt } from "@/components/plate-art";
import { ProcessRail } from "@/components/process-rail";
import { career } from "@/content/career";
import { dataNoteLabel, earlierWork, projectName, projects } from "@/content/projects";
import { process, site, ticker, toolkit } from "@/content/site";
import { getCaseStudies } from "@/lib/case-studies";
import { formatEpisode } from "@/lib/format";
import { countPostsByProject } from "@/lib/log";
import { getLatestFeaturedPost } from "@/lib/now-building";
import heroPhoto from "@/public/photos/olu-hero.jpg";
import aboutPhoto1 from "@/public/photos/olu-about-1.jpg";
import aboutPhoto2 from "@/public/photos/olu-about-2.jpg";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const pad = (n: number) => String(n).padStart(2, "0");
const statusLabel = {
  shipped: "Shipped",
  "in-progress": "Live",
  planned: "Planned",
  next: "Next",
} as const;

export default async function Home() {
  const [logCounts, caseStudies, latest] = await Promise.all([
    countPostsByProject(),
    getCaseStudies(),
    getLatestFeaturedPost(),
  ]);
  const caseStudyHref = Object.fromEntries(
    caseStudies.map((c) => [c.project, `/projects/${c.slug}`]),
  );

  const builds = projects
    .filter((p) => p.featured !== false && p.build)
    .sort((a, b) => (a.build ?? 0) - (b.build ?? 0));
  const plated = builds.filter((p) => p.plate).slice(0, 5);
  const shipped = builds.filter((p) => p.metric).length;
  const queued = builds.length - shipped;
  const nextUp = projects.filter((p) => p.status === "next");

  const tickerItems = [...ticker, ...ticker];

  return (
    <main>
      {/* 1. Hero */}
      <section className="hero wrap" aria-labelledby="hero-name">
        <div className="hero-top">
          <div className="hero-name" id="hero-name">
            <FitName first={site.firstName} last={site.lastName} />
            <p className="role">
              {site.roleLead} <span>{site.roleEmphasis}</span>
            </p>
          </div>
          <div className="slot arch">
            <Image
              src={heroPhoto}
              alt="Olu Akele smiling, arms crossed, in a cream polo against a pink backdrop"
              fill
              preload
              placeholder="blur"
              sizes="(max-width: 800px) 70vw, 340px"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
        </div>
        <div className="hero-foot">
          <div className="hero-copy">
            <p>{site.pitch}</p>
            <div className="hero-cta">
              <a href={site.links.booking} {...external} className="btn btn-solid">
                Book a call ↗
              </a>
              <a href="#contact" className="btn">
                Email me
              </a>
            </div>
          </div>
          <dl className="facts mono">
            <div>
              <dt>Focus</dt>
              <dd>{site.focus}</dd>
            </div>
            {latest && (
              <div>
                <dt>Now building</dt>
                <dd>
                  <Link href={`/log/${latest.slug}`}>
                    {projectName(latest.project)} · {formatEpisode(latest.episode)}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
          <svg className="badge" viewBox="0 0 160 160" role="img" aria-label="Scroll down for the work">
            <defs>
              <path id="badge-circle" d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" />
            </defs>
            <g className="spin">
              <text>
                <textPath href="#badge-circle" textLength="385" lengthAdjust="spacing">
                  {`SCROLL FOR THE WORK * ${shipped} SHIPPED * ${queued} NEXT *`}
                </textPath>
              </text>
            </g>
            <path
              d="M80 62 v36 m-14 -14 l14 14 l14 -14"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </section>

      {/* 2. Ticker */}
      <div className="ticker" aria-hidden>
        <div className="track">
          {tickerItems.map((word, i) => (
            <span key={i}>
              {word}
              <i>/</i>
            </span>
          ))}
        </div>
      </div>

      {/* 3. Case studies */}
      <section className="section wrap" id="work" aria-labelledby="work-heading">
        <div className="sec-head">
          <h2 className="display" id="work-heading">
            Case studies
          </h2>
          <span className="mono">
            {shipped} shipped, {queued} in the queue. Real numbers only
          </span>
        </div>
        <div className="plates">
          {plated.map((p, i) => {
            const href = caseStudyHref[p.slug];
            const logs = logCounts[p.slug] ?? 0;
            return (
              <figure key={p.slug} className={`plate p${i + 1} rv${p.metric ? "" : " is-planned"}`}>
                <div className={`frame ${p.plate!.color}`}>
                  <div className="tag">
                    <b>{p.metric?.value ?? "Planned"}</b>
                    <span>{p.metric?.label ?? `Build ${pad(p.build!)}`}</span>
                  </div>
                  <PlateArt artifact={p.plate!.artifact} />
                </div>
                {p.plate!.caption && <p className="plate-caption mono">{p.plate!.caption}</p>}
                <figcaption>
                  <div className="cap-top">
                    <h3>{href ? <Link href={href}>{projectName(p.slug)}</Link> : projectName(p.slug)}</h3>
                    <span className="mono">
                      Build {pad(p.build!)} · {statusLabel[p.status]}
                    </span>
                  </div>
                  <span className="mono meta">
                    {p.meta}
                    {p.dataNote && <span className="data-note">{dataNoteLabel[p.dataNote]}</span>}
                  </span>
                  <dl className="cf">
                    <div>
                      <dt className="mono">Problem</dt>
                      <dd>{p.problem}</dd>
                    </div>
                    <div>
                      <dt className="mono">Bet</dt>
                      <dd>{p.bet}</dd>
                    </div>
                    <div>
                      <dt className="mono">Result</dt>
                      <dd>{p.result}</dd>
                    </div>
                  </dl>
                  {(href || p.demoUrl || p.repoUrl || p.videoUrl || logs > 0) && (
                    <div className="plate-links mono">
                      {href && <Link href={href}>Case study</Link>}
                      {p.demoUrl && (
                        <a href={p.demoUrl} {...external}>
                          Live demo ↗
                        </a>
                      )}
                      {p.repoUrl && (
                        <a href={p.repoUrl} {...external}>
                          Repo ↗
                        </a>
                      )}
                      {p.videoUrl && (
                        <a href={p.videoUrl} {...external}>
                          Video ↗
                        </a>
                      )}
                      {logs > 0 && (
                        <Link href={`/log?project=${p.slug}`}>
                          {logs} log {logs === 1 ? "post" : "posts"}
                        </Link>
                      )}
                    </div>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
        {nextUp.length > 0 && (
          <div className="next-up">
            <h3 className="mono">Next up</h3>
            <ul>
              {nextUp.map((p) => (
                <li key={p.slug}>
                  <span className="name">{p.title}</span>
                  <span className="what">{p.oneLiner}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 4. Statement + process rail */}
      <div className="spikes" aria-hidden />
      <section className="statement section" id="process" aria-label="How I work">
        <div className="wrap">
          <p className="big rv">
            {site.statement.before} <em>{site.statement.emphasis}</em>
            {site.statement.after}
          </p>
          <p className="rail-label mono">How I run a product. Pick a step</p>
          <ProcessRail steps={process} />
          <div className="toolkit mono">
            {toolkit.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About strip */}
      <section className="section wrap" id="about" aria-labelledby="about-heading">
        <div className="about">
          <div className="about-text">
            <h2 className="display" id="about-heading">
              About
            </h2>
            <p>
              Product leader at Visual Comfort &amp; Co., Zillow, Spreetail and
              Arcadis. Now I build the AI myself: ship it inside the real
              system, measure it, and write down what broke.
            </p>
            <Link href="/about" className="btn">
              More about me
            </Link>
          </div>
          <div className="slot">
            <Image
              src={aboutPhoto1}
              alt="Olu Akele smiling, one hand resting on his arm"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 50vw, 33vw"
              style={{ objectPosition: "50% 25%" }}
            />
          </div>
          <div className="slot">
            <Image
              src={aboutPhoto2}
              alt="Olu Akele seated at a table, hands clasped"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 50vw, 33vw"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
        </div>
      </section>

      {/* 6. Proof */}
      <section className="section wrap proof" id="proof" aria-labelledby="proof-heading">
        <div className="sec-head">
          <h2 className="display" id="proof-heading">
            Proof
          </h2>
          <span className="mono">Selected results from my product roles</span>
        </div>
        {career.map((r) => (
          <div key={r.company} className="proof-group rv">
            <div className="proof-role mono">
              <span className="proof-company">{r.company}</span>
              <span>
                {r.role} · {r.years}
              </span>
              <a href={site.links.linkedin} {...external} className="u-link">
                Source: LinkedIn ↗
              </a>
            </div>
            <ul className="ruled">
              {r.results.map((x) => (
                <li key={x.value + x.text.slice(0, 12)}>
                  <div className="row">
                    <span className="num">{x.value}</span>
                    <span className="proof-text">{x.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 7. Index */}
      <section className="section wrap" id="index" aria-labelledby="index-heading">
        <div className="sec-head">
          <h2 className="display" id="index-heading">
            Index
          </h2>
          <span className="mono">Builds, done and planned</span>
        </div>
        <ul className="ruled">
          {builds.map((p) => {
            const href = caseStudyHref[p.slug];
            const out = p.metric
              ? `${p.metric.value} / ${p.metric.label}`
              : statusLabel[p.status];
            const cells = (
              <>
                <span className="mono">{pad(p.build!)}</span>
                <span className="name">{projectName(p.slug)}</span>
                <span className="what">{p.kind}</span>
                <span className="out mono">{out}</span>
              </>
            );
            return (
              <li key={p.slug} className="rv">
                {href ? (
                  <Link href={href} className="row">
                    {cells}
                  </Link>
                ) : (
                  <div className={`row hoverable ${p.metric ? "" : "planned"}`}>{cells}</div>
                )}
              </li>
            );
          })}
          {nextUp.map((p) => (
            <li key={p.slug} className="rv">
              <div className="row hoverable planned">
                <span className="mono">Next</span>
                <span className="name">{p.title}</span>
                <span className="what">{p.kind}</span>
                <span className="out mono">Planned</span>
              </div>
            </li>
          ))}
          {earlierWork.map((w) => (
            <li key={w.name} className="rv">
              <div className="row hoverable planned">
                <span className="mono">Earlier</span>
                <span className="name">{w.name}</span>
                <span className="what">{w.kind}</span>
                <span className="out mono">{w.note}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
