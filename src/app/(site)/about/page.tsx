import Image from "next/image";
import { serviceArea } from "@/config/serviceArea";
import { about } from "@/content/about";
import { ServiceAreaMap } from "@/components/about/ServiceAreaMap";
import { FinalCta } from "@/components/home/FinalCta";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: about.meta.title,
  description: about.meta.description,
  path: "/about",
});

export default function AboutPage() {
  const { story, portrait, memorial, leadership, whereWeBuild, values, cta } = about;
  const before = story.paragraphs.slice(0, story.pullQuoteAfterParagraph + 1);
  const after = story.paragraphs.slice(story.pullQuoteAfterParagraph + 1);

  return (
    <>
      {/* ---------------------------------------------------------- Story */}
      <article aria-labelledby="story-title" className="bg-black pt-24 pb-20 lg:pt-36 lg:pb-28">
        <header className="container-luxe text-center">
          <p className="label hero-fade flex items-center justify-center gap-4 text-gold">
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
            {story.eyebrow}
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
          </p>
          <h1
            id="story-title"
            className="hero-fade mt-8 text-6xl font-light italic sm:text-7xl lg:text-8xl"
            style={{ "--hero-delay": "200ms" } as React.CSSProperties}
          >
            {story.title}
          </h1>
        </header>

        <figure className="container-luxe mt-16 lg:mt-24">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden border border-ivory/10 bg-charcoal sm:aspect-[3/2] sm:max-w-3xl">
            {portrait.src ? (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 640px) 48rem, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div aria-hidden="true" className="absolute inset-4 border border-dashed border-gold/30" />
                <PlaceholderTag>Photo slot</PlaceholderTag>
                <p className="max-w-xs text-sm text-stone">
                  Portrait of Aman and Birti. Add the photo in <code className="text-ivory">/src/content/about.ts</code>
                  .
                </p>
              </div>
            )}
          </div>
          {portrait.caption && portrait.src && (
            <figcaption className="label mt-5 text-center text-stone">{portrait.caption}</figcaption>
          )}
        </figure>

        <div className="mx-auto mt-16 max-w-[40rem] px-6 lg:mt-24">
          <StoryParagraphs paragraphs={before} first />
        </div>

        <Reveal slow as="figure" className="container-luxe my-20 lg:my-28">
          <div className="mx-auto max-w-4xl border-y border-gold/30 py-14 text-center lg:py-20">
            <blockquote>
              <p className="font-serif text-3xl leading-snug font-light text-ivory italic sm:text-4xl lg:text-5xl">
                &ldquo;{story.pullQuote}&rdquo;
              </p>
            </blockquote>
          </div>
        </Reveal>

        <div className="mx-auto max-w-[40rem] px-6">
          <StoryParagraphs paragraphs={after} />
        </div>

        {memorial.show && (
          <Reveal slow className="mx-auto mt-20 flex max-w-md items-center gap-6 px-6 lg:mt-28">
            <span aria-hidden="true" className="h-px flex-1 bg-gold/50" />
            <p className="label shrink-0 text-center text-gold">{memorial.text}</p>
            <span aria-hidden="true" className="h-px flex-1 bg-gold/50" />
          </Reveal>
        )}
      </article>

      {/* ----------------------------------------------------- Leadership */}
      <section aria-labelledby="leadership-title" className="on-light bg-ivory py-24 text-black lg:py-36">
        <div className="container-luxe">
          <SectionHeading id="leadership-title" eyebrow="The Team" title={about.leadershipTitle} light align="center" />
          <ul className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-2 lg:mt-20 lg:gap-16">
            {leadership.map((person, i) => (
              <Reveal as="li" key={person.name} delay={i * 150}>
                <article aria-labelledby={`leader-${i}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                    {person.photo.src ? (
                      <Image
                        src={person.photo.src}
                        alt={person.photo.alt}
                        fill
                        sizes="(min-width: 768px) 28rem, 100vw"
                        className="object-cover grayscale-[15%] transition-[filter] duration-700 hover:grayscale-0"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlaceholderTag>Photo slot</PlaceholderTag>
                      </div>
                    )}
                  </div>
                  <p className="label mt-8 text-gold-deep">{person.title}</p>
                  <h3 id={`leader-${i}`} className="mt-3 text-4xl">
                    {person.name}
                  </h3>
                  <p className="mt-5 leading-relaxed text-taupe">{person.bio}</p>
                  {person.quote && (
                    <blockquote className="mt-6 border-l border-gold-deep/50 pl-5 font-serif text-xl text-black italic">
                      <p>&ldquo;{person.quote}&rdquo;</p>
                    </blockquote>
                  )}
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------- Where we build */}
      <section aria-labelledby="where-title" className="bg-black py-24 lg:py-36">
        <div className="container-luxe">
          <SectionHeading
            id="where-title"
            eyebrow={whereWeBuild.eyebrow}
            title={whereWeBuild.title}
            intro={whereWeBuild.intro}
          />
          <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <ServiceAreaMap className="h-auto w-full" />
            </Reveal>
            <ul className="divide-y divide-ivory/10 border-y border-ivory/10 lg:col-span-5">
              {serviceArea.map((r, i) => (
                <Reveal as="li" key={r.id} delay={i * 120} className="py-8">
                  <h3 className="text-3xl">{r.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{r.summary}</p>
                  <p className="label mt-4 text-gold">{r.areas.map((a) => a.name).join(" · ")}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Values */}
      <section aria-labelledby="values-title" className="border-t border-ivory/10 bg-charcoal py-24 lg:py-36">
        <div className="container-luxe">
          <SectionHeading id="values-title" eyebrow={values.eyebrow} title={values.title} />
          <ul className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.items.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 100} className="bg-charcoal p-8 lg:p-10">
                <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-gold" />
                <h3 className="mt-8 text-3xl">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-stone">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta title={cta.title} button={cta.button} />
    </>
  );
}

function StoryParagraphs({ paragraphs, first = false }: { paragraphs: string[]; first?: boolean }) {
  return (
    <div className="space-y-8 font-serif text-[1.375rem] leading-[1.75] text-ivory/90 sm:text-2xl">
      {paragraphs.map((p, i) => (
        <Reveal as="p" slow key={i} className={first && i === 0 ? "text-ivory" : ""}>
          {p}
        </Reveal>
      ))}
    </div>
  );
}
