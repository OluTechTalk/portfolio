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

import type { Copy } from "@/lib/copy";

export type Project = {
  slug: string; // "shelfready"
  title: string; // "ShelfReady — Agent-Ready Storefront"
  oneLiner: Copy; // one sentence, plain language
  customer: Copy; // who it's for, e.g. "Shopify merchants selling to AI shopping agents"
  status: "shipped" | "in-progress" | "planned" | "next";
  build?: number; // build order: 1 = ShelfReady
  kind?: Copy; // short type for the Index, e.g. "Agent-ready storefront"
  meta?: Copy; // mono meta line on the plate: tools / type of work
  problem?: Copy;
  bet?: Copy;
  result?: Copy; // planned builds: what will be measured, no numbers
  metric?: { value: Copy; label: Copy }; // the plate tag; measured only
  plate?: {
    artifact: PlateArtifact;
    color: "amber" | "sage" | "ink" | "buff";
    caption?: Copy; // what the chart measures, shown under it
  };
  headline?: Copy; // the eval number, e.g. "Agent shopping success 41% → 88%"
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
    oneLiner: {
      simple:
        "Cleans up an online store's product details so AI shopping assistants can find, compare and buy its products.",
      technical:
        "Makes a Shopify catalog clean and structured enough for AI shopping agents to find, compare and buy from.",
    },
    customer: {
      simple:
        "Online store owners whose customers shop with AI assistants",
      technical:
        "Shopify merchants selling to AI shopping agents",
    },
    status: "in-progress",
    build: 1,
    kind: {
      simple:
        "Store AI shoppers can read",
      technical:
        "Agent-ready storefront",
    },
    meta: {
      simple: "Helping online stores get found by AI shopping assistants",
      technical: "AI agents + MCP + Shopify / agent-ready storefront",
    },
    problem: {
      simple:
        "More people now ask an AI assistant to shop for them. When a product's details are vague or missing, the assistant skips it, and the store never knows why.",
      technical:
        "AI shopping agents skip products when catalog data is vague or missing, and merchants can't see the gap.",
    },
    bet: {
      simple:
        "Check every product the way an AI shopper would, fix what's missing, and have a person approve each change. Then test real AI shopping before and after.",
      technical:
        "Audit every product for agents, fix it with a human approving each change, then measure real agent shopping before and after.",
    },
    result: {
      simple:
        "Almost every product is now fully readable by an AI shopper: 99.3%, up from 78%. In 360 test shopping trips, the AI never bought the wrong item.",
      technical:
        "105 approved fixes took agent-ready products from 78% to 99.3%. In a 360-session shopping test across both catalogs, the AI agent never bought the wrong product.",
    },
    metric: {
      value: { simple: "99.3% AI-ready", technical: "99.3% agent-ready" },
      label: "up from 78% after 105 approved fixes",
    },
    plate: {
      artifact: {
        type: "bars",
        label: "Products agent-ready",
        before: 78,
        after: 99.3,
        unit: "%",
      },
      color: "amber",
      caption: {
        simple:
          "How many products an AI shopping assistant can fully understand. Before: the store as it was. After: 105 fixes, each one checked by a person.",
        technical:
          "Share of products an AI shopping agent can read fully. Before: the original catalog. After: 105 fixes, each approved by a person.",
      },
    },
    headline: {
      simple:
        "Products an AI shopper can fully read: 78% → 99.3%. 0 wrong items bought in 360 test shopping trips.",
      technical:
        "Agent-ready products 78% → 99.3% · 0 wrong buys in 360 agent shopping sessions",
    },
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
    kind: {
      simple:
        "Support replies, tested",
      technical:
        "Eval harness",
    },
    meta: {
      simple:
        "A support-reply writer with a built-in grader",
      technical:
        "LLM + RAG + Python / eval harness",
    },
    problem: {
      simple:
        "AI can write support replies that sound great but get facts wrong. Nobody knows how often.",
      technical:
        "AI-drafted support replies read well and still get facts wrong, and nobody can say how often.",
    },
    bet: {
      simple:
        "Write the test first: practice questions with known answers. Then improve the AI one change at a time and keep only what raises the score.",
      technical:
        "Build the eval set first, then change one prompt at a time and keep only what moves the score.",
    },
    result: {
      simple:
        "Planned: a score for each version of the AI, and a bar it must pass before it goes live.",
      technical:
        "Planned: pass rate per prompt version against a ship gate.",
    },
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
    kind: {
      simple:
        "Decide what to build next",
      technical:
        "Prioritization tool",
    },
    meta: {
      simple:
        "A tool for deciding what to build next",
      technical:
        "Interactive tool / prioritization",
    },
    problem: {
      simple:
        "Every request feels urgent, but the team can only do so much.",
      technical:
        "Every request feels urgent and there is one team's worth of capacity.",
    },
    bet: {
      simple:
        "Score each request by how much it helps for each week of work, and draw a clear line where the team runs out of time.",
      technical:
        "Score each request by expected gain per engineering week and draw the capacity line in public.",
    },
    result: {
      simple:
        "Planned: how many requests came in and how many the team took on. Sample requests will be labeled as samples.",
      technical:
        "Planned: requests in vs commitments out. Example requests will be labeled as examples.",
    },
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
    kind: {
      simple:
        "Safe allergy answers",
      technical:
        "Grounded answers",
    },
    meta: {
      simple:
        "Safe answers to allergy questions",
      technical:
        "LLM + RAG / grounded answers",
    },
    problem: {
      simple:
        "Staff answer allergy questions from menus, recipes and memory, and those don't always match.",
      technical:
        "Allergen answers come from menus, recipes and memory, and those sources don't always agree.",
    },
    bet: {
      simple:
        "Answer only from the restaurant's own information. If two sources disagree, say \"ask the kitchen\" instead of guessing.",
      technical:
        "Answer only from the restaurant's own sources, and send the guest to the kitchen whenever they conflict.",
    },
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
    kind: {
      simple:
        "Cheaper AI, same quality",
      technical:
        "Cost and quality",
    },
    meta: {
      simple:
        "Cheaper AI without worse answers",
      technical:
        "LLM routing + Python / cost and quality",
    },
    problem: {
      simple:
        "Using the biggest, priciest AI for every small task costs too much.",
      technical:
        "Sending every request to the largest model makes each task too expensive to price.",
    },
    bet: {
      simple:
        "Send easy questions to a smaller, cheaper AI and hard ones to the big one. Then use Red Pen's [[test|eval]] to make sure quality didn't drop.",
      technical:
        "Send easy requests to a small model, escalate hard ones, and score both with Red Pen's eval set.",
    },
    result: {
      simple:
        "Planned: the cost of each task before and after, and whether the answers got any worse.",
      technical:
        "Planned: cost per task before and after, and the quality difference in points.",
    },
    plate: { artifact: { type: "cost" }, color: "sage" },
    tags: ["Routing", "Cost", "Evals", "Python"],
    order: 5,
  },
  // Next up: a quieter row under the plates, no links.
  {
    slug: "activation-flow",
    title: "Activation flow",
    oneLiner: {
      simple:
        "Tests two sign-up flows with real users ([[A/B test]]): ask people to verify first, or show them something useful first?",
      technical:
        "An onboarding flow with full event tracking and an A/B test of where verification happens.",
    },
    customer: "Products losing new users before the first result",
    status: "next",
    kind: {
      simple:
        "Sign-up test",
      technical:
        "Onboarding + analytics",
    },
    tags: ["Experiments", "Analytics"],
    order: 6,
  },
  {
    slug: "weekly-digest",
    title: "Weekly digest",
    oneLiner: {
      simple:
        "An AI [[assistant|agent]] that reads a team's weekly numbers and writes a short note on what changed and why.",
      technical:
        "An agent that reads a metrics table every week and writes the \"what changed and why\" note.",
    },
    customer: "Product teams with a weekly metrics review",
    status: "next",
    kind: {
      simple:
        "Weekly numbers note",
      technical:
        "Analytics agent",
    },
    tags: ["Agents", "Analytics"],
    order: 7,
  },
  {
    slug: "interview-synthesiser",
    title: "Interview synthesiser",
    oneLiner: {
      simple:
        "Turns customer interview notes into a ranked list of what people said most, and what matters most.",
      technical:
        "Turns raw interview notes into tagged themes ranked by frequency and impact.",
    },
    customer: "PMs running discovery",
    status: "next",
    kind: {
      simple:
        "Interview summaries",
      technical:
        "Research workflow",
    },
    tags: ["Research"],
    order: 8,
  },
  {
    slug: "openapi-agent-toolkit",
    title: "OpenAPI → Agent Toolkit",
    oneLiner: {
      simple:
        "Lets an AI assistant use a company's existing software, without building each connection by hand.",
      technical:
        "Turns an OpenAPI spec into a set of tools an AI agent can call.",
    },
    customer: "Teams that want agents to use their existing API",
    status: "next",
    kind: {
      simple:
        "Connect AI to software",
      technical:
        "Agent tooling",
    },
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
