"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/*
 * Font gate. Text inside a gated element borrows the surrounding (already
 * loaded) font until the element is about a screen away from the viewport;
 * then it switches to its own font, which the browser only fetches now.
 *
 * Without it, the home page's first layout requests every era's font file
 * (~275 KB) for album titles that are far below the fold. The CSS half lives
 * in app/globals.css and only applies with JS, so no-JS visitors get every
 * font straight away.
 */

let observer: IntersectionObserver | undefined;

function nearObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.near = "";
        observer!.unobserve(entry.target);
      }
    },
    // A full screen of lead time in every direction (the album rail scrolls
    // sideways on wide screens).
    { rootMargin: "100%" },
  );
  return observer;
}

/** Open the gate on `el` (which has `data-font-gate`) once it nears the viewport. */
export function watchFontGate(el: HTMLElement) {
  const io = nearObserver();
  io.observe(el);
  return () => io.unobserve(el);
}

function useFontGate<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => (ref.current ? watchFontGate(ref.current) : undefined), []);
  return ref;
}

export function FontGate({
  as: Tag = "div",
  children,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useFontGate<HTMLElement>();
  return (
    <Tag ref={ref} data-font-gate {...rest}>
      {children}
    </Tag>
  );
}
