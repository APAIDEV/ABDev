import type { LegalDoc } from "./types";

export const doc: LegalDoc = {
  slug: "cookies",
  title: "Cookie Policy",
  metaDescription:
    "Which cookies the AB Development website uses, why, and how to accept, reject, or change your cookie choices at any time.",
  lastUpdated: "December 2026",
  intro: [
    "DRAFT: attorney review required before launch.",
    'This Cookie Policy explains how {{businessName}} uses cookies and similar technologies on {{domain}} (the "Site"). It should be read together with our [Privacy Policy](/legal/privacy).',
  ],
  sections: [
    {
      id: "what-are-cookies",
      heading: "What Cookies Are",
      blocks: [
        {
          type: "p",
          text: 'Cookies are small text files that a website stores in your browser. They let the site remember information between pages or visits, such as your preferences or whether you are signed in. Similar technologies, such as local storage, work in comparable ways; in this policy we refer to all of them as "cookies."',
        },
        {
          type: "p",
          text: "**First-party** cookies are set by the Site itself. **Third-party** cookies are set by another company, such as a provider whose content is embedded on the Site. **Session** cookies are deleted when you close your browser; **persistent** cookies remain until they expire or you delete them.",
        },
      ],
    },
    {
      id: "how-we-use-cookies",
      heading: "How We Use Cookies",
      blocks: [
        {
          type: "p",
          text: "We keep our use of cookies to a minimum. We use strictly necessary cookies to make the Site work and keep it secure, and, only if you agree, analytics cookies to understand how the Site is used. We do not use advertising or cross-site tracking cookies.",
        },
        {
          type: "p",
          text: "**We do not load Google Analytics until you consent.** If you reject analytics cookies or simply ignore the cookie banner, no analytics cookies are set.",
        },
      ],
    },
    {
      id: "strictly-necessary-cookies",
      heading: "Strictly Necessary Cookies (Always On)",
      blocks: [
        {
          type: "p",
          text: "These cookies are needed for the Site to function and to remember your privacy choices. They cannot be switched off in our cookie settings, though you can block them in your browser, which may cause parts of the Site to stop working.",
        },
        {
          type: "ul",
          items: [
            "**abd_consent** — First-party. Remembers your cookie choices. Expires after 12 months.",
            "**sb-*-auth-token** — First-party. Supabase authentication cookie that keeps a team member signed in. Set only for {{businessName}} team members who sign in to a restricted area; it is not set for visitors. Session (may be split into numbered parts, such as **.0** and **.1**, if the token is large).",
            "**Security and rate limiting** — Our forms and servers apply spam protection and rate limiting to prevent abuse. This is done on our servers using a one-way hash of your IP address, not with cookies, and the hashed value is deleted within about a day.",
          ],
        },
        {
          type: "note",
          text: "[Developer: confirmed that rate limiting sets no cookies. Confirm the Supabase cookie expiry matches the configured session settings in Supabase → Authentication → Sessions.]",
        },
      ],
    },
    {
      id: "analytics-cookies",
      heading: "Analytics Cookies (Only With Your Consent)",
      blocks: [
        {
          type: "p",
          text: "If you consent, we use Google Analytics 4, provided by Google LLC, to collect aggregated information about how visitors use the Site, such as pages viewed, time on page, approximate location, device type, and how visitors found us. This helps us improve the Site. Google processes this information under its own policies.",
        },
        {
          type: "ul",
          items: [
            "**_ga** — Third-party (Google Analytics, set on our domain). Distinguishes unique visitors. Expires after 2 years.",
            "**_ga_<ID>** — Third-party (Google Analytics, set on our domain). Maintains session state for our Google Analytics property. Expires after 2 years.",
          ],
        },
        {
          type: "note",
          text: "[Developer: replace <ID> with the GA4 measurement ID suffix if you prefer to show it. Confirm Google Analytics data retention and data-sharing settings match the Privacy Policy.]",
        },
      ],
    },
    {
      id: "third-party-embeds",
      heading: "Third-Party Embeds",
      blocks: [
        {
          type: "p",
          text: "Some pages include content from other companies. When that content loads, those companies may set their own cookies or collect information from your browser, under their own policies. We do not control these cookies.",
        },
        {
          type: "ul",
          items: [
            "**Google Maps** — The map of our service area on the Contact page is provided by Google and may set Google cookies under Google's policies.",
            "**Google Calendar appointment scheduling** — The consultation booking tool on the Contact page is provided by Google and may set Google cookies under Google's policies, particularly if you are signed in to a Google account.",
            "**Cloudflare Turnstile** — If enabled on our forms, Cloudflare Turnstile helps confirm that submissions come from people rather than bots. It may use cookies or similar technologies strictly for that security purpose, under Cloudflare's policies.",
          ],
        },
        {
          type: "p",
          text: "To learn more, see Google's privacy policy at policies.google.com/privacy and Cloudflare's privacy policy at cloudflare.com/privacypolicy.",
        },
        {
          type: "note",
          text: '[Attorney/developer: decide whether Google Maps and Google Calendar embeds should load only after consent (for example, behind a "click to load" placeholder), and update this section to match.]',
        },
      ],
    },
    {
      id: "managing-your-preferences",
      heading: "Managing Your Preferences",
      blocks: [
        {
          type: "ul",
          items: [
            "**Cookie banner.** When you first visit, a banner lets you **Accept** analytics cookies, **Reject** them, or **Manage** your choices by category.",
            '**Cookie Settings.** You can change or withdraw your choice at any time using the "Cookie Settings" link in the Site footer. If you withdraw consent, we stop loading Google Analytics on future page views.',
            "**Browser controls.** Most browsers let you view, block, and delete cookies. Blocking strictly necessary cookies may affect how the Site works, and deleting the **abd_consent** cookie means we will ask for your choice again.",
            "**Google Analytics opt-out.** Google offers a browser add-on that prevents Google Analytics from collecting data on websites you visit, available at tools.google.com/dlpage/gaoptout.",
          ],
        },
      ],
    },
    {
      id: "changes-to-this-policy",
      heading: "Changes to This Policy",
      blocks: [
        {
          type: "p",
          text: 'We may update this Cookie Policy when we change the cookies we use or for legal or operational reasons. We will revise the "Last updated" date at the top of this page, and if we add a new category of non-essential cookies, we will ask for your consent again.',
        },
      ],
    },
    {
      id: "contact-us",
      heading: "Contact Us",
      blocks: [
        {
          type: "p",
          text: "If you have questions about our use of cookies, contact us at {{email}} or {{phone}}.",
        },
      ],
    },
  ],
};
