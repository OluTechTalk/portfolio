// Résumé results for the home Proof section, grouped by role. They link to
// LinkedIn, the public source, because the résumé itself isn't published
// (it contains a phone number).
//
// Source of truth (Olu's call, Oct 17): Oluwaseye_Akele_Resume_CO.pdf. Every
// number here must match it. Lead with the AI results that multiply output.

export type CareerResult = {
  value: string; // the headline number, as shown
  text: string; // the result in one sentence, from the résumé bullet
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
      },
      {
        value: "15–20x",
        text: "monthly SKU corrections (1,000 by hand to 15–20K) by running the audit agent in production, with human-audited accuracy up from 45% to 97%.",
      },
      {
        value: "~11x",
        text: "monthly usage of an AI chatbot and MCP platform that acts for authenticated users, from ~200 conversations a week at launch to 10,000+ a month.",
      },
      {
        value: "71% → 93%",
        text: "decision accuracy for an AI refund agent, from an eval framework built on 80 real support tickets; it launched with zero policy-cap violations.",
      },
      {
        value: "$6.8M",
        text: "incremental revenue from an experimentation and A/B testing framework (50+ experiments), growing paid members 29%.",
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
      },
      {
        value: "$4M+ ARR",
        text: "from AI-powered scheduling optimization for ShowingTime+, growing monthly tour volume from 740k to ~949k.",
      },
      {
        value: "3x",
        text: "requests on a centralized AI service layer powering recommendations, dynamic pricing and support automation (20,000 to 60,000 a week in six months).",
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
      },
      {
        value: "−31%",
        text: "monthly support tickets (15,000 to 10,350) from self-service documentation, with customer satisfaction up from 68 to 87.",
      },
      {
        value: "$1.8M",
        text: "direct procurement savings from renegotiated vendor agreements ($11.2M to $9.4M).",
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
      },
    ],
  },
];
