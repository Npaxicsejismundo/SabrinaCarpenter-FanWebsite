import { cacheLife } from "next/cache";
import type { FontKey } from "@/content/types";

/*
 * Helpers for the Open Graph images (app/opengraph-image.tsx and
 * app/eras/[slug]/opengraph-image.tsx). Both run at build time; `use cache`
 * makes each download happen once and keeps the images static.
 */

export const OG_SIZE = { width: 1200, height: 630 };

/** Google Fonts family + weight for each font key (OG images need TTF/OTF). */
export const googleFont: Record<FontKey, { family: string; weight: number; italic?: boolean }> = {
  fraunces: { family: "Fraunces", weight: 900, italic: true },
  instrument: { family: "Instrument Sans", weight: 600 },
  courier: { family: "Courier Prime", weight: 400 },
  jost: { family: "Jost", weight: 200 },
  barlow: { family: "Barlow", weight: 300 },
  homemadeApple: { family: "Homemade Apple", weight: 400 },
  amatic: { family: "Amatic SC", weight: 700 },
  yesteryear: { family: "Yesteryear", weight: 400 },
  pinyon: { family: "Pinyon Script", weight: 400 },
  imFell: { family: "IM Fell English", weight: 400 },
};

/** Download a font from Google Fonts as TrueType (requested without a browser UA). */
export async function loadGoogleFont(key: FontKey): Promise<ArrayBuffer> {
  "use cache";
  cacheLife("max");
  const { family, weight, italic } = googleFont[key];
  const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${axis}`,
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Could not load ${family} for OG image`);
  return fetch(url).then((r) => r.arrayBuffer());
}

/** Fetch a remote image and inline it as a data URL. */
export async function imageDataUrl(src: string): Promise<string> {
  "use cache";
  cacheLife("max");
  const res = await fetch(src);
  const type = res.headers.get("content-type") ?? "image/jpeg";
  const b64 = Buffer.from(await res.arrayBuffer()).toString("base64");
  return `data:${type};base64,${b64}`;
}
