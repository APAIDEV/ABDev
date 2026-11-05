import { business } from "@/config/business";
import { home } from "@/content/home";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Process } from "@/components/home/Process";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${business.name} | Custom Homes & New Development on Long Island, NYC & Westchester`,
  description: `${business.tagline} ${business.name} is a family-owned builder of custom homes and new development across Long Island, New York City, and Westchester. Work directly with the owner, from first sketch to final key.`,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <SelectedWork />
      <Services />
      <Process />
      <StoryTeaser />
      <Testimonials />
      <FinalCta {...home.finalCta} image={home.hero.slides[1]} />
    </>
  );
}
