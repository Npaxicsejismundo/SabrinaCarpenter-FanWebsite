import type { Era, EraTypography, Theme } from "@/content/types";
import { fontFamily } from "./font-family";

/*
 * Colours are CSS custom properties (see globals.css), registered with
 * @property so changing a value animates smoothly. Each page wraps itself in a
 * <ThemeScope>, which sets these variables on its own element rather than on
 * <html>. That matters because Next keeps visited pages mounted (hidden) for
 * instant back-navigation: a theme set on <html> would leak between pages.
 */

export type ThemeVars = Record<`--${string}`, string>;

export function themeVars(theme: Theme): ThemeVars {
  return {
    "--c-bg": theme.bg,
    "--c-surface": theme.surface,
    "--c-ink": theme.ink,
    "--c-muted": theme.muted,
    "--c-accent": theme.accent,
    "--c-on-accent": theme.onAccent,
    "--c-deco-1": theme.deco[0],
    "--c-deco-2": theme.deco[1],
    "--c-deco-3": theme.deco[2],
  };
}

export function typographyVars(t: EraTypography): ThemeVars {
  return {
    "--font-era": fontFamily[t.display],
    "--font-era-accent": fontFamily[t.accent],
    "--era-case":
      t.displayCase === "upper"
        ? "uppercase"
        : t.displayCase === "lower"
          ? "lowercase"
          : "none",
    "--era-weight": String(t.displayWeight ?? 400),
    "--era-tracking": t.displayTracking ?? "0",
  };
}

export const eraVars = (era: Era): ThemeVars => ({
  ...themeVars(era.theme),
  ...typographyVars(era.typography),
});

/** Set variables inline on an element (used by the album rail). */
export function applyVars(el: HTMLElement, vars: ThemeVars) {
  for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
}

/** Remove inline variables so the element falls back to its stylesheet values. */
export function clearVars(el: HTMLElement, vars: ThemeVars) {
  for (const k of Object.keys(vars)) el.style.removeProperty(k);
}
