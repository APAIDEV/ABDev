import Image from "next/image";
import type { Photo } from "@/content/photos";
import { RoofMark } from "./Logo";

/**
 * Shows an original photograph exactly as supplied. No filters, overlays, or
 * colour adjustments are ever applied to photos of Amanpreet.
 * When no photo has been added yet, a quiet empty frame is shown instead.
 */
export function PhotoFrame({
  photo,
  shape = "rect",
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
  tone = "blush",
  className = "",
}: {
  photo: Photo;
  shape?: "rect" | "arch";
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "blush" | "dark";
  className?: string;
}) {
  const radius = shape === "arch" ? "rounded-t-[999px]" : "";
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden ${aspect} ${radius} ${
          tone === "dark" ? "bg-burgundy-deep/60 ring-1 ring-ivory/10" : "bg-blush/45 ring-1 ring-blush"
        }`}
      >
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={90}
            className="object-cover"
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <RoofMark tone={tone === "dark" ? "light" : "dark"} className="w-24 opacity-40" />
            <p
              className={`text-[0.68rem] tracking-[0.24em] uppercase ${tone === "dark" ? "text-blush/70" : "text-muted"}`}
            >
              Photograph to come
            </p>
            <span className="sr-only">{photo.alt}</span>
          </div>
        )}
      </div>
      {photo.caption && (
        <figcaption className={`mt-3 text-sm ${tone === "dark" ? "text-blush/80" : "text-muted"}`}>
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
