# ShelfReady Episode 07: social posts

Log post: https://oluakele.com/log/shelfready-ep07-playground (live once `draft: false`)

## LinkedIn

I put a live AI shopping agent on a public web page. The hard part wasn't the AI.

Episode 07 of ShelfReady: /playground, where anyone can ask the agent for "a 3-season tent for 2" and get back a real Shopify checkout link.

A public demo that calls a paid model can fail two ways: it costs too much, or a visitor sees an error. So before launch:
→ Cost has a ceiling: 10 messages per visitor per 10 minutes, 200 a day site-wide. Worst case is about $0.50/day.
→ Errors aren't an option: over the limit, the page plays a recorded replay of a real session instead.

What broke:
→ The rate limiter was silently off. A variable named `global` broke it, but only in the bundled build.
→ A "warmest sleeping bag" answer was wrong (20°F when the store has 0°F bags). It almost became a demo replay. Search ranks by relevance, not extremes.

The PM lesson: a public demo is a product with a budget. Decide the worst case and the failure experience first.
The builder lesson: test protection in the deployed build, not a script.

Try it: https://shelfready-ashen.vercel.app/playground
Build log: https://oluakele.com/log/shelfready-ep07-playground

#AIAgents #BuildInPublic #AIProductManagement

## Short post

A live AI shopping agent on a public page: a hard budget (~$0.50/day worst case) and recorded replays instead of errors. The bug that almost slipped: a variable named `global` disabled the rate limiter, but only in the bundled build. https://oluakele.com/log/shelfready-ep07-playground

## Visual

A screen recording of /playground: a prompt, the tool cards (search → stock → cart), and the "Go to Shopify checkout" button. Crop out the checkout URL itself.
