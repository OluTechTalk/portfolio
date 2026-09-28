export type Project = {
  slug: string; // "shelfready"
  title: string; // "ShelfReady — Agent-Ready Storefront"
  oneLiner: string; // one sentence, plain language
  customer: string; // who it's for, e.g. "Shopify merchants selling to AI shopping agents"
  status: "shipped" | "in-progress" | "planned";
  headline?: string; // the eval number, e.g. "Agent shopping success 41% → 88%"
  tags: string[]; // "MCP", "Shopify", "Evals", "Product strategy", ...
  demoUrl?: string;
  repoUrl?: string;
  videoUrl?: string; // Loom
  caseStudy?: string; // MDX slug
  order: number;
};

// TODO(Olu): confirm one-liners, customers and tags before cards ship in Episode 03.
export const projects: Project[] = [
  {
    slug: "shelfready",
    title: "ShelfReady — Agent-Ready Storefront",
    oneLiner:
      "Makes a Shopify catalog clean and structured enough for AI shopping agents to find, compare and buy from.",
    customer: "Shopify merchants selling to AI shopping agents",
    status: "in-progress",
    tags: ["MCP", "Shopify", "Evals", "Product strategy"],
    repoUrl: "https://github.com/OluTechTalk/shelfready",
    order: 1,
  },
  {
    slug: "openapi-agent-toolkit",
    title: "OpenAPI → Agent Toolkit",
    oneLiner:
      "Turns an existing OpenAPI spec into tools an AI agent can call safely and reliably.",
    customer: "Teams with an API who want agents to use it",
    status: "planned",
    tags: ["MCP", "OpenAPI", "Agents", "Evals"],
    order: 2,
  },
  {
    slug: "ask-your-data-analyst",
    title: "Trustworthy Ask-Your-Data Analyst",
    oneLiner:
      "Answers business questions from a database in plain English, and shows its work so you can trust the number.",
    customer: "Operators and PMs who need answers without writing SQL",
    status: "planned",
    tags: ["Text-to-SQL", "RAG", "Evals"],
    order: 3,
  },
  {
    slug: "eval-monitoring-harness",
    title: "Eval & Monitoring Harness",
    oneLiner:
      "A reusable harness to measure AI features before launch and watch them after.",
    customer: "Product teams shipping AI features",
    status: "planned",
    tags: ["Evals", "Monitoring", "LLMOps"],
    order: 4,
  },
];
