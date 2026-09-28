import { ImageResponse } from "next/og";

import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getCaseStudies()).map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = await getCaseStudy(slug);
  const project = projects.find((p) => p.slug === found?.study.project);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#ffffff",
          color: "#0a0a0a",
          borderTop: "16px solid #8535ce",
        }}
      >
        <div style={{ fontSize: 32, color: "#8535ce", display: "flex" }}>
          Case study
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1.5,
              display: "flex",
            }}
          >
            {project?.title ?? site.name}
          </div>
          {project && (
            <div
              style={{
                fontSize: 30,
                color: "#525252",
                lineHeight: 1.35,
                display: "flex",
              }}
            >
              {project.headline ?? project.oneLiner}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#525252",
          }}
        >
          <span>{site.name}</span>
          <span>oluakele.com</span>
        </div>
      </div>
    ),
    size,
  );
}
