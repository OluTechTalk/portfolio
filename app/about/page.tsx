import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";
import sidePhoto from "@/public/photos/olu-side.jpg";
import aboutPhoto from "@/public/photos/olu-about-1.jpg";

export const metadata: Metadata = {
  title: `About · ${site.name}`,
  description:
    "Olu Akele turns AI capabilities into measurable outcomes: 9+ years leading product at Visual Comfort & Co., Zillow, Spreetail and Arcadis, now building AI products in public.",
  alternates: { canonical: "/about" },
};

// Draft bio from Oluwaseye_Akele_Resume_CO (the source of truth); Olu will edit.
const bio = [
  "I'm a product leader who turns AI capabilities into measurable business outcomes, and these days I build the AI myself.",
  "Over 9+ years at Visual Comfort & Co., Zillow, Spreetail and Arcadis, I've run growth, marketplace and catalog products. Most recently I led a custom-trained LLM catalog audit agent adopted by 20 teams, cutting validation and approval from six weeks to 45 minutes, and built the eval framework that took an AI refund agent from 71% to 93% decision accuracy before launch.",
  "On every build I start with the customer problem, decide what not to build, ship inside the real system, and prove it with evals. Then I write down what broke. ShelfReady is the first build in public, and four more are queued.",
];

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
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
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
    </main>
  );
}
