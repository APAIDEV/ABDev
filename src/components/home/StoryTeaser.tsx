import Image from "next/image";
import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";

export function StoryTeaser() {
  const { storyTeaser: t } = home;
  return (
    <section aria-labelledby="story-title" className="on-light bg-linen text-black">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[26rem] bg-black lg:min-h-[44rem]">
          <Image
            src={t.image.src}
            alt={t.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {t.image.src.includes("/placeholders/") && <PlaceholderTag className="absolute top-4 left-4" />}
        </div>
        <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20 lg:py-32">
          <Reveal slow className="max-w-lg">
            <Eyebrow tone="gold-deep">{t.eyebrow}</Eyebrow>
            <h2 id="story-title" className="mt-6 text-5xl italic lg:text-7xl">
              {t.title}
            </h2>
            <p className="mt-8 font-serif text-xl leading-relaxed text-taupe lg:text-2xl">{t.body}</p>
            <ButtonLink href="/about" variant="outline-dark" className="mt-12">
              {t.cta}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
