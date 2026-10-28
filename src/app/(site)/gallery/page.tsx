import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Custom homes, new construction, renovations, dormers, spec homes, and interiors by AB Development across Long Island, New York City, and Westchester.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section aria-labelledby="gallery-title" className="bg-black pt-20 pb-24 lg:pt-32 lg:pb-36">
        <div className="container-luxe">
          <SectionHeading
            as="h1"
            id="gallery-title"
            eyebrow="Our Work"
            title="Gallery"
            intro="A look at homes we have imagined, built, and transformed. Select any project to view it larger or share it."
          />
          <div className="mt-14">
            <GalleryGrid />
          </div>
        </div>
      </section>
      <FinalCta title="Picture your home here." button="Book a Consultation" />
    </>
  );
}
