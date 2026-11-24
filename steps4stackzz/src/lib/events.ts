import { events, type FoundationEvent } from "@/content/events";

const TZ = "America/New_York";

/** Converts "YYYY-MM-DDTHH:MM" (New York time) or "YYYY-MM-DD" to an exact instant. */
export function eventInstant(event: FoundationEvent): Date {
  const [datePart, timePart = "23:59"] = event.start.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm] = timePart.split(":").map(Number);
  // Find New York's UTC offset on that date (handles daylight saving time).
  const guess = new Date(Date.UTC(y, m - 1, d, hh, mm));
  const asNy = new Date(guess.toLocaleString("en-US", { timeZone: TZ }));
  const asUtc = new Date(guess.toLocaleString("en-US", { timeZone: "UTC" }));
  return new Date(guess.getTime() + (asUtc.getTime() - asNy.getTime()));
}

/** An event counts as past once the day it happens is over (or a few hours after its start). */
export function isPast(event: FoundationEvent, now = new Date()): boolean {
  const start = eventInstant(event);
  const end = event.timeTbd ? start : new Date(start.getTime() + 4 * 60 * 60 * 1000);
  return now > end;
}

export function registrationOpen(event: FoundationEvent, now = new Date()): boolean {
  return event.registration === "open" && now < eventInstant(event);
}

export function upcomingEvents(now = new Date()) {
  return events.filter((e) => !isPast(e, now)).sort((a, b) => +eventInstant(a) - +eventInstant(b));
}

export function pastEvents(now = new Date()) {
  return events.filter((e) => isPast(e, now)).sort((a, b) => +eventInstant(b) - +eventInstant(a));
}

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function formatEventDate(event: FoundationEvent) {
  const d = eventInstant(event);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long", timeZone: TZ }),
    month: d.toLocaleDateString("en-US", { month: "short", timeZone: TZ }),
    day: d.toLocaleDateString("en-US", { day: "numeric", timeZone: TZ }),
    year: d.toLocaleDateString("en-US", { year: "numeric", timeZone: TZ }),
    long: d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: TZ,
    }),
    time: event.timeTbd
      ? "Time to be announced"
      : d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: TZ }),
    iso: d.toISOString(),
  };
}

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
