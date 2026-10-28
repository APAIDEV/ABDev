import { doc as accessibility } from "./accessibility";
import { doc as cookies } from "./cookies";
import { doc as privacy } from "./privacy";
import { doc as projectDisclaimer } from "./project-disclaimer";
import { doc as specHomeDisclaimer } from "./spec-home-disclaimer";
import { doc as terms } from "./terms";
import type { LegalDoc } from "./types";

/** All legal pages, served at /legal/<slug>. */
export const legalDocs: LegalDoc[] = [privacy, terms, projectDisclaimer, specHomeDisclaimer, cookies, accessibility];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
