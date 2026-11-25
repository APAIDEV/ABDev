import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events } from "@/content/events";
import { siteUrl } from "@/config/site";
import { eventInstant, formatEventDate, getEvent, isPast, mapsUrl, registrationOpen } from "@/lib/events";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { CalendarIcon, ClockIcon, PinIcon } from "@/components/ui/Icons";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { RegistrationForm } from "@/components/forms/RegistrationForm";

// Re-check every hour so registration closes and the recap appears on their own.
export const revalidate = 3600;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  const d = formatEventDate(event);
  return {
    title: event.title,
    description: `${d.long}${event.timeTbd ? "" : `, ${d.time}`}${event.location.name ? ` at ${event.location.name}` : ""}. ${event.summary}`,
  };
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const d = formatEventDate(event);
  const past = isPast(event);
  const open = registrationOpen(event);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.timeTbd ? event.start.slice(0, 10) : eventInstant(event).toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.location.name
      ? { location: { "@type": "Place", name: event.location.name, address: event.location.area } }
      : {}),
    organizer: { "@type": "Organization", name: "Stackzz Foundation", url: siteUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="on-dark bg-burgundy text-ivory">
        <div className="container-page pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-24">
          <Reveal className="max-w-4xl">
            <ArrowLink href="/events" light>
              All events
            </ArrowLink>
            <p className="eyebrow mt-10 mb-5">{past ? "Past Event" : event.kind}</p>
            <h1 className="text-[2.9rem] leading-[1.04] sm:text-6xl lg:text-7xl">{event.title}</h1>
            <ul className="mt-10 flex flex-col gap-4 text-lg text-blush sm:flex-row sm:flex-wrap sm:gap-x-14 sm:gap-y-4">
              <li className="flex items-start gap-3">
                <CalendarIcon className="mt-1 size-5 shrink-0 text-rose" />
                {d.long}
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="mt-1 size-5 shrink-0 text-rose" />
                {d.time}
              </li>
              <li className="flex items-start gap-3">
                <PinIcon className="mt-1 size-5 shrink-0 text-rose" />
                <span>
                  {event.location.name ? (
                    <>
                      {event.location.name}
                      <span className="block text-base text-blush/75">{event.location.area}</span>
                    </>
                  ) : (
                    "Location to be announced"
                  )}
                </span>
              </li>
            </ul>
            {!past && event.notes[0] && (
              <p className="mt-10 inline-flex items-center gap-3 border border-rose/50 px-5 py-3 font-serif text-xl text-blush italic">
                <span aria-hidden="true" className="inline-block size-3 rounded-full bg-rose" />
                {event.notes[0]}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">{past ? "About This Gathering" : "About the Event"}</p>
            <div className="prose-foundation text-lg text-muted">
              {(past && event.recap.length ? event.recap : event.description).map((p) => (
                <p key={p}>{p}</p>
              ))}
              {past && !event.recap.length && <p>A recap and photographs from this gathering will be shared soon.</p>}
            </div>
            {event.notes.length > 0 && !past && (
              <ul className="mt-8 grid gap-2.5">
                {event.notes.map((n) => (
                  <li key={n} className="flex items-center gap-3 text-ink">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-rose" />
                    {n}
                  </li>
                ))}
              </ul>
            )}
            {event.location.meetingPoint && (
              <p className="mt-8 text-muted">
                <span className="font-medium text-burgundy">Meeting point: </span>
                {event.location.meetingPoint}
              </p>
            )}
            {event.location.mapsQuery && (
              <div className="mt-8">
                <ArrowLink href={mapsUrl(event.location.mapsQuery)}>Directions to {event.location.name}</ArrowLink>
              </div>
            )}
          </Reveal>

          <Reveal id="register" className="scroll-mt-28 lg:col-span-6" delay={120}>
            {open ? (
              <div className="border border-blush bg-white/55 p-7 sm:p-10">
                <h2 className="text-4xl">Register to attend.</h2>
                <p className="mt-3 mb-8 text-muted">
                  Registration is free and helps us prepare. Let us know how many people are coming.
                </p>
                <RegistrationForm slug={event.slug} note={event.notes[0]} />
              </div>
            ) : past ? (
              <div className="border border-blush bg-white/55 p-7 sm:p-10">
                <h2 className="text-3xl">Thank you to everyone who joined us.</h2>
                <p className="mt-4 text-muted">Hear about our next gathering as soon as it is announced.</p>
                <div className="mt-7">
                  <NewsletterForm tone="light" id="event-newsletter" />
                </div>
              </div>
            ) : (
              <div className="border border-blush bg-white/55 p-7 sm:p-10">
                <h2 className="text-3xl">
                  {event.registration === "soon" ? "Registration opens soon." : "No registration needed."}
                </h2>
                <p className="mt-4 text-muted">
                  {event.registration === "soon"
                    ? "Join our mailing list and we will let you know as soon as details are confirmed and registration opens."
                    : "Simply join us. To hear about future gatherings, join our mailing list."}
                </p>
                <div className="mt-7">
                  <NewsletterForm tone="light" id="event-newsletter" />
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {event.photos.length > 0 && (
        <section className="section bg-parchment">
          <div className="container-page">
            <p className="eyebrow mb-10">Photographs</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {event.photos.map((photo, i) => (
                <Reveal key={photo.src} delay={(i % 3) * 100}>
                  <PhotoFrame
                    photo={photo}
                    aspect="aspect-[4/3]"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="on-dark bg-burgundy text-ivory">
        <Reveal className="container-text py-20 text-center">
          <h2 className="text-4xl">Help make this gathering possible.</h2>
          <p className="mx-auto mt-4 max-w-lg text-blush/85">
            Volunteer on the day, or support the walk and our events as a donor or sponsor.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/get-involved#volunteer" variant="light">
              Volunteer
            </ButtonLink>
            <ButtonLink href="/get-involved#sponsorship" variant="outline-light">
              Become a Sponsor
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
