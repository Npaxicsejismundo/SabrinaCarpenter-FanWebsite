"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { Magnetic } from "@/components/ui/Magnetic";
import { MotionToggle } from "./MotionToggle";
import { scrollToId } from "./SmoothScroll";

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Tuck the header away while scrolling down; bring it back on the way up.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // How far through the page we are, as a lipstick line under the header.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.scale = `${max > 0 ? y / max : 0} 1`;
      if (!reduced) setHidden(y > 240 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu with Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [open]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (!onHome || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = href.split("#")[1];
    if (id && scrollToId(id)) {
      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
    <header
      data-site-header
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color] duration-500 ease-[var(--ease-show)] ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${scrolled && !open ? "bg-bg/85 backdrop-blur-md" : ""}`}
    >
      <span
        ref={progressRef}
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-opacity duration-500 ${scrolled && !open ? "opacity-100" : "opacity-0"}`}
        style={{ scale: "0 1" }}
      />
      <div className="container-show flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="group relative z-10 flex items-baseline gap-2 rounded-full no-underline"
          aria-label={`${site.name}, home`}
        >
          <span
            className={`font-display soft text-[1.75rem] leading-none font-black italic ${open ? "text-bg" : "text-ink"}`}
          >
            Sabrina
          </span>
          <span
            className={`eyebrow hidden text-[0.6875rem] sm:inline ${open ? "text-bg/90" : "text-muted"}`}
          >
            the (unofficial) show
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Magnetic strength={0.25}>
                  <Link
                    href={item.href}
                    onClick={(e) => onNavClick(e, item.href)}
                    className="relative inline-flex rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
                  >
                    {item.label}
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-10 inline-flex h-11 items-center gap-3 rounded-full border border-ink/25 bg-bg/85 px-4 text-sm font-semibold text-ink lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
            />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

    </header>

      {/* Mobile menu: outside <header>, whose transform would trap `fixed` */}
      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink text-bg lg:hidden"
      >
        <nav aria-label="Mobile" className="container-show flex min-h-full flex-col justify-center pt-[calc(var(--header-h)+1rem)] pb-10">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className="font-display soft block py-1 text-[clamp(2.5rem,12vw,4.5rem)] leading-none font-black text-bg no-underline italic hover:text-deco-1"
                >
                  <span className="eyebrow mr-3 align-middle text-xs not-italic text-bg/90">
                    0{i + 1}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-start gap-4">
            <MotionToggle />
            <p className="eyebrow text-bg/90">{site.disclaimer}</p>
          </div>
        </nav>
      </div>
    </>
  );
}
