/**
 * BRAND NETWORK
 * ----------------------------------------------------------------------------
 * The slim bar at the very top of every page (and the footer) links the three
 * sister companies.
 *
 * - Leave `url` empty ("") to show a non-clickable "Coming Soon" label.
 * - Paste a full URL (starting with https://) to make it a live link that
 *   opens in a new tab.
 * - `current: true` marks the site you are on (AB Development).
 */

export type Brand = {
  name: string;
  /** Short descriptor shown in tooltips and the footer. */
  description: string;
  url: string;
  current?: boolean;
};

export const brands: Brand[] = [
  {
    name: "AB Development",
    description: "Custom home builder",
    url: "https://abdevelopment.ai",
    current: true,
  },
  {
    name: "Selling Long Island",
    description: "Real estate brokerage",
    url: "", // TODO: e.g. "https://sellinglongisland.com"
  },
  {
    name: "Amanat Beyond — AB",
    description: "Clothing line",
    url: "", // TODO: e.g. "https://amanatbeyond.com"
  },
];
