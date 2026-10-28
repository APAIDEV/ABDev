import type { LegalDoc } from "./types";

export const doc: LegalDoc = {
  slug: "terms",
  title: "Terms of Use",
  metaDescription:
    "The terms that govern your use of the AB Development website, including intellectual property, acceptable use, disclaimers, and governing law.",
  lastUpdated: "December 2026",
  intro: [
    "DRAFT: attorney review required before launch.",
    'These Terms of Use ("Terms") govern your access to and use of {{domain}} (the "Site"), operated by {{legalName}} ("{{businessName}}," "we," "us," or "our"), a custom home builder based in New York. Please read them carefully.',
  ],
  sections: [
    {
      id: "acceptance-of-terms",
      heading: "Acceptance of These Terms",
      blocks: [
        {
          type: "p",
          text: "By accessing or using the Site, you agree to be bound by these Terms and by our [Privacy Policy](/legal/privacy), [Cookie Policy](/legal/cookies), [Project & Estimate Disclaimer](/legal/project-disclaimer), and [Spec Home Disclaimer](/legal/spec-home-disclaimer), each of which is incorporated into these Terms by reference. If you do not agree, do not use the Site.",
        },
      ],
    },
    {
      id: "eligibility",
      heading: "Eligibility",
      blocks: [
        {
          type: "p",
          text: "The Site is intended for people who are at least 18 years old. By using the Site, you represent that you are at least 18 and able to enter into a binding agreement. If you use the Site on behalf of a company or other organization, you represent that you have authority to accept these Terms on its behalf.",
        },
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable Use",
      blocks: [
        {
          type: "p",
          text: "You may use the Site only for lawful purposes, such as learning about {{businessName}}, viewing our work, and contacting us about a potential project. When you submit information to us, you agree that it is accurate, that it is your own information or you are authorized to provide it, and that you will keep it up to date if your inquiry continues.",
        },
      ],
    },
    {
      id: "prohibited-conduct",
      heading: "Prohibited Conduct",
      blocks: [
        { type: "p", text: "You agree not to:" },
        {
          type: "ul",
          items: [
            "Use the Site in any way that violates any applicable federal, state, or local law or regulation.",
            "Submit false, misleading, or fraudulent information, or impersonate any person or organization.",
            "Send spam, unsolicited advertising, or bulk messages through our forms.",
            "Upload or transmit viruses, malware, or any other harmful code.",
            "Attempt to gain unauthorized access to the Site, team member accounts, our systems, or any data not intended for you, or attempt to bypass security, authentication, rate limiting, or spam protection.",
            "Interfere with or disrupt the Site, its servers, or networks, including through denial-of-service attacks or excessive automated requests.",
            "Scrape, crawl, spider, or use any robot or automated means to access, copy, collect, or monitor the Site or its content, except as permitted by our robots.txt file for general search engine indexing.",
            "Engage in data mining or extraction of any content or information from the Site.",
            "Use any Site content, including text, photos, videos, renderings, plans, or designs, to train, fine-tune, test, or improve any artificial intelligence or machine learning model or system, without our prior written permission.",
            "Copy, reproduce, or imitate our designs, plans, or renderings for use in construction or for any commercial purpose.",
            "Use the Site to harass, threaten, defame, or harm anyone.",
            "Remove, obscure, or alter any copyright, trademark, or other proprietary notice on the Site.",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual Property and Copyright",
      blocks: [
        {
          type: "p",
          text: 'The Site and all of its content, including text, photographs, videos, renderings, illustrations, floor plans, architectural and interior designs, graphics, logos, page layouts, and software (together, "Content"), are owned by or licensed to {{businessName}} and are protected by United States and international copyright, trademark, and other intellectual property laws. All rights not expressly granted in these Terms are reserved.',
        },
        {
          type: "p",
          text: "Some photographs and other Content may be used under license from photographers, clients, or other third parties, and remain the property of their respective owners.",
        },
        {
          type: "note",
          text: "[Attorney: confirm that {{businessName}} holds written copyright assignments or licenses from photographers, videographers, renderers, and any architects or designers whose work appears on the Site.]",
        },
      ],
    },
    {
      id: "trademarks",
      heading: "Trademarks",
      blocks: [
        {
          type: "p",
          text: '"AB Development" and the AB monogram logo are trademarks of {{businessName}}. You may not use them, or any confusingly similar name or mark, without our prior written permission, including in domain names, social media handles, advertising, or metadata. Other names and logos that appear on the Site belong to their respective owners, and their appearance does not imply endorsement.',
        },
      ],
    },
    {
      id: "limited-license",
      heading: "Limited License to Use the Site",
      blocks: [
        {
          type: "p",
          text: "Subject to these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable license to access and view the Site for your own non-commercial use, such as evaluating whether to work with us. You may print or save a reasonable number of pages for that purpose, provided you keep all copyright and other notices intact.",
        },
        {
          type: "p",
          text: "You may share links to pages on the Site. Any other use, including copying, distributing, modifying, publicly displaying, or creating derivative works from Content, requires our prior written permission. This license ends automatically if you violate these Terms.",
        },
      ],
    },
    {
      id: "user-submissions",
      heading: "Information and Materials You Submit",
      blocks: [
        {
          type: "p",
          text: "When you submit information through the Site, such as a consultation request or message, our handling of personal information is governed by our [Privacy Policy](/legal/privacy).",
        },
        {
          type: "p",
          text: 'If you send us ideas, suggestions, inspiration images, sketches, or other materials ("Submissions"), you represent that you have the right to share them. You grant {{businessName}} a non-exclusive, royalty-free license to use, reproduce, and modify your Submissions for the purpose of responding to you, evaluating your project, and providing our services. We will not publish your Submissions, or your name, image, or testimonial, without your separate permission.',
        },
        {
          type: "p",
          text: "Please do not send us confidential or proprietary information through the Site. Unless we agree otherwise in a signed writing, information sent through the Site is not treated as confidential.",
        },
      ],
    },
    {
      id: "third-party-links-and-services",
      heading: "Third-Party Links and Embedded Services",
      blocks: [
        {
          type: "p",
          text: "The Site may contain links to third-party websites, such as Instagram, and may embed third-party services, such as Google Maps, Google Calendar appointment scheduling, and Cloudflare Turnstile. These third parties are not under our control. We are not responsible for their content, availability, accuracy, security, or privacy practices, and a link or embed does not mean we endorse them. Your use of third-party services is governed by their own terms and policies.",
        },
        {
          type: "p",
          text: "Booking a time through an embedded scheduling tool is a request for a consultation only. It does not create a contract or client relationship.",
        },
      ],
    },
    {
      id: "no-professional-advice",
      heading: "No Professional Advice; No Contract Formed",
      blocks: [
        {
          type: "p",
          text: "Content on the Site is provided for general informational purposes only. It is not architectural, engineering, legal, financial, tax, real estate, or other professional advice, and should not be relied on as such. Photos, renderings, timelines, budget ranges, and other project information are illustrative and are not offers, quotes, or guarantees.",
        },
        {
          type: "p",
          text: "Using the Site, submitting a form, calling, emailing, texting, or booking a consultation does not create a contract or client relationship with {{businessName}}. Only a written agreement signed by you and an authorized representative of {{businessName}} creates any obligation to perform work. Please read our [Project & Estimate Disclaimer](/legal/project-disclaimer) and, for homes offered for sale, our [Spec Home Disclaimer](/legal/spec-home-disclaimer).",
        },
      ],
    },
    {
      id: "disclaimer-of-warranties",
      heading: "Disclaimer of Warranties",
      blocks: [
        {
          type: "p",
          text: 'THE SITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY LAW, {{businessName}} DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ACCURACY.',
        },
        {
          type: "p",
          text: "WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, THAT CONTENT IS COMPLETE, CURRENT, OR ACCURATE, OR THAT THE SITE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.",
        },
        {
          type: "p",
          text: "This disclaimer applies to the Site only. It does not limit any warranty provided in a signed written agreement with {{businessName}} or any warranty that cannot be disclaimed under New York law, such as the housing merchant implied warranty that may apply to the sale of a new home.",
        },
        {
          type: "note",
          text: "[Attorney: confirm that this website disclaimer is appropriately separated from construction and new-home warranty obligations under NY General Business Law Article 36-B and any written contract.]",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of Liability",
      blocks: [
        {
          type: "p",
          text: "TO THE FULLEST EXTENT PERMITTED BY LAW, {{businessName}} AND ITS OWNERS, OFFICERS, EMPLOYEES, AGENTS, AND AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF, OR INABILITY TO USE, THE SITE OR ITS CONTENT, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
        },
        {
          type: "p",
          text: "TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATED TO THE SITE OR THESE TERMS WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS ($100).",
        },
        {
          type: "p",
          text: "Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of these limitations may not apply to you. Nothing in these Terms limits liability that cannot be limited under applicable law. These limitations apply to your use of the Site and do not govern any construction or sales agreement, which is controlled by its own terms.",
        },
        {
          type: "note",
          text: "[Attorney: confirm the $100 cap amount and enforceability under New York law.]",
        },
      ],
    },
    {
      id: "indemnification",
      heading: "Indemnification",
      blocks: [
        {
          type: "p",
          text: "You agree to defend, indemnify, and hold harmless {{businessName}} and its owners, officers, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or related to your violation of these Terms, your misuse of the Site, or your violation of any law or the rights of any third party.",
        },
      ],
    },
    {
      id: "governing-law-and-venue",
      heading: "Governing Law and Venue",
      blocks: [
        {
          type: "p",
          text: "These Terms and any dispute arising out of or related to them or to the Site are governed by the laws of the State of New York, without regard to its conflict of laws principles.",
        },
        {
          type: "p",
          text: "You agree that any legal action or proceeding arising out of or related to these Terms or the Site will be brought exclusively in the state or federal courts located in [Nassau County], New York, and you consent to the personal jurisdiction of those courts.",
        },
        {
          type: "note",
          text: '[Attorney: confirm the venue county. Consider whether to add a jury trial waiver (for example: "TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AND {{businessName}} EACH WAIVE THE RIGHT TO A TRIAL BY JURY IN ANY ACTION ARISING OUT OF OR RELATED TO THESE TERMS OR THE SITE.") and/or an informal dispute resolution step before filing suit. Remove this note if not used.]',
        },
      ],
    },
    {
      id: "severability",
      heading: "Severability",
      blocks: [
        {
          type: "p",
          text: "If any provision of these Terms is found to be invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the remaining provisions will remain in full force and effect.",
        },
      ],
    },
    {
      id: "no-waiver",
      heading: "No Waiver",
      blocks: [
        {
          type: "p",
          text: "Our failure to enforce any right or provision of these Terms is not a waiver of that right or provision. A waiver is effective only if it is in writing and signed by an authorized representative of {{businessName}}.",
        },
      ],
    },
    {
      id: "entire-agreement",
      heading: "Entire Agreement",
      blocks: [
        {
          type: "p",
          text: "These Terms, together with the policies and disclaimers incorporated by reference, are the entire agreement between you and {{businessName}} regarding your use of the Site, and supersede any prior understandings about the Site. They do not replace any separate written agreement you sign with us for construction, design, or the purchase of a home, which will control as to its subject matter.",
        },
      ],
    },
    {
      id: "changes-to-these-terms",
      heading: "Changes to These Terms and the Site",
      blocks: [
        {
          type: "p",
          text: 'We may update these Terms from time to time. When we do, we will revise the "Last updated" date at the top of this page. Changes take effect when posted, and your continued use of the Site after changes are posted means you accept the revised Terms. We may also change, suspend, or discontinue any part of the Site at any time without notice.',
        },
      ],
    },
    {
      id: "contact-us",
      heading: "Contact Us",
      blocks: [
        {
          type: "p",
          text: "Questions about these Terms, or requests for permission to use our Content or trademarks, can be sent to {{legalName}}:",
        },
        {
          type: "ul",
          items: ["Email: {{email}}", "Phone: {{phone}}", "Mail: {{address}}", "Website: {{siteUrl}}"],
        },
      ],
    },
  ],
};
