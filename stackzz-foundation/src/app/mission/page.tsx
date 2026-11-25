import type { Metadata } from "next";
import { pillars } from "@/content/pillars";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Rooted in Sewa and inspired by Sarbat Da Bhala, Stackzz Foundation serves through education, faith, and community.",
};

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Mission"
        title="Carrying his legacy forward through service."
        lede={
          <p>
            Stackzz Foundation carries forward Amanpreet Singh&apos;s legacy through Sewa, and encourages others to
            appreciate the gift of life and use their blessings to uplift those around them.
          </p>
        }
      />

      {/* Principles */}
      <section className="section">
        <div className="container-page grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-20">
          <Reveal className="border-t border-burgundy/25 pt-8">
            <p className="eyebrow mb-4">Sewa</p>
            <h2 className="text-4xl">Selfless service.</h2>
            <p className="mt-5 text-lg text-muted">
              Service given freely, without expecting anything in return. Sewa asks us to recognize that being able to
              serve others is itself a privilege.
            </p>
          </Reveal>
          <Reveal className="border-t border-burgundy/25 pt-8" delay={120}>
            <p className="eyebrow mb-4">Sarbat Da Bhala</p>
            <h2 className="text-4xl">The well-being of all.</h2>
            <p className="mt-5 text-lg text-muted">
              Our work is inspired by the well-being of all humanity, regardless of religion, background, or
              circumstance. Everyone we serve is welcome, and everyone who wishes to serve with us is welcome too.
            </p>
          </Reveal>
        </div>
        <nav aria-label="Pillars" className="container-page mt-16 flex flex-wrap gap-3">
          {pillars.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="border border-burgundy/25 px-5 py-2.5 text-[0.74rem] font-medium tracking-[0.2em] text-burgundy uppercase transition-colors hover:bg-burgundy hover:text-ivory"
            >
              {p.numeral}. {p.title}
            </a>
          ))}
        </nav>
      </section>

      {/* Pillars */}
      {pillars.map((p, i) => {
        const panel = `p-8 sm:p-10 ${i % 2 === 0 ? "bg-parchment" : "bg-ivory"}`;
        return (
          <section key={p.id} id={p.id} className={`section ${i % 2 === 0 ? "bg-parchment" : ""}`}>
            <div className="container-page">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-5">
                  <span className="font-serif text-3xl text-rose">{p.numeral}</span>
                  <h2 className="mt-4 text-5xl sm:text-6xl">{p.title}</h2>
                  <p className="mt-5 font-serif text-2xl leading-snug text-rose-deep italic">{p.short}</p>
                </Reveal>
                <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
                  <div className="prose-foundation text-lg text-muted">
                    {p.body.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                  <p className="eyebrow mt-10 mb-4">Our Focus</p>
                  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {p.focus.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-ink">
                        <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-rose" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-3">
                <Reveal className={panel}>
                  <p className="eyebrow mb-5">Future Projects</p>
                  <ul className="grid gap-5">
                    {p.futureProjects.map((fp) => (
                      <li key={fp.title}>
                        <p className="font-serif text-2xl text-burgundy">{fp.title}</p>
                        <p className="mt-1 text-[0.95rem] text-muted">{fp.text}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal className={panel} delay={100}>
                  <p className="eyebrow mb-5">Fundraising Goal</p>
                  {p.goal ? (
                    <div>
                      <p className="font-serif text-2xl text-burgundy">{p.goal.title}</p>
                      <p className="mt-3 font-serif text-4xl text-burgundy">
                        {money(p.goal.raised)}
                        <span className="ml-2 font-sans text-base text-muted">of {money(p.goal.amount)}</span>
                      </p>
                      <div
                        className="mt-4 h-1.5 bg-blush/60"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={p.goal.amount}
                        aria-valuenow={p.goal.raised}
                        aria-label={`${p.goal.title} progress`}
                      >
                        <div
                          className="h-full bg-burgundy"
                          style={{ width: `${Math.min(100, (p.goal.raised / p.goal.amount) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-[0.95rem] text-muted">
                      Goals for {p.title.toLowerCase()} projects will be shared here as each initiative is announced.
                    </p>
                  )}
                  <div className="mt-6">
                    <ArrowLink href={`/give?designation=${encodeURIComponent(p.title)}#give-form`}>
                      Give to {p.title}
                    </ArrowLink>
                  </div>
                </Reveal>
                <Reveal className={panel} delay={200}>
                  <p className="eyebrow mb-5">Completed Work</p>
                  {p.completed.length ? (
                    <ul className="grid gap-5">
                      {p.completed.map((c) => (
                        <li key={c.title}>
                          <p className="text-xs tracking-[0.2em] text-rose-deep uppercase">{c.date}</p>
                          <p className="mt-1 font-serif text-2xl text-burgundy">{c.title}</p>
                          <p className="mt-1 text-[0.95rem] text-muted">{c.text}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[0.95rem] text-muted">
                      Our work is just beginning. Each completed project will be recorded here.
                    </p>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* Call to action */}
      <section className="on-dark bg-burgundy text-ivory">
        <Reveal className="container-text py-20 text-center lg:py-24">
          <h2 className="text-4xl sm:text-5xl">Serve with us.</h2>
          <p className="mx-auto mt-5 max-w-lg text-blush/85">
            Every one of these pillars depends on people willing to give their time, their resources, or both.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
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
