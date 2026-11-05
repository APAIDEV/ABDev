import { business } from "@/config/business";
import { home } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { signatureFont } from "@/lib/fonts";

/** A personal note from the owner, right under the hero. */
export function Intro() {
  const { intro } = home;
  return (
    <section aria-labelledby="intro-title" className="on-light bg-ivory py-28 text-black lg:py-40">
      <div className="container-luxe grid gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <h2 id="intro-title" className="text-[clamp(2.5rem,5vw,4.5rem)]">
            {intro.title}
          </h2>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5 lg:pt-4">
          <div className="space-y-5 text-lg leading-relaxed text-taupe">
            {intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <p className={`${signatureFont.className} text-5xl leading-none text-black`} aria-hidden="true">
              {business.owner.firstName}
            </p>
            <p className="label mt-3 text-taupe">
              {business.owner.name}, {business.owner.title}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
