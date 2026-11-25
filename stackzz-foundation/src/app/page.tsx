import { foundation } from "@/config/site";
import { pillars } from "@/content/pillars";
import { homePortrait } from "@/content/photos";
import { upcomingEvents } from "@/lib/events";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Logo, RoofMark } from "@/components/ui/Logo";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventRow, FeaturedEvent } from "@/components/events/EventCard";

// Re-check event dates every hour so past events move off the home page on their own.
export const revalidate = 3600;

export default function HomePage() {
  const upcoming = upcomingEvents();
  const [next, ...later] = upcoming;

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative overflow-hidden bg-burgundy text-ivory">
        <div className="container-page grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28">
          <Reveal className="lg:col-span-7" slow>
            <p className="eyebrow mb-7">In Loving Memory</p>
            <h1 className="text-[3.1rem] leading-[1.02] sm:text-7xl lg:text-[5.4rem]">
              The Legacy Of <span className="block">Amanpreet Singh.</span>
            </h1>
            <p className="mt-8 font-serif text-[1.65rem] leading-snug text-blush italic sm:text-3xl">
              {foundation.tagline}
            </p>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-blush/85">
              Stackzz Foundation carries his legacy forward through Sewa, selfless service offered without expecting
              anything in return.
            </p>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/legacy" variant="light">
                Learn More
              </ButtonLink>
              <ButtonLink href="/get-involved" variant="outline-light">
                Get Involved
              </ButtonLink>
              <ButtonLink href="/give" variant="rose">
                Support Our Mission
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" delay={200} slow>
            <PhotoFrame photo={homePortrait} shape="arch" tone="dark" priority sizes="(min-width: 1024px) 36vw, 90vw" />
          </Reveal>
        </div>
      </section>

      {/* Introduction */}
      <section className="section">
        <div className="container-text text-center">
          <Reveal>
            <RoofMark className="mx-auto mb-10 w-28" />
            <p className="eyebrow mb-6">Our Story</p>
            <p className="font-serif text-[1.9rem] leading-[1.3] text-burgundy sm:text-[2.35rem]">
              At just 25 years old, Amanpreet Singh embodied ambition, humility, generosity, and an extraordinary work
              ethic.
            </p>
          </Reveal>
          <Reveal className="prose-foundation mt-10 text-lg text-muted" delay={120}>
            <p>
              No matter how much he accomplished, he remained grounded in his values and his commitment to serving
              others. Stackzz Foundation was created to ensure that the goodness he brought into this world continues
              through meaningful acts of service.
            </p>
            <p>His legacy is not simply something we remember, but something we hope to live by.</p>
          </Reveal>
          <Reveal className="mt-10" delay={200}>
            <ArrowLink href="/legacy">Read His Story</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* Rooted in Sewa */}
      <section className="bg-parchment">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Rooted in Sewa</p>
            <h2 className="text-4xl sm:text-5xl">Service, offered freely.</h2>
          </Reveal>
          <Reveal className="prose-foundation text-lg text-muted lg:col-span-6 lg:col-start-7" delay={120}>
            <p>
              Sewa is the Sikh practice of selfless service, given without expecting anything in return. It is the root
              of everything we do.
            </p>
            <p>
              Our purpose is to carry forward Amanpreet Singh&apos;s legacy while encouraging others to appreciate the
              gift of life and to use their blessings to uplift those around them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Three pillars */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Mission"
            title="Three pillars of service."
            intro="Everything the foundation does is guided by three areas of focus."
            align="center"
          />
          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line lg:mt-20 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 120} className="flex flex-col bg-ivory p-9 sm:p-11">
                <span className="font-serif text-2xl text-rose">{p.numeral}</span>
                <h3 className="mt-6 text-4xl">{p.title}</h3>
                <p className="mt-3 font-serif text-xl leading-snug text-rose-deep italic">{p.short}</p>
                <p className="mt-5 flex-1 text-muted">{p.summary}</p>
                <div className="mt-8">
                  <ArrowLink href={`/mission#${p.id}`}>Learn more</ArrowLink>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-20 max-w-2xl text-center">
            <p className="rule mb-6 font-serif text-sm tracking-[0.3em] uppercase">
              <span className="text-rose-deep">Sarbat Da Bhala</span>
            </p>
            <p className="font-serif text-2xl leading-snug text-burgundy sm:text-[1.75rem]">
              Our work is inspired by the well-being of all humanity, regardless of religion, background, or
              circumstance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Upcoming events */}
      {next && (
        <section className="section bg-parchment">
          <div className="container-page">
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow="Upcoming Events" title="Walk with us." />
              <Reveal>
                <ArrowLink href="/events">All events</ArrowLink>
              </Reveal>
            </div>
            <FeaturedEvent event={next} />
            {later.length > 0 && (
              <div className="mt-6 grid gap-4">
                {later.map((e) => (
                  <EventRow key={e.slug} event={e} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Ways to take part */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Be Part of It" title="There is a place for everyone in this work." align="center" />
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
            {[
              {
                title: "Get Involved",
                text: "Volunteer at events and food drives, join a Sewa initiative, or partner with us as an organization.",
                href: "/get-involved",
                cta: "Find your way to serve",
              },
              {
                title: "Support Our Mission",
                text: "Give once or monthly, direct your gift to a cause that matters to you, or sponsor an initiative.",
                href: "/give",
                cta: "Give back",
              },
              {
                title: "Share a Memory",
                text: "If you knew Amanpreet, we would be grateful to hear your stories and see your photographs.",
                href: "/legacy#memories",
                cta: "Share your story",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 120} className="border-t border-burgundy/25 pt-8">
                <h3 className="text-3xl">{item.title}</h3>
                <p className="mt-4 text-muted">{item.text}</p>
                <div className="mt-6">
                  <ArrowLink href={item.href}>{item.cta}</ArrowLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="on-dark bg-burgundy text-ivory">
        <div className="container-text py-24 text-center lg:py-32">
          <Reveal slow>
            <Logo tone="light" className="mx-auto h-auto w-56 sm:w-64" sizes="256px" />
            <div aria-hidden="true" className="mx-auto my-14 h-16 w-px bg-rose/60" />
            <p className="font-serif text-5xl leading-tight text-ivory italic sm:text-6xl">
              {foundation.principle.gurmukhi}
            </p>
            <p className="mx-auto mt-8 max-w-xl font-serif text-2xl leading-snug text-blush sm:text-[1.75rem]">
              May we remain humble in all that we achieve, grateful for all that we have, and generous in all that we
              give.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
