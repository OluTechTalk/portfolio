import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { OffTheClock } from "@/components/off-the-clock";
import { Txt } from "@/components/txt";
import { offTheClockHeading } from "@/content/off-the-clock";
import { aboutBio, site } from "@/content/site";
import { text } from "@/lib/copy";
import sidePhoto from "@/public/photos/olu-side.jpg";
import aboutPhoto from "@/public/photos/olu-about-1.jpg";

export const metadata: Metadata = {
  title: `About · ${site.name}`,
  description:
    "Olu Akele turns AI capabilities into measurable outcomes: 9+ years leading product at Visual Comfort & Co., Zillow, Spreetail and Arcadis, now building AI products in public.",
  alternates: { canonical: "/about" },
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function AboutPage() {
  return (
    <main className="page wrap">
      <header className="page-head">
        <p className="meta-line mono">
          <span>{site.title}</span>
          <span>PMP · Certified ScrumMaster</span>
        </p>
        <h1 className="display page-title">About</h1>
      </header>

      <div className="about-page">
        <div className="about-photos">
          <div className="slot">
            <Image
              src={sidePhoto}
              alt="Olu Akele seated at a table, looking to the side"
              fill
              preload
              placeholder="blur"
              sizes="(max-width: 800px) 50vw, 20vw"
              style={{ objectPosition: "48% 30%" }}
            />
          </div>
          <div className="slot">
            <Image
              src={aboutPhoto}
              alt="Olu Akele smiling, one hand resting on his arm"
              fill
              placeholder="blur"
              sizes="(max-width: 800px) 50vw, 20vw"
              style={{ objectPosition: "50% 25%" }}
            />
          </div>
        </div>

        <div className="prose-ed">
          {aboutBio.map((paragraph) => (
            <p key={text(paragraph).slice(0, 24)}>
              <Txt c={paragraph} />
            </p>
          ))}
          <div className="btn-row">
            <a href={site.links.booking} {...external} className="btn btn-solid">
              Book a call ↗
            </a>
            <a href={site.links.linkedin} {...external} className="btn">
              LinkedIn
            </a>
            <a href={site.links.github} {...external} className="btn">
              GitHub
            </a>
            <a href="#contact" className="btn">
              Email
            </a>
          </div>
          <p className="mono muted" style={{ marginTop: 28 }}>
            See the work in the <Link href="/#work">case studies</Link> and the{" "}
            <Link href="/log">build log</Link>.
          </p>
        </div>
      </div>

      <section className="about-otc" aria-labelledby="otc-heading">
        <h2 className="display" id="otc-heading">
          {offTheClockHeading}
        </h2>
        <OffTheClock full />
      </section>
    </main>
  );
}
