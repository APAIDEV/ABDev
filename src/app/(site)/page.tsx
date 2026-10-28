import { business } from "@/config/business";
import { home } from "@/content/home";
import { FinalCta } from "@/components/home/FinalCta";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${business.name} | Custom Home Builder on Long Island, NYC & Westchester`,
  description: `${business.tagline} ${business.name} is a woman-owned custom home builder serving Long Island, New York City, and Westchester: custom homes, new construction, renovations, dormers, and design consulting.`,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="bg-black">
        <div className="container-luxe">
          <TrustBadges variant="row" />
        </div>
      </div>

      <section aria-labelledby="intro-title" className="bg-black py-24 lg:py-36">
        <div className="container-luxe grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>{home.intro.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <h2 id="intro-title" className="text-4xl font-light sm:text-5xl lg:text-6xl">
              {home.intro.title}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone">{home.intro.body}</p>
          </Reveal>
        </div>
      </section>

      <Process />
      <Services />
      <GalleryPreview />
      <StoryTeaser />
      <Testimonials />
      <FinalCta {...home.finalCta} />
    </>
  );
}
