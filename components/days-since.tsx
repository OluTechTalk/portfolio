"use client";

import { useSyncExternalStore } from "react";

// Whole days from `since` (YYYY-MM-DD) to the visitor's local today. The
// server and the first client render show "—" (server snapshot), so the
// static HTML and hydration always match; the real number fills in right
// after, and refreshes every minute so it rolls over at midnight.
function daysSince(since: string) {
  const [y, m, d] = since.split("-").map(Number);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((today - Date.UTC(y, m - 1, d)) / 86_400_000);
}

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}

export function DaysSince({ since }: { since: string }) {
  const days = useSyncExternalStore(
    subscribe,
    () => daysSince(since),
    () => null,
  );
  return <>{days === null ? "—" : days.toLocaleString("en-US")}</>;
}
