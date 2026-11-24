import Image from "next/image";
import logoLight from "../../../public/brand/logo-light.png";
import logoDark from "../../../public/brand/logo-dark.png";
import roofLight from "../../../public/brand/roof-light.png";
import roofDark from "../../../public/brand/roof-dark.png";

/**
 * The official Steps4Stackzz Foundation logo. The files are generated from
 * /brand-source/logo-original.png (see scripts/generate-brand-assets.mjs).
 * `tone="light"` is for burgundy backgrounds, `tone="dark"` for ivory ones.
 */
export function Logo({
  tone = "light",
  className = "",
  priority = false,
  sizes = "240px",
}: {
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={tone === "light" ? logoLight : logoDark}
      alt="Steps4Stackzz Foundation"
      className={className}
      priority={priority}
      sizes={sizes}
      quality={90}
    />
  );
}

/** The roof mark alone: a tribute to Amanpreet's original real estate branding. */
export function RoofMark({ tone = "dark", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Image
      src={tone === "light" ? roofLight : roofDark}
      alt=""
      aria-hidden="true"
      className={className}
      sizes="160px"
    />
  );
}
