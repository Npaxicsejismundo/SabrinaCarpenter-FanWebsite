import type { CSSProperties } from "react";
import {
  Amatic_SC,
  Barlow,
  Courier_Prime,
  Fraunces,
  Homemade_Apple,
  IM_Fell_English,
  Instrument_Sans,
  Jost,
  Pinyon_Script,
  Yesteryear,
} from "next/font/google";

/*
 * Core pairing (preloaded): Fraunces for display, Instrument Sans for body,
 * Courier Prime for labels. Era fonts are not preloaded; the browser fetches
 * each one only when text set in it is on the page.
 *
 * No metric-adjusted fallbacks. next/font normally adds an "X Fallback" face
 * (`src: local("Arial")` plus size overrides) to every font's stack, and
 * resolving those roughly doubled the cost of the first layout (FCP ~1.6s ->
 * ~0.9s on a throttled phone profile). Layout shift stays near zero without
 * them, because the hero type is hidden until its entrance plays.
 *
 * `adjustFontFallback: false` should be enough, but Turbopack (Next 16.4)
 * still emits the faces, so `fontVariables` below also leaves them out of
 * each stack; an unused @font-face is never resolved. Real fallback stacks
 * live in lib/font-family.ts and app/globals.css.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  // SOFT + optical size give the 70s display look; WONK is left out to keep
  // the file small.
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: false,
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "500"],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

const amatic = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

const yesteryear = Yesteryear({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

const imFell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

/**
 * Inline style for <html>: one CSS variable per font, holding just the web
 * font's family name (next/font's "X Fallback" face left out, see above).
 */
export const fontVariables = Object.fromEntries(
  Object.entries({
    "--font-fraunces": fraunces,
    "--font-instrument": instrument,
    "--font-courier": courier,
    "--font-jost": jost,
    "--font-barlow": barlow,
    "--font-homemade-apple": homemadeApple,
    "--font-amatic": amatic,
    "--font-yesteryear": yesteryear,
    "--font-pinyon": pinyon,
    "--font-im-fell": imFell,
  }).map(([name, font]) => [name, font.style.fontFamily.split(",")[0].trim()]),
) as CSSProperties;
