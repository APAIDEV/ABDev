import type { Metadata } from "next";
import Link from "next/link";
import { eventTypes } from "@/content/events";
import { formatEventDate, pastEvents, upcomingEvents } from "@/lib/events";
import { ArrowLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventRow, FeaturedEvent } from "@/components/events/EventCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Join the annual Steps for Stackzz Memorial Walk and upcoming foundation events, fundraisers, food drives, and volunteer opportunities.",
};

// Re-check event dates every hour so finished events move to "Past Events" on their own.
export const revalidate = 3600;

export default function EventsPage() {
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const signature = upcoming.find((e) => e.signature);
  const others = upcoming.filter((e) => e !== signature);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Gathering in his memory."
        lede={
          <p>
            Our events bring people together to remember, to give thanks for life, and to serve. Everyone is welcome.
          </p>
        }
      />

      {/* Signature walk */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <SectionHeading
              className="lg:col-span-5"
              eyebrow="Our Signature Event"
              title="The Steps for Stackzz Memorial Walk."
            />
            <Reveal className="prose-foundation text-lg text-muted lg:col-span-6 lg:col-start-7" delay={120}>
              <p>
                Each year we walk together in Amanpreet&apos;s memory. The walk is a gathering centered on remembrance,
                gratitude for life, community, and appreciating the people we are blessed to share our lives with.
              </p>
              <p>
                Participants are encouraged to <span className="font-medium text-rose-deep">wear pink</span> in his
                honor.
              </p>
            </Reveal>
          </div>
          <div className="mt-14">
            {signature ? (
              <FeaturedEvent event={signature} />
            ) : (
              <Reveal className="border border-blush bg-white/50 p-10 text-center">
                <p className="font-serif text-2xl text-burgundy">
                  The date for next year&apos;s walk will be announced soon.
                </p>
                <p className="mt-3 text-muted">Join our mailing list below to hear first.</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Other upcoming events */}
      {others.length > 0 && (
        <section className="section bg-parchment">
          <div className="container-page">
            <SectionHeading eyebrow="Upcoming" title="Mark your calendar." />
            <div className="mt-12 grid gap-4">
              {others.map((e) => (
                <EventRow key={e.slug} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Kinds of events */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Ways to Gather"
            title="More ways to serve together."
            intro="As the foundation grows, we will host gatherings of every kind. Each one will be announced here."
          />
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-14">
            {eventTypes.map((t, i) => (
              <Reveal key={t.title} delay={i * 120} className="border-t border-burgundy/25 pt-8">
                <h3 className="text-3xl">{t.title}</h3>
                <p className="mt-4 text-muted">{t.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <ArrowLink href="/get-involved#volunteer">Volunteer at an event</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* Past events */}
      <section className="section bg-parchment">
        <div className="container-page">
          <SectionHeading eyebrow="Past Events" title="Moments we have shared." />
          {past.length ? (
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {past.map((e, i) => (
                <Reveal key={e.slug} delay={(i % 2) * 120}>
                  <Link href={`/events/${e.slug}`} className="group block">
                    <PhotoFrame
                      photo={e.photos[0] ?? { src: "", alt: e.title }}
                      aspect="aspect-[3/2]"
                      sizes="(min-width: 768px) 45vw, 90vw"
                    />
                    <p className="mt-5 text-xs tracking-[0.2em] text-rose-deep uppercase">{formatEventDate(e).long}</p>
                    <h3 className="mt-2 text-3xl transition-colors group-hover:text-rose-deep">{e.title}</h3>
                    <p className="mt-2 text-muted">
                      {e.recap[0] ?? "A recap and photographs from this gathering will be shared soon."}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-10 max-w-xl text-lg text-muted">
              Our first gathering is still ahead of us. Recaps and photographs from each event will be shared here.
            </Reveal>
          )}
        </div>
      </section>

      {/* Mailing list */}
      <section className="on-dark bg-burgundy text-ivory">
        <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <Reveal className="lg:col-span-6">
            <h2 className="text-4xl sm:text-5xl">Hear about every gathering.</h2>
            <p className="mt-4 max-w-md text-blush/85">
              Event announcements, registration openings, and foundation updates. Nothing more.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={120}>
            <NewsletterForm id="events-newsletter" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
