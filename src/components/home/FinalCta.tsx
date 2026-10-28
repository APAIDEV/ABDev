import { business } from "@/config/business";
import { bookHref } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta({ title, body, button }: { title: string; body?: string; button: string }) {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden border-t border-ivory/10 bg-black py-28 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />
      <Reveal className="container-luxe relative text-center">
        <div className="mx-auto max-w-3xl bg-black px-4">
          <h2 id="final-cta-title" className="text-5xl font-light lg:text-7xl">
            {title}
          </h2>
          {body && <p className="mx-auto mt-8 max-w-xl text-stone">{body}</p>}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={bookHref}>{button}</ButtonLink>
            <a
              href={`tel:${business.phone.tel}`}
              className="label inline-flex min-h-12 items-center gap-3 px-6 text-ivory transition-colors hover:text-gold"
            >
              <PhoneIcon size={15} className="text-gold" />
              {business.phone.display}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
