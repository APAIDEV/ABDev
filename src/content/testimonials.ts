/**
 * TESTIMONIALS
 * ----------------------------------------------------------------------------
 * IMPORTANT: Before publishing a client's name, words, or photos, get a signed
 * release form. A template is in /docs/PHOTO-TESTIMONIAL-RELEASE-FORM.md.
 * Only publish genuine reviews, never edited to change their meaning.
 *
 * While `placeholder` is true, the slot is shown as a clearly marked
 * placeholder. Replace the text and set `placeholder: false` once approved.
 * Remove an item entirely to hide that slot.
 */

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Custom Home · Nassau County" */
  detail: string;
  placeholder: boolean;
  /** Date the signed release was received (for your records). */
  releaseSignedOn?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Placeholder testimonial. A client's words about their experience will appear here.",
    name: "Client Name",
    detail: "Custom Home · Long Island",
    placeholder: true,
  },
  {
    quote: "Placeholder testimonial. A client's words about their experience will appear here.",
    name: "Client Name",
    detail: "Renovation · Brooklyn",
    placeholder: true,
  },
  {
    quote: "Placeholder testimonial. A client's words about their experience will appear here.",
    name: "Client Name",
    detail: "Dormer · Westchester",
    placeholder: true,
  },
];
