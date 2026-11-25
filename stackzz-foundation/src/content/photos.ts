/**
 * PHOTOGRAPHS OF AMANPREET
 * ----------------------------------------------------------------------------
 * Only original photographs of Amanpreet are used on this site. Please do not
 * add images that have been AI enhanced, reconstructed, filtered, or retouched.
 * The site shows each photo exactly as supplied (it is only resized and
 * compressed for fast loading; colours and faces are never altered).
 *
 * HOW TO ADD A PHOTO
 *   1. Put the original file in /public/images/amanpreet/
 *      e.g. /public/images/amanpreet/portrait.jpg
 *   2. Set `src` below to "/images/amanpreet/portrait.jpg"
 *   3. Write a short description of the photo in `alt` (read aloud by screen
 *      readers), e.g. "Amanpreet smiling outside a home in Nassau County".
 *   4. Optional: `position` controls which part stays in view when the photo is
 *      framed, e.g. "50% 20%" keeps the upper part (his face) visible.
 *
 * While `src` is empty, an elegant empty frame is shown in its place.
 */

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  /** CSS object-position, e.g. "50% 25%". Defaults to centred. */
  position?: string;
};

/** Main portrait on the home page. A vertical (portrait) photo works best. */
export const homePortrait: Photo = {
  src: "/images/amanpreet/amanpreet-portrait.jpg",
  alt: "Amanpreet Singh seated on a boat at sunset, with a city skyline across the water behind him",
  position: "50% 30%",
};

/** Portrait at the top of the His Legacy page. */
export const legacyPortrait: Photo = {
  src: "/images/amanpreet/amanpreet-portrait.jpg",
  alt: "Amanpreet Singh seated on a boat at sunset, with a city skyline across the water behind him",
  position: "50% 30%",
};

/**
 * PHOTO GALLERY (His Legacy page)
 * Add as many as you like. Mix of vertical and horizontal photos is fine.
 * Example:
 *   { src: "/images/amanpreet/family-2023.jpg", alt: "Amanpreet with his family", caption: "With family, 2023" },
 */
export const gallery: Photo[] = [];
