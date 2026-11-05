import Image from "next/image";
import Link from "next/link";
import { home } from "@/content/home";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function StoryTeaser() {
  const { storyTeaser: t } = home;
  return (
    <section aria-labelledby="story-title" className="on-light bg-linen text-black">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[28rem] bg-black lg:min-h-[48rem]">
          <Image
            src={t.image.src}
            alt={t.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
          <Reveal slow className="max-w-lg">
            <Eyebrow tone="taupe">{t.eyebrow}</Eyebrow>
            <h2 id="story-title" className="mt-6 text-[clamp(3rem,6vw,5.5rem)] italic">
              {t.title}
            </h2>
            <p className="mt-8 font-serif text-2xl leading-relaxed text-taupe">{t.body}</p>
            <Link
              href="/about"
              className="label group mt-12 inline-flex items-center gap-3 border-b border-black/40 pb-2 text-black hover:border-black"
            >
              {t.cta}
              <ArrowRightIcon size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
