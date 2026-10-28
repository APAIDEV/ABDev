/**
 * Shape of a legal page. Each legal document is a plain data file in this
 * folder, so wording can be edited without touching any page code.
 *
 * Text may include these tokens, which are filled in from /src/config/business.ts:
 *   {{businessName}}  {{legalName}}  {{email}}  {{phone}}  {{address}}  {{siteUrl}}  {{domain}}
 *
 * Inline links use Markdown style: [Privacy Policy](/legal/privacy)
 * Bold uses **double asterisks**.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "note"; text: string };

export type LegalSection = {
  /** Used for the in-page table of contents anchor, e.g. "information-we-collect". */
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  metaDescription: string;
  /** e.g. "December 2026". Update whenever the document changes. */
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};
