import { home } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  const { process } = home;
  return (
    <section aria-labelledby="process-title" className="on-light bg-ivory py-24 text-black lg:py-36">
      <div className="container-luxe">
        <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} light />
        <ol className="mt-16 grid border-t border-black/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 120}
              className={`border-b border-black/15 py-10 sm:px-8 lg:border-b-0 lg:py-4 ${i > 0 ? "lg:border-l" : ""} ${i % 2 === 1 ? "sm:border-l lg:border-l" : ""} first:sm:pl-0`}
            >
              <p className="font-serif text-6xl font-light text-gold-deep" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-3xl">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-taupe">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
