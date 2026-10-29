// "Off the clock" (docs/REDESIGN.md): three personal cards, above Contact on
// home (`short`) and in fuller form on /about (`long`). Same words in both
// reading views. No team logos or crests; team colors and type only.
//
// Facts (verified Oct 28, 2026): Giants' last Super Bowl win was XLVI, Feb 5,
// 2012. Spurs won the 2025 Europa League, 1–0 vs Manchester United in Bilbao
// on May 21, 2025, their first trophy since the 2008 League Cup.

export const offTheClockHeading = "Off the clock";
export const offTheClockNote = "Running, Sundays and a lot of patience";

export type OffTheClockCard = {
  id: "running" | "giants" | "spurs";
  label: string;
  headline?: string; // big display line; the Giants card shows its counter instead
  short: string;
  long: string;
  counterSince?: string; // ISO date the "days since" counter starts from
  counterLabel?: string;
};

export const offTheClock: OffTheClockCard[] = [
  {
    id: "running",
    label: "Running",
    headline: "Since third grade",
    // Olu's line (Oct 28).
    short:
      "I fell for running in third grade, on the track. I kept going through grade school, high school and college, then half marathons. It's not a hobby anymore; it's just how I live.",
    long: "My love of running started in third grade, competing in track and field. I carried it through grammar school, high school and college, and kept going afterward with half marathons. At this point running isn't something I make time for; it's part of how I live.",
  },
  {
    id: "giants",
    label: "New York Giants",
    counterSince: "2012-02-05",
    counterLabel: "Days since the Giants' last Super Bowl",
    short: "Still counting. Still watching every Sunday.",
    long: "The last one was Super Bowl XLVI, on Feb 5, 2012. Still counting. Still watching every Sunday.",
  },
  {
    id: "spurs",
    label: "Tottenham Hotspur",
    headline: "17 years, then Bilbao",
    short:
      "Spurs taught me patience: 17 years between trophies, and I kept showing up. Then Bilbao: Europa League champions, May 21, 2025. Same in product: keep shipping through the hard seasons.",
    long: "Spurs taught me patience: 17 years between trophies, and I kept showing up. Then Bilbao: Europa League champions, May 21, 2025, 1–0 against Manchester United, their first trophy since the 2008 League Cup. Same in product: keep shipping through the hard seasons.",
  },
];
