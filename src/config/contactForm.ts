/**
 * CONTACT FORM OPTIONS
 * ----------------------------------------------------------------------------
 * Dropdown choices on the Contact / Book form. Project types live in
 * /src/config/services.ts and regions in /src/config/serviceArea.ts.
 */

export const budgetOptions = [
  "Under $100K",
  "$100K – $250K",
  "$250K – $500K",
  "$500K – $1M",
  "$1M – $2M",
  "$2M – $5M",
  "$5M+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "12+ months",
  "Just exploring",
] as const;

export const referralOptions = [
  "Instagram",
  "Google search",
  "Friend or family referral",
  "Selling Long Island",
  "Saw one of our projects",
  "Other",
] as const;

export const consultationTimeOptions = ["Morning", "Afternoon", "Evening", "Any time"] as const;

/**
 * CONSENT WORDING
 * The exact text shown next to each checkbox. It is saved with every
 * submission as a record of what the person agreed to. If you change any
 * wording, also bump `consentVersion` (e.g. "2026-12-v2").
 * Have your attorney review this wording before launch.
 */
export const consentVersion = "2026-12-v1";

export const consentText = {
  privacyTerms:
    "I have read and agree to the Privacy Policy and Terms of Use, and I understand that submitting this form does not create a contract or client relationship.",
  marketingEmail:
    "Yes, send me occasional emails from AB Development about projects, available homes, and news. I can unsubscribe at any time using the link in any email.",
  marketingSms:
    "Yes, I agree to receive recurring marketing text messages from AB Development at the phone number provided. Consent is not a condition of any purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
};
