"use client";

import { useState } from "react";

type Step = { title: string; line: string; artifact: string };

// Six-step process rail. The selected step is inverted and the panel below
// announces the change. Server-rendered with step 1 selected, so it reads
// fine without JavaScript.
export function ProcessRail({ steps }: { steps: readonly Step[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <>
      <div className="rail" role="group" aria-label="Process steps">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-current={i === active ? "true" : undefined}
            onClick={() => setActive(i)}
          >
            <span className="mono">Step {i + 1}</span>
            <span className="t">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="panel" aria-live="polite">
        <h3>{step.title}</h3>
        <div>
          <p>{step.line}</p>
          <span className="mono artifact">Artifact: {step.artifact}</span>
        </div>
      </div>
    </>
  );
}
