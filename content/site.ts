// Site-wide copy and links. Positioning (Olu, Oct 17): an AI builder who uses
// AI to build solutions that multiply output and solve real customer needs.
export const site = {
  name: "Olu Akele",
  firstName: "Olu",
  lastName: "Akele",
  title: "AI product builder",
  roleLead: "Built to multiply output.",
  roleEmphasis: "AI-built, eval-proven.",
  description:
    "Olu Akele uses AI to build solutions that multiply what a team can ship, lift performance and solve real customer problems, then proves each one with evals.",
  url: "https://oluakele.com",
  // Copy fields can be { simple, technical } (lib/copy.ts); Simple is the default view.
  pitch: {
    simple:
      "I'm a product manager who builds with AI. I take messy, complicated problems, make them simple, build the fix, and test it so the results are real, not just a nice demo.",
    technical:
      "I build solutions that multiply what a team can ship, lift performance, and solve the customer problem in front of them. Every build is measured with evals and documented in public, so the results are honest and the work moves faster.",
  },
  focus: "AI-built products, agents, evals",
  statement: {
    before: "I use AI to build what a team couldn't ship alone, then prove it with an",
    emphasis: "eval",
    after: ", not a demo.",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/oluwaseye-akele/",
    github: "https://github.com/OluTechTalk",
    email: "olu.akele@gmail.com",
    booking: "https://calendar.app.google/cVYv2tvpFK8PW9t79",
  },
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Index", href: "/#index" },
  { label: "Log", href: "/log" },
  { label: "Contact", href: "#contact" },
] as const;

export const ticker = [
  "Discovery",
  "Agents",
  "Evals",
  "Roadmaps",
  "Experiments",
  "Launch",
  "Retention",
] as const;

// The process rail: how a product gets run, one artifact per step.
export const process = [
  {
    title: "Frame",
    line: "Write the problem on one page: who is stuck, what it costs them, and which number should move.",
    artifact: "one-page problem brief",
  },
  {
    title: "Discover",
    line: "Read the real data and talk to the people in it before drawing anything. Listen for the sentence people repeat.",
    artifact: "interview notes and tagged examples",
  },
  {
    title: "Prototype",
    line: "Build a working version in days with Claude Code, on real data, so the team argues about behavior and not slides.",
    artifact: "working prototype",
  },
  {
    title: "Evaluate",
    line: "Agree the pass bar before building. Run the cases with known answers and review the failures by hand.",
    artifact: "eval set and scorecard",
  },
  {
    title: "Ship",
    line: "Roll out with a budget, a fallback and one metric named as the owner of the launch.",
    artifact: "rollout plan and guardrails",
  },
  {
    title: "Learn",
    line: "Write down what broke, read the worst outputs, then double down, change course or stop.",
    artifact: "build log and decision record",
  },
] as const;

export const toolkit = [
  "Claude Code",
  "Claude API",
  "MCP",
  "Evals",
  "Next.js",
  "Python",
  "SQL",
  "Figma",
] as const;
