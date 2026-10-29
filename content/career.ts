// Résumé results for the home Proof section, grouped by role. They link to
// LinkedIn, the public source, because the résumé itself isn't published
// (it contains a phone number).
//
// Source of truth (Olu's call, Oct 17): Oluwaseye_Akele_Resume_CO.pdf. Every
// number here must match it. Lead with the AI results that multiply output.

import type { Copy } from "@/lib/copy";

export type CareerResult = {
  value: string; // the headline number, as shown
  text: Copy; // the result in one sentence, from the résumé bullet
  meaning?: string; // Simple view only: what the number means, in one plain line
};

export type CareerRole = {
  company: string;
  role: string;
  years: string;
  results: CareerResult[];
};

export const career: CareerRole[] = [
  {
    company: "Visual Comfort & Co.",
    role: "Principal Product Manager",
    years: "2025–present",
    results: [
      {
        value: "6 wks → 45 min",
        text: "validation and approval workflows, after leading a custom-trained LLM catalog audit agent across 1M+ SKUs and 20 teams that cleared a 150K+ SKU error backlog to zero.",
        meaning:
          "Checking and approving product data took six weeks. With an AI checker I led, it takes 45 minutes.",
      },
      {
        value: "15–20x",
        text: "monthly SKU corrections (1,000 by hand to 15–20K) by running the audit agent in production, with human-audited accuracy up from 45% to 97%.",
        meaning:
          "The team now fixes 15 to 20 times more product errors each month, and the fixes are right far more often.",
      },
      {
        value: "~11x",
        text: "monthly usage of an AI chatbot and MCP platform that acts for authenticated users, from ~200 conversations a week at launch to 10,000+ a month.",
        meaning:
          "An AI help chat I led grew from about 200 conversations a week to more than 10,000 a month.",
      },
      {
        value: "71% → 93%",
        text: "decision accuracy for an AI refund agent, from an eval framework built on 80 real support tickets; it launched with zero policy-cap violations.",
        meaning:
          "An AI that decides on refunds went from right 71% of the time to 93%, because I built a way to test it before launch.",
      },
      {
        value: "$6.8M",
        text: "incremental revenue from an experimentation and A/B testing framework (50+ experiments), growing paid members 29%.",
        meaning:
          "Testing website changes on real users before rolling them out brought in $6.8 million in extra revenue.",
      },
    ],
  },
  {
    company: "Zillow",
    role: "Senior Product Manager",
    years: "2022–2025",
    results: [
      {
        value: "$42.2M",
        text: "incremental transaction value over four quarters from multivariate tests, growing active agent adoption 31% (300.2k to 400.2k).",
        meaning:
          "Testing page changes with real users added $42.2 million in transactions over a year.",
      },
      {
        value: "$4M+ ARR",
        text: "from AI-powered scheduling optimization for ShowingTime+, growing monthly tour volume from 740k to ~949k.",
        meaning:
          "Smarter scheduling for home tours brought in over $4 million a year in new revenue.",
      },
      {
        value: "3x",
        text: "requests on a centralized AI service layer powering recommendations, dynamic pricing and support automation (20,000 to 60,000 a week in six months).",
        meaning:
          "A shared AI system I led went from 20,000 to 60,000 requests a week in six months.",
      },
    ],
  },
  {
    company: "Spreetail",
    role: "Senior Product Manager",
    years: "2021–2022",
    results: [
      {
        value: "$400M+",
        text: "logistics operation across 7 distribution centers with AI-powered fulfillment; vendor onboarding cut from 8 weeks to ~5.2.",
        meaning:
          "I helped run shipping and warehouses for a $400-million-plus operation, and cut the time to bring on a new supplier from 8 weeks to about 5.",
      },
      {
        value: "−31%",
        text: "monthly support tickets (15,000 to 10,350) from self-service documentation, with customer satisfaction up from 68 to 87.",
        meaning:
          "Better help pages meant 31% fewer support tickets, and happier customers.",
      },
      {
        value: "$1.8M",
        text: "direct procurement savings from renegotiated vendor agreements ($11.2M to $9.4M).",
        meaning:
          "Renegotiating supplier deals saved $1.8 million.",
      },
    ],
  },
  {
    company: "Arcadis",
    role: "Senior Manager, Product Management",
    years: "2017–2021",
    results: [
      {
        value: "−10%",
        text: "costs on $31M in financials managed and forecast, at 100% alignment with budget goals.",
        meaning:
          "I helped manage $31 million in budgets and cut costs by 10%.",
      },
    ],
  },
];
