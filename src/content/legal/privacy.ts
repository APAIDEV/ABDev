import type { LegalDoc } from "./types";

export const doc: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  metaDescription:
    "How AB Development collects, uses, shares, and protects personal information submitted through our website, and the choices available to you.",
  lastUpdated: "December 2026",
  intro: [
    "DRAFT: attorney review required before launch.",
    'This Privacy Policy explains how {{businessName}} ("{{businessName}}," "we," "us," or "our") collects, uses, shares, and protects personal information when you visit {{domain}} (the "Site"), contact us, request a consultation, or otherwise interact with us online.',
    "By using the Site, you acknowledge the practices described in this policy. If you do not agree with them, please do not submit personal information through the Site. This policy should be read together with our [Terms of Use](/legal/terms) and [Cookie Policy](/legal/cookies).",
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "Who We Are",
      blocks: [
        {
          type: "p",
          text: "{{legalName}} is a woman-owned custom home builder based in New York, serving Long Island (Nassau and Suffolk counties), all five New York City boroughs, and Westchester County. We operate the Site and are responsible for the personal information collected through it.",
        },
        {
          type: "p",
          text: "You can reach us about this policy or your information at {{email}} or {{phone}}. Our mailing address is {{address}}.",
        },
        {
          type: "note",
          text: "[Owner: confirm the legal entity name in /src/config/business.ts and supply a mailing address. If no street address will be published, the attorney should confirm an acceptable alternative for privacy requests.]",
        },
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information We Collect",
      blocks: [
        {
          type: "p",
          text: "We collect information you give us directly, information created when you agree to certain terms or communications, and limited technical information collected automatically when you use the Site.",
        },
        { type: "h3", text: "Contact and consultation requests" },
        {
          type: "p",
          text: "When you submit our contact or consultation form, we collect the information you choose to provide, which may include:",
        },
        {
          type: "ul",
          items: [
            "Your name, email address, and phone number.",
            "Project details, such as project type, region and town, budget range, and desired timeline.",
            "How you heard about us.",
            "Your message and any other details you include.",
            "Optionally, a preferred consultation date and time.",
          ],
        },
        { type: "h3", text: "Consent records" },
        {
          type: "p",
          text: "When you agree to our terms, this policy, or optional communications, we keep a record of that consent, including the date and time it was given and the exact wording you agreed to. We keep these records so we can honor your choices and demonstrate that consent was obtained.",
        },
        { type: "h3", text: "Optional marketing consents" },
        {
          type: "p",
          text: "If you choose to opt in, we record your consent to receive marketing emails and/or text (SMS) messages from us. These consents are optional and are never a condition of requesting a consultation or doing business with us.",
        },
        { type: "h3", text: "Technical information" },
        {
          type: "ul",
          items: [
            "**IP address.** We process your IP address to protect the Site and our forms from abuse, including spam prevention and rate limiting. For these purposes, we store your IP address only in hashed (one-way scrambled) form, and only for a short period of no more than 24 hours.",
            "**Browser and device information.** We may receive your browser type and user agent string, which help us troubleshoot problems and detect automated abuse.",
          ],
        },
        { type: "h3", text: "Analytics information" },
        {
          type: "p",
          text: "Only if you consent to analytics cookies, we use Google Analytics 4 to understand how visitors use the Site, such as which pages are viewed, how long visits last, the general location (city or region level) and type of device used, and how visitors arrived at the Site. Google Analytics does not load until you give consent. See our [Cookie Policy](/legal/cookies) for details.",
        },
        { type: "h3", text: "Cookies" },
        {
          type: "p",
          text: "We use a small number of strictly necessary cookies (for example, to remember your cookie choices) and, with your consent, analytics cookies. Embedded third-party services may set their own cookies. Our [Cookie Policy](/legal/cookies) lists the cookies we use and how to manage them.",
        },
        { type: "h3", text: "Team member accounts" },
        {
          type: "p",
          text: "Members of the {{businessName}} team who sign in to restricted areas of the Site have accounts that contain their name, title, email address, and role; login and session information (such as sign-in times and session tokens); and, if enabled, two-factor authentication factors. This information is used only to operate and secure those accounts. The public does not need an account to use the Site.",
        },
        { type: "h3", text: "Information we do not request" },
        {
          type: "p",
          text: "Please do not submit sensitive information through the Site, such as Social Security numbers, financial account numbers, driver's license numbers, or health information. We do not need this information to respond to an inquiry.",
        },
      ],
    },
    {
      id: "how-we-use-information",
      heading: "How We Use Information",
      blocks: [
        { type: "p", text: "We use personal information to:" },
        {
          type: "ul",
          items: [
            "Respond to your inquiries, schedule and prepare for consultations, and follow up about your project.",
            "Evaluate whether and how we may be able to help with your project, including its location, scope, budget, and timing.",
            "Send transactional messages, such as confirmations of your form submission or appointment.",
            "Send marketing emails or text messages, but only if you have opted in.",
            "Keep records of the consents and choices you have made.",
            "Protect the Site, our team, and visitors, including preventing spam, fraud, and abuse.",
            "Understand and improve the Site, if you have consented to analytics.",
            "Operate and secure team member accounts.",
            "Comply with legal obligations, resolve disputes, and enforce our [Terms of Use](/legal/terms).",
          ],
        },
        {
          type: "p",
          text: "We do not use the information you submit to make automated decisions that produce legal or similarly significant effects about you.",
        },
      ],
    },
    {
      id: "legal-bases-and-consent",
      heading: "Why We Process Information and Your Consent",
      blocks: [
        {
          type: "p",
          text: "We process personal information when it is needed to respond to a request you make (such as a consultation request), when you have given consent (such as for marketing messages or analytics cookies), when we have a legitimate business interest that is not outweighed by your interests (such as securing the Site and preventing spam), or when the law requires it.",
        },
        {
          type: "p",
          text: "Where we rely on your consent, you may withdraw it at any time, as described in [Your Rights and Choices](#your-rights-and-choices). Withdrawing consent does not affect processing that took place before you withdrew it.",
        },
      ],
    },
    {
      id: "how-we-share-information",
      heading: "How We Share Information",
      blocks: [
        {
          type: "p",
          text: "**We do not sell your personal information.** We also do not share it for cross-context behavioral advertising. We share personal information only as described below.",
        },
        { type: "h3", text: "Service providers" },
        {
          type: "p",
          text: "We use trusted service providers to operate the Site and our business. They may process personal information on our behalf, only as needed to provide their services to us:",
        },
        {
          type: "ul",
          items: [
            "**Vercel** — hosts and delivers the Site.",
            "**Supabase** — hosts our database and provides authentication for team member accounts.",
            "**Resend** — delivers transactional emails, such as form confirmations and internal notifications.",
            "**Google Analytics** — measures Site usage, only after you consent to analytics cookies.",
            "**Google Maps** — displays an embedded map of our service area on the Contact page.",
            "**Google Calendar appointment scheduling** — lets you book a consultation through an embedded scheduling page. Information you enter in the booking tool is collected by Google and shared with us.",
            "**Cloudflare Turnstile** — if enabled, helps verify that form submissions come from people rather than automated bots.",
          ],
        },
        {
          type: "p",
          text: "Embedded Google services and Cloudflare Turnstile may collect information directly from your browser under their own privacy policies, which we encourage you to review.",
        },
        {
          type: "note",
          text: "[Attorney: confirm the vendor list is complete before launch and that a data processing agreement or equivalent terms are in place with each provider. Add or remove vendors (for example, an email marketing or SMS platform) as they are adopted.]",
        },
        { type: "h3", text: "Text messaging" },
        {
          type: "p",
          text: "Mobile phone numbers and text messaging opt-in data and consent are not shared with or sold to third parties or affiliates for their marketing or promotional purposes. We may share them only with service providers that help us deliver messages to you.",
        },
        { type: "h3", text: "Project partners" },
        {
          type: "p",
          text: "If you engage us for a project, we may share relevant project information with architects, engineers, subcontractors, suppliers, and other professionals working on your project, as needed to carry out the work. These relationships are governed by your written agreement with us.",
        },
        { type: "h3", text: "Legal and safety reasons" },
        {
          type: "p",
          text: "We may disclose information if we believe in good faith that it is required by law, subpoena, or court order; needed to protect the rights, property, or safety of {{businessName}}, our clients, or others; or needed to investigate fraud or security issues.",
        },
        { type: "h3", text: "Business transfers" },
        {
          type: "p",
          text: "If {{businessName}} is involved in a merger, acquisition, reorganization, or sale of assets, personal information may be transferred as part of that transaction, subject to this policy or a policy that is at least as protective.",
        },
        { type: "h3", text: "With your permission" },
        {
          type: "p",
          text: "We may share information for other purposes when you ask us to or give us permission.",
        },
      ],
    },
    {
      id: "data-retention",
      heading: "How Long We Keep Information",
      blocks: [
        {
          type: "p",
          text: "We keep personal information only as long as reasonably necessary for the purposes described in this policy, including to meet legal, accounting, and record-keeping requirements. General guidelines:",
        },
        {
          type: "ul",
          items: [
            "**Inquiries that do not become projects:** up to [3 years] after our last contact with you.",
            "**Client and project records:** for the duration of the project and for [7 years] afterward, or longer if required by law, warranty obligations, or a pending claim.",
            "**Consent records:** for as long as the consent is in effect and for [5 years] afterward, so we can demonstrate how and when consent was given or withdrawn.",
            "**Hashed IP addresses used for security and rate limiting:** no more than 24 hours.",
            "**Analytics data:** according to the retention setting configured in Google Analytics, currently [14 months].",
            "**Team member accounts:** while the account is active and for [1 year] after it is closed.",
          ],
        },
        {
          type: "p",
          text: "When information is no longer needed, we delete it or de-identify it so it can no longer reasonably be linked to you.",
        },
        {
          type: "note",
          text: "[Attorney: confirm each retention period, including any record-keeping requirements for home improvement contracts, warranties, and tax records, and adopt a written retention schedule.]",
        },
      ],
    },
    {
      id: "security",
      heading: "How We Protect Information",
      blocks: [
        {
          type: "p",
          text: "We maintain reasonable administrative, technical, and physical safeguards designed to protect personal information, consistent with the New York SHIELD Act (New York General Business Law § 899-bb). These include:",
        },
        {
          type: "ul",
          items: [
            "Encryption of data in transit using HTTPS, with HTTP Strict Transport Security (HSTS).",
            "Access controls, including role-based access and the principle of least privilege, so team members can see only the information they need for their role.",
            "Authentication protections for team member accounts, including the option of two-factor authentication.",
            "Spam and abuse protections, such as rate limiting.",
            "Training for team members on handling personal information.",
            "Selecting service providers that maintain appropriate safeguards and overseeing them through contract terms.",
            "Reviewing and adjusting our safeguards as our business and technology change.",
          ],
        },
        {
          type: "p",
          text: "No website, transmission, or storage system is completely secure, and we cannot guarantee absolute security. If we become aware of a breach of security affecting your private information, we will notify you and the appropriate authorities as required by New York General Business Law § 899-aa and other applicable law.",
        },
        {
          type: "note",
          text: "[Attorney: the SHIELD Act requires a reasonable data security program. Confirm that a written security program, designated responsible employee, and incident response plan are in place before launch.]",
        },
      ],
    },
    {
      id: "your-rights-and-choices",
      heading: "Your Rights and Choices",
      blocks: [
        {
          type: "p",
          text: "Regardless of where you live, we will honor the following requests, subject to verification of your identity and any legal exceptions:",
        },
        {
          type: "ul",
          items: [
            "**Access.** Ask what personal information we hold about you and request a copy.",
            "**Correction.** Ask us to correct information that is inaccurate or incomplete.",
            "**Deletion.** Ask us to delete your personal information. We may keep certain information where we are required or permitted by law to do so, such as records of an active project, a contract, or your request to opt out.",
            "**Opt out of marketing emails.** Click the unsubscribe link in any marketing email, or contact us.",
            "**Opt out of text messages.** Reply **STOP** to any text message from us. You may reply **HELP** for assistance. Message and data rates may apply.",
            '**Withdraw cookie consent.** Use the "Cookie Settings" link in the Site footer at any time to change or withdraw your cookie choices.',
          ],
        },
        {
          type: "p",
          text: "Opting out of marketing does not stop transactional or project-related messages, such as replies to your inquiry or appointment confirmations.",
        },
        { type: "h3", text: "How to submit a request" },
        {
          type: "p",
          text: "Email us at {{email}} or call {{phone}}. Please tell us what you are requesting and how we can reach you. We may need to verify your identity before acting on a request, and we will not ask for more information than is reasonably necessary to do so. We aim to respond within [30 days]. We will not discriminate against you for exercising any of these rights.",
        },
        {
          type: "note",
          text: "[Attorney: confirm whether any state privacy laws (for example, laws of states where visitors reside) apply given the business's size and data volume, and whether additional disclosures or request methods are required.]",
        },
      ],
    },
    {
      id: "childrens-privacy",
      heading: "Children's Privacy",
      blocks: [
        {
          type: "p",
          text: "The Site is intended for adults and is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us at {{email}}, and we will delete it.",
        },
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-Party Links and Services",
      blocks: [
        {
          type: "p",
          text: "The Site may link to, or embed content from, third-party websites and services, such as Instagram, Google Maps, and Google Calendar. We are not responsible for the privacy practices of those third parties. Information you provide to them is governed by their own privacy policies.",
        },
      ],
    },
    {
      id: "do-not-track",
      heading: "Do Not Track",
      blocks: [
        {
          type: "p",
          text: 'Some browsers offer a "Do Not Track" signal. Because there is no common industry standard for responding to these signals, the Site does not currently respond to them. Instead, we do not load analytics cookies unless you consent, and you can change your choice at any time through the "Cookie Settings" link in the footer.',
        },
        {
          type: "note",
          text: "[Attorney/developer: consider whether to treat Global Privacy Control (GPC) signals as a rejection of analytics cookies, and update this section if so.]",
        },
      ],
    },
    {
      id: "changes-to-this-policy",
      heading: "Changes to This Policy",
      blocks: [
        {
          type: "p",
          text: 'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. If we make material changes to how we use personal information, we will provide more prominent notice, such as a notice on the Site, and where required by law, we will ask for your consent. We encourage you to review this policy periodically.',
        },
      ],
    },
    {
      id: "contact-us",
      heading: "Contact Us",
      blocks: [
        {
          type: "p",
          text: "If you have questions about this Privacy Policy or how we handle your information, contact {{legalName}}:",
        },
        {
          type: "ul",
          items: ["Email: {{email}}", "Phone: {{phone}}", "Mail: {{address}}", "Website: {{siteUrl}}"],
        },
      ],
    },
  ],
};
