import type { PlateArtifact } from "@/content/projects";

// The artifact inside a case-file plate. Shipped builds draw their chart to
// scale from measured data; planned builds show an outline sketch of the chart
// they'll have, with no numbers (the brief's "real numbers only" rule).

function Bars({ a }: { a: Extract<PlateArtifact, { type: "bars" }> }) {
  // 0–100% maps to 280px of bar height above a baseline at y=520, and each
  // value sits inside the top of its bar, so nothing is drawn in the top
  // third where the plate tag sits, at any width. What the chart measures is
  // in the plate caption, not in the SVG (the bottom edge gets cropped).
  const h = (v: number) => (v / 100) * 280;
  const fmt = (v: number) => `${v}${a.unit}`;
  return (
    <svg viewBox="0 0 800 640" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${a.label}: ${fmt(a.before)} before, ${fmt(a.after)} after`}>
      <line x1="170" y1="520" x2="630" y2="520" stroke="currentColor" strokeWidth="4" />
      <rect x="210" y={520 - h(a.before)} width="150" height={h(a.before)} fill="currentColor" />
      <rect
        x="440"
        y={520 - h(a.after)}
        width="150"
        height={h(a.after)}
        className="c-chip"
        stroke="currentColor"
        strokeWidth="5"
      />
      <text className="big c-chip" x="285" y={520 - h(a.before) + 66} fontSize="52" textAnchor="middle">
        {fmt(a.before)}
      </text>
      <text className="big" x="515" y={520 - h(a.after) + 66} fontSize="52" textAnchor="middle">
        {fmt(a.after)}
      </text>
      <g fontSize="17" textAnchor="middle" letterSpacing="1.5">
        <text x="285" y="552">BEFORE</text>
        <text x="515" y="552">AFTER</text>
      </g>
    </svg>
  );
}

function PlannedLine() {
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid meet" className="planned-art" aria-hidden>
      <line x1="90" y1="560" x2="510" y2="560" stroke="currentColor" strokeWidth="4" />
      <line x1="90" y1="300" x2="510" y2="300" stroke="currentColor" strokeWidth="3" strokeDasharray="10 8" />
      <text x="96" y="286" fontSize="16" letterSpacing="1.5">SHIP GATE</text>
      <path
        d="M120 500 L200 470 L280 480 L360 420 L440 380"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeDasharray="4 12"
        strokeLinecap="round"
      />
      <g fontSize="16" textAnchor="middle" letterSpacing="1">
        <text x="120" y="590">V1</text>
        <text x="200" y="590">V2</text>
        <text x="280" y="590">V3</text>
        <text x="360" y="590">V4</text>
        <text x="440" y="590">V…</text>
      </g>
    </svg>
  );
}

function PlannedCost() {
  return (
    <svg viewBox="0 0 700 700" preserveAspectRatio="xMidYMid meet" className="planned-art" aria-hidden>
      <line x1="140" y1="540" x2="560" y2="540" stroke="currentColor" strokeWidth="4" />
      <rect x="180" y="200" width="140" height="340" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 8" />
      <rect x="380" y="400" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 8" />
      <g fontSize="18" textAnchor="middle" letterSpacing="1.5">
        <text x="250" y="576">LARGE ONLY</text>
        <text x="450" y="576">ROUTED</text>
        <text x="350" y="616">COST PER TASK</text>
      </g>
    </svg>
  );
}

function PlannedRoadmap() {
  const col = (x: number, title: string, cards: number) => (
    <g>
      <text x={x} y="250" fontSize="20" letterSpacing="2">
        {title}
      </text>
      <line x1={x} y1="266" x2={x + 170} y2="266" stroke="currentColor" strokeWidth="4" />
      {Array.from({ length: cards }, (_, i) => (
        <rect
          key={i}
          x={x}
          y={290 + i * 80}
          width="170"
          height="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8 7"
        />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" className="planned-art" aria-hidden>
      {col(105, "NOW", 3)}
      {col(315, "NEXT", 2)}
      {col(525, "LATER", 1)}
    </svg>
  );
}

function PlannedFunnel() {
  const widths = [100, 70, 55, 40, 30];
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" className="planned-art" aria-hidden>
      {widths.map((w, i) => (
        <rect
          key={i}
          x="140"
          y={150 + i * 70}
          width={(w / 100) * 520}
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8 7"
        />
      ))}
    </svg>
  );
}

function PlannedSources() {
  const doc = (x: number, title: string) => (
    <g>
      <rect x={x} y="170" width="200" height="230" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 8" />
      <text x={x + 100} y="210" fontSize="18" textAnchor="middle" letterSpacing="1.5">
        {title}
      </text>
      {[250, 290, 330].map((y) => (
        <line key={y} x1={x + 30} y1={y} x2={x + 170} y2={y} stroke="currentColor" strokeWidth="3" strokeDasharray="4 8" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 800 640" preserveAspectRatio="xMidYMid meet" className="planned-art" aria-hidden>
      {doc(140, "MENU")}
      {doc(460, "RECIPE")}
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <line x1="380" y1="265" x2="420" y2="305" />
        <line x1="420" y1="265" x2="380" y2="305" />
      </g>
      <path d="M400 410 v50" stroke="currentColor" strokeWidth="4" strokeDasharray="6 8" />
      <rect x="250" y="470" width="300" height="60" fill="none" stroke="currentColor" strokeWidth="4" />
      <text x="400" y="508" fontSize="19" textAnchor="middle" letterSpacing="2">
        ASK THE KITCHEN
      </text>
    </svg>
  );
}

export function PlateArt({ artifact }: { artifact: PlateArtifact }) {
  switch (artifact.type) {
    case "bars":
      return (
        <div className="art">
          <Bars a={artifact} />
        </div>
      );
    case "line":
      return (
        <div className="art" data-static>
          <PlannedLine />
        </div>
      );
    case "cost":
      return (
        <div className="art" data-static>
          <PlannedCost />
        </div>
      );
    case "roadmap":
      return (
        <div className="art" data-static>
          <PlannedRoadmap />
        </div>
      );
    case "funnel":
      return (
        <div className="art" data-static>
          <PlannedFunnel />
        </div>
      );
    case "sources":
      return (
        <div className="art" data-static>
          <PlannedSources />
        </div>
      );
  }
}
