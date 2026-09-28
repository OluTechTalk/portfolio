# ShelfReady Episode 03: social posts

Log post: https://oluakele.com/log/shelfready-ep03-audit (live once `draft: false`)

## LinkedIn

My audit said 89% of the store was ready for AI agents. That was the bug.

ShelfReady scores every product on one question: could an AI shopping agent confidently match it?

The first full run ranked products correctly. Clean ones averaged 100 and messy ones 82. But it still called 89% of the store "Agent-ready" and 0% "Not ready," including products with no specs at all.

The weighted sum let strong checks hide one fatal gap.

I had four options: keep the cutoffs, raise them, make the catalog messier, or add a gate. I chose the gate. Any check below 0.5 caps a product at Partial, and two or more make it Not ready. Raising the cutoffs would have meant picking thresholds after seeing the data.

What else broke: an unpaced run hit the free-tier limit and saved a partial result, and the model judged "Cozy Layer!!!" a descriptive title. Making it quote its evidence fixed that.

The PM lesson: a score can rank correctly and still mislead. Check the headline against the question it's meant to answer.
The builder lesson: make the model quote its evidence, then check the quote in code.

Baseline: 94.1 / 100, with 11 products not ready.

Full build log: https://oluakele.com/log/shelfready-ep03-audit

#BuildInPublic #AIProductManagement #Evals

## Short post

My first catalog audit ranked products correctly but called 89% of the store "agent-ready," including products with no specs. The fix was a gate where one fatal gap caps the band. Baseline: 94.1/100, 11 products not ready. https://oluakele.com/log/shelfready-ep03-audit

## Visual

The `/audit` page's band bar and worst-offenders list. Optionally, a two-bar comparison of the band split before the gate (89% ready) and after it (78%).
