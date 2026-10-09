"use client";

/**
 * "The show has started" signal: fired when the preloader lifts (or right away
 * when it's skipped), so the hero knows when to run its entrance.
 */

declare global {
  interface Window {
    __showStarted?: boolean;
  }
}

const EVENT = "show:start";

export function startShow() {
  window.__showStarted = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onShowStart(cb: () => void) {
  if (window.__showStarted) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
