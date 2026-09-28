import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name}: ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/headshot.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 96,
          background: "#ffffff",
          color: "#0a0a0a",
          borderTop: "16px solid #0f766e",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img
          src={photoSrc}
          alt=""
          width={280}
          height={280}
          style={{ borderRadius: 9999 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            flex: 1,
            minWidth: 0,
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, color: "#525252", lineHeight: 1.3 }}>
            {site.title}
          </div>
          <div style={{ fontSize: 28, color: "#0f766e", marginTop: 12 }}>
            oluakele.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
