// Projects drive the home plates, the Index, the case study pages and the log
// filter. Numbers on the site come only from measured runs; planned builds
// carry no numbers until they ship (docs/case-studies.md, "Ground rules").

export type PlateArtifact =
  | { type: "bars"; label: string; before: number; after: number; unit: "%" }
  | { type: "line" } // planned: pass rate by prompt version vs a ship gate
  | { type: "cost" } // planned: cost per task, before vs after
  | { type: "roadmap" } // planned: Now / Next / Later board
  | { type: "funnel" } // planned: onboarding funnel per variant
  | { type: "sources" }; // planned: two sources that disagree → "ask the kitchen"

export type DataNote = "real" | "synthetic" | "anonymised" | "simulated";

export const dataNoteLabel: Record<DataNote, string> = {
  real: "Real data",
  synthetic: "Synthetic data",
  anonymised: "Anonymised data",
  simulated: "Simulated",
};

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
  tags: string[]; // "MCP", "Shopify", "Evals", "Product strategy", ... (up to 4)
  dataNote?: DataNote; // where the data came from; set once a build has results
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
    slug: "redpen",
    title: "Red Pen — Support copilot with an eval harness",
    oneLiner:
      "An AI tool that drafts customer-support replies, plus the eval set that proves how good the drafts are.",
    customer: "Support teams sending AI-drafted replies they can't yet trust",
    status: "planned",
    build: 2,
    kind: "Eval harness",
    meta: "Claude Code + Claude API + Python / eval harness",
    problem:
      "AI-drafted support replies read well and still get facts wrong, and nobody can say how often.",
    bet: "Build the eval set first, then change one prompt at a time and keep only what moves the score.",
    result: "Planned: pass rate per prompt version against a ship gate.",
    plate: { artifact: { type: "line" }, color: "sage" },
    tags: ["Evals", "RAG", "Claude API", "Python"],
    repoUrl: "https://github.com/OluTechTalk/redpen",
    order: 2,
  },
  {
    slug: "roadmap-scorer",
    title: "Roadmap scorer",
    oneLiner:
      "An interactive tool that ranks feature requests by expected gain per engineering week and draws the capacity line.",
    customer: "Product teams with more urgent requests than capacity",
    status: "planned",
    build: 3,
    kind: "Prioritization tool",
    meta: "Claude Code + Artifact / prioritization tool",
    problem:
      "Every request feels urgent and there is one team's worth of capacity.",
    bet: "Score each request by expected gain per engineering week and draw the capacity line in public.",
    result:
      "Planned: requests in vs commitments out. Example requests will be labeled as examples.",
    plate: { artifact: { type: "roadmap" }, color: "ink" },
    tags: ["Prioritization", "Artifacts", "Product strategy"],
    order: 3,
  },
  {
    slug: "allergen-assistant",
    title: "Restaurant allergen assistant",
    oneLiner:
      "An assistant that answers a restaurant's allergen questions and says 'ask the kitchen' whenever its sources conflict.",
    customer: "Restaurant staff answering guests' allergen questions",
    status: "planned",
    build: 4,
    kind: "Grounded answers",
    meta: "Claude API / grounded answers + abstention",
    problem:
      "Allergen answers come from menus, recipes and memory, and those sources don't always agree.",
    bet: "Answer only from the restaurant's own sources, and send the guest to the kitchen whenever they conflict.",
    result:
      "Planned: how often it answers correctly, and how often it says 'ask the kitchen' when it should.",
    plate: { artifact: { type: "sources" }, color: "buff" },
    tags: ["RAG", "Abstention", "Evals", "Claude API"],
    order: 4,
  },
  {
    slug: "model-router",
    title: "Model router",
    oneLiner:
      "Route easy requests to a small model and hard ones to a large model, then prove the savings did not cost quality.",
    customer: "Teams that can't price an AI feature while every request goes to the largest model",
    status: "planned",
    build: 5,
    kind: "Cost and quality",
    meta: "Claude API + Python / cost and quality",
    problem:
      "Sending every request to the largest model makes each task too expensive to price.",
    bet: "Send easy requests to a small model, escalate hard ones, and score both with Red Pen's eval set.",
    result:
      "Planned: cost per task before and after, and the quality difference in points.",
    plate: { artifact: { type: "cost" }, color: "sage" },
    tags: ["Routing", "Cost", "Evals", "Python"],
    order: 5,
  },
  // Next up: a quieter row under the plates, no links.
  {
    slug: "activation-flow",
    title: "Activation flow",
    oneLiner:
      "An onboarding flow with full event tracking and an A/B test of where verification happens.",
    customer: "Products losing new users before the first result",
    status: "next",
    kind: "Onboarding + analytics",
    tags: ["Experiments", "Analytics"],
    order: 6,
  },
  {
    slug: "weekly-digest",
    title: "Weekly digest",
    oneLiner:
      "An agent that reads a metrics table every week and writes the \"what changed and why\" note.",
    customer: "Product teams with a weekly metrics review",
    status: "next",
    kind: "Analytics agent",
    tags: ["Agents", "Analytics"],
    order: 7,
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
    order: 8,
  },
  {
    slug: "openapi-agent-toolkit",
    title: "OpenAPI → Agent Toolkit",
    oneLiner: "Turns an OpenAPI spec into a set of tools an AI agent can call.",
    customer: "Teams that want agents to use their existing API",
    status: "next",
    kind: "Agent tooling",
    tags: ["Agents", "MCP"],
    order: 9,
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
