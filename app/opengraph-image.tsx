import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} / ${site.title}: ${site.roleLead} ${site.roleEmphasis}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette A: lavender paper, espresso ink, berry accent, amber signal.
const C = { paper: "#e1d3e4", ink: "#25130e", berry: "#80232b", band: "#88252e", amber: "#eb8f1e" };

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/photos/olu-hero.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: C.paper,
          color: C.ink,
          borderBottom: `20px solid ${C.band}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 56px 72px",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 3 }}>
            OLUAKELE.COM
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
              OLU AKELE
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 46, fontWeight: 700, marginTop: 28, lineHeight: 1.1 }}>
              <span>{site.roleLead.toUpperCase()}</span>
              <span style={{ color: C.berry }}>{site.roleEmphasis.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, letterSpacing: 2 }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: C.amber, marginRight: 12 }} />
            AI PRODUCT BUILDER · EVALS · BUILT IN PUBLIC
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img
          src={photoSrc}
          alt=""
          width={400}
          height={560}
          style={{
            width: 400,
            height: 560,
            marginTop: 70,
            marginRight: 64,
            objectFit: "cover",
            borderRadius: "200px 200px 0 0",
          }}
        />
      </div>
    ),
    size,
  );
}
