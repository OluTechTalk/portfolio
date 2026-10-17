import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// MDX content (log posts, case studies) renders inside `.prose-ed`, which
// carries the editorial typography (app/editorial.css). Only links need
// special handling: internal ones use next/link, external ones open a tab.
const components: MDXComponents = {
  a: ({ href = "", ...props }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
