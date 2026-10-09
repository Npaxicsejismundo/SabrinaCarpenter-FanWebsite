import { ViewTransition, type ReactNode } from "react";
import type { ThemeVars } from "@/lib/theme";
import { Choreo } from "./Choreo";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ThemeScope } from "./ThemeScope";

/**
 * Every page: themed wrapper, header, main, footer. The <ViewTransition>
 * plays the curtain wipe when you navigate between pages.
 */
export function PageShell({
  vars,
  era,
  children,
}: {
  vars?: ThemeVars;
  era?: string;
  children: ReactNode;
}) {
  return (
    <ViewTransition enter="curtain" exit="curtain" default="none">
      <ThemeScope vars={vars} era={era}>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        {/* Scroll choreography for everything above (data-depth, data-drop…) */}
        <Choreo />
      </ThemeScope>
    </ViewTransition>
  );
}
