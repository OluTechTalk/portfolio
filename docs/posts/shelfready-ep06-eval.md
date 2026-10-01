# ShelfReady Episode 06: social posts

Log post: https://oluakele.com/log/shelfready-ep06-eval (live once `draft: false`)

## LinkedIn

I spent five episodes cleaning a catalog for AI shopping agents. The eval said the bigger lever was the agent's search tool.

Episode 06 of ShelfReady: 60 shopping tasks, 3 runs each, on the messy catalog and the fixed one. Same model, same tools. 360 sessions.

The first fair run surprised me. Messy catalog: 95%. Fixed catalog: 92.5%.

The failures weren't about the data. Search dropped numbers, so "6 person tent" returned the cheapest tents. Made-up attribute names silently matched nothing.

I fixed the tools, threw out every earlier run, and reran everything 3 times.

The result:
→ 0 wrong products bought, in 360 sessions
→ Success 98.9% → 99.4%
→ Tokens per task −4%

The honest part: the success rate barely moved, because many tasks have 2–4 right answers and the agent routes around a bad listing. Single-answer tasks are next.

The PM lesson: measure the whole path to the customer, not just the part you built.
The builder lesson: audit your eval harness as hard as your system. Mine had a bug that made "before" look worse.

Full build log: https://oluakele.com/log/shelfready-ep06-eval

#AIAgents #Evals #BuildInPublic

## Short post

360 AI-agent shopping sessions on a messy vs fixed catalog: 0 wrong products bought. The surprise: fixing the agent's search tool mattered more than fixing the data. https://oluakele.com/log/shelfready-ep06-eval

## Visual

The `/eval` page headline and outcome bars (before vs after with the run spread), or a side-by-side transcript of the "6 person tent" search before and after the tool fix.
