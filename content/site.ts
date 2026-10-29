import type { Copy } from "@/lib/copy";

// Site-wide copy and links. Positioning (Olu, Oct 17): an AI builder who uses
// AI to build solutions that multiply output and solve real customer needs.
export const site = {
  name: "Olu Akele",
  firstName: "Olu",
  lastName: "Akele",
  title: "AI product builder",
  roleLead: "Built to multiply output.",
  roleEmphasis: { simple: "Built with AI, tested for real.", technical: "AI-built, eval-proven." },
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
  focus: {
    simple: "[[AI agents|agents]] that do real work, tested before they ship",
    technical: "AI-built products, agents, evals",
  },
  statement: {
    before: {
      simple: "I use AI to build what a team couldn't build alone, then prove it works with a real",
      technical: "I use AI to build what a team couldn't ship alone, then prove it with an",
    },
    emphasis: { simple: "test", technical: "eval" },
    after: ", not a demo.",
  },
  aboutStrip: {
    simple:
      "I've led products at Visual Comfort & Co., Zillow, Spreetail and Arcadis. Now I also build the AI myself: I put it to work in real systems, measure how well it does, and write down what went wrong.",
    technical:
      "Product leader at Visual Comfort & Co., Zillow, Spreetail and Arcadis. Now I build the AI myself: ship it inside the real system, measure it, and write down what broke.",
  },
  logIntro: {
    simple: "What I decided, what I built, what went wrong, and the result. One write-up per step.",
    technical:
      "The product call, what I built, what broke, and the number. Every episode, written up.",
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

// Simple and technical words pair up by position.
export const ticker: Copy[] = [
  { simple: "Listen", technical: "Discovery" },
  { simple: "Plan", technical: "Agents" },
  { simple: "Build", technical: "Evals" },
  { simple: "Test", technical: "Roadmaps" },
  { simple: "Launch", technical: "Experiments" },
  { simple: "Learn", technical: "Launch" },
  { simple: "Repeat", technical: "Retention" },
];

// The process rail: how a product gets run, one artifact per step.
export const process = [
  {
    title: "Frame",
    line: {
    simple:
      "Write the problem on one page: who is stuck, what it costs them, and which number should change.",
    technical:
      "Write the problem on one page: who is stuck, what it costs them, and which number should move.",
  },
    artifact: { simple: "a one-page problem summary", technical: "one-page problem brief" },
  },
  {
    title: "Discover",
    line: {
    simple:
      "Look at the real information and talk to the people involved before designing anything. Listen for what they keep repeating.",
    technical:
      "Read the real data and talk to the people in it before drawing anything. Listen for the sentence people repeat.",
  },
    artifact: { simple: "interview notes and real examples", technical: "interview notes and tagged examples" },
  },
  {
    title: "Prototype",
    line: {
    simple:
      "Build a working version in days, using real information, so the team reacts to something real instead of slides.",
    technical:
      "Build a working version in days with Claude Code, on real data, so the team argues about behavior and not slides.",
  },
    artifact: { simple: "a working first version", technical: "working prototype" },
  },
  {
    title: "Evaluate",
    line: {
    simple:
      "Agree on what \"good enough\" means before building. Test it on questions with known answers, and read every mistake.",
    technical:
      "Agree the pass bar before building. Run the cases with known answers and review the failures by hand.",
  },
    artifact: { simple: "a test set and a scorecard", technical: "eval set and scorecard" },
  },
  {
    title: "Ship",
    line: {
    simple:
      "Launch with a spending limit, a backup plan, and one number that decides if it worked.",
    technical:
      "Roll out with a budget, a fallback and one metric named as the owner of the launch.",
  },
    artifact: { simple: "a launch plan with safety limits", technical: "rollout plan and guardrails" },
  },
  {
    title: "Learn",
    line: {
    simple:
      "Write down what broke, read the worst results, then decide: do more, change course, or stop.",
    technical:
      "Write down what broke, read the worst outputs, then double down, change course or stop.",
  },
    artifact: { simple: "a written log of what happened and why", technical: "build log and decision record" },
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

// About page bio. Technical: drafted from Oluwaseye_Akele_Resume_CO (Olu will edit).
export const aboutBio: Copy[] = [
  {
    simple:
      "I'm a product manager. I figure out what customers need, use AI to build it, and measure whether it actually worked. These days I build the AI myself.",
    technical:
      "I'm a product leader who turns AI capabilities into measurable business outcomes, and these days I build the AI myself.",
  },
  {
    simple:
      "For more than 9 years I've led products at Visual Comfort & Co., Zillow, Spreetail and Arcadis. Most recently I led an AI tool, used by 20 teams, that checks product information. It cut a six-week approval process to 45 minutes. I also built the testing that made an AI refund helper right 93% of the time before launch, up from 71%.",
    technical:
      "Over 9+ years at Visual Comfort & Co., Zillow, Spreetail and Arcadis, I've run growth, marketplace and catalog products. Most recently I led a custom-trained LLM catalog audit agent adopted by 20 teams, cutting validation and approval from six weeks to 45 minutes, and built the eval framework that took an AI refund agent from 71% to 93% decision accuracy before launch.",
  },
  {
    simple:
      "Every project starts the same way: understand the customer's problem, decide what not to build, build it inside the real system, and [[test it|eval]]. Then I write down what went wrong. ShelfReady is the first project I've built in public, and four more are on the way.",
    technical:
      "On every build I start with the customer problem, decide what not to build, ship inside the real system, and prove it with evals. Then I write down what broke. ShelfReady is the first build in public, and four more are queued.",
  },
];
