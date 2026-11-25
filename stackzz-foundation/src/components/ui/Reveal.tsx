import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Fades content in as it scrolls into view. This is a plain server-rendered
 * wrapper; one shared observer (RevealObserver, mounted in the root layout)
 * animates every `.reveal` element. Respects prefers-reduced-motion
 * (handled in globals.css: the effect is simply skipped).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  slow = false,
  className = "",
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  slow?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={`reveal ${slow ? "reveal-slow" : ""} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
