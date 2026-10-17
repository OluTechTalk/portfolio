"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll motion from the design brief: elements marked .rv lift into place
// (no opacity start state, so nothing is hidden without JS), and chart art
// inside .frame drifts slightly with scroll. All off for reduced motion.
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));

    let io: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      );
      items.forEach((el) => io?.observe(el));
    }

    if (reduce) return () => io?.disconnect();

    const frames = Array.from(document.querySelectorAll<HTMLElement>(".frame"));
    let queued = false;
    const update = () => {
      queued = false;
      const h = window.innerHeight;
      for (const f of frames) {
        const art = f.querySelector<HTMLElement>(".art");
        if (!art || art.hasAttribute("data-static")) continue;
        const r = f.getBoundingClientRect();
        if (r.bottom < -120 || r.top > h + 120) continue;
        const p = (r.top + r.height / 2 - h / 2) / h;
        art.style.transform = `translate3d(0,${(p * -0.12 * r.height).toFixed(1)}px,0) scale(1.26)`;
      }
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return null;
}
