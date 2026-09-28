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

// Pages for Log and About don't exist yet, so they point at home sections.
export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Log", href: "/#now-building" },
  { label: "About", href: "/#about" },
] as const;
