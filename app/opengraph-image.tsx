import { ImageResponse } from "next/og";
import { showtimeTheme, site } from "@/content/site";
import { loadGoogleFont, OG_SIZE } from "@/lib/og";

export const alt = "The Sabrina Show: an unofficial Sabrina Carpenter fan site";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const t = showtimeTheme;
  const [display, mono] = await Promise.all([loadGoogleFont("fraunces"), loadGoogleFont("courier")]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: t.bg,
          color: t.ink,
          padding: 64,
          fontFamily: "Courier Prime",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 4 }}>
          <span>AN UNOFFICIAL FAN TRIBUTE</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: t.accent,
              color: t.onAccent,
              padding: "4px 16px",
              borderRadius: 999,
            }}
          >
            <span style={{ width: 14, height: 14, borderRadius: 999, background: t.onAccent }} />
            LIVE
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Fraunces", fontStyle: "italic", lineHeight: 0.85 }}>
          <span style={{ fontSize: 210 }}>Sabrina</span>
          <span style={{ fontSize: 210, color: t.accent, marginLeft: 180 }}>Carpenter</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span>{site.tagline.join(" ")}</span>
          <span>{site.name}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: display, style: "italic", weight: 900 },
        { name: "Courier Prime", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
