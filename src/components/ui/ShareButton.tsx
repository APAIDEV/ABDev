"use client";

import { useState } from "react";
import { ShareIcon } from "./Icons";

/**
 * Shares a link with the device's native share sheet (Web Share API),
 * falling back to copying the link to the clipboard.
 */
export function ShareButton({
  path,
  title,
  text,
  label = "Share",
  className = "",
  iconOnly = false,
}: {
  path: string;
  title: string;
  text?: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
}) {
  const [status, setStatus] = useState("");

  async function share() {
    const url = new URL(path, window.location.origin).toString();
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch {
      window.prompt("Copy this link:", url);
    }
    window.setTimeout(() => setStatus(""), 2500);
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={share}
        aria-label={iconOnly ? `${label}: ${title}` : undefined}
        className={`label inline-flex items-center gap-2.5 transition-colors ${className}`}
      >
        <ShareIcon size={16} />
        {!iconOnly && label}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`label pointer-events-none absolute top-full right-0 z-10 mt-2 bg-ivory px-3 py-2 text-[0.6rem] whitespace-nowrap text-black transition-opacity ${
          status ? "opacity-100" : "opacity-0"
        }`}
      >
        {status}
      </span>
    </span>
  );
}
