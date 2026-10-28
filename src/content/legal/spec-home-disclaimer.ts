import type { LegalDoc } from "./types";

export const doc: LegalDoc = {
  slug: "spec-home-disclaimer",
  title: "Spec Home Disclaimer",
  metaDescription:
    "Important information about spec home listings on the AB Development website, including availability, pricing, brokerage, and fair housing.",
  lastUpdated: "December 2026",
  intro: [
    "DRAFT: attorney review required before launch.",
    '{{businessName}} sometimes builds homes before a buyer is identified ("spec homes"). This disclaimer applies to all spec home listings, descriptions, and related content on {{domain}}, and forms part of our [Terms of Use](/legal/terms).',
  ],
  sections: [
    {
      id: "informational-only",
      heading: "Listings Are Informational Only",
      blocks: [
        {
          type: "p",
          text: "Spec home content on the Site is provided for general informational purposes only. It is not an offer to sell, or a solicitation of an offer to buy, any property, and it is not an offer or solicitation in any jurisdiction where such an offer or solicitation would be prohibited or would require prior registration or qualification.",
        },
      ],
    },
    {
      id: "how-sales-are-handled",
      heading: "How Sales Are Handled",
      blocks: [
        {
          type: "p",
          text: "Spec homes are marketed and sold through a real estate broker licensed by the New York State Department of State. A sale becomes binding only when a written contract of sale is signed by the buyer and the seller, and is subject to the terms of that contract. No reservation, deposit, or agreement to buy is created by viewing the Site, contacting us, or touring a home.",
        },
        {
          type: "p",
          text: "Please direct pricing, showing, and offer inquiries to the listing broker identified on each listing, or contact us at {{email}} and we will put you in touch.",
        },
        {
          type: "note",
          text: "[Attorney/broker: identify the broker of record for spec home listings and confirm that each listing displays the brokerage name and other information required by NYS Department of State advertising rules (19 NYCRR Part 175). Confirm any required agency disclosure (NY Real Property Law § 443) is handled through the broker.]",
        },
      ],
    },
    {
      id: "subject-to-change",
      heading: "Details Are Subject to Change",
      blocks: [
        {
          type: "p",
          text: "Availability, pricing, incentives, features, finishes, specifications, floor plans, dimensions, square footage, lot size, and renderings are subject to change without notice, and the home may be sold or withdrawn at any time. Square footage and dimensions are approximate and may be measured in different ways. Renderings and photographs may show furnishings, landscaping, optional features, or upgrades that are not included in the sale.",
        },
        {
          type: "p",
          text: "Property taxes, school district information, homeowners' association details, and similar information, if shown, are estimates or are provided by third parties, and should be independently verified.",
        },
      ],
    },
    {
      id: "status-tags",
      heading: "Listing Status May Not Be Current",
      blocks: [
        {
          type: "p",
          text: "Status labels such as **Available**, **Under Contract**, and **Sold** are updated periodically and may not reflect the current status of a home. Please confirm current status with the listing broker.",
        },
      ],
    },
    {
      id: "due-diligence",
      heading: "Independent Inspection and Due Diligence",
      blocks: [
        {
          type: "p",
          text: "Buyers should conduct their own independent inspection and due diligence before signing a contract of sale, including professional home inspection, survey, title review, review of permits and certificates of occupancy, and review of zoning, flood zone, and environmental information. We encourage buyers to be represented by their own real estate attorney and, if desired, their own buyer's broker.",
        },
      ],
    },
    {
      id: "no-reliance",
      heading: "No Reliance",
      blocks: [
        {
          type: "p",
          text: "You should not rely on any statement on the Site when deciding whether to buy a home. Only the representations and warranties expressly set out in a signed contract of sale, and any warranty required by law, apply to a purchase. Information on the Site is believed to be reliable but is not guaranteed.",
        },
        {
          type: "note",
          text: "[Attorney: confirm how this no-reliance language interacts with the housing merchant implied warranty for new homes under NY General Business Law Article 36-B, and with any limited warranty offered in the contract of sale.]",
        },
      ],
    },
    {
      id: "equal-housing-opportunity",
      heading: "Equal Housing Opportunity",
      blocks: [
        {
          type: "note",
          text: "[Attorney/broker: insert approved Equal Housing Opportunity statement and logo usage per HUD and NY State Human Rights Law/ NYS DOS requirements]",
        },
        {
          type: "p",
          text: "{{businessName}} is committed to the letter and spirit of U.S. and New York fair housing laws. We do not discriminate in the sale or marketing of homes on the basis of race, color, religion, sex, disability, familial status, national origin, or any other characteristic protected by the federal Fair Housing Act, the New York State Human Rights Law, or applicable local law.",
        },
        {
          type: "note",
          text: "[Attorney: confirm the full list of protected classes to state. New York State and local laws (for example, the New York City Human Rights Law and county fair housing laws in Nassau, Suffolk, and Westchester) protect additional characteristics, such as sexual orientation, gender identity or expression, age, marital status, military status, and lawful source of income.]",
        },
      ],
    },
    {
      id: "affiliated-brokerage",
      heading: "Relationship With Affiliated Brokerage",
      blocks: [
        {
          type: "p",
          text: "{{businessName}} may work with Selling Long Island, a sister company under common ownership or management, in connection with the marketing or sale of spec homes. You are not required to use Selling Long Island, or any other affiliated company, as a condition of buying a home from us, and you are free to choose your own broker, attorney, lender, inspector, and other service providers.",
        },
        {
          type: "note",
          text: "[Attorney: confirm the precise ownership relationship between {{businessName}} and Selling Long Island and draft the required affiliated-business disclosure. Consider whether a written Affiliated Business Arrangement disclosure is required under RESPA (if any settlement-service referrals are made), whether dual agency or other agency disclosures apply under NY Real Property Law § 443, and how the relationship must be disclosed in advertising under NYS DOS rules.]",
        },
      ],
    },
    {
      id: "questions",
      heading: "Questions",
      blocks: [
        {
          type: "p",
          text: "For questions about a spec home, contact us at {{email}} or {{phone}}. See also our [Project & Estimate Disclaimer](/legal/project-disclaimer).",
        },
      ],
    },
  ],
};
