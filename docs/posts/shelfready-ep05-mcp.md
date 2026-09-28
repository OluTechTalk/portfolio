# ShelfReady Episode 05: social posts

Log post: https://oluakele.com/log/shelfready-ep05-mcp (live once `draft: false`)

## LinkedIn

I asked Claude to buy hiking boots from my store. It found a data bug instead.

Episode 05 of ShelfReady: I gave the store four MCP tools (search, product details, live stock and cart) and connected Claude.

The request: "waterproof hiking boots, men's 10, under $150."

In 7 tool calls, Claude found no boot under budget, offered the closest match (a $115.95 waterproof hiking shoe), and returned a working checkout link. No payment ever touches the agent.

Then I saw a title in the results: "Lynx 30f Synthetic Sleeping Bag."

My fixer had treated the product's URL as evidence, so a bad spec was "quoted" from the URL and then made a bad title look grounded. Every score had missed it.

The fix: specs must match the product's own text in number and unit. A re-check of every fix already written found 3 of 50 wrong. All are corrected now.

The PM lesson: put the product in front of a real agent early. Live use finds what metrics can't.
The builder lesson: define what counts as evidence before you trust a grounding check.

Next: 40 shopping tasks, on the messy catalog and the fixed one.

Full build log: https://oluakele.com/log/shelfready-ep05-mcp

#BuildInPublic #AIAgents #MCP

## Short post

Claude shopped my Shopify store through 4 MCP tools and returned a checkout link in 7 calls. It also exposed a bug: my fixer had treated a URL as product evidence. 3 of 50 fixes were wrong, and they're fixed now. https://oluakele.com/log/shelfready-ep05-mcp

## Visual

A screenshot of the Claude conversation showing the tool calls and the checkout link. Crop out any store hostnames, cart IDs and the checkout URL itself.
