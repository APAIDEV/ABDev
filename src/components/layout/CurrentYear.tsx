"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * The copyright year. The static page is rendered with the build year and the
 * browser swaps in the current year, so the footer is never out of date.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => String(new Date().getFullYear()),
    () => process.env.NEXT_PUBLIC_BUILD_YEAR ?? "",
  );
  return <span>{year}</span>;
}
