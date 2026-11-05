import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  align = "left",
  as: Tag = "h2",
  id,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow tone={light ? "taupe" : "stone"}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={`${eyebrow ? "mt-5" : ""} text-[clamp(2.5rem,5.5vw,4.75rem)] ${light ? "text-black" : "text-ivory"}`}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${center ? "mx-auto" : ""} ${light ? "text-taupe" : "text-stone"}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
