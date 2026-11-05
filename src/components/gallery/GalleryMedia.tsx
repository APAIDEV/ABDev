import Image from "next/image";
import { itemImage, type GalleryItem } from "@/content/gallery";
import { PlayIcon } from "@/components/ui/Icons";

/** Full-size photo or video for the lightbox and item pages. */
export function GalleryMedia({
  item,
  priority = false,
  fit = "contain",
}: {
  item: GalleryItem;
  priority?: boolean;
  /** "contain" shows the whole photo (lightbox); "cover" fills the frame (project page). */
  fit?: "contain" | "cover";
}) {
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";
  if (item.media === "video") {
    if (!item.src) {
      return (
        <div className="relative h-full w-full">
          <Image src={itemImage(item)} alt={item.alt} fill sizes="100vw" className={fitClass} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
              <PlayIcon size={22} />
            </span>
            <p className="label text-ivory">Video coming soon</p>
          </div>
        </div>
      );
    }
    return (
      <video
        className={`h-full w-full ${fitClass}`}
        src={item.src}
        poster={item.poster}
        controls
        playsInline
        preload="none"
        aria-label={item.alt}
      />
    );
  }
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="100vw"
      quality={85}
      loading={priority ? "eager" : undefined}
      className={fitClass}
    />
  );
}
