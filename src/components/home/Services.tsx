import Image from "next/image";
import Link from "next/link";
import { services } from "@/config/services";
import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** All six services: cards that jump to detailed, anchored sections below. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-black py-24 lg:py-36">
      <div className="container-luxe">
        <SectionHeading
          id="services-title"
          eyebrow={home.services.eyebrow}
          title={home.services.title}
          intro={home.services.intro}
        />

        <ul className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 100} className="bg-black">
              <Link
                href={`#${s.id}`}
                className="group flex h-full flex-col justify-between gap-12 p-8 transition-colors duration-500 hover:bg-charcoal lg:p-10"
              >
                <div>
                  <p className="label text-gold" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 text-3xl text-ivory lg:text-4xl">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-stone">{s.short}</p>
                </div>
                <span className="label inline-flex items-center gap-3 text-ivory transition-colors group-hover:text-gold">
                  Learn more{" "}
                  <ArrowRightIcon size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-24 space-y-24 lg:mt-36 lg:space-y-36">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="grid scroll-mt-32 items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              <Reveal className={`relative lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-(--ease-luxe) hover:scale-[1.03]"
                  />
                  {s.image.placeholder && <PlaceholderTag className="absolute top-4 left-4" />}
                </div>
              </Reveal>
              <Reveal delay={150} className="lg:col-span-5">
                <p className="label text-gold">
                  {String(i + 1).padStart(2, "0")} <span aria-hidden="true">/</span> Services
                </p>
                <h3 id={`${s.id}-title`} className="mt-5 text-4xl lg:text-5xl">
                  {s.title}
                </h3>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-stone">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <ul className="mt-8 grid gap-3 border-t border-ivory/10 pt-8 text-sm text-ivory sm:grid-cols-2">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <CheckIcon size={16} className="mt-1 shrink-0 text-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={`/contact?project=${encodeURIComponent(s.projectType)}#book`}
                  className="mt-10"
                  aria-label={`Book a consultation about ${s.title}`}
                >
                  Book a Consultation
                </ButtonLink>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
