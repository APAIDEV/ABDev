/**
 * BUSINESS DETAILS
 * ----------------------------------------------------------------------------
 * Everything about AB Development that appears on the site lives here.
 * Edit a value, save, and every page that uses it updates automatically.
 *
 * Fields marked "TODO" are placeholders that must be filled in before launch.
 */

export const business = {
  name: "AB Development",
  /** Legal entity name as registered with New York State (e.g. "AB Development LLC"). TODO: confirm. */
  legalName: "AB Development",
  tagline: "Your Dream, Our Build.",
  supportingLine: "Women make a home spin. We bring your vision to life, and our experience helps enhance your dream.",
  description: "A woman-owned custom home builder serving Long Island, New York City, and Westchester.",

  email: "Abdevelopsli@gmail.com",
  phone: {
    display: "(516) 778-0685",
    /** Used for click-to-call links. Keep the +1 country code. */
    tel: "+15167780685",
  },

  hours: {
    display: "Available 24/7",
    /** schema.org format for search engines. "Mo-Su 00:00-23:59" means always open. */
    schema: "Mo-Su 00:00-23:59",
  },

  /**
   * TODO: Supply the business address. Leave a field empty ("") to hide it.
   * If you would rather not publish a street address, fill only city/state/zip.
   */
  address: {
    street: "",
    city: "",
    state: "NY",
    postalCode: "",
    country: "US",
  },

  instagram: {
    handle: "@abdevelopmentny",
    url: "https://www.instagram.com/abdevelopmentny/",
  },

  /** Trust badges shown in the header, footer, and contact page. Keep claims accurate. */
  badges: ["Woman-Owned", "Licensed & Insured", "Available 24/7"] as const,

  /**
   * CONTRACTOR LICENSES
   * --------------------------------------------------------------------------
   * Fill in each license number once issued. A license only appears on the site
   * when its `number` is filled in, so nothing false or incomplete is ever shown.
   *
   * REMINDER: Confirm the advertising rules for EACH jurisdiction with your
   * attorney before launch. NYC (DCWP), Nassau County, Suffolk County, and
   * Westchester County each regulate home improvement contractors and may
   * require the license number to appear in all advertising, including this
   * website, social media, and vehicle signage. See /docs/LEGAL-LAUNCH-CHECKLIST.md.
   */
  licenses: [
    {
      jurisdiction: "New York City",
      agency: "Department of Consumer and Worker Protection (DCWP)",
      label: "NYC DCWP Home Improvement Contractor License",
      number: "",
    },
    {
      jurisdiction: "Nassau County",
      agency: "Nassau County Office of Consumer Affairs",
      label: "Nassau County Home Improvement License",
      number: "",
    },
    {
      jurisdiction: "Suffolk County",
      agency: "Suffolk County Department of Labor, Licensing & Consumer Affairs",
      label: "Suffolk County Home Improvement License",
      number: "",
    },
    {
      jurisdiction: "Westchester County",
      agency: "Westchester County Department of Consumer Protection",
      label: "Westchester County Home Improvement License",
      number: "",
    },
  ],

  /**
   * INSURANCE
   * Confirm exact wording with your insurance agent before publishing details.
   * Leave `summary` empty to show only the "Licensed & Insured" badge.
   */
  insurance: {
    summary: "",
    carrier: "",
    generalLiability: "",
    workersComp: "",
  },

  /** Trademark notice in the footer. Use ® only after federal registration is granted. */
  trademarkNotice: "AB Development and the AB monogram logo are trademarks of AB Development.",

  /**
   * GOOGLE MAPS
   * Centered so Long Island, all five NYC boroughs, and Westchester are visible.
   * This embed format needs no API key.
   */
  mapEmbedUrl: "https://maps.google.com/maps?q=Long%20Island%2C%20NY&ll=40.86,-73.35&z=8&output=embed",

  /**
   * GOOGLE CALENDAR APPOINTMENT SCHEDULING
   * Paste the embed URL of your booking page here (see README, "Online booking").
   * It looks like: https://calendar.google.com/calendar/appointments/schedules/AcZssZ...?gv=true
   * While empty, the Contact page shows a tasteful "coming soon" panel instead.
   */
  bookingEmbedUrl: "",
};

export type Business = typeof business;

/** Licenses that have a number filled in (the only ones shown publicly). */
export const activeLicenses = business.licenses.filter((l) => l.number.trim() !== "");

export function formattedAddress(): string {
  const { street, city, state, postalCode } = business.address;
  const cityLine = [city, [state, postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  return [street, cityLine].filter(Boolean).join(", ");
}

/** True once a street or city has been supplied. */
export const hasAddress = Boolean(business.address.street || business.address.city);
