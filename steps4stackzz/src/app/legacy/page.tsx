import type { Metadata } from "next";
import { foundation } from "@/config/site";
import { legacy } from "@/content/legacy";
import { gallery, legacyPortrait } from "@/content/photos";
import { memories } from "@/content/memories";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/Icons";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MemoryForm } from "@/components/forms/MemoryForm";

export const metadata: Metadata = {
  title: "His Legacy",
  description:
    "Amanpreet Singh embodied ambition, humility, generosity, and an extraordinary work ethic. Remember his life and share your memories.",
};

export default function LegacyPage() {
  return (
    <>
      {/* Portrait and introduction */}
      <section className="on-dark bg-burgundy text-ivory">
        <div className="container-page grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-12 lg:gap-16 lg:pt-24 lg:pb-28">
          <Reveal className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" slow>
            <PhotoFrame photo={legacyPortrait} tone="dark" priority sizes="(min-width: 1024px) 38vw, 90vw" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={150} slow>
            <p className="eyebrow mb-6">{legacy.intro.eyebrow}</p>
            <h1 className="text-[3.1rem] leading-[1.02] sm:text-7xl">{legacy.intro.title}</h1>
            <p className="mt-8 font-serif text-[1.65rem] leading-snug text-blush italic sm:text-[1.9rem]">
              {legacy.intro.lede}
            </p>
            <div className="prose-foundation mt-8 text-[1.05rem] leading-relaxed text-blush/85">
              {legacy.intro.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The qualities he lived by */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-20 lg:gap-28">
            {legacy.qualities.map((q, i) => (
              <article key={q.id} id={q.id} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <p className="eyebrow mb-5">{q.eyebrow}</p>
                  <h2 className="text-4xl sm:text-5xl">{q.title}</h2>
                </Reveal>
                <Reveal
                  className={`prose-foundation text-lg text-muted lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}
                  delay={120}
                >
                  {q.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principle */}
      <section className="bg-parchment">
        <Reveal className="container-text py-20 text-center lg:py-24">
          <p className="font-serif text-4xl text-burgundy italic sm:text-5xl">{foundation.principle.gurmukhi}</p>
          <p className="mt-5 text-lg text-muted">{foundation.principle.meaning}</p>
        </Reveal>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Photo Gallery"
            title="Moments with Amanpreet."
            intro="Original photographs shared by his family and friends."
          />
          {gallery.length > 0 ? (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((photo, i) => (
                <Reveal key={photo.src} delay={(i % 3) * 100}>
                  <PhotoFrame photo={photo} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-12 border border-dashed border-blush px-8 py-14 text-center">
              <p className="mx-auto max-w-lg font-serif text-2xl leading-snug text-burgundy">
                His gallery is being gathered with care from the people who loved him.
              </p>
              <p className="mx-auto mt-4 max-w-md text-muted">
                If you have a photograph of Amanpreet you would like to share, you can include it with a memory below.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Memories */}
      <section id="memories" className="section bg-parchment">
        <div className="container-page">
          <SectionHeading
            eyebrow="Memories and Stories"
            title="Remembering him together."
            intro="The stories of the people who knew Amanpreet are part of his legacy. Read them here, and share your own."
          />
          {memories.length > 0 && (
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {memories.map((m, i) => (
                <Reveal key={i} delay={(i % 2) * 100} as="figure" className="border border-blush bg-ivory p-8 sm:p-10">
                  <blockquote className="font-serif text-xl leading-relaxed text-ink">
                    <p className="whitespace-pre-line">{m.text}</p>
                  </blockquote>
                  <figcaption className="mt-6 text-sm tracking-wide text-muted">
                    <span className="font-medium text-burgundy">{m.name}</span>
                    {m.relationship && <span> · {m.relationship}</span>}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <h3 className="text-3xl sm:text-4xl">Share a memory.</h3>
              <p className="mt-5 text-muted">
                A moment, a conversation, a lesson he taught you, or simply what he meant to you. Your memory is sent
                privately to the family. Nothing is published without your permission.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-7 lg:col-start-6" delay={120}>
              <MemoryForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="on-dark bg-burgundy text-ivory">
        <Reveal className="container-text py-20 text-center lg:py-24">
          <InstagramIcon className="mx-auto size-8 text-blush" />
          <h2 className="mt-6 text-4xl sm:text-5xl">His work, in his own words.</h2>
          <p className="mx-auto mt-5 max-w-lg text-blush/85">
            Amanpreet&apos;s Instagram remains a window into his work, his drive, and the way he saw the world.
          </p>
          <div className="mt-9">
            <ButtonLink href={foundation.amanInstagram.url} variant="outline-light">
              {foundation.amanInstagram.handle}
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
