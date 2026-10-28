/**
 * FAQ
 * ----------------------------------------------------------------------------
 * PLACEHOLDER ANSWERS: every answer below is a draft for your review. Edit the
 * wording, then set `reviewed: true` on each one you approve. Unreviewed
 * answers show a small "Draft answer" tag on the site so nothing unapproved
 * looks final.
 *
 * Keep answers general: specific timelines, prices, and permit rules depend on
 * each project and municipality.
 */

export type Faq = {
  id: string;
  question: string;
  /** Each string is one paragraph. */
  answer: string[];
  reviewed: boolean;
};

export const faqs: Faq[] = [
  {
    id: "how-custom-build-works",
    question: "How does a custom home build work?",
    answer: [
      "Every custom home moves through four stages: Vision, Design, Build, and Handoff. We begin with a consultation to understand your goals, site, and budget. We then coordinate design with your architect and engineers, manage permits and approvals, build the home with our trusted trades, and finish with a detailed walkthrough before handing you the keys.",
    ],
    reviewed: false,
  },
  {
    id: "where-do-you-build",
    question: "Where do you build?",
    answer: [
      "We build throughout Long Island (Nassau and Suffolk counties), all five boroughs of New York City (Manhattan, Brooklyn, Queens, the Bronx, and Staten Island), and Westchester County. If your project is nearby but outside these areas, reach out and we will let you know whether we can help.",
    ],
    reviewed: false,
  },
  {
    id: "timeline",
    question: "How long does a custom home take to build?",
    answer: [
      "Timelines depend on the size and complexity of the home, site conditions, and the approvals your municipality requires. As a general guide, design and permitting can take several months, and construction of a new custom home often takes 10 to 18 months. Renovations and dormers are typically shorter.",
      "We provide a project-specific schedule once the scope is defined, and we keep you updated as it progresses.",
    ],
    reviewed: false,
  },
  {
    id: "budget",
    question: "What budget range should I plan for?",
    answer: [
      "Costs vary widely by location, size, design, site work, and finish level. Building in Manhattan or Brooklyn differs from building in Suffolk County or Westchester. During your consultation we will talk through realistic ranges for your goals and help you prioritize where your investment matters most.",
      "Any figures discussed before a written proposal are general guidance only, not an estimate or a quote.",
    ],
    reviewed: false,
  },
  {
    id: "permits",
    question: "Do you handle permits and approvals?",
    answer: [
      "Yes. We coordinate permits and approvals as part of our process. Requirements vary by municipality: projects in the five boroughs go through the NYC Department of Buildings, while Long Island projects are reviewed by the individual town or village building department in Nassau or Suffolk County, and Westchester projects by the local town, city, or village. Some properties also need zoning, historic district, or environmental review.",
      "Approval timelines are set by each municipality and can vary, so we plan for them from the start.",
    ],
    reviewed: false,
  },
  {
    id: "financing",
    question: "Do you offer financing?",
    answer: [
      "We do not provide financing directly, but we are happy to work with your lender, including construction-to-permanent loans, and to provide the documentation and draw schedules lenders typically require. We recommend speaking with a lender early in the process.",
    ],
    reviewed: false,
  },
  {
    id: "design-process",
    question: "What does your design process look like?",
    answer: [
      "Design begins with your vision: how you live, what you love, and what you need. We help with space planning, layouts, finishes, and material selections, and we coordinate closely with your architect and engineers. If you do not have an architect yet, we can recommend licensed professionals we trust.",
    ],
    reviewed: false,
  },
  {
    id: "design-consulting-only",
    question: "Can I hire you for design consulting only?",
    answer: [
      "Yes. Our Design Consulting service is available on its own for planning, layout, finishes, and material guidance, whether you are preparing to build, renovate, or purchase a property.",
    ],
    reviewed: false,
  },
  {
    id: "dormers",
    question: "Do you build dormers?",
    answer: [
      "Yes. Dormer additions are one of our specialties. A shed, gable, or full-width dormer can add headroom, natural light, and usable square footage to an upper floor. We handle structural planning, permits, and finishing so the addition looks like it was always part of your home.",
    ],
    reviewed: false,
  },
  {
    id: "spec-home",
    question: "What is a spec home?",
    answer: [
      "A spec (speculative) home is a home a builder designs and builds before a buyer is in place, then offers for sale. Our Builder Spec Homes are built with the same care as our custom projects. Sales are handled through a licensed real estate broker and a written contract of sale.",
    ],
    reviewed: false,
  },
  {
    id: "warranty",
    question: "Do you offer a warranty?",
    answer: [
      "Warranty terms are defined in your written contract. New homes in New York are also covered by the housing merchant implied warranty under state law, unless it is replaced by a written limited warranty that meets legal requirements. We will walk you through the warranty that applies to your project before you sign.",
    ],
    reviewed: false,
  },
  {
    id: "communication",
    question: "How will we communicate during the project?",
    answer: [
      "You will have a dedicated point of contact and regular updates on progress, schedule, and any decisions needed. We are available 24/7 by phone and email, and we schedule site walkthroughs at key milestones.",
    ],
    reviewed: false,
  },
  {
    id: "licensed-insured",
    question: "Are you licensed and insured?",
    answer: [
      "Yes. AB Development is licensed and insured. License information for each jurisdiction we work in is available on request and will be shown on this site where required.",
    ],
    reviewed: false,
  },
  {
    id: "getting-started",
    question: "How do I get started?",
    answer: [
      "Book a consultation through our Contact page or call us any time. Share as much as you know about your property, goals, timeline, and budget, and we will follow up to schedule a conversation.",
    ],
    reviewed: false,
  },
];
