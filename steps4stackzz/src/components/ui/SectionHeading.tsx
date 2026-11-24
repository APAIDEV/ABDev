import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <Tag className="text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">{title}</Tag>
      {intro && (
        <div className={`mt-6 text-lg leading-relaxed text-muted ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {intro}
        </div>
      )}
    </Reveal>
  );
}
