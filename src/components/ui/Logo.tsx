import Image from "next/image";
import Link from "next/link";
import logo from "@/config/logo.generated.json";

/**
 * The AB Development logo. Generated from /public/logo.jpeg by
 * scripts/generate-brand-assets.mjs (runs automatically on build).
 * The header/footer use a transparent PNG made from it (white linework only),
 * so the logo sits cleanly over photos.
 */
export function Logo({
  height = 56,
  className = "",
  link = true,
}: {
  height?: number;
  className?: string;
  link?: boolean;
}) {
  const width = Math.round((logo.width / logo.height) * height);
  const img = (
    <Image
      src={logo.src}
      alt="AB Development"
      width={width}
      height={height}
      loading="eager"
      sizes={`${width * 2}px`}
      className={className}
      style={{ width, height }}
    />
  );
  if (!link) return img;
  return (
    <Link href="/" aria-label="AB Development, home" className="inline-flex shrink-0">
      {img}
    </Link>
  );
}
