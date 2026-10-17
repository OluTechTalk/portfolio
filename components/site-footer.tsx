import { CopyEmail } from "@/components/copy-email";
import { site } from "@/content/site";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// The contact block doubles as the site footer, so every page ends with it.
export function SiteFooter() {
  return (
    <>
      <div className="spikes ink" aria-hidden />
      <footer className="contact section" id="contact">
        <div className="wrap">
          <h2 className="display">
            Let&apos;s ship something <b>useful.</b>
          </h2>
          <div className="reach">
            <CopyEmail email={site.links.email} />
            <a href={site.links.booking} {...external} className="btn">
              Book a call
            </a>
            <a href={site.links.linkedin} {...external} className="btn">
              LinkedIn
            </a>
          </div>
          <div className="colophon mono">
            <span>
              Built with Claude Code ·{" "}
              <a href={site.links.github} {...external}>
                GitHub
              </a>
            </span>
            <span>Set in Archivo, Instrument Sans and DM Mono</span>
            <span>&copy; 2026 {site.name}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
