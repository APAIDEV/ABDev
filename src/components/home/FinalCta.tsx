import Image from "next/image";
import { business } from "@/config/business";
import { bookHref } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta({
  title,
  body,
  button,
  image,
}: {
  title: string;
  body?: string;
  button: string;
  /** Optional full-bleed background photo. */
  image?: { src: string; alt: string };
}) {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden border-t border-ivory/10 bg-black py-32 lg:py-48"
    >
      {image && (
        <>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/65" />
        </>
      )}
      <Reveal className="container-luxe text-center">
        <h2 id="final-cta-title" className="mx-auto max-w-4xl text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] font-light">
          {title}
        </h2>
        {body && <p className="mx-auto mt-8 max-w-xl text-lg text-ivory/80">{body}</p>}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <ButtonLink href={bookHref}>{button}</ButtonLink>
          <a
            href={`tel:${business.phone.tel}`}
            className="label inline-flex min-h-12 items-center gap-3 text-ivory transition-colors hover:text-gold"
          >
            <PhoneIcon size={16} />
            {business.phone.display}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
