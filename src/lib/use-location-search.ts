"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
};

/**
 * The current URL's query string, read in the browser only. Pages stay fully
 * static (no server-side searchParams), and the value fills in after load.
 */
export function useLocationSearch(): URLSearchParams | null {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => null,
  );
  return search === null ? null : new URLSearchParams(search);
}
