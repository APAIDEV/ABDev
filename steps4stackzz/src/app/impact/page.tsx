import type { Metadata } from "next";
import { metrics, milestones } from "@/content/impact";
import { events } from "@/content/events";
import { formatEventDate } from "@/lib/events";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { RoofMark } from "@/components/ui/Logo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "A transparent record of the work of Steps4Stackzz Foundation: meals distributed, educational opportunities funded, religious institutions supported, and community projects completed.",
};

export default function ImpactPage() {
  const firstWalk = events.find((e) => e.signature);
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="A record we are only beginning to write."
        lede={
          <p>
            Steps4Stackzz Foundation is just starting out. Rather than share projections, we will record our work here
            as it happens, honestly and in detail.
          </p>
        }
      />

      {/* Metrics */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Will Measure"
            title="The work, counted."
            intro="Each figure below will reflect completed work only. Never estimates."
          />
          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 100} className="flex flex-col bg-ivory p-8 sm:p-9">
                {m.value === null ? (
                  <p className="flex h-[4.5rem] items-center">
                    <RoofMark className="w-20 opacity-35" />
                    <span className="sr-only">To be recorded</span>
                  </p>
                ) : (
                  <p className="font-serif text-6xl leading-[4.5rem] text-burgundy">
                    {m.value.toLocaleString("en-US")}
                  </p>
                )}
                <h3 className="mt-5 font-sans text-[0.8rem] font-medium tracking-[0.2em] text-burgundy uppercase">
                  {m.label}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] text-muted">{m.note}</p>
                {m.value === null && (
                  <p className="mt-6 text-xs tracking-[0.2em] text-rose-deep uppercase" aria-hidden="true">
                    To be recorded
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section bg-parchment">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading className="lg:col-span-4" eyebrow="Milestones" title="Our journey, as it unfolds." />
          <div className="lg:col-span-7 lg:col-start-6">
            {milestones.length ? (
              <ol className="relative grid gap-12 border-l border-rose/40 pl-8">
                {milestones.map((m, i) => (
                  <Reveal as="li" key={`${m.date}-${m.title}`} delay={(i % 3) * 100} className="relative">
                    <span aria-hidden="true" className="absolute top-2 -left-[2.32rem] size-2.5 rotate-45 bg-rose" />
                    <p className="text-xs tracking-[0.2em] text-rose-deep uppercase">{m.date}</p>
                    <h3 className="mt-2 text-3xl">{m.title}</h3>
                    <p className="mt-3 text-muted">{m.text}</p>
                  </Reveal>
                ))}
              </ol>
            ) : (
              <Reveal className="border-l border-rose/40 pl-8">
                <p className="font-serif text-2xl leading-snug text-burgundy sm:text-3xl">
                  {firstWalk
                    ? `Our first chapter begins on ${formatEventDate(firstWalk).long.replace(/^\w+, /, "")}, at the ${firstWalk.title}.`
                    : "Our first chapter is about to begin."}
                </p>
                <p className="mt-5 text-muted">
                  Every meal served, every student supported, and every project completed will be recorded here.
                </p>
                {firstWalk && (
                  <div className="mt-7">
                    <ArrowLink href={`/events/${firstWalk.slug}`}>Join us at the walk</ArrowLink>
                  </div>
                )}
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="section">
        <div className="container-page grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
          {[
            {
              title: "Completed, not projected.",
              text: "We will only report work that has actually been done.",
            },
            {
              title: "Specific, not general.",
              text: "Where we can, we will share the details: what was done, where, and with whom.",
            },
            {
              title: "Shared with gratitude.",
              text: "Every result belongs to the volunteers, donors, and partners who made it possible.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 120} className="border-t border-burgundy/25 pt-8">
              <h3 className="text-3xl">{item.title}</h3>
              <p className="mt-4 text-muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="on-dark bg-burgundy text-ivory">
        <Reveal className="container-text py-20 text-center">
          <h2 className="text-4xl sm:text-5xl">Help write the first chapter.</h2>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/get-involved" variant="light">
              Get Involved
            </ButtonLink>
            <ButtonLink href="/give" variant="rose">
              Support Our Mission
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
