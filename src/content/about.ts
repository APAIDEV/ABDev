/**
 * ABOUT PAGE CONTENT
 * ----------------------------------------------------------------------------
 * The story below is used word for word on the About page. Edit any paragraph
 * freely; each string is one paragraph.
 *
 * MEMORIAL CONTENT: `memorial` controls the "In Loving Memory of Aman" line.
 *   - To change the wording, edit `memorial.text`.
 *   - To remove it, set `memorial.show` to false.
 * The story text itself can be edited or shortened in `story.paragraphs`.
 */

export const about = {
  meta: {
    title: "Our Story",
    description: "A love story that became a legacy, one home at a time.",
  },

  story: {
    eyebrow: "About AB Development",
    title: "Our Story",
    paragraphs: [
      "AB Development never began as a business plan. It began with two people who were wildly in love and brave enough to believe they could build a life together. They did it by doing what they loved most: creating homes that truly meant something and turning their visions into reality.",
      "Aman and Birti poured their hearts into every project. Houses were never only a build made of materials. They were always meant to become homes filled with memories, laughter, and happiness. One day the walls would hold stories of the lives lived inside them. Every detail was intentional because they believed a home should make people feel safe, grounded, and proud the moment they walked through the door.",
      "They were not chasing titles or recognition. They were chasing the feeling of giving others the warmth of home. That kind of warmth you feel in your stomach when you run into your favorite person's arms.",
      "In 2025, everything shattered when Aman suddenly lost his life. In a single moment, Birti lost her world, her partner, and the future they were building side by side.",
      "What remained was his vision, his drive, and the legacy they had already started together.",
      "Today, Birti continues AB Development to carry forward the legacy of their love story. Not from obligation, but because their love and the life they built together outlived his lifetime. Through every home that is created, his presence remains woven into the work. It's proof that love can live beyond loss, and that their legacy continues one home at a time.",
    ],
    /** Shown as a large centered pull-quote. */
    pullQuote: "Love can live beyond loss, and their legacy continues one home at a time.",
    /** Insert the pull-quote after this paragraph (0 = after the first paragraph). */
    pullQuoteAfterParagraph: 3,
  },

  /**
   * PORTRAIT OF AMAN AND BIRTI
   * Add the photo to /public/images/about/ and set `src`, e.g.
   * "/images/about/aman-and-birti.jpg". While `src` is empty, an elegant
   * placeholder frame is shown instead.
   */
  portrait: {
    src: "",
    alt: "Aman and Birti",
    caption: "Aman & Birti",
  },

  memorial: {
    show: true,
    text: "In Loving Memory of Aman",
  },

  leadershipTitle: "Leadership",
  leadership: [
    {
      name: "Birti Kaur",
      title: "Owner",
      photo: {
        src: "/images/team/birti-kaur.jpg",
        alt: "Childhood photo of Birti Kaur in a gold and ivory embroidered lehenga",
      },
      // PLACEHOLDER BIO: replace with Birti's approved bio.
      bio: "Birti leads AB Development with a builder's discipline and a homeowner's heart. She guides every project personally, from the first conversation to the final walkthrough. [Placeholder bio: replace in /src/content/about.ts]",
      // PLACEHOLDER QUOTE: replace with a quote from Birti, or set to "" to hide.
      quote: "[Placeholder quote from Birti]",
    },
    {
      name: "Anjleen Kaur",
      title: "Managing Director",
      photo: {
        src: "/images/team/anjleen-kaur.jpg",
        alt: "Childhood photo of Anjleen Kaur in a blue and pink embroidered lehenga",
      },
      // PLACEHOLDER BIO: replace with Anjleen's approved bio.
      bio: "Anjleen oversees day-to-day operations, keeping projects organized, clients informed, and every detail moving forward on schedule. [Placeholder bio: replace in /src/content/about.ts]",
      // PLACEHOLDER QUOTE: replace with a quote from Anjleen, or set to "" to hide.
      quote: "[Placeholder quote from Anjleen]",
    },
  ],

  whereWeBuild: {
    eyebrow: "Service Area",
    title: "Where We Build",
    intro:
      "We build across Long Island, throughout all five boroughs of New York City, and in Westchester County. Each community has its own character and its own approvals, and we bring local knowledge to every one.",
  },

  values: {
    eyebrow: "What Guides Us",
    title: "Our Values",
    items: [
      {
        title: "Intention",
        text: "Every detail is chosen with purpose, because a home should feel safe, grounded, and proud from the moment you walk in.",
      },
      {
        title: "Honesty",
        text: "Clear communication, transparent budgets, and realistic schedules. You will always know where your project stands.",
      },
      {
        title: "Craft",
        text: "Quality materials and careful workmanship, built to hold a lifetime of memories.",
      },
      {
        title: "Heart",
        text: "We build homes, not just houses. Your vision is personal, and we treat it that way.",
      },
    ],
  },

  cta: {
    title: "Let's build your home together.",
    button: "Book a Consultation",
  },
};
