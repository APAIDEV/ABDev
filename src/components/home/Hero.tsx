import Image from "next/image";
import { business } from "@/config/business";
import { bookHref } from "@/config/site";
import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

export function Hero() {
  const { hero } = home;
  const isPlaceholder = hero.image.src.includes("/placeholders/");
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-black"
    >
      <div className="absolute inset-0 -z-10">
        <div className="ken-burns absolute inset-0">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />
        </div>
        {hero.video && (
          <video
            className="absolute inset-0 hidden h-full w-full object-cover motion-safe:block"
            src={hero.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      </div>

      {isPlaceholder && <PlaceholderTag className="absolute top-6 right-6">Placeholder hero image</PlaceholderTag>}

      <div className="container-luxe pt-32 pb-16 sm:pb-24 lg:pb-28">
        <p
          className="label hero-fade flex items-center gap-4 text-gold"
          style={{ "--hero-delay": "100ms" } as React.CSSProperties}
        >
          <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="hero-fade mt-8 max-w-4xl text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.95] font-light text-ivory"
          style={{ "--hero-delay": "250ms" } as React.CSSProperties}
        >
          {business.tagline}
        </h1>
        <p
          className="hero-fade mt-8 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg"
          style={{ "--hero-delay": "450ms" } as React.CSSProperties}
        >
          {business.supportingLine}
        </p>
        <div
          className="hero-fade mt-10 flex flex-wrap gap-4"
          style={{ "--hero-delay": "600ms" } as React.CSSProperties}
        >
          <ButtonLink href={bookHref}>{hero.primaryCta}</ButtonLink>
          <ButtonLink href="/gallery" variant="outline">
            {hero.secondaryCta}
          </ButtonLink>
        </div>
        <p className="label hero-fade mt-14 text-stone" style={{ "--hero-delay": "800ms" } as React.CSSProperties}>
          {hero.regions}
        </p>
      </div>
    </section>
  );
}
