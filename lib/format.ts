// Display helpers shared by server and client components (no Node APIs here).

export function formatEpisode(episode: number) {
  return `Episode ${String(episode).padStart(2, "0")}`;
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
