// Two ways to read (docs/REDESIGN.md): copy that's technical has a plain
// `simple` version and the original `technical` one. A plain string means the
// same words work for both readers.
//
// Simple copy can mark glossary terms as [[term]] or [[shown text|term]]
// (keys in content/glossary.ts). They render as dotted-underline terms with a
// tooltip, and only in Simple, since Technical never shows the simple string.

export type Dual = { simple: string; technical: string };
export type Copy = string | Dual;

export type View = "simple" | "technical";

/** Plain text for one view, glossary marks removed (metadata, alt text, OG). */
export function text(copy: Copy, view: View = "simple"): string {
  const raw = typeof copy === "string" ? copy : copy[view];
  return raw.replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
}

/** Split a string into plain text and [[glossary]] parts. */
export function splitTerms(raw: string) {
  const parts: ({ text: string } | { term: string; shown: string })[] = [];
  const re = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let last = 0;
  for (const m of raw.matchAll(re)) {
    if (m.index > last) parts.push({ text: raw.slice(last, m.index) });
    parts.push({ shown: m[1], term: (m[2] ?? m[1]).toLowerCase() });
    last = m.index + m[0].length;
  }
  if (last < raw.length) parts.push({ text: raw.slice(last) });
  return parts;
}
