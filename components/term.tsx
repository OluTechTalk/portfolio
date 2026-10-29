"use client";

import { useId, useState } from "react";

import { glossary } from "@/content/glossary";

// A glossary term in Simple copy: dotted underline, plain meaning in a
// tooltip. Shows on hover and keyboard focus (CSS) and on tap (state, since
// mobile Safari doesn't focus buttons on tap). Escape hides it. The meaning is
// also the button's accessible description.
export function Term({ shown, term }: { shown: string; term: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const entry = glossary[term];
  if (!entry) return shown;

  return (
    <span
      className="term-wrap"
      data-open={open || undefined}
      data-dismissed={dismissed || undefined}
      onMouseLeave={() => setDismissed(false)}
    >
      <button
        type="button"
        className="term"
        aria-describedby={id}
        onClick={() => {
          setOpen((o) => !o);
          setDismissed(false);
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            setDismissed(true);
          }
        }}
      >
        {shown}
      </button>
      <span role="tooltip" id={id} className="tip">
        {entry.meaning}
      </span>
    </span>
  );
}
