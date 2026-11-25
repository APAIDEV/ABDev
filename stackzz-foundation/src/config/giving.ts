/**
 * GIVING OPTIONS
 * ----------------------------------------------------------------------------
 * Preset amounts and the causes a donor can direct their gift to.
 */

export const presetAmounts = [25, 50, 100, 250, 500];

export const designations = [
  "Where it is needed most",
  "Education",
  "Faith",
  "Community",
  "Memorial Walk and events",
] as const;

export const minimumGift = 5;
export const maximumGift = 25000;

/**
 * FUNDRAISING CAMPAIGNS
 * Add a campaign when you launch one, e.g.
 *   {
 *     title: "Back to School 2027",
 *     text: "School supplies for students starting the year.",
 *     goal: 5000,
 *     raised: 0,
 *     designation: "Education",
 *   },
 * Update `raised` as gifts come in. Leave the list empty to show a short note.
 */
export type Campaign = {
  title: string;
  text: string;
  goal: number;
  raised: number;
  designation: (typeof designations)[number];
};

export const campaigns: Campaign[] = [];

/** Shown in Contact and Get Involved dropdowns. */
export const contactTopics = [
  "General question",
  "Events and the Memorial Walk",
  "Giving and donations",
  "Partnerships and sponsorships",
  "Volunteering",
  "Media",
] as const;

export const involvementTypes = [
  {
    id: "volunteer",
    title: "Volunteer",
    text: "Give your time at events, food drives, school supply drives, and community service days.",
  },
  {
    id: "sewa",
    title: "Sewa Initiatives",
    text: "Take part in hands-on selfless service: preparing meals, serving others, and supporting families in need.",
  },
  {
    id: "partnership",
    title: "Partnerships",
    text: "Schools, Gurdwaras, community groups, and businesses who would like to serve alongside us.",
  },
  {
    id: "sponsorship",
    title: "Sponsorships",
    text: "Support the Memorial Walk or a specific initiative as an individual, family, or business.",
  },
] as const;

export type InvolvementId = (typeof involvementTypes)[number]["id"];

export const serviceAreas = ["Education", "Faith", "Community", "Events"] as const;
