/**
 * FOUNDATION DETAILS
 * ----------------------------------------------------------------------------
 * Everything here appears across the whole site. Edit the text between the
 * quotation marks, save, and the site updates on the next deploy.
 */

export const foundation = {
  name: "Stackzz Foundation",
  shortName: "Stackzz",
  honoree: "Amanpreet Singh",
  tagline: "Honoring His Life By Cherishing Ours.",
  principle: {
    gurmukhi: "Mann Neeva, Matt Uchi.",
    meaning: "Remain humble in spirit, yet elevated in wisdom.",
  },
  description:
    "Stackzz Foundation was established in loving memory of Amanpreet Singh. Rooted in Sewa, we serve through education, faith, and community.",

  /**
   * Public email for the foundation. Leave empty ("") to hide it; the contact
   * form still works either way. Example: "hello@your-domain.org"
   */
  email: "",

  instagram: {
    handle: "@steps4stackzz",
    url: "https://www.instagram.com/steps4stackzz/",
  },

  /**
   * TAX STATUS
   * Keep `confirmed` false until the foundation's status is officially
   * confirmed in writing. While false, the site never describes contributions
   * as tax deductible and never mentions registered nonprofit status.
   * Once confirmed, set `confirmed: true` and paste the exact approved wording
   * (from your accountant or attorney) into `statement`.
   */
  taxStatus: {
    confirmed: false,
    statement: "",
    pendingNote:
      "Stackzz Foundation is in its first season. We will share details about our organizational and tax status here once they are officially confirmed.",
  },
};

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/$/, "");

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "His Legacy", href: "/legacy" },
  { label: "Our Mission", href: "/mission" },
  { label: "Events", href: "/events" },
  { label: "Our Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const giveLink: NavItem = { label: "Give Back", href: "/give" };
