import type { LegalDoc } from "./types";

export const doc: LegalDoc = {
  slug: "project-disclaimer",
  title: "Project & Estimate Disclaimer",
  metaDescription:
    "Project photos, renderings, timelines, and budget ranges on the AB Development website are illustrative only and are not quotes, offers, or guarantees.",
  lastUpdated: "December 2026",
  intro: [
    "DRAFT: attorney review required before launch.",
    "We share examples of our work, typical timelines, and general budget information to help you plan. This disclaimer explains what that information is, and what it is not. It forms part of our [Terms of Use](/legal/terms).",
  ],
  sections: [
    {
      id: "illustrative-information",
      heading: "Website Content Is Illustrative and General",
      blocks: [
        {
          type: "p",
          text: "All content on {{domain}}, including project galleries, photographs, videos, renderings, illustrations, floor plans, descriptions, process overviews, timelines, budget ranges, cost guides, and answers to frequently asked questions, is provided for general informational and illustrative purposes only.",
        },
        {
          type: "p",
          text: "This content is **not** an offer, bid, quote, estimate, proposal, or guarantee of any price, schedule, design, result, or availability. It does not describe what your project will cost, how long it will take, or exactly how it will look.",
        },
      ],
    },
    {
      id: "no-contract-formed",
      heading: "No Contract or Client Relationship",
      blocks: [
        {
          type: "p",
          text: "No contract, client relationship, or obligation of any kind is formed by:",
        },
        {
          type: "ul",
          items: [
            "Browsing or using the Site.",
            "Submitting a contact or consultation form.",
            "Calling, emailing, texting, or messaging us, including through social media.",
            "Booking, attending, or rescheduling a consultation.",
            "Receiving a verbal or informal written indication of price or timing.",
          ],
        },
        {
          type: "p",
          text: "{{businessName}} is bound only by a written agreement signed by you and an authorized representative of {{businessName}}. Any project scope, price, payment schedule, timeline, specifications, allowances, and warranties will be set out in that agreement.",
        },
        {
          type: "note",
          text: "[Attorney: confirm how New York General Business Law Article 36-A (Home Improvement Contracts, § 770 et seq.) applies to the services offered. Article 36-A generally requires home improvement contracts to be in writing and to include specified terms and notices, such as contractor identification, a description of the work and materials, an approximate start and completion date, the agreed price and payment schedule, notice of the owner's right to cancel, and deposit handling. Also confirm which requirements apply to new-home construction versus renovation, and any local requirements in NYC, Nassau, Suffolk, and Westchester.]",
        },
      ],
    },
    {
      id: "results-vary",
      heading: "Every Project Is Different",
      blocks: [
        {
          type: "p",
          text: "Cost, schedule, design, and outcome depend on many factors, many of which are outside our control. These include:",
        },
        {
          type: "ul",
          items: [
            "Site conditions, including soil, grading, drainage, existing structures, and environmental conditions discovered before or during construction.",
            "Municipal, zoning, and land-use requirements, including setbacks, height limits, historic district or landmark rules, and any required variances or approvals.",
            "Permit review, plan approval, and inspection schedules.",
            "Material and product availability, lead times, and price changes.",
            "Weather and seasonal conditions.",
            "Utility work, including connections, upgrades, or relocations by utility providers.",
            "Client selections, design changes, and change orders.",
            "Labor availability and the schedules of architects, engineers, and other third parties.",
          ],
        },
        {
          type: "p",
          text: "Results shown for one project, including its timeline or cost, do not predict results for another.",
        },
      ],
    },
    {
      id: "permits-and-timelines",
      heading: "Permits and Timelines Vary by Jurisdiction",
      blocks: [
        {
          type: "p",
          text: "We work across several jurisdictions, and each has its own permitting, plan review, and inspection requirements and timelines. Depending on the property, these may include the New York City Department of Buildings (and other City agencies), the building departments of towns, villages, and cities in Nassau and Suffolk counties, and the building departments of municipalities in Westchester County. Some projects also require approvals from zoning boards, architectural review boards, landmark commissions, health departments, or environmental agencies.",
        },
        {
          type: "p",
          text: "Any timeline shown on the Site is a general example. Actual schedules depend on the approvals your project requires and on how long each agency takes to review it.",
        },
      ],
    },
    {
      id: "budget-ranges",
      heading: "Budget Ranges Are Not Estimates",
      blocks: [
        {
          type: "p",
          text: 'Budget ranges, "starting at" figures, or price-per-square-foot references on the Site, and the budget options in our consultation form, are general reference points only. They are not estimates, quotes, or bids for your project. A project-specific price can be provided only after we review your site, plans, scope, and selections, and it becomes binding only when included in a signed written agreement.',
        },
      ],
    },
    {
      id: "imagery",
      heading: "Photos, Renderings, and Placeholder Imagery",
      blocks: [
        {
          type: "p",
          text: "Renderings and illustrations are artistic representations. They may show features, finishes, furnishings, landscaping, or surroundings that are not included, are optional at extra cost, or differ from the finished home.",
        },
        {
          type: "p",
          text: "Some images on the Site may be stock or placeholder images used for design or illustrative purposes, and may not depict actual {{businessName}} projects. Photographs of completed work may show upgrades or client-selected items, and may have been staged or edited.",
        },
        {
          type: "note",
          text: "[Owner: before launch, replace placeholder imagery with your own project photography where possible, or label placeholder images clearly. Do not present stock or placeholder images as {{businessName}} projects.]",
        },
      ],
    },
    {
      id: "products-and-materials",
      heading: "Products and Materials",
      blocks: [
        {
          type: "p",
          text: "References to specific brands, products, finishes, or materials are examples only. Availability, specifications, and pricing are set by manufacturers and suppliers and can change without notice. Substitutions of equal or better quality may be necessary, as provided in a signed agreement. Manufacturer warranties, where available, are provided by the manufacturer and not by {{businessName}}, unless a signed agreement states otherwise.",
        },
      ],
    },
    {
      id: "professional-services",
      heading: "Architectural, Engineering, and Other Professional Services",
      blocks: [
        {
          type: "p",
          text: "Architectural, engineering, surveying, and similar professional services are provided by separately licensed professionals, either engaged by you directly or coordinated by {{businessName}} under a written agreement. {{businessName}} does not itself practice architecture, engineering, or land surveying. Nothing on the Site is professional design, engineering, legal, tax, or financial advice.",
        },
        {
          type: "note",
          text: "[Attorney: confirm how design services are described across the Site and in contracts so that nothing implies {{businessName}} practices a licensed profession (NY Education Law Title VIII) without the required license or professional entity structure.]",
        },
      ],
    },
    {
      id: "questions",
      heading: "Questions",
      blocks: [
        {
          type: "p",
          text: "If you would like information specific to your project, we are happy to talk it through. Contact us at {{email}} or {{phone}}, or [request a consultation](/contact).",
        },
      ],
    },
  ],
};
