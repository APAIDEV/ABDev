import Link from "next/link";
import { business } from "@/config/business";
import { bookHref } from "@/config/site";
import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { HeroSlideshow } from "./HeroSlideshow";

export function Hero() {
  const { hero } = home;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-20 flex h-[calc(100svh-2.25rem)] min-h-[38rem] items-end overflow-hidden lg:-mt-24"
    >
      <HeroSlideshow slides={hero.slides} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/35 to-black/45" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-transparent to-transparent"
      />

      <div className="container-luxe pb-28 sm:pb-32">
        <p className="label hero-fade text-ivory/85" style={{ "--hero-delay": "100ms" } as React.CSSProperties}>
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="hero-fade mt-6 max-w-5xl text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.92] font-light text-ivory"
          style={{ "--hero-delay": "250ms" } as React.CSSProperties}
        >
          {business.tagline}
        </h1>
        <p
          className="hero-fade mt-7 max-w-lg text-lg leading-relaxed text-ivory/85"
          style={{ "--hero-delay": "450ms" } as React.CSSProperties}
        >
          {hero.subhead}
        </p>
        <div
          className="hero-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ "--hero-delay": "600ms" } as React.CSSProperties}
        >
          <ButtonLink href={bookHref}>{hero.primaryCta}</ButtonLink>
          <Link href="/gallery" className="label group inline-flex items-center gap-3 py-3 text-ivory">
            {hero.secondaryCta}
            <ArrowRightIcon size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
