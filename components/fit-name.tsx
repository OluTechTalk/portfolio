"use client";

import { useEffect, useRef } from "react";

// The stacked name (line 1 solid, line 2 outlined), shrunk to fit its column
// at any width. Each letter thins on hover. Server markup already renders the
// name at its CSS size; this only adjusts it once fonts and layout are known.
export function FitName({ first, last }: { first: string; last: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = ref.current;
    if (!h1) return;
    const fit = () => {
      h1.style.fontSize = "";
      const avail = h1.parentElement?.clientWidth ?? 0;
      let widest = 0;
      h1.querySelectorAll<HTMLElement>(".line").forEach((l) => {
        widest = Math.max(widest, l.offsetWidth);
      });
      if (widest > avail && widest > 0) {
        const base = parseFloat(getComputedStyle(h1).fontSize);
        h1.style.fontSize = `${Math.floor((base * avail) / widest) - 1}px`;
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const letters = (text: string) =>
    Array.from(text).map((c, i) => (
      <span key={i} className="ch" aria-hidden>
        {c}
      </span>
    ));

  return (
    <h1 ref={ref} className="display" aria-label={`${first} ${last}`}>
      <span className="line">{letters(first)}</span>
      <span className="line out">{letters(last)}</span>
    </h1>
  );
}
