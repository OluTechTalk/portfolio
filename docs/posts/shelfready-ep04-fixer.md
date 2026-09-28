# ShelfReady Episode 04: social posts

Log post: https://oluakele.com/log/shelfready-ep04-fixer (live once `draft: false`)

## LinkedIn

I approved 101 AI-proposed fixes by hand. The store went from 94.1 to 98.3.

Episode 04 of ShelfReady: the audit says what's wrong, and the fixer proposes a change. A human approves, edits or rejects it, and approved fixes are written back to Shopify.

The core product call: a confident wrong spec costs more than a missing one. A made-up waterproof rating causes returns, while a gap only costs a sale.

So the fixer drops anything it can't prove from the product's own data, and hands the gap to the merchant instead of guessing.

What broke:
→ My first "all-or-nothing" apply landed 6 of 8 changes and marked all 8 failed. Shopify has no transaction across writes.
→ The fixer ran on a stale audit and drafted 11 rewrites of already-fixed descriptions. It was caught before review, and now it refuses stale data.
→ A new permission was "released" but not "granted" until the store accepted it.

The PM lesson: design for the cost of being wrong, not the rate of being right.
The builder lesson: record each change's result. Batches lie.

Result: 11 not-ready products down to 0, and 0 failed writes.

Full build log: https://oluakele.com/log/shelfready-ep04-fixer

#BuildInPublic #AIProductManagement #HumanInTheLoop

## Short post

I reviewed 101 AI-proposed catalog fixes by hand. Store score: 94.1 → 98.3, with not-ready products 11 → 0. The rule that made it trustworthy: if the fixer can't quote the product's own data, the fix is dropped. https://oluakele.com/log/shelfready-ep04-fixer

## Visual

The `/review` queue with one product card expanded, next to the `/audit` before/after table.
