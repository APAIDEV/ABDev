import Image from "next/image";
import Link from "next/link";
import { services } from "@/config/services";
import { home } from "@/content/home";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const contactFor = (projectType: string) => `/contact?project=${encodeURIComponent(projectType)}#book`;

/** "What We Build": featured services large, the rest as a clean list. Each has an anchor (#id). */
export function Services() {
  const featured = services.filter((s) => s.featured);
  const others = services.filter((s) => !s.featured);

  return (
    <section id="services" aria-labelledby="services-title" className="on-light bg-ivory py-28 text-black lg:py-40">
      <div className="container-luxe">
        <SectionHeading id="services-title" title={home.services.title} intro={home.services.intro} light />

        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
          {featured.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="grid scroll-mt-32 items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              <Reveal className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-black lg:aspect-[5/4]">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                  {s.image.placeholder && (
                    <PlaceholderTag className="absolute bottom-4 left-4">Placeholder photo</PlaceholderTag>
                  )}
                </div>
              </Reveal>
              <Reveal delay={150} className="lg:col-span-5">
                <h3 id={`${s.id}-title`} className="text-[clamp(2.25rem,4vw,3.5rem)]">
                  {s.title}
                </h3>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-taupe">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.highlights.length > 0 && (
                  <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
                    {s.highlights.map((h) => (
                      <li key={h} className="py-3 text-sm tracking-wide text-black">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={contactFor(s.projectType)}
                  className="label group mt-10 inline-flex items-center gap-3 border-b border-black/40 pb-2 text-black hover:border-black"
                >
                  Book a Consultation
                  <ArrowRightIcon size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </article>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-28 lg:mt-40">
            <Reveal>
              <h3 className="label text-taupe">{home.services.alsoTitle}</h3>
            </Reveal>
            <ul className="mt-8 border-t border-black/15">
              {others.map((s) => (
                <Reveal as="li" key={s.id} id={s.id} className="scroll-mt-32 border-b border-black/15">
                  <Link
                    href={contactFor(s.projectType)}
                    className="group grid gap-3 py-8 md:grid-cols-12 md:items-center md:gap-8"
                    aria-label={`${s.title}: ${s.short} Book a consultation`}
                  >
                    <span className="font-serif text-3xl font-light md:col-span-4 lg:text-4xl">{s.title}</span>
                    <span className="text-taupe md:col-span-6">{s.short}</span>
                    <span className="label hidden items-center justify-end gap-3 text-black md:col-span-2 md:flex">
                      Inquire
                      <ArrowRightIcon
                        size={16}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
