// Plain-English glossary from docs/REDESIGN.md. Shown as tooltips on
// [[term]] marks in Simple copy only.
export const glossary: Record<string, { term: string; meaning: string }> = {
  eval: { term: "Eval", meaning: "A test that scores how often the AI gets it right." },
  evals: { term: "Evals", meaning: "Tests that score how often the AI gets it right." },
  agent: { term: "Agent", meaning: "An AI that does tasks for you, not just answers questions." },
  agents: { term: "Agents", meaning: "AIs that do tasks for you, not just answer questions." },
  mcp: { term: "MCP", meaning: "A standard way to let AI assistants use a company's tools." },
  rag: { term: "RAG", meaning: "The AI looks things up in trusted documents before answering." },
  "a/b test": { term: "A/B test", meaning: "Showing two versions to real users to see which works better." },
};
