import { DaysSince } from "@/components/days-since";
import { offTheClock } from "@/content/off-the-clock";

// Three personal cards. `full` (on /about) uses the longer copy.
export function OffTheClock({ full = false }: { full?: boolean }) {
  return (
    <ul className={`otc${full ? " otc-full" : ""}`}>
      {offTheClock.map((card) => (
        <li key={card.id} className={`otc-card otc-${card.id} rv`}>
          <span className="mono otc-label">{card.label}</span>
          {card.counterSince ? (
            <p className="otc-counter">
              <span className="otc-big">
                <DaysSince since={card.counterSince} />
              </span>
              <span className="mono">{card.counterLabel}</span>
            </p>
          ) : (
            <p className="otc-big">{card.headline}</p>
          )}
          <p className="otc-text">{full ? card.long : card.short}</p>
        </li>
      ))}
    </ul>
  );
}
