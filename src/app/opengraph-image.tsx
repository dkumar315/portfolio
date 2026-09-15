import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt =
  "Devaansh Kumar — Software Engineer portfolio focused on backend and full-stack engineering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#f5f4ef",
        color: "#151816",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 80px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          fontSize: 24,
          fontWeight: 700,
          justifyContent: "space-between",
        }}
      >
        <span>{site.name}</span>
        <span style={{ color: "#056353", fontSize: 20 }}>{site.role}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div
          style={{
            color: "#056353",
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            marginBottom: 26,
            textTransform: "uppercase",
          }}
        >
          Engineering portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 1.04,
          }}
        >
          Backend-minded. Full-stack capable.
        </div>
        <div
          style={{
            color: "#656a65",
            display: "flex",
            fontSize: 30,
            lineHeight: 1.35,
            marginTop: 28,
          }}
        >
          Reliable systems, polished products and evidence-backed engineering.
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "2px solid #d9dbd5",
          display: "flex",
          fontSize: 20,
          justifyContent: "space-between",
          paddingTop: 28,
        }}
      >
        <span>Sydney, Australia</span>
        <span style={{ color: "#656a65" }}>
          Python · FastAPI · TypeScript · React
        </span>
      </div>
    </div>,
    size,
  );
}
