import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The Information Architecture Playbook";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "white", background: "#090e1c", backgroundImage: "radial-gradient(900px 480px at 85% 0%, #f6b93b33, transparent 60%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 600 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "#f6b93b", display: "flex" }} />
          IA Playbook
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#f6b93b", textTransform: "uppercase" }}>A field guide</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, marginTop: 18 }}>Information architecture, from sitemaps to the AI era.</div>
        </div>
        <div style={{ fontSize: 24, color: "#8794b1" }}>Researched articles, interactive tools, no hype.</div>
      </div>
    ),
    size,
  );
}
