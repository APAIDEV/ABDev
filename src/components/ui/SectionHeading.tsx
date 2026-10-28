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
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Eyebrow tone={light ? "gold-deep" : "gold"} className={center ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag id={id} className={`mt-6 text-4xl sm:text-5xl lg:text-6xl ${light ? "text-black" : "text-ivory"}`}>
        {title}
      </Tag>
      {intro && (
        <p className={`mt-6 text-base leading-relaxed sm:text-lg ${light ? "text-taupe" : "text-stone"}`}>{intro}</p>
      )}
    </Reveal>
  );
}
