# ShelfReady Episode 01: social posts

Log post: https://oluakele.com/log/shelfready-ep01-foundation (live once `draft: false`)

## LinkedIn

My first build session had one finish line: a web page that says "green."

I'm building ShelfReady, a tool that checks whether AI shopping agents can find and buy products from a Shopify store, fixes the catalog, and proves it with evals.

Episode 01 wasn't about features. Done meant a live URL showing Shopify, the database and the model key all connected.

Two product calls shaped it:
→ Done is something you can open in a browser, not "works on my machine"
→ Secrets never touch the screen. Sessions are recorded, so scripts write credentials to a local file and print only "done"

What broke: my first deploy had no environment variables and returned a blank "deployment not found." After a redeploy, the status page named each missing setting, one by one, until everything went green.

The PM lesson: a visible definition of done ends scope debates before they start.
The builder lesson: make your health checks say *what's* missing, not just *that* something is.

About three hours, start to green.

Full build log: https://oluakele.com/log/shelfready-ep01-foundation

#BuildInPublic #AIProductManagement #Shopify

## Short post

Episode 01 of ShelfReady: no features, just a live page with every check green. The best part was a health page that names what's missing, which turned a blank deploy error into a checklist. https://oluakele.com/log/shelfready-ep01-foundation

## Visual

A screenshot of the live `/status` page with all checks green. Crop out the URL bar and any hostnames.
