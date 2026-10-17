// Projects drive the home plates, the Index, the case study pages and the log
// filter. Numbers on the site come only from measured runs; planned builds
// carry no numbers until they ship (docs/case-studies.md, "Ground rules").

export type PlateArtifact =
  | { type: "bars"; label: string; before: number; after: number; unit: "%" }
  | { type: "line" } // planned: pass rate by prompt version vs a ship gate
  | { type: "cost" } // planned: cost per task, before vs after
  | { type: "roadmap" } // planned: Now / Next / Later board
  | { type: "funnel" }; // planned: onboarding funnel per variant

export type Project = {
  slug: string; // "shelfready"
  title: string; // "ShelfReady — Agent-Ready Storefront"
  oneLiner: string; // one sentence, plain language
  customer: string; // who it's for, e.g. "Shopify merchants selling to AI shopping agents"
  status: "shipped" | "in-progress" | "planned" | "next";
  build?: number; // build order: 1 = ShelfReady
  kind?: string; // short type for the Index, e.g. "Agent-ready storefront"
  meta?: string; // mono meta line on the plate: tools / type of work
  problem?: string;
  bet?: string;
  result?: string; // planned builds: what will be measured, no numbers
  metric?: { value: string; label: string }; // the plate tag; measured only
  plate?: { artifact: PlateArtifact; color: "amber" | "sage" | "ink" | "buff" };
  headline?: string; // the eval number, e.g. "Agent shopping success 41% → 88%"
  proofStat?: { value: string; label: string }; // short form for the home proof strip
  tags: string[]; // "MCP", "Shopify", "Evals", "Product strategy", ...
  demoUrl?: string;
  repoUrl?: string;
  videoUrl?: string; // Loom
  caseStudy?: string; // MDX slug
  order: number;
  featured?: boolean; // false: log/filter only, not on home (default true)
};

/** Short display name: "ShelfReady — Agent-Ready Storefront" → "ShelfReady". */
export function projectName(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  return project ? project.title.split(" — ")[0] : slug;
}

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Portfolio — this site",
    oneLiner:
      "oluakele.com, built in public with Claude Code: Next.js, MDX build log, case studies.",
    customer: "Hiring managers and teams evaluating an AI product builder",
    status: "shipped",
    tags: ["Next.js", "MDX", "Build in public"],
    repoUrl: "https://github.com/OluTechTalk/portfolio",
    order: 99,
    featured: false,
  },
  {
    slug: "shelfready",
    title: "ShelfReady — Agent-Ready Storefront",
    oneLiner:
      "Makes a Shopify catalog clean and structured enough for AI shopping agents to find, compare and buy from.",
    customer: "Shopify merchants selling to AI shopping agents",
    status: "in-progress",
    build: 1,
    kind: "Agent-ready storefront",
    meta: "Claude Code + MCP + Shopify / agent-ready storefront",
    problem:
      "AI shopping agents skip products when catalog data is vague or missing, and merchants can't see the gap.",
    bet: "Audit every product for agents, fix it with a human approving each change, then measure real agent shopping before and after.",
    result:
      "Readiness 94.1 to 98.3, and 0 wrong products bought across 360 agent shopping sessions.",
    metric: { value: "0 wrong buys", label: "360 AI agent shopping sessions" },
    plate: {
      artifact: {
        type: "bars",
        label: "Products agent-ready",
        before: 78,
        after: 99.3,
        unit: "%",
      },
      color: "amber",
    },
    headline: "0 wrong products in 360 agent sessions · readiness 94.1 → 98.3",
    proofStat: {
      value: "0",
      label: "wrong products bought in 360 ShelfReady agent eval sessions",
    },
    tags: ["MCP", "Shopify", "Evals", "Product strategy"],
    demoUrl: "https://shelfready-ashen.vercel.app/playground",
    repoUrl: "https://github.com/OluTechTalk/shelfready",
    caseStudy: "shelfready",
    order: 1,
  },
  {
    slug: "support-copilot",
    title: "Support copilot",
    oneLiner:
      "An AI tool that drafts customer-support replies, plus the eval set that proves how good the drafts are.",
    customer: "Support teams using AI-drafted replies",
    status: "planned",
    build: 2,
    kind: "Eval harness",
    meta: "Claude Code + Claude API / eval harness",
    problem:
      "AI-drafted support replies read well and still get facts wrong, and nobody can say how often.",
    bet: "Build the eval set first, then change one prompt at a time and keep only what moves the score.",
    result:
      "Planned: pass rate per prompt version against a ship gate, on 200 test tickets.",
    plate: { artifact: { type: "line" }, color: "sage" },
    tags: ["Evals", "RAG", "Claude API"],
    order: 2,
  },
  {
    slug: "model-router",
    title: "Model router",
    oneLiner:
      "Route easy requests to a small model and hard ones to a large model, then prove the savings did not cost quality.",
    customer: "Teams pricing an AI feature",
    status: "planned",
    build: 3,
    kind: "Cost and quality",
    meta: "Claude API / cost and quality",
    problem:
      "Sending every request to the largest model makes each task too expensive to price.",
    bet: "Send easy requests to a small model, escalate hard ones, and score both with the Build 02 eval set.",
    result:
      "Planned: cost per task before and after, and the quality difference in points.",
    plate: { artifact: { type: "cost" }, color: "buff" },
    tags: ["Routing", "Cost", "Evals"],
    order: 3,
  },
  {
    slug: "roadmap-scorer",
    title: "Roadmap scorer",
    oneLiner:
      "An interactive tool that ranks feature requests by expected gain per engineering week and draws the capacity line.",
    customer: "Product teams with more requests than capacity",
    status: "planned",
    build: 4,
    kind: "Prioritization tool",
    meta: "Claude Code + Artifact / prioritization tool",
    problem:
      "Every request feels urgent and there is one team's worth of capacity.",
    bet: "Score each request by expected gain per engineering week and draw the capacity line in public.",
    result:
      "Planned: requests in vs commitments out. Example requests will be labeled as examples.",
    plate: { artifact: { type: "roadmap" }, color: "ink" },
    tags: ["Prioritization", "Artifacts"],
    order: 4,
  },
  {
    slug: "activation-flow",
    title: "Activation flow",
    oneLiner:
      "An onboarding flow with full event tracking and an A/B test of where verification happens.",
    customer: "Products losing new users before the first result",
    status: "planned",
    build: 5,
    kind: "Onboarding + analytics",
    meta: "Claude Code / onboarding + analytics",
    problem: "New users leave before they see anything useful.",
    bet: "Show a first result before asking for verification, and log every step of the flow.",
    result:
      "Planned: the funnel per variant, called directional under a few hundred users.",
    plate: { artifact: { type: "funnel" }, color: "buff" },
    tags: ["Experiments", "Analytics"],
    order: 5,
  },
  {
    slug: "interview-synthesiser",
    title: "Interview synthesiser",
    oneLiner:
      "Turns raw interview notes into tagged themes ranked by frequency and impact.",
    customer: "PMs running discovery",
    status: "next",
    kind: "Research workflow",
    tags: ["Research"],
    order: 6,
  },
  {
    slug: "weekly-metrics-reviewer",
    title: "Weekly metrics reviewer",
    oneLiner:
      "An agent that reads a metrics table weekly and writes the \"what changed and why\" note.",
    customer: "Product teams with a weekly metrics review",
    status: "next",
    kind: "Analytics agent",
    tags: ["Agents", "Analytics"],
    order: 7,
  },
];

// Earlier work, listed in the Index. No links until Olu is ready to show them.
export type EarlierWork = {
  name: string;
  oneLiner: string;
  kind: string;
  note: string; // e.g. "Live soon"
};

export const earlierWork: EarlierWork[] = [
  {
    name: "Wherewise",
    oneLiner:
      "A lifestyle-first relocation tool: tell it how you want to live, and it recommends places that fit, then shows rentals there.",
    kind: "Relocation recommender",
    note: "Live soon",
  },
];
