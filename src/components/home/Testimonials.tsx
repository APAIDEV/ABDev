import { home } from "@/content/home";
import { testimonials } from "@/content/testimonials";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Testimonials. Only publish a client's words or name after receiving a
 * signed release (template: /docs/PHOTO-TESTIMONIAL-RELEASE-FORM.md).
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="bg-black py-24 lg:py-36">
      <div className="container-luxe">
        <SectionHeading
          id="testimonials-title"
          eyebrow={home.testimonials.eyebrow}
          title={home.testimonials.title}
          align="center"
        />
        <ul className="mt-16 grid gap-px bg-ivory/10 lg:mt-20 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 120} className="relative bg-black">
              <figure
                className={`flex h-full flex-col p-10 lg:p-12 ${t.placeholder ? "border border-dashed border-gold/30" : ""}`}
              >
                {t.placeholder && <PlaceholderTag className="mb-6 self-start">Testimonial slot</PlaceholderTag>}
                <span aria-hidden="true" className="font-serif text-7xl leading-none text-gold">
                  &ldquo;
                </span>
                <blockquote
                  className={`mt-2 flex-1 font-serif text-2xl leading-snug ${t.placeholder ? "text-stone italic" : "text-ivory"}`}
                >
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="mt-10 border-t border-ivory/10 pt-6">
                  <p className="label text-ivory">{t.name}</p>
                  <p className="mt-2 text-xs tracking-wider text-stone">{t.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
