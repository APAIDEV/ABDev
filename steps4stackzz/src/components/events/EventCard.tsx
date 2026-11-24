import Link from "next/link";
import type { FoundationEvent } from "@/content/events";
import { formatEventDate, registrationOpen } from "@/lib/events";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { ClockIcon, PinIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

function DateBlock({ event, large = false }: { event: FoundationEvent; large?: boolean }) {
  const d = formatEventDate(event);
  return (
    <div
      className={`on-dark flex shrink-0 flex-col items-center justify-center bg-burgundy text-center text-ivory ${
        large ? "px-10 py-12 sm:py-14 md:w-64" : "w-24 py-5"
      }`}
    >
      <span className={`tracking-[0.3em] text-blush uppercase ${large ? "text-sm" : "text-[0.65rem]"}`}>{d.month}</span>
      <span className={`font-serif leading-none ${large ? "my-2 text-8xl" : "my-1 text-5xl"}`}>{d.day}</span>
      <span className={`tracking-[0.2em] text-blush/80 ${large ? "text-sm" : "text-[0.65rem]"}`}>{d.year}</span>
    </div>
  );
}

export function EventMeta({ event, light = false }: { event: FoundationEvent; light?: boolean }) {
  const d = formatEventDate(event);
  const tone = light ? "text-blush" : "text-muted";
  return (
    <ul className={`grid gap-2 text-[0.95rem] ${tone}`}>
      <li className="flex items-center gap-3">
        <ClockIcon className="size-[1.1rem] shrink-0 text-rose" />
        <span>
          {d.weekday}
          {event.timeTbd ? ` · ${d.time}` : ` at ${d.time}`}
        </span>
      </li>
      <li className="flex items-center gap-3">
        <PinIcon className="size-[1.1rem] shrink-0 text-rose" />
        <span>
          {event.location.name ? `${event.location.name}, ${event.location.area}` : "Location to be announced"}
        </span>
      </li>
    </ul>
  );
}

/** Large card for the signature Memorial Walk or the next upcoming event. */
export function FeaturedEvent({ event }: { event: FoundationEvent }) {
  const open = registrationOpen(event);
  return (
    <Reveal className="flex flex-col overflow-hidden border border-blush bg-white/55 md:flex-row">
      <DateBlock event={event} large />
      <div className="flex flex-1 flex-col justify-center gap-6 p-8 sm:p-10 lg:p-12">
        <div>
          <p className="eyebrow mb-3">{event.kind}</p>
          <h3 className="text-3xl sm:text-4xl">
            <Link href={`/events/${event.slug}`} className="transition-colors hover:text-rose-deep">
              {event.title}
            </Link>
          </h3>
        </div>
        <p className="max-w-xl text-muted">{event.summary}</p>
        <EventMeta event={event} />
        {event.notes[0] && (
          <p className="flex items-center gap-3 font-serif text-xl text-rose-deep italic">
            <span aria-hidden="true" className="inline-block size-3 rounded-full bg-rose" />
            {event.notes[0]}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-1">
          <ButtonLink href={`/events/${event.slug}${open ? "#register" : ""}`}>
            {open ? "Register to Walk" : "Event Details"}
          </ButtonLink>
          {open && <ArrowLink href={`/events/${event.slug}`}>Event details</ArrowLink>}
        </div>
      </div>
    </Reveal>
  );
}

/** Compact row for other upcoming events. */
export function EventRow({ event }: { event: FoundationEvent }) {
  return (
    <Reveal className="flex items-stretch gap-6 border border-line bg-white/40 sm:gap-8">
      <DateBlock event={event} />
      <div className="flex flex-1 flex-col justify-center gap-3 py-5 pr-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div>
          <p className="eyebrow mb-1.5">{event.kind}</p>
          <h3 className="text-2xl sm:text-[1.75rem]">
            <Link href={`/events/${event.slug}`} className="transition-colors hover:text-rose-deep">
              {event.title}
            </Link>
          </h3>
          <p className="mt-1 text-[0.95rem] text-muted">
            {event.timeTbd ? "Time to be announced" : formatEventDate(event).time}
            {" · "}
            {event.location.name || "Location to be announced"}
          </p>
        </div>
        <ArrowLink href={`/events/${event.slug}`}>Details</ArrowLink>
      </div>
    </Reveal>
  );
}
