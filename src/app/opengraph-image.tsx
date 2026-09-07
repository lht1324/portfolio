import { ImageResponse } from "next/og";

export const alt = "Jaeho Lee · Freelance Developer for AI Products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#34d399", letterSpacing: 2 }}>
          JAEHOLEE.XYZ
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 700,
            marginTop: 16,
            lineHeight: 1.1,
          }}
        >
          <div>I ship AI products</div>
          <div>past the demo stage.</div>
        </div>
        <div style={{ fontSize: 26, color: "#a1a1aa", marginTop: 24 }}>
          Replicate · fal.ai · MVP builds
        </div>
      </div>
    ),
    { ...size },
  );
}
