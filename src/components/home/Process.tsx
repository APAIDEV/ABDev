import { home } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const { process } = home;
  return (
    <section aria-labelledby="process-title" className="bg-black py-28 lg:py-36">
      <div className="container-luxe">
        <Reveal>
          <h2 id="process-title" className="text-[clamp(2.5rem,5.5vw,4.75rem)]">
            {process.title}
          </h2>
        </Reveal>
        <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120} className="border-t border-ivory/20 pt-8">
              <p className="label text-stone" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-3xl">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-4 leading-relaxed text-stone">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
