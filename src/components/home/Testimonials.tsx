import { home } from "@/content/home";
import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Testimonials. Hidden until at least one real, released testimonial exists
 * (set `placeholder: false` in /src/content/testimonials.ts). Only publish a
 * client's words or name after receiving a signed release
 * (template: /docs/PHOTO-TESTIMONIAL-RELEASE-FORM.md).
 */
export function Testimonials() {
  const real = testimonials.filter((t) => !t.placeholder);
  if (real.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="bg-black py-28 lg:py-40">
      <div className="container-luxe">
        <Reveal>
          <h2 id="testimonials-title" className="label text-stone">
            {home.testimonials.title}
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-16 lg:grid-cols-2">
          {real.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 120}>
              <figure>
                <blockquote className="font-serif text-3xl leading-snug font-light text-ivory lg:text-4xl">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-8">
                  <p className="label text-ivory">{t.name}</p>
                  <p className="mt-2 text-sm text-stone">{t.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
