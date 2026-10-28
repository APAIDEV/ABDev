/**
 * HOME PAGE CONTENT
 * ----------------------------------------------------------------------------
 * Headlines, process steps, and teaser copy for the Home page.
 * Services are edited in /src/config/services.ts.
 * Testimonials are edited in /src/content/testimonials.ts.
 */

export const home = {
  hero: {
    eyebrow: "Woman-Owned Custom Home Builder",
    // The headline and supporting line come from /src/config/business.ts (tagline, supportingLine).
    regions: "Long Island · New York City · Westchester",
    primaryCta: "Book a Consultation",
    secondaryCta: "View Our Work",
    /** Swap for a real photo, e.g. "/images/home/hero.jpg" (2400px wide or larger). */
    image: {
      src: "/images/placeholders/hero.svg",
      alt: "Placeholder illustration of a luxury custom home at dusk",
    },
    /**
     * Optional background video, e.g. "/videos/hero.mp4" (muted, looping, under 10 MB).
     * Leave empty to use the image. The image is always used for visitors who
     * prefer reduced motion.
     */
    video: "",
  },

  intro: {
    eyebrow: "Welcome",
    title: "Homes built with intention, from the first sketch to the final key.",
    body: "AB Development is a woman-owned custom home builder serving Long Island, New York City, and Westchester. We design and build homes around the way you want to live, and we treat every project as personally as if it were our own.",
  },

  process: {
    eyebrow: "How We Work",
    title: "Four steps, one trusted team.",
    steps: [
      {
        title: "Vision",
        text: "We start by listening. Your goals, your lifestyle, your site, and your budget shape everything that follows.",
      },
      {
        title: "Design",
        text: "Layouts, materials, and finishes come together with our design guidance and your architect, refined until it feels right.",
      },
      {
        title: "Build",
        text: "Permits, scheduling, trades, and quality control, all managed by us, with clear updates at every stage.",
      },
      {
        title: "Handoff",
        text: "A careful final walkthrough, every detail resolved, and the keys to a home that was made for you.",
      },
    ],
  },

  services: {
    eyebrow: "What We Do",
    title: "Services",
    intro: "Six ways we bring homes to life across Long Island, New York City, and Westchester.",
  },

  gallery: {
    eyebrow: "Selected Work",
    title: "From our portfolio",
    cta: "View the Full Gallery",
  },

  storyTeaser: {
    eyebrow: "Our Story",
    title: "One home at a time.",
    body: "AB Development began with two people, wildly in love, who believed a house should become a home filled with memories. Today that belief lives on in every home we build.",
    cta: "Read Our Story",
    image: {
      src: "/images/placeholders/story.svg",
      alt: "Placeholder illustration of warm light in a home's front window",
    },
  },

  testimonials: {
    eyebrow: "Kind Words",
    title: "From our clients",
  },

  finalCta: {
    title: "Your dream home starts with a conversation.",
    body: "Tell us about your vision. We are available 24/7 and happy to talk through your project, wherever you are in the process.",
    button: "Book a Consultation",
  },
};
