import type { FontKey } from "@/content/types";

/** CSS `font-family` value for each font key (variables set in lib/fonts.ts). */
export const fontFamily: Record<FontKey, string> = {
  fraunces: "var(--font-fraunces), Georgia, serif",
  instrument: "var(--font-instrument), system-ui, sans-serif",
  courier: "var(--font-courier), 'Courier New', monospace",
  jost: "var(--font-jost), 'Century Gothic', sans-serif",
  barlow: "var(--font-barlow), 'DIN Alternate', sans-serif",
  homemadeApple: "var(--font-homemade-apple), cursive",
  amatic: "var(--font-amatic), 'Arial Narrow', sans-serif",
  yesteryear: "var(--font-yesteryear), cursive",
  pinyon: "var(--font-pinyon), 'Snell Roundhand', cursive",
  imFell: "var(--font-im-fell), Garamond, serif",
};
