import { ImageResponse } from "next/og";
import { eraBySlug, eras } from "@/content/eras";
import { googleFont, imageDataUrl, loadGoogleFont, OG_SIZE, publicImageDataUrl } from "@/lib/og";

export const alt = "Album era share card";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return eras.map((e) => ({ slug: e.slug }));
}

export default async function EraOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const era = eraBySlug((await params).slug) ?? eras[eras.length - 1];
  const t = era.theme;
  const ty = era.typography;
  const [display, mono, cover] = await Promise.all([
    loadGoogleFont(ty.display),
    loadGoogleFont("courier"),
    era.cover.kind === "spotify"
      ? imageDataUrl(era.cover.src)
      : era.cover.kind === "file"
        ? publicImageDataUrl(era.cover.src)
        : Promise.resolve(null),
  ]);
  const title = era.stylized ?? era.title;
  const displayName = googleFont[ty.display].family;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: 64,
          background: t.bg,
          color: t.ink,
          fontFamily: "Courier Prime",
        }}
      >
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} width={460} height={460} alt="" style={{ borderRadius: 12, boxShadow: "0 30px 60px rgba(0,0,0,0.35)" }} />
        ) : (
          <div
            style={{
              width: 460,
              height: 460,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: t.surface,
              borderRadius: 12,
              fontSize: 28,
              letterSpacing: 4,
            }}
          >
            {era.year}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <span style={{ fontSize: 24, letterSpacing: 4, color: t.muted }}>
            SABRINA CARPENTER · {era.kind.toUpperCase()} · {era.year}
          </span>
          <span
            style={{
              fontFamily: displayName,
              fontSize: title.length > 18 ? 82 : 110,
              lineHeight: 1,
              marginTop: 24,
              textTransform: ty.displayCase === "upper" ? "uppercase" : ty.displayCase === "lower" ? "lowercase" : "none",
              letterSpacing: ty.displayTracking === "0.32em" ? 18 : 0,
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: 30, marginTop: 28, color: t.accent }}>“{era.mood}”</span>
          <span style={{ fontSize: 22, marginTop: 40, color: t.muted }}>The Sabrina Show · unofficial fan site</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: displayName,
          data: display,
          style: googleFont[ty.display].italic ? "italic" : "normal",
          weight: googleFont[ty.display].weight as 400,
        },
        { name: "Courier Prime", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
