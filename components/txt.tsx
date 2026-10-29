import { Term } from "@/components/term";
import { splitTerms, text, type Copy } from "@/lib/copy";

// Renders a piece of copy for both readers. A plain string is the same for
// both. A { simple, technical } pair renders both versions; CSS shows the one
// that matches <html data-view> (Simple when unset, so the page reads fully
// without JavaScript). The hidden one is display:none, so screen readers skip
// it too.
export function Txt({ c }: { c: Copy | undefined }) {
  if (c === undefined) return null;
  if (typeof c === "string") return text(c);
  return (
    <>
      <span className="v-s">
        {splitTerms(c.simple).map((part, i) =>
          "term" in part ? (
            <Term key={i} shown={part.shown} term={part.term} />
          ) : (
            part.text
          ),
        )}
      </span>
      <span className="v-t">{text(c.technical, "technical")}</span>
    </>
  );
}
