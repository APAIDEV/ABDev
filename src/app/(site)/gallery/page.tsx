import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Custom homes, new development, spec homes, dormers, and interiors by AB Development across Long Island, New York City, and Westchester.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <section aria-labelledby="gallery-title" className="bg-black pt-20 pb-28 lg:pt-32 lg:pb-40">
        <div className="container-luxe">
          <SectionHeading
            as="h1"
            id="gallery-title"
            title="Projects"
            intro="Homes we've built across Long Island, New York City, and Westchester. Select a photo to see it larger, or a project name for the full story."
          />
          <div className="mt-16">
            <GalleryGrid />
          </div>
        </div>
      </section>
      <FinalCta
        title="Picture your home here."
        body="Tell me about the home you have in mind."
        button="Book a Consultation"
      />
    </>
  );
}
