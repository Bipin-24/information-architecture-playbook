import { ImageResponse } from "next/og";
import { getAllArticles } from "@/lib/content";
import { tracks } from "@/lib/tracks";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Information Architecture Playbook article";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

const ACCENT = { foundations: "#f6b93b", practice: "#5fa8dd", "ai-era": "#ee7a55" } as const;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAllArticles().find((x) => x.slug === slug);
  const title = a?.title ?? "Information Architecture Playbook";
  const track = a ? tracks[a.track].label : "";
  const accent = a ? ACCENT[a.track] : "#f6b93b";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "white", background: "#090e1c", backgroundImage: `radial-gradient(900px 480px at 85% 0%, ${accent}33, transparent 60%)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f6b93b", display: "flex" }} />
          IA Playbook
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: accent, textTransform: "uppercase" }}>{track}</div>
          <div style={{ fontSize: title.length > 70 ? 54 : 66, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, marginTop: 18 }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: "#8794b1" }}>Information architecture, from fundamentals to the AI era</div>
      </div>
    ),
    size,
  );
}
