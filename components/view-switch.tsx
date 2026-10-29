"use client";

import { useSyncExternalStore } from "react";

// "Explain it: Simply · Technically". The view lives on <html data-view>, set
// before first paint by the script in app/layout.tsx (?view= wins, then the
// saved choice, then Simple). The thumb and the bold option are styled from
// that attribute, so they're right before hydration; aria-checked follows once
// React reads it. Light/dark is separate (ThemeToggle).

const root = () => document.documentElement;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-view"] });
  return () => observer.disconnect();
}
const isTechnical = () => root().dataset.view === "technical";

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function ViewSwitch() {
  const technical = useSyncExternalStore(subscribe, isTechnical, () => false);

  function dismissHint() {
    root().removeAttribute("data-hint");
    save("view-hint", "seen");
  }

  function flip() {
    const next = technical ? "simple" : "technical";
    save("view", next);
    dismissHint();

    // A shared ?view= link has done its job once the visitor picks.
    const url = new URL(window.location.href);
    if (url.searchParams.has("view")) {
      url.searchParams.delete("view");
      window.history.replaceState(null, "", url);
    }

    const apply = () => {
      root().dataset.view = next;
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    // Fade the page out, swap the copy, fade back in.
    root().classList.add("view-fading");
    window.setTimeout(() => {
      apply();
      requestAnimationFrame(() => root().classList.remove("view-fading"));
    }, 160);
  }

  return (
    <span className="view-switch-wrap">
      <button
        type="button"
        role="switch"
        aria-checked={technical}
        aria-label="Explain it technically"
        className="view-switch"
        onClick={flip}
      >
        <span className="vs-label">Explain it:</span>
        <span className="vs-opt vs-simple">Simply</span>
        <span className="vs-track" aria-hidden>
          <span className="vs-thumb" />
        </span>
        <span className="vs-opt vs-technical">Technically</span>
      </button>
      <span className="view-hint">
        Prefer the technical details? Flip this.
        <button type="button" onClick={dismissHint} aria-label="Dismiss hint">
          ×
        </button>
      </span>
    </span>
  );
}
