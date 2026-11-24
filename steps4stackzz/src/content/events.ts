/**
 * EVENTS
 * ----------------------------------------------------------------------------
 * Events move from "Upcoming" to "Past" automatically once their date passes
 * (the site checks every hour).
 *
 * FIELDS
 *   slug        Unique web address: /events/<slug>
 *   start       Date and time in New York time, written as "YYYY-MM-DDTHH:MM".
 *               If the time is not set yet, use "YYYY-MM-DD" and set timeTbd.
 *   location    Leave `name` as "" while the location is to be announced.
 *   registration
 *     "open"    shows the registration form (closes automatically at the start time)
 *     "soon"    shows "Registration opens soon" with a mailing list signup
 *     "none"    no registration needed
 *   photos      Photographs for the event page. Put files in
 *               /public/images/events/ and list them like the gallery photos.
 *   recap       After the event, a few paragraphs about how it went.
 *               Leave empty ([]) until it is written.
 */
import type { Photo } from "./photos";

export type FoundationEvent = {
  slug: string;
  title: string;
  kind: string;
  signature?: boolean;
  start: string;
  timeTbd?: boolean;
  location: { name: string; area: string; mapsQuery: string; meetingPoint?: string };
  summary: string;
  description: string[];
  notes: string[];
  registration: "open" | "soon" | "none";
  photos: Photo[];
  recap: string[];
};

export const events: FoundationEvent[] = [
  {
    slug: "memorial-walk-2026",
    title: "Steps for Stackzz Memorial Walk",
    kind: "Annual Memorial Walk",
    signature: true,
    start: "2026-11-25T15:30",
    location: {
      name: "Wantagh Park",
      area: "Wantagh, New York",
      mapsQuery: "Wantagh Park, Wantagh, NY",
      meetingPoint: "",
    },
    summary:
      "Our signature gathering. An afternoon walk centered on remembrance, gratitude for life, and appreciating the people we are blessed to share our lives with.",
    description: [
      "The Steps for Stackzz Memorial Walk is our signature annual gathering. It is a time to remember Amanpreet, to be grateful for the gift of life, and to walk alongside the people who make our own lives meaningful.",
      "Everyone is welcome: family, friends, colleagues, neighbors, and anyone who wishes to walk with us. Come as you are, bring the people you love, and take a few steps together in his memory.",
    ],
    notes: ["Wear pink in Amanpreet's honor.", "All ages are welcome."],
    registration: "open",
    photos: [],
    recap: [],
  },
  {
    slug: "may-2027",
    title: "Spring Gathering",
    kind: "Foundation Event",
    start: "2027-05-25",
    timeTbd: true,
    location: { name: "", area: "", mapsQuery: "" },
    summary: "Our second foundation event. The time, location, and details will be announced soon.",
    description: [
      "Our second event is planned for May 25, 2027. We will share the time, location, and full details here as soon as they are confirmed.",
      "Join our mailing list to be the first to know.",
    ],
    notes: [],
    registration: "soon",
    photos: [],
    recap: [],
  },
];

/** Kinds of gatherings the foundation plans to hold. Shown on the Events page. */
export const eventTypes = [
  {
    title: "Fundraisers",
    text: "Evenings and gatherings that raise support for a specific project in education, faith, or community.",
  },
  {
    title: "Food Drives",
    text: "Collecting and distributing food for local families, with volunteers of every age.",
  },
  {
    title: "Volunteer Opportunities",
    text: "Hands-on volunteer opportunities, from preparing meals to packing school supplies.",
  },
];
