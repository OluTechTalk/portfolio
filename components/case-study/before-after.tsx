// A few headline numbers read best as before → after tiles, not a chart.

type Stat = { label: string; before: string; after: string };

export function BeforeAfter({
  stats,
  caption,
}: {
  stats: Stat[];
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <dl className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="mt-2 flex items-baseline gap-2">
              <span className="text-lg text-muted-foreground">
                <span className="sr-only">from </span>
                {stat.before}
              </span>
              <span className="text-muted-foreground" aria-hidden>
                →
              </span>
              <span className="text-2xl font-semibold tracking-tight">
                <span className="sr-only">to </span>
                {stat.after}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
