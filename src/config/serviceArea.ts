/**
 * SERVICE AREA
 * ----------------------------------------------------------------------------
 * The three regions AB Development builds in. Used on the About page
 * ("Where We Build"), in the contact form, and in search-engine data (JSON-LD).
 */

export type Region = {
  id: "long-island" | "nyc" | "westchester";
  name: string;
  summary: string;
  /** Counties or boroughs within the region. */
  areas: { name: string; schemaName: string; schemaType: "AdministrativeArea" | "City" }[];
};

export const serviceArea: Region[] = [
  {
    id: "long-island",
    name: "Long Island",
    summary: "From the North Shore to the South Fork, across every town in Nassau and Suffolk counties.",
    areas: [
      { name: "Nassau County", schemaName: "Nassau County, NY", schemaType: "AdministrativeArea" },
      { name: "Suffolk County", schemaName: "Suffolk County, NY", schemaType: "AdministrativeArea" },
    ],
  },
  {
    id: "nyc",
    name: "New York City",
    summary: "All five boroughs, from brownstone renovations to ground-up new construction.",
    areas: [
      { name: "Manhattan", schemaName: "Manhattan, New York, NY", schemaType: "City" },
      { name: "Brooklyn", schemaName: "Brooklyn, New York, NY", schemaType: "City" },
      { name: "Queens", schemaName: "Queens, New York, NY", schemaType: "City" },
      { name: "The Bronx", schemaName: "The Bronx, New York, NY", schemaType: "City" },
      { name: "Staten Island", schemaName: "Staten Island, New York, NY", schemaType: "City" },
    ],
  },
  {
    id: "westchester",
    name: "Westchester",
    summary: "Westchester County's towns and villages, from the river towns to the Sound shore.",
    areas: [
      {
        name: "Westchester County",
        schemaName: "Westchester County, NY",
        schemaType: "AdministrativeArea",
      },
    ],
  },
];

/** Options for the "Region" dropdown on the contact form. */
export const regionOptions = [
  "Long Island",
  "Brooklyn",
  "Queens",
  "Manhattan",
  "Bronx",
  "Staten Island",
  "Westchester",
  "Other",
] as const;

export type RegionOption = (typeof regionOptions)[number];
