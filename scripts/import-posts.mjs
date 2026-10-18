// npm run import-posts
//
// Pulls episode posts from the sibling build repos into the portfolio as
// drafts. For each ../<repo>/docs/posts/*.md (read only; never written):
//   - refuse it if anything looks like a secret, and say which pattern hit
//   - validate the frontmatter with the site's zod schema (draft forced true)
//   - skip it if content/log/<slug>.mdx already exists
//   - write content/log/<slug>.mdx: frontmatter + the "Log post" section
//   - write docs/posts/<slug>.linkedin.md, .short.md, .video.md from the
//     matching sections, when present
// A repo without a docs/posts folder is skipped, not an error.
//
// Options: --root <dir> (where the sibling repos live; default ..)
//          --dry-run    (report only, write nothing)

import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

import { projects } from "../content/projects.ts";
import { makeLogPostSchema } from "../lib/log-schema.ts";

const REPOS = ["shelfready", "redpen"];
const SITE = "https://oluakele.com";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const rootArg = args.indexOf("--root");
const ROOT = path.resolve(rootArg >= 0 ? args[rootArg + 1] : "..");
const LOG_DIR = path.resolve("content", "log");
const SOCIAL_DIR = path.resolve("docs", "posts");

const schema = makeLogPostSchema(projects.map((p) => p.slug));

// Anything that looks like a credential or a store domain. The matched text is
// never printed, only the pattern's name.
const SECRET_PATTERNS = [
  ["token starting \"AQ.\"", /(^|[^A-Za-z0-9])AQ\./],
  ["key starting \"sk-\"", /(^|[^A-Za-z0-9])sk-[A-Za-z0-9_-]{6,}/],
  ["Shopify token \"shpat_\"", /shpat_/],
  ["\".myshopify.com\" domain", /\.myshopify\.com/i],
  ["\"client_secret\"", /client_secret/i],
  ["ANTHROPIC_API_KEY with a value", /ANTHROPIC_API_KEY\s*[=:]\s*["']?[^\s"'`]+/],
];

// "## Log post (400-700 words, for the site)" → "log". Headings are matched by
// their start, so the template's notes in parentheses don't matter.
const SECTIONS = [
  ["log", "log post"],
  ["linkedin", "linkedin"],
  ["short", "short post"],
  ["video", "video notes"],
];

function splitSections(body) {
  const out = {};
  let current;
  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      const name = heading[1].toLowerCase();
      current = SECTIONS.find(([, prefix]) => name.startsWith(prefix))?.[0];
      if (current) out[current] = [];
      continue;
    }
    if (current) out[current].push(line);
  }
  return Object.fromEntries(
    Object.entries(out)
      .map(([key, lines]) => [key, lines.join("\n").trim()])
      .filter(([, text]) => text.length > 0),
  );
}

const imported = [];
const skipped = [];
let existing = 0;
const skip = (file, reason) => skipped.push({ file, reason });

for (const repo of REPOS) {
  const dir = path.join(ROOT, repo, "docs", "posts");
  if (!existsSync(dir)) {
    console.log(`- ${repo}: no docs/posts folder yet, skipped`);
    continue;
  }
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md")).sort();
  console.log(`- ${repo}: ${files.length} post file(s)`);

  for (const file of files) {
    const label = `${repo}/docs/posts/${file}`;
    const text = await readFile(path.join(dir, file), "utf8");

    const hits = SECRET_PATTERNS.filter(([, re]) => re.test(text)).map(([name]) => name);
    if (hits.length) {
      skip(label, `refused, looks like a secret: ${hits.join(", ")}`);
      continue;
    }

    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!fm) {
      skip(label, "no frontmatter (see docs/POST_TEMPLATE.md)");
      continue;
    }

    let raw;
    try {
      raw = YAML.parse(fm[1]) ?? {};
    } catch (error) {
      skip(label, `frontmatter is not valid YAML: ${error.message.split("\n")[0]}`);
      continue;
    }
    const parsed = schema.safeParse({ ...raw, draft: true });
    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((i) => `${i.path.join(".") || "frontmatter"}: ${i.message}`)
        .join("; ");
      skip(label, `invalid frontmatter: ${issues}`);
      continue;
    }
    const post = parsed.data;

    const target = path.join(LOG_DIR, `${post.slug}.mdx`);
    if (existsSync(target)) {
      existing += 1; // already imported, or written by hand
      continue;
    }

    const sections = splitSections(text.slice(fm[0].length));
    if (!sections.log) {
      skip(label, 'no "## Log post" section');
      continue;
    }

    const { draft, ...rest } = post;
    const mdx = `---\n${YAML.stringify({ draft, ...rest }, { lineWidth: 0 })}---\n\n${sections.log}\n`;
    const social = [
      ["linkedin", "LinkedIn post"],
      ["short", "Short post"],
      ["video", "Video notes"],
    ].filter(([key]) => sections[key]);

    if (!dryRun) {
      await mkdir(SOCIAL_DIR, { recursive: true });
      await writeFile(target, mdx);
      for (const [key, name] of social) {
        const out = path.join(SOCIAL_DIR, `${post.slug}.${key}.md`);
        if (existsSync(out)) continue;
        const header = `# ${post.title}: ${name}\n\nLog post: ${SITE}/log/${post.slug} (draft, not live yet)\n\n`;
        await writeFile(out, `${header}${sections[key]}\n`);
      }
    }
    imported.push({ ...post, from: label, social: social.map(([key]) => key) });
  }
}

console.log(`\nImported ${imported.length} post(s)${dryRun ? " (dry run, nothing written)" : ""}, all draft: true. ${existing} already in content/log`);
for (const p of imported) {
  console.log(`\n  ${p.slug}  (from ${p.from})`);
  console.log(`    title:   ${p.title}`);
  console.log(`    summary: ${p.summary}`);
  console.log(`    metric:  ${p.metric ?? "none"}`);
  console.log(`    social:  ${p.social.length ? p.social.join(", ") : "none"}`);
}
if (skipped.length) {
  console.log(`\nSkipped ${skipped.length}:`);
  for (const s of skipped) console.log(`  ${s.file}: ${s.reason}`);
}
