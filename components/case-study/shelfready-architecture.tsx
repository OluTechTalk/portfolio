// ShelfReady's architecture as two lanes of steps. Built in HTML rather than
// SVG so the text stays readable at 375px and follows the theme.

type Step = { title: string; detail: string; live?: boolean };

const lanes: { name: string; steps: Step[] }[] = [
  {
    name: "Fix the catalog",
    steps: [
      { title: "Shopify store", detail: "150 products, 50 seeded with defects" },
      { title: "Sync", detail: "Mirror into Postgres with a content hash" },
      {
        title: "Audit",
        detail: "7 rubric checks + one grounded model call per product",
      },
      {
        title: "Fixer",
        detail: "Rule fixes + model fixes that must quote the product's data",
      },
      { title: "Human review", detail: "Approve, edit or reject each fix" },
      {
        title: "Write-back",
        detail: "Approved fixes to Shopify, then re-sync and re-audit",
        live: true,
      },
    ],
  },
  {
    name: "Let agents shop",
    steps: [
      { title: "AI agent", detail: "e.g. Claude, via a custom connector" },
      {
        title: "MCP server",
        detail: "4 tools on Vercel, rate-limited, every call logged",
      },
      {
        title: "Search + details",
        detail: "Structured filters on the Postgres copy",
      },
      {
        title: "Stock + cart",
        detail: "Live from Shopify's Storefront API",
        live: true,
      },
      {
        title: "Checkout link",
        detail: "The shopper pays on Shopify; the agent never sees payment",
      },
    ],
  },
];

export function ShelfReadyArchitecture() {
  return (
    <figure className="my-8">
      <div className="grid gap-6 sm:grid-cols-2">
        {lanes.map((lane) => (
          <div key={lane.name} className="rounded-xl border p-4">
            <p className="text-sm font-semibold">{lane.name}</p>
            <ol className="mt-3">
              {lane.steps.map((step, i) => (
                <li key={step.title}>
                  {i > 0 && (
                    <span
                      className="block py-1 pl-4 text-muted-foreground"
                      aria-hidden
                    >
                      ↓
                    </span>
                  )}
                  <div
                    className={
                      step.live
                        ? "rounded-lg border border-brand/60 bg-card px-3 py-2"
                        : "rounded-lg border bg-card px-3 py-2"
                    }
                  >
                    <p className="text-sm font-medium">
                      {step.title}
                      {step.live && (
                        <span className="ml-2 text-xs font-normal text-brand">
                          live Shopify
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        ShelfReady so far (P0–P4). Search reads the synced copy because it has
        the structured attributes; stock and carts always go to Shopify live.
      </figcaption>
    </figure>
  );
}
