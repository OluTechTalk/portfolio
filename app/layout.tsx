import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oluakele.com"),
  title: "Olu Akele · Forward deployed product manager",
  description:
    "Olu Akele is a forward deployed product manager and AI product builder: framing the customer problem, shipping the AI that solves it, and proving it works with evals.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
