# ShelfReady Episode 02: social posts

Log post: https://oluakele.com/log/shelfready-ep02-catalog (live once `draft: false`)

## LinkedIn

I broke 50 products on purpose. Then my laptop froze.

ShelfReady's claim is that messy product data makes AI shopping agents fail. To prove it, I need a store whose mess I know exactly.

So I skipped the obvious move of having a model write the catalog. Instead, a deterministic generator built 150 outdoor-gear products and injected 8 kinds of defects into 50 of them, then wrote down every one.

Why: if my code injects the defects, every audit and eval from now on is scored against a known answer, not a model's opinion. It's also free and reproducible.

Then the laptop froze mid-seed. 54 of 150 products had landed in Shopify.

The recovery was boring, which is exactly what you want. Each product carries a hash in Shopify, so the re-run skipped the 54, created the other 96 in 103 seconds, and failed 0.

The PM lesson: build the answer key before you write the test.
The builder lesson: keep resume state where the work lands, not in a local file.

150 products. Defects matched on 150 of 150.

Full build log: https://oluakele.com/log/shelfready-ep02-catalog

#BuildInPublic #AIProductManagement #Evals

## Short post

I seeded 150 products into Shopify, 50 broken on purpose, so every future eval has an exact answer key. My laptop froze halfway through, and the seed resumed cleanly because the progress lived in Shopify, not on my machine. https://oluakele.com/log/shelfready-ep02-catalog

## Visual

A before/after pair of the same product: a clean listing next to its seeded messy twin (a vague title, specs only in marketing copy).
