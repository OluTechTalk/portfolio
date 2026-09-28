import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Typography for MDX content (log posts, case studies). Kept here instead of
// a typography plugin so it follows the site tokens directly.
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 mb-3 text-title font-semibold scroll-mt-8"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-2 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props) => <p className="my-4 leading-7" {...props} />,
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6" {...props} />,
  li: (props) => <li className="pl-1 leading-7" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link
        href={href}
        className="font-medium underline underline-offset-4 hover:text-brand"
        {...props}
      />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline underline-offset-4 hover:text-brand"
        {...props}
      />
    ),
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-brand pl-4 text-muted-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-10" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
