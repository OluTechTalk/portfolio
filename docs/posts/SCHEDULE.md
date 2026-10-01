# LinkedIn series: "How I built ShelfReady"

The episodes were built Sep 24–30 and published on oluakele.com afterwards. Rather than post them in build order, the series opens with the result, then tells how it was built, three posts a week (Tue/Wed/Thu mornings). From Episode 08 on, post within a day or two of each episode.

**This file is the version to post.** Its LinkedIn texts replace the "LinkedIn" sections in the per-episode files in this folder; those stay as the source drafts. Short posts (X/Threads/Bluesky) are unchanged in the per-episode files.

**Links go in the first comment**, not the post body (LinkedIn shows posts with outside links to fewer people). Each post below lists its first comment.

**After each one goes live:** send Claude the post URL. It goes into `linkedinUrl` in the matching `content/log/*.mdx` (both posts for merged parts), and the log page then shows "Discuss on LinkedIn".

| # | Date | Post | Log pages it covers | Status |
|---|---|---|---|---|
| Anchor | Tue Oct 6 | The result: 0 wrong products in 360 agent sessions | `/projects/shelfready` | ☐ |
| Part 1 | Wed Oct 7 | Episodes 00 + 01: a $0 stack and "done means a green URL" | `shelfready-ep00-setup`, `shelfready-ep01-foundation` | ☐ |
| Part 2 | Thu Oct 8 | Episode 02: 150 products, 50 broken on purpose | `shelfready-ep02-catalog` | ☐ |
| Part 3 | Tue Oct 13 | Episode 03: my audit said 89% ready, and that was the bug | `shelfready-ep03-audit` | ☐ |
| Part 4 | Wed Oct 14 | Episode 04: 101 fixes, one human reviewer | `shelfready-ep04-fixer` | ☐ |
| Part 5 | Thu Oct 15 | Episode 05: Claude shopped my store and found a data bug | `shelfready-ep05-mcp` | ☐ |
| Part 6 | Tue Oct 20 | Episodes 06 + 07: the eval surprise, and a demo with a budget | `shelfready-ep06-eval`, `shelfready-ep07-playground` | ☐ |
| Bonus | Any Friday | Building my portfolio in public | `portfolio-ep05-v1` (text in `portfolio-ep05-v1.md`) | ☐ |
| Next | When it ships | Episode 08: launch (Loom + case study) | to be written | ☐ |

---

## Anchor (Tue Oct 6)

I built an AI-ready storefront from scratch and ran 360 AI shopping sessions against it. The result wasn't the one I expected.

The question: can an AI shopping agent actually find and buy a store's products, and does cleaning up the catalog help?

So I built ShelfReady in a week:
→ a 150-product outdoor-gear store on Shopify, a third of it broken on purpose
→ an audit that scores every product for AI agents
→ a fixer that proposes changes, with a human approving every one
→ an MCP server so agents like Claude can shop the store

The results:
→ Catalog readiness 94.1 → 98.3, with 105 human-approved fixes
→ 0 wrong products bought in 360 agent shopping sessions
→ Agent success 98.9% → 99.4%

The surprise: the biggest lever wasn't the catalog. On the first fair run, the agent's search tool was dropping numbers ("6 person tent" returned the cheapest tents). Fixing the tool moved both catalogs from 92.5–95% to 97.5–100%. Agent-readiness is data and tools.

You can try the agent yourself; link in the comments.

Over the next two weeks I'll share how I built it, one part at a time: the product calls, what broke, and the numbers.

#AIAgents #AIProductManagement #BuildInPublic

**First comment:**
Case study: https://oluakele.com/projects/shelfready
Try the shopping agent: https://shelfready-ashen.vercel.app/playground
Every episode: https://oluakele.com/log

---

## Part 1 (Wed Oct 7): Episodes 00 + 01

Part 1 of 6 · How I built ShelfReady

Before I wrote a line of product code, I set two rules.

Rule 1: $0 a month until it proves its value. That one call picked the whole stack: Vercel, Neon Postgres, Upstash Redis and Gemini's free tier. I logged the trade-off instead of pretending there wasn't one: compare models later, on the same eval.

Rule 2: done means a URL. Episode 01's finish line was a live status page showing Shopify, the database and the model key all green. Not "works on my machine."

What broke:
→ Shopify's bare developer URL opens an employee login.
→ A new-format API key worked for generation but got a 403 on another endpoint.
→ My first deploy had no environment variables and showed a blank "deployment not found." After a redeploy, the status page named each missing setting, one at a time, until everything went green.

About three hours from empty folder to green.

The PM lesson: decide the cost ceiling and the definition of done before the architecture.
The builder lesson: make health checks say what's missing, not just that something is.

#BuildInPublic #AIProductManagement #Shopify

**First comment:**
Episode 00: https://oluakele.com/log/shelfready-ep00-setup
Episode 01: https://oluakele.com/log/shelfready-ep01-foundation

---

## Part 2 (Thu Oct 8): Episode 02

Part 2 of 6 · How I built ShelfReady

I broke 50 products on purpose. Then my laptop froze.

ShelfReady's claim is that messy product data makes AI shopping agents fail. To test that, I needed a store whose mess I knew exactly.

So I skipped having a model write the catalog. A deterministic generator built 150 outdoor-gear products, injected 8 kinds of defects into 50 of them, and wrote down every one.

Why: if my code injects the defects, every audit and eval after this is scored against a known answer, not a model's opinion. It's also free and reproducible.

Then the laptop froze mid-seed, with 54 of 150 products in Shopify.

The recovery was boring, which is the goal. Each product carries a hash in Shopify, so the rerun skipped the 54, created the other 96 in 103 seconds, and failed 0.

The PM lesson: build the answer key before you write the test.
The builder lesson: keep resume state where the work lands, not in a local file.

#BuildInPublic #AIProductManagement #Evals

**First comment:** https://oluakele.com/log/shelfready-ep02-catalog

---

## Part 3 (Tue Oct 13): Episode 03

Part 3 of 6 · How I built ShelfReady

My audit said 89% of the store was ready for AI agents. That was the bug.

ShelfReady scores every product on one question: could an AI shopping agent confidently match it?

The first full run ranked products correctly, with clean ones averaging 100 and messy ones 82. But it still called 89% of the store "agent-ready" and 0% "not ready," including products with no specs at all.

The weighted sum let strong checks hide one fatal gap.

I had four options: keep the cutoffs, raise them, make the catalog messier, or add a gate. I chose the gate: any check below 0.5 caps a product at Partial, and two or more make it Not ready. Raising the cutoffs would have meant picking thresholds after seeing the data.

Also broken: an unpaced run hit the free-tier limit and saved a partial result, and the model judged "Cozy Layer!!!" a descriptive title. Making it quote its evidence fixed that.

The PM lesson: a score can rank correctly and still mislead. Check the headline against the question it's meant to answer.
The builder lesson: make the model quote its evidence, then check the quote in code.

Baseline: 94.1 / 100, with 11 products not ready.

#BuildInPublic #AIProductManagement #Evals

**First comment:** https://oluakele.com/log/shelfready-ep03-audit

---

## Part 4 (Wed Oct 14): Episode 04

Part 4 of 6 · How I built ShelfReady

I approved 101 AI-proposed fixes by hand. The store went from 94.1 to 98.3.

The audit says what's wrong. The fixer proposes a change, a human approves, edits or rejects it, and approved fixes are written back to Shopify.

The core product call: a confident wrong spec costs more than a missing one. A made-up waterproof rating causes returns; a gap only costs a sale. So the fixer drops anything it can't prove from the product's own data, and hands the gap to the merchant instead of guessing.

What broke:
→ My "all-or-nothing" apply landed 6 of 8 changes and marked all 8 failed. Shopify has no transaction across writes.
→ The fixer ran on a stale audit and drafted 11 rewrites of already-fixed descriptions. They were caught before review, and it now refuses stale data.
→ A new permission was "released" but not "granted" until the store accepted it.

The PM lesson: design for the cost of being wrong, not the rate of being right.
The builder lesson: record each change's result. Batches lie.

11 not-ready products down to 0, with 0 failed writes.

#BuildInPublic #AIProductManagement #HumanInTheLoop

**First comment:** https://oluakele.com/log/shelfready-ep04-fixer

---

## Part 5 (Thu Oct 15): Episode 05

Part 5 of 6 · How I built ShelfReady

I asked Claude to buy hiking boots from my store. It found a data bug instead.

I gave the store four MCP tools (search, product details, live stock and cart) and connected Claude.

The request: "waterproof hiking boots, men's 10, under $150."

In 7 tool calls, Claude found no boot under budget, offered the closest match (a $115.95 waterproof hiking shoe), and returned a working checkout link. No payment ever touches the agent.

Then a title in the results caught my eye: "Lynx 30f Synthetic Sleeping Bag."

My fixer had treated the product's URL as evidence, so a bad spec was "quoted" from the URL and then made a bad title look grounded. Every score had missed it.

The fix: specs must match the product's own text in number and unit. A recheck of every fix already written found 3 of 50 wrong. All corrected.

The PM lesson: put the product in front of a real agent early. Live use finds what metrics can't.
The builder lesson: define what counts as evidence before you trust a grounding check.

Last part next week: what 360 agent sessions showed.

#BuildInPublic #AIAgents #MCP

**First comment:** https://oluakele.com/log/shelfready-ep05-mcp

---

## Part 6 (Tue Oct 20): Episodes 06 + 07

Part 6 of 6 · How I built ShelfReady

The last part: proving it, then letting anyone try it.

The eval: 60 shopping tasks, 3 runs each, on the messy catalog and the fixed one. Same model, same tools. 360 sessions.

The first fair run surprised me: 95% on the messy catalog, 92.5% on the fixed one. The failures weren't about the data. Search dropped numbers, and made-up attribute names silently matched nothing. I fixed the tools, threw out every earlier run, and reran everything.

Result: 0 wrong products bought in 360 sessions, and success 98.9% → 99.4%. Honestly, that barely moved, because many tasks have several right answers and the agent routes around a bad listing. Single-answer tasks are next.

Then the demo: a public page where anyone can chat with the agent and get a real checkout link. A public demo that calls a paid model can fail two ways, so I designed for both:
→ Cost has a ceiling: about $0.50 a day at worst.
→ Errors aren't an option: past the limit, it plays a recorded replay of a real session.

The bug that almost slipped through: a variable named `global` turned the rate limiter off, but only in the bundled build.

The PM lesson: measure the whole path to the customer, and give every public demo a budget.
The builder lesson: audit the eval harness and the deployed build, not just the code.

Thanks for following along. Next: the launch.

#AIAgents #Evals #BuildInPublic

**First comment:**
Try the agent: https://shelfready-ashen.vercel.app/playground
Episode 06 (eval): https://oluakele.com/log/shelfready-ep06-eval
Episode 07 (playground): https://oluakele.com/log/shelfready-ep07-playground
Case study: https://oluakele.com/projects/shelfready
