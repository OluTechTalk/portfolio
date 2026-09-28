import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import headshot from "@/public/headshot.jpg";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const buttonSize = "h-11 px-5 text-base";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-content px-gutter">
      <section id="about" className="scroll-mt-8 pt-10 pb-12 sm:pt-16">
        <Image
          src={headshot}
          alt="Olu Akele, smiling, in a pink button-down shirt"
          width={144}
          height={144}
          preload
          placeholder="blur"
          className="size-28 rounded-full object-cover sm:size-36"
        />
        <h1 className="mt-8 text-display font-semibold">{site.name}</h1>
        <p className="mt-3 text-lg font-medium text-muted-foreground">
          {site.title}
        </p>
        <p className="mt-6 max-w-prose text-lead">{site.pitch}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#work"
            className={cn(
              buttonVariants(),
              buttonSize,
              "bg-brand text-brand-foreground hover:bg-brand/90",
            )}
          >
            See the work
          </a>
          <a
            href={site.links.booking}
            {...external}
            className={cn(buttonVariants({ variant: "outline" }), buttonSize)}
          >
            Book a call
          </a>
          <a
            href={site.links.linkedin}
            {...external}
            className={cn(buttonVariants({ variant: "outline" }), buttonSize)}
          >
            LinkedIn
          </a>
        </div>
      </section>

      <section
        id="now-building"
        aria-label="Now building"
        className="scroll-mt-8 border-t py-6"
      >
        <p className="flex items-baseline gap-3 text-muted-foreground">
          <span
            className="size-2 shrink-0 translate-y-[-1px] rounded-full bg-brand"
            aria-hidden
          />
          <span>
            <span className="font-medium text-foreground">Now building:</span>{" "}
            ShelfReady, an agent-ready storefront. Build log coming soon.
          </span>
        </p>
      </section>

      {/* Episode 03 fills this with project cards from content/projects.ts. */}
      <section id="work" className="scroll-mt-8 py-section" aria-labelledby="work-heading">
        <h2 id="work-heading" className="text-title font-semibold">
          Work
        </h2>
        <p className="mt-3 text-muted-foreground">
          Case studies with eval results are on the way.
        </p>
      </section>
    </main>
  );
}
