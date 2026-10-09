import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { Cursor } from "@/components/chrome/Cursor";
import { Preloader } from "@/components/chrome/Preloader";
import { SkipLink } from "@/components/chrome/SkipLink";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.longName,
    template: `%s · ${site.name} (fan site)`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.longName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2a1712",
  colorScheme: "light",
};

/*
 * Runs before first paint:
 *  - `js` enables the hide-until-animated styles (no-JS visitors see everything)
 *  - skips the preloader after the first visit in a session
 *  - restores the "Pause animations" choice
 *  - starts the preloader's intro on the first frame the visitor sees
 *    (two animation frames in), not while the page is still invisible
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('sabrina-preloaded'))d.classList.add('skip-preloader');if(localStorage.getItem('sabrina-motion')==='paused')d.dataset.motion='paused'}catch(e){}requestAnimationFrame(function(){requestAnimationFrame(function(){window.__preloaderGo=performance.now();d.classList.add('preloader-go')})})})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" style={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SkipLink />
        <Preloader />
        <SmoothScroll />
        {children}
        <Cursor />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
