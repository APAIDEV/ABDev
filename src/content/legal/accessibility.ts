import type { LegalDoc } from "./types";

export const doc: LegalDoc = {
  slug: "accessibility",
  title: "Accessibility Statement",
  metaDescription:
    "AB Development's commitment to an accessible website, our WCAG 2.2 Level AA target, known limitations, and how to request help or share feedback.",
  lastUpdated: "December 2026",
  intro: [
    "DRAFT: attorney review required before launch.",
    "{{businessName}} wants everyone to be able to learn about our work and reach us easily, including people with disabilities and people who use assistive technologies.",
  ],
  sections: [
    {
      id: "our-commitment",
      heading: "Our Commitment",
      blocks: [
        {
          type: "p",
          text: "We are committed to making {{domain}} accessible and usable for the widest possible audience. We treat accessibility as an ongoing responsibility, considering it when we design, build, and update the Site.",
        },
      ],
    },
    {
      id: "conformance-target",
      heading: "Conformance Target",
      blocks: [
        {
          type: "p",
          text: "Our goal is for the Site to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA, published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible for people with a wide range of disabilities.",
        },
        {
          type: "p",
          text: "We describe this as a target rather than a claim of full conformance. We continue to test and improve the Site and welcome your feedback.",
        },
        {
          type: "note",
          text: "[Owner: arrange an accessibility audit (automated and manual, including screen reader and keyboard testing) before launch. Update this section only if the audit supports a stronger conformance statement.]",
        },
      ],
    },
    {
      id: "measures-taken",
      heading: "Measures We Take",
      blocks: [
        { type: "p", text: "Accessibility features of the Site include:" },
        {
          type: "ul",
          items: [
            "**Semantic HTML** with clear headings, landmarks, and lists, so assistive technologies can understand page structure.",
            "**Keyboard navigation** for menus, links, forms, and interactive features, without requiring a mouse.",
            "**Visible focus indicators** that show which element is selected when navigating by keyboard.",
            '**A "Skip to content" link** that lets keyboard and screen reader users bypass repeated navigation.',
            "**Text alternatives (alt text)** for meaningful images, with decorative images hidden from assistive technologies.",
            "**Color contrast** designed to meet WCAG AA ratios for text and important interface elements, and information that is not conveyed by color alone.",
            '**Reduced-motion support** that minimizes animations for visitors who have enabled the "reduce motion" setting on their device.',
            "**Captions** for videos where provided.",
            "**Accessible forms** with visible labels, clear instructions, and error messages that are announced to assistive technologies.",
            "**Responsive layouts** that support zoom and text resizing and work across screen sizes.",
          ],
        },
      ],
    },
    {
      id: "known-limitations",
      heading: "Known Limitations and Third-Party Content",
      blocks: [
        {
          type: "p",
          text: "Some parts of the Site rely on third-party services that we do not control, and these may not fully meet our accessibility goals:",
        },
        {
          type: "ul",
          items: [
            "**Google Maps embed.** The interactive map on the Contact page may be difficult to use with some assistive technologies. Our service area (Long Island, including Nassau and Suffolk counties; all five New York City boroughs; and Westchester County) is also described in text.",
            "**Google Calendar appointment scheduling.** If the embedded booking tool is difficult to use, you can request a consultation using our contact form, by email, or by phone instead.",
            "**Spam protection.** If a verification challenge on our forms prevents you from submitting, please contact us by email or phone.",
            "**Older content.** Some older photos, videos, or documents may not yet have complete text alternatives or captions.",
          ],
        },
        {
          type: "p",
          text: "If any part of the Site is difficult for you to use, please let us know, and we will provide the information or service another way.",
        },
      ],
    },
    {
      id: "feedback-and-contact",
      heading: "Feedback and Assistance",
      blocks: [
        {
          type: "p",
          text: "We welcome your feedback on the accessibility of the Site. If you encounter a barrier, need help, or have a suggestion, please contact us:",
        },
        {
          type: "ul",
          items: ["Email: {{email}}", "Phone: {{phone}}", "Availability: we are available 24/7."],
        },
        {
          type: "p",
          text: "To help us respond, please include the web address of the page, a description of the problem, and the browser and assistive technology you were using, if applicable. We aim to respond within [2 business days].",
        },
      ],
    },
    {
      id: "alternative-formats",
      heading: "Alternative Formats",
      blocks: [
        {
          type: "p",
          text: "Information on the Site, including our legal policies and project information, is available in alternative formats on request, such as a plain-text email, a large-print document, or a phone conversation in which we read the content to you. Contact us at {{email}} or {{phone}}.",
        },
      ],
    },
    {
      id: "formal-complaints",
      heading: "Formal Complaints",
      blocks: [
        {
          type: "p",
          text: 'If you are not satisfied with our response to an accessibility concern, you may submit a written complaint to {{email}} with the subject line "Accessibility Complaint." The owner of {{businessName}} will review it, and we will respond in writing describing the steps we will take.',
        },
        {
          type: "note",
          text: "[Attorney: confirm whether to reference external complaint options, and review this statement in light of ADA Title III and New York State and City human rights law obligations.]",
        },
      ],
    },
    {
      id: "date-of-review",
      heading: "Date of Last Review",
      blocks: [
        {
          type: "p",
          text: "This statement was last reviewed in [December 2026]. We plan to review it at least [annually] and whenever we make significant changes to the Site.",
        },
      ],
    },
  ],
};
