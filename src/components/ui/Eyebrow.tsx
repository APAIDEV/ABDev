import type { ReactNode } from "react";

/** Small wide-tracked label with a hairline rule, used above headings. */
export function Eyebrow({
  children,
  tone = "gold",
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
  return (
    <p className={`label flex items-center gap-4 ${color} ${className}`}>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  );
}
