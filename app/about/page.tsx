import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";
import headshot from "@/public/headshot.jpg";

export const metadata: Metadata = {
  title: `About · ${site.name}`,
  description:
    "Olu Akele is a forward deployed product manager: he frames the customer problem, sets the strategy, then builds the AI himself and proves it works with evals.",
  alternates: { canonical: "/about" },
};

// Draft bio from the positioning in CLAUDE.md; Olu will edit.
const bio = [
  "I'm a product manager by trade, and I work as a forward deployed product manager: the space between a forward deployed engineer and a product manager. I've led product at Visual Comfort & Co., Zillow, Spreetail and Arcadis, across growth, real estate marketplaces, e-commerce logistics and infrastructure software.",
  "On the product side, I start with the customer. I frame the problem, set the strategy, decide what not to build, and run the roadmap, writing down every trade-off so the reasoning survives the meeting.",
  "On the builder side, I ship the system myself, inside the messy real-world setup it has to work in, and prove it works with evals: known answers, measured before and after. I document every step in public, and the build log is the receipts.",
];

const links = [
  { label: "LinkedIn", href: site.links.linkedin, external: true },
  { label: "GitHub", href: site.links.github, external: true },
  { label: site.links.email, href: `mailto:${site.links.email}`, external: false },
  { label: "Book a call", href: site.links.booking, external: true },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-content px-gutter pt-10 pb-section sm:pt-16">
      <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-14">
        <div>
          <div className="inline-block rounded-full bg-linear-to-br from-brand to-brand-2 p-1 shadow-lg shadow-brand/20">
            <Image
              src={headshot}
              alt="Olu Akele, smiling, in a pink button-down shirt"
              width={192}
              height={192}
              preload
              placeholder="blur"
              className="size-36 rounded-full border-4 border-background object-cover sm:size-48"
            />
          </div>
        </div>

        <div className="max-w-prose">
          <p className="eyebrow">About</p>
          <h1 className="mt-2 text-display font-semibold">{site.name}</h1>
          <p className="mt-3 text-lg font-medium text-muted-foreground">
            {site.title}
          </p>
          <div className="mt-8 space-y-5 text-lead">
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-10 text-sm font-semibold text-muted-foreground">
            Find me
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="inline-flex h-10 items-center rounded-lg border bg-card px-4 text-sm font-medium transition hover:border-brand/50 hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-muted-foreground">
            See what I&apos;m building in the{" "}
            <Link
              href="/log"
              className="font-medium text-foreground underline underline-offset-4 hover:text-brand"
            >
              build log
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
