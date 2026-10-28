/**
 * SERVICES
 * ----------------------------------------------------------------------------
 * The six services shown on the Home page (cards + detailed sections) and in
 * search-engine data. Copy below is placeholder: review and edit freely.
 *
 * `id` becomes the anchor link (e.g. abdevelopment.ai/#dormers). Avoid
 * changing ids after launch, since people may have shared those links.
 *
 * To use a real photo, put it in /public/images/services/ and change `image.src`.
 */

export type Service = {
  id: string;
  title: string;
  short: string;
  /** Longer copy for the detailed section on the Home page. */
  body: string[];
  highlights: string[];
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
      "A custom home begins with the way you want to live. We listen first, then guide every decision from site and layout to the last finish, so the finished home feels unmistakably yours.",
      "One accountable team carries your project from the first sketch to the day we hand you the keys.",
    ],
    highlights: [
      "Site evaluation and feasibility",
      "Architect and engineer coordination",
      "Permits and approvals managed for you",
      "Transparent schedules and budgets",
    ],
    projectType: "Custom Home",
    image: {
      src: "/images/placeholders/custom-home.svg",
      alt: "Placeholder illustration of a two-story custom home elevation",
      placeholder: true,
    },
  },
  {
    id: "new-construction",
    title: "New Construction",
    short: "New builds, including multi-unit and development projects.",
    body: [
      "From single-family homes to multi-unit residences and development parcels, we bring disciplined planning and quality craftsmanship to every new build.",
      "We work alongside owners, investors, and design teams to keep projects on schedule and built to last.",
    ],
    highlights: [
      "Single-family and multi-unit builds",
      "Development and investment projects",
      "Construction management",
      "Code-compliant, durable construction",
    ],
    projectType: "New Construction",
    image: {
      src: "/images/placeholders/new-construction.svg",
      alt: "Placeholder illustration of a row of new multi-unit townhomes",
      placeholder: true,
    },
  },
  {
    id: "renovations",
    title: "Renovations",
    short: "Whole-home and partial remodels.",
    body: [
      "Whether you are reimagining a single kitchen or transforming an entire house, we respect the character of your home while making it work beautifully for today.",
      "We plan carefully, protect your home during construction, and communicate at every step.",
    ],
    highlights: [
      "Whole-home remodels",
      "Kitchens and baths",
      "Layout reconfiguration",
      "Interior and exterior refreshes",
    ],
    projectType: "Renovation",
    image: {
      src: "/images/placeholders/renovation.svg",
      alt: "Placeholder illustration of a renovated home interior",
      placeholder: true,
    },
  },
  {
    id: "dormers",
    title: "Dormers",
    short: "Dormer additions that add light, space, and headroom.",
    body: [
      "A well-designed dormer can turn a cramped upper floor into bright, livable space: a primary suite, a home office, or rooms for a growing family.",
      "We design dormers that look as though they were always part of the house.",
    ],
    highlights: [
      "Shed, gable, and full-width dormers",
      "Added headroom and natural light",
      "Structural planning and permits",
      "Seamless rooflines and finishes",
    ],
    projectType: "Dormer",
    image: {
      src: "/images/placeholders/dormer.svg",
      alt: "Placeholder illustration of a home with a dormer addition",
      placeholder: true,
    },
  },
  {
    id: "design-consulting",
    title: "Design Consulting",
    short: "Planning, layout, finishes, and material guidance.",
    body: [
      "Good design is a series of thoughtful decisions. We help you make them with confidence, from space planning and layout to finishes, fixtures, and materials.",
      "Bring us a dream, a sketch, or a set of plans. We will help you refine it into something buildable and beautiful.",
    ],
    highlights: [
      "Space planning and layout",
      "Finish and material selection",
      "Budget-conscious design guidance",
      "Pre-purchase and pre-construction advice",
    ],
    projectType: "Design Consulting",
    image: {
      src: "/images/placeholders/design-consulting.svg",
      alt: "Placeholder illustration of an architectural floor plan",
      placeholder: true,
    },
  },
  {
    id: "builder-spec-homes",
    title: "Builder Spec Homes",
    short: "Homes AB Development builds and offers for sale.",
    body: [
      "Our spec homes are built with the same care we bring to every custom project: considered layouts, quality materials, and finishes chosen to last.",
      "Ask us about current and upcoming homes. Sales are handled through a licensed real estate broker.",
    ],
    highlights: [
      "Move-in ready new homes",
      "Thoughtful, livable layouts",
      "Quality finishes throughout",
      "Ask about upcoming releases",
    ],
    projectType: "Spec Home Inquiry",
    image: {
      src: "/images/placeholders/spec-home.svg",
      alt: "Placeholder illustration of a modern spec home",
      placeholder: true,
    },
  },
];

/** Options for the "Project type" dropdown on the contact form. */
export const projectTypeOptions = [
  "Custom Home",
  "New Construction",
  "Renovation",
  "Dormer",
  "Design Consulting",
  "Spec Home Inquiry",
  "Other",
] as const;
