// Career stats for the home proof strip. Each one comes from Olu's résumé
// (the version shared 2026-09-28) and carries its role and years. They link to
// LinkedIn, the public source, because the résumé itself isn't published.
// Adding another résumé's numbers: check they agree with these first.

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
];
