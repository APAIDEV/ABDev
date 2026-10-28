/**
 * GALLERY
 * ----------------------------------------------------------------------------
 * Every photo and video in the Gallery comes from this list.
 *
 * TO ADD A PHOTO:
 *   1. Put the image in /public/images/gallery/ (JPG or WebP, ~2400px on the
 *      long edge is plenty; the site automatically serves optimized sizes).
 *   2. Copy one of the items below, give it a unique `slug` (lowercase-with-
 *      dashes; it becomes the share link abdevelopment.ai/gallery/<slug>),
 *      and point `src` at your file, e.g. "/images/gallery/oyster-bay-01.jpg".
 *   3. Write descriptive `alt` text (what the photo shows) for accessibility.
 *
 * TO ADD A VIDEO: set `media: "video"`, put the .mp4 in /public/videos/,
 *   set `src` to it, and set `poster` to a still image shown before playback.
 *   Large videos are better hosted on YouTube/Vimeo or Vercel Blob; ask your
 *   developer if a video is over ~20 MB.
 *
 * RELEASES: Before publishing photos of a client's home (or any people in
 *   them), get a signed release form. Template: /docs/PHOTO-TESTIMONIAL-RELEASE-FORM.md
 *
 * Items with `placeholder: true` are illustrations, clearly labeled on the site.
 */

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "custom-homes", label: "Custom Homes" },
  { id: "new-construction", label: "New Construction" },
  { id: "renovations", label: "Renovations" },
  { id: "dormers", label: "Dormers" },
  { id: "spec-homes", label: "Spec Homes" },
  { id: "interiors", label: "Interiors" },
] as const;

export type GalleryCategory = Exclude<(typeof galleryCategories)[number]["id"], "all">;

export type SpecStatus = "Available" | "Under Contract" | "Sold";

export type GalleryItem = {
  slug: string;
  title: string;
  category: GalleryCategory;
  media: "image" | "video";
  /** Image path, or video path for videos. Leave "" on a video to show a "coming soon" frame. */
  src: string;
  /** Still image for videos (and the thumbnail in the grid). */
  poster?: string;
  alt: string;
  /** e.g. "Nassau County, NY". Avoid street addresses for client privacy. */
  location: string;
  description: string;
  /** Show on the Home page "Selected Work" preview. */
  featured?: boolean;
  /** Spec Homes only: optional sale status tag. */
  specStatus?: SpecStatus;
  /**
   * Spec Homes only: optional link to a full listing.
   * NOTE: This could later link to the matching listing on Selling Long Island
   * (see /src/config/brands.ts) once that site is live.
   */
  listingUrl?: string;
  placeholder?: boolean;
  /** Approximate aspect for the grid: "landscape" | "portrait" | "square". */
  shape?: "landscape" | "portrait" | "square";
};

export const gallery: GalleryItem[] = [
  {
    slug: "north-shore-custom-residence",
    title: "North Shore Custom Residence",
    category: "custom-homes",
    media: "image",
    src: "/images/placeholders/custom-home.svg",
    alt: "Placeholder illustration of a two-story custom home with a gabled roof",
    location: "Nassau County, NY",
    description: "A ground-up custom home designed around open, light-filled living spaces.",
    featured: true,
    placeholder: true,
    shape: "landscape",
  },
  {
    slug: "modern-retreat",
    title: "Modern Retreat",
    category: "custom-homes",
    media: "image",
    src: "/images/placeholders/modern-home.svg",
    alt: "Placeholder illustration of a modern flat-roofed home with large glass walls",
    location: "Suffolk County, NY",
    description: "Clean lines and expansive glazing frame the landscape.",
    featured: true,
    placeholder: true,
    shape: "portrait",
  },
  {
    slug: "brooklyn-townhomes",
    title: "Townhome Development",
    category: "new-construction",
    media: "image",
    src: "/images/placeholders/new-construction.svg",
    alt: "Placeholder illustration of a row of new multi-unit townhomes",
    location: "Brooklyn, NY",
    description: "A multi-unit new construction project with private entries and terraces.",
    featured: true,
    placeholder: true,
    shape: "landscape",
  },
  {
    slug: "queens-two-family",
    title: "Two-Family New Build",
    category: "new-construction",
    media: "image",
    src: "/images/placeholders/two-family.svg",
    alt: "Placeholder illustration of a new two-family home",
    location: "Queens, NY",
    description: "A new two-family home built for comfortable multigenerational living.",
    placeholder: true,
    shape: "square",
  },
  {
    slug: "westchester-whole-home-renovation",
    title: "Whole-Home Renovation",
    category: "renovations",
    media: "image",
    src: "/images/placeholders/renovation.svg",
    alt: "Placeholder illustration of a renovated living room with tall windows",
    location: "Westchester County, NY",
    description: "A complete interior renovation that opened the plan and brought in light.",
    featured: true,
    placeholder: true,
    shape: "landscape",
  },
  {
    slug: "kitchen-renovation",
    title: "Kitchen Renovation",
    category: "renovations",
    media: "image",
    src: "/images/placeholders/kitchen.svg",
    alt: "Placeholder illustration of a renovated kitchen with an island",
    location: "Nassau County, NY",
    description: "A kitchen remodel centered on a generous island and custom cabinetry.",
    placeholder: true,
    shape: "portrait",
  },
  {
    slug: "cape-full-dormer",
    title: "Full Shed Dormer",
    category: "dormers",
    media: "image",
    src: "/images/placeholders/dormer.svg",
    alt: "Placeholder illustration of a cape-style home with a full-width dormer",
    location: "Suffolk County, NY",
    description: "A full-width dormer that turned an attic into a bright primary suite.",
    featured: true,
    placeholder: true,
    shape: "landscape",
  },
  {
    slug: "dormer-time-lapse",
    title: "Dormer Build Time-Lapse",
    category: "dormers",
    media: "video",
    src: "", // e.g. "/videos/dormer-time-lapse.mp4"
    poster: "/images/placeholders/dormer-video.svg",
    alt: "Placeholder for a time-lapse video of a dormer addition",
    location: "Long Island, NY",
    description: "Video placeholder: a dormer addition from framing to finish.",
    placeholder: true,
    shape: "square",
  },
  {
    slug: "spec-home-the-linden",
    title: "The Linden",
    category: "spec-homes",
    media: "image",
    src: "/images/placeholders/spec-home.svg",
    alt: "Placeholder illustration of a new modern-traditional spec home",
    location: "Nassau County, NY",
    description: "A new builder spec home with an open plan and four bedrooms.",
    specStatus: "Available",
    featured: true,
    placeholder: true,
    shape: "landscape",
  },
  {
    slug: "spec-home-the-harbor",
    title: "The Harbor",
    category: "spec-homes",
    media: "image",
    src: "/images/placeholders/spec-home-2.svg",
    alt: "Placeholder illustration of a shingle-style spec home",
    location: "Suffolk County, NY",
    description: "A shingle-style spec home with a wraparound porch.",
    specStatus: "Under Contract",
    placeholder: true,
    shape: "portrait",
  },
  {
    slug: "primary-suite-interior",
    title: "Primary Suite",
    category: "interiors",
    media: "image",
    src: "/images/placeholders/interior.svg",
    alt: "Placeholder illustration of a calm primary bedroom interior",
    location: "Westchester County, NY",
    description: "A serene primary suite with natural light and quiet, layered finishes.",
    placeholder: true,
    shape: "square",
  },
  {
    slug: "spa-bath-interior",
    title: "Spa Bath",
    category: "interiors",
    media: "image",
    src: "/images/placeholders/bath.svg",
    alt: "Placeholder illustration of a spa-like bathroom with a freestanding tub",
    location: "Manhattan, NY",
    description: "A spa-inspired bath with a freestanding tub and stone finishes.",
    placeholder: true,
    shape: "landscape",
  },
];

export function getGalleryItem(slug: string) {
  return gallery.find((item) => item.slug === slug);
}

export function categoryLabel(id: GalleryCategory) {
  return galleryCategories.find((c) => c.id === id)?.label ?? id;
}

/** The thumbnail/still image for an item (poster for videos). */
export function itemImage(item: GalleryItem) {
  return item.media === "video" ? item.poster || "/images/placeholders/dormer-video.svg" : item.src;
}
