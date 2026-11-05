/**
 * HOME PAGE CONTENT
 * ----------------------------------------------------------------------------
 * Headlines and copy for the Home page.
 * - Services are edited in /src/config/services.ts.
 * - The projects shown under "Selected Work" are the gallery items marked
 *   `featured: true` in /src/content/gallery.ts.
 * - Testimonials (/src/content/testimonials.ts) appear only once real ones are added.
 */

export const home = {
  hero: {
    eyebrow: "Custom Homes & New Development",
    // The headline comes from /src/config/business.ts (tagline).
    subhead: "Family-owned builders of custom homes across Long Island, New York City, and Westchester.",
    primaryCta: "Book a Consultation",
    secondaryCta: "View Projects",
    /**
     * HERO SLIDESHOW
     * The first homepage screen fades between these images. Use your strongest
     * finished projects, ideally wide exterior shots (2400px+ wide).
     * Put photos in /public/images/home/ and update `src`. 1 to 4 slides work best.
     */
    slides: [
      {
        src: "/images/placeholders/hero.svg",
        alt: "Placeholder image of a modern custom home at dusk",
        caption: "Modern Residence · Long Island",
        placeholder: true,
      },
      {
        src: "/images/placeholders/hero-2.svg",
        alt: "Placeholder image of a two-story custom home at dusk",
        caption: "Custom Home · Nassau County",
        placeholder: true,
      },
      {
        src: "/images/placeholders/hero-3.svg",
        alt: "Placeholder image of a new modern farmhouse at dusk",
        caption: "New Construction · Suffolk County",
        placeholder: true,
      },
    ],
  },

  /** Personal introduction under the hero, in the owner's voice. */
  intro: {
    title: "When you build with us, you work with me.",
    body: [
      "AB Development is a family business. There's no call center and no layer of representatives between you and the people building your home. You'll have my number, and you'll be talking to me.",
      "Every home gets our full attention, from the first walk of the property to the day you get the keys.",
    ],
    // Signature line uses the owner's name from /src/config/business.ts.
  },

  work: {
    title: "Selected Work",
    intro: "A look at the homes we've built across Long Island, New York City, and Westchester.",
    cta: "View All Projects",
  },

  services: {
    title: "What We Build",
    intro:
      "Our focus is custom homes and new development, with a few related services for the clients we already build for.",
    alsoTitle: "We also take on",
  },

  process: {
    title: "How it works",
    steps: [
      {
        title: "Vision",
        text: "We meet, walk the property, and talk through how you want to live and what you want to spend.",
      },
      {
        title: "Design",
        text: "Plans, layouts, and finishes come together with your architect, until it feels exactly right.",
      },
      {
        title: "Build",
        text: "We handle permits, trades, and scheduling, and you hear from us directly at every stage.",
      },
      { title: "Handoff", text: "A careful final walkthrough, every last detail resolved, and the keys to your home." },
    ],
  },

  storyTeaser: {
    eyebrow: "Our Story",
    title: "One home at a time.",
    body: "AB Development began with two people, wildly in love, who believed a house should become a home filled with memories. That belief is in every home we build.",
    cta: "Read Our Story",
    image: {
      src: "/images/placeholders/story.svg",
      alt: "Placeholder image of a warmly lit living room at dusk",
    },
  },

  testimonials: {
    title: "From our clients",
  },

  finalCta: {
    title: "Let's talk about your home.",
    body: "Call or send a note, any time. You'll hear back from me personally.",
    button: "Book a Consultation",
  },
};
