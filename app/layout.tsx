import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Instrument_Sans } from "next/font/google";

import { Motion } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

// Display: Archivo with its width axis (set to 62% for the condensed look).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});
const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});
const dmMono = DM_Mono({
  variable: "--font-utility",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = `${site.name} / ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

// Runs before first paint: the saved choice wins, otherwise follow the system
// (and keep following it live until the visitor picks a theme). Also marks the
// page as JS-capable so scroll reveals can start (content shows without JS).
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add("js");var m=matchMedia("(prefers-color-scheme: dark)");function a(){var t=null;try{t=localStorage.getItem("theme")}catch(e){}var k=t?t==="dark":m.matches;d.classList.toggle("dark",k);d.style.colorScheme=k?"dark":"light"}a();m.addEventListener("change",a)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSans.variable} ${dmMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <Motion />
      </body>
    </html>
  );
}
