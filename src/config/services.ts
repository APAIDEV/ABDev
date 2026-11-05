/**
 * SERVICES
 * ----------------------------------------------------------------------------
 * The six services on the Home page ("What We Build") and in search-engine data.
 *
 * - `featured: true` services get a large photo and full description.
 *   The others appear in a short, clean list underneath.
 * - Order here is the order on the page.
 * - `id` becomes the anchor link (e.g. abdevelopment.ai/#dormers). Avoid
 *   changing ids after launch, since people may have shared those links.
 *
 * To use a real photo, put it in /public/images/services/ and change `image.src`.
 */

export type Service = {
  id: string;
  title: string;
  /** One-line summary (cards, search engines). */
  short: string;
  /** Full description for featured services. Each string is a paragraph. */
  body: string[];
  highlights: string[];
  featured: boolean;
  /** Pre-selects this option in the contact form's "Project type" field. */
  projectType: string;
  image: { src: string; alt: string; placeholder?: boolean };
};

export const services: Service[] = [
  {
    id: "custom-home-building",
    title: "Custom Home Building",
    short: "Ground-up homes designed around your vision.",
    body: [
      "This is the heart of what we do. We sit down with you, walk the land, and listen to how you want to live: where the morning light should land, where the kids will do homework, where everyone ends up on a Sunday night.",
      "From there we carry the whole build, from plans and permits to the final walkthrough, and you deal with us directly the entire way.",
    ],
    highlights: ["Site and feasibility review", "Architect and engineer coordination", "Permits handled for you"],
    featured: true,
    projectType: "Custom Home",
    image: {
      src: "/images/placeholders/custom-home.svg",
      alt: "Placeholder image of a custom home at dusk",
      placeholder: true,
    },
  },
  {
    id: "new-construction",
    title: "New Construction & Development",
    short: "New builds, including multi-unit and development projects.",
    body: [
      "Single-family homes, multi-unit residences, and full development parcels. We plan carefully, build to last, and run every site with the same attention we'd give our own home.",
      "Owners and investors get one accountable builder who answers the phone and knows every detail of the project.",
    ],
    highlights: [
      "Single-family and multi-unit",
      "Development and investment projects",
      "Start-to-finish construction management",
    ],
    featured: true,
    projectType: "New Construction",
    image: {
      src: "/images/placeholders/new-construction.svg",
      alt: "Placeholder image of new multi-unit townhomes at dusk",
      placeholder: true,
    },
  },
  {
    id: "builder-spec-homes",
    title: "Builder Spec Homes",
    short: "New homes we design, build, and offer for sale, finished with the same care as our custom work.",
    body: [],
    highlights: [],
    featured: false,
    projectType: "Spec Home Inquiry",
    image: {
      src: "/images/placeholders/spec-home.svg",
      alt: "Placeholder image of a new spec home at dusk",
      placeholder: true,
    },
  },
  {
    id: "dormers",
    title: "Dormers",
    short: "More light, space, and headroom upstairs, designed to look like it was always there.",
    body: [],
    highlights: [],
    featured: false,
    projectType: "Dormer",
    image: {
      src: "/images/placeholders/dormer.svg",
      alt: "Placeholder image of a home with a dormer addition",
      placeholder: true,
    },
  },
  {
    id: "renovations",
    title: "Renovations",
    short: "Whole-home and partial remodels that respect what you love about your house.",
    body: [],
    highlights: [],
    featured: false,
    projectType: "Renovation",
    image: {
      src: "/images/placeholders/renovation.svg",
      alt: "Placeholder image of a renovated living room",
      placeholder: true,
    },
  },
  {
    id: "design-consulting",
    title: "Design Consulting",
    short: "Layouts, finishes, and materials: help making the big decisions with confidence.",
    body: [],
    highlights: [],
    featured: false,
    projectType: "Design Consulting",
    image: {
      src: "/images/placeholders/design-consulting.svg",
      alt: "Placeholder image of a kitchen interior",
      placeholder: true,
    },
  },
];

/**
 * Options for the "Project type" field on the contact form.
 * `value` is what gets saved; `phrase` is how it reads in the sentence
 * "I'm thinking about ___".
 */
export const projectTypes = [
  { value: "Custom Home", phrase: "building a custom home" },
  { value: "New Construction", phrase: "a new construction or development project" },
  { value: "Spec Home Inquiry", phrase: "one of your homes for sale" },
  { value: "Dormer", phrase: "adding a dormer" },
  { value: "Renovation", phrase: "a renovation" },
  { value: "Design Consulting", phrase: "design consulting" },
  { value: "Other", phrase: "something else" },
] as const;

export const projectTypeOptions = projectTypes.map((p) => p.value) as unknown as readonly [
  "Custom Home",
  "New Construction",
  "Spec Home Inquiry",
  "Dormer",
  "Renovation",
  "Design Consulting",
  "Other",
];
