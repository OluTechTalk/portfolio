// Career stats for the home proof strip, each with its role and years. They
// link to LinkedIn, the public source, because the résumé itself isn't
// published (it contains a phone number and home address).
//
// Source of truth (Olu's call): the résumé shared 2026-09-28. Other résumé
// versions only add what that one omits (the Spreetail fulfillment scope and
// the Arcadis role); prefer bullets that repeat across versions.

export type CareerStat = {
  value: string; // the number, as shown
  label: string; // what it measures
  role: string;
  company: string;
  years: string;
};

export const careerStats: CareerStat[] = [
  {
    value: "$6.8M",
    label: "incremental revenue from a continuous A/B testing program",
    role: "Principal Product Manager",
    company: "Visual Comfort & Co.",
    years: "2025–present",
  },
  {
    value: "+22%",
    label: "monthly completed bookings, 740k → 902.9k",
    role: "Senior Product Manager",
    company: "Zillow (ShowingTime)",
    years: "2022–2025",
  },
  {
    value: "−31%",
    label: "monthly support tickets, 15,000 → 10,350",
    role: "Senior Product Manager",
    company: "Spreetail",
    years: "2021–2022",
  },
  {
    value: "$400M+",
    label: "logistics operation run on AI-powered fulfillment across 7 distribution centers",
    role: "Senior Product Manager",
    company: "Spreetail",
    years: "2021–2022",
  },
  {
    value: "−10%",
    label: "costs on $31M in financials managed and forecast",
    role: "Senior Manager, Product Management",
    company: "Arcadis",
    years: "2017–2021",
  },
];
