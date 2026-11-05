import type { ReactNode } from "react";

/** Small wide-tracked label above headings, echoing the "DEVELOPMENT" wordmark. */
export function Eyebrow({
  children,
  tone = "stone",
  className = "",
}: {
  children: ReactNode;
  tone?: "gold" | "gold-deep" | "stone" | "taupe";
  className?: string;
}) {
  const color = {
    gold: "text-gold",
    "gold-deep": "text-gold-deep",
    stone: "text-stone",
    taupe: "text-taupe",
  }[tone];
  return <p className={`label ${color} ${className}`}>{children}</p>;
}
