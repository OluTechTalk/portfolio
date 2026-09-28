export const site = {
  name: "Olu Akele",
  title: "Forward deployed product manager · AI product builder",
  description:
    "Olu Akele is a forward deployed product manager and AI product builder: framing the customer problem, shipping the AI that solves it, and proving it works with evals.",
  url: "https://oluakele.com",
  pitch:
    "I'm a product manager who builds. I work inside messy real-world systems (catalogs, APIs, databases), figure out what the customer needs, ship the AI that does it, and prove it works with evals. Every step is documented in public.",
  links: {
    linkedin: "https://www.linkedin.com/in/oluwaseye-akele/",
    github: "https://github.com/OluTechTalk",
    email: "olu.akele@gmail.com",
    booking: "https://calendar.app.google/cVYv2tvpFK8PW9t79",
  },
} as const;


export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Log", href: "/log" },
  { label: "About", href: "/about" },
] as const;

// Home "How I work": the PM half and the builder half, one line each.
export const howIWork = [
  {
    title: "Frame the problem and the customer",
    line: "Name who it's for and what they're stuck on, and write down what \"done\" looks like before any code.",
  },
  {
    title: "Plan the roadmap and trade-offs",
    line: "Decide what not to build, set the cost ceiling, and log every call with the trade-off it makes.",
  },
  {
    title: "Build the AI into the real system",
    line: "Ship inside the messy system that already exists (catalogs, APIs, databases), not in a demo beside it.",
  },
  {
    title: "Prove it with evals, then iterate",
    line: "Measure against known answers before and after, and let the number decide what comes next.",
  },
] as const;
