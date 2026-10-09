import type { CSSProperties, ReactNode } from "react";
import type { ThemeVars } from "@/lib/theme";

/**
 * Wraps a page and owns its colour/typography variables. Pages that don't pass
 * `vars` use the default showtime theme from globals.css.
 */
export function ThemeScope({
  vars,
  era,
  children,
}: {
  vars?: ThemeVars;
  era?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="theme-scope relative isolate flex flex-col"
      style={vars as CSSProperties | undefined}
      data-era={era}
    >
      {children}
    </div>
  );
}
