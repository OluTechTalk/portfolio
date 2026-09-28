import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

// MDX files are imported from content/ (not used as routes). Plugins are
// named by string so Turbopack can load them. YAML frontmatter is exposed
// as `export const frontmatter` and validated in lib/log.ts.
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
  },
});

export default withMDX(nextConfig);
