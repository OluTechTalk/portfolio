import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The same monogram as app/icon.svg, rasterized for iOS home screens.
export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "app/icon.svg"));
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img
    <img src={src} alt="" width={180} height={180} />,
    size,
  );
}
