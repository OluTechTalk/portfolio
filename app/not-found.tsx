import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-gutter py-section">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-display font-semibold">Page not found</h1>
      <p className="mt-4 max-w-prose text-lead text-muted-foreground">
        This page doesn&apos;t exist, or it hasn&apos;t shipped yet.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className={cn(
            buttonVariants(),
            "h-11 bg-linear-to-r from-brand to-brand-2 px-5 text-base text-brand-foreground hover:opacity-90",
          )}
        >
          Back to home
        </Link>
        <Link
          href="/log"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 bg-card px-5 text-base",
          )}
        >
          Read the build log
        </Link>
      </div>
    </main>
  );
}
