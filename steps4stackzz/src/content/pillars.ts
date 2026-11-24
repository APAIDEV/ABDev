/**
 * OUR THREE PILLARS
 * ----------------------------------------------------------------------------
 * Used on the Home, Our Mission and Give Back pages.
 *
 * For each pillar:
 *   - futureProjects: work the foundation hopes to take on. Edit freely.
 *   - goal: an active fundraising goal, e.g.
 *       { title: "Back to school 2027", amount: 5000, raised: 0 }
 *     Leave as null to hide.
 *   - completed: finished charitable work. Add entries only after the work is
 *     done, e.g. { date: "March 2027", title: "...", text: "..." }
 */

export type PillarId = "education" | "faith" | "community";

export type Pillar = {
  id: PillarId;
  numeral: string;
  title: string;
  short: string;
  summary: string;
  body: string[];
  focus: string[];
  giftSupports: string[];
  futureProjects: { title: string; text: string }[];
  goal: { title: string; amount: number; raised: number } | null;
  completed: { date: string; title: string; text: string }[];
};

export const pillars: Pillar[] = [
  {
    id: "education",
    numeral: "I",
    title: "Education",
    short: "Opening doors for students who are ready to walk through them.",
    summary:
      "Providing educational opportunities, financial assistance, school supplies, and resources to underserved children and students.",
    body: [
      "Ambition deserves a fair start. Many children and students have the drive to go far but face obstacles that have nothing to do with their ability: the cost of supplies, the cost of tuition, or simply not having the right resources at home.",
      "Through education, we hope to remove some of those obstacles and remind young people that someone believes in what they can become.",
    ],
    focus: ["Educational opportunities", "Financial assistance for students", "School supplies", "Learning resources"],
    giftSupports: [
      "School supplies for children who need them",
      "Financial assistance toward education",
      "Resources that help students learn and grow",
    ],
    futureProjects: [
      {
        title: "School supply drives",
        text: "Gathering and distributing supplies so students begin each school year prepared.",
      },
      {
        title: "Student assistance",
        text: "Helping students with educational costs that stand between them and their next step.",
      },
    ],
    goal: null,
    completed: [],
  },
  {
    id: "faith",
    numeral: "II",
    title: "Faith",
    short: "Strengthening the spaces where people gather, reflect, and serve.",
    summary:
      "Supporting the development and improvement of Gurdwaras and religious spaces that promote spiritual growth, community, and selfless service.",
    body: [
      "Places of worship are often where a community first learns to care for one another. A Gurdwara welcomes anyone who walks through its doors, offers a meal to all who are hungry, and gives people a place to practice Sewa side by side.",
      "We support the development and improvement of Gurdwaras and religious spaces so they can continue to nurture spiritual growth, bring people together, and make selfless service possible.",
    ],
    focus: ["Gurdwara development", "Improvements to religious spaces", "Spaces for community and reflection"],
    giftSupports: ["Development and improvement of Gurdwaras", "Upkeep of spaces that host community and service"],
    futureProjects: [
      {
        title: "Gurdwara improvement projects",
        text: "Partnering with Gurdwaras on improvements that serve their congregations and visitors.",
      },
    ],
    goal: null,
    completed: [],
  },
  {
    id: "community",
    numeral: "III",
    title: "Community",
    short: "Meeting real needs, close to home and beyond it.",
    summary:
      "Providing meals, organizing food drives, supporting families in need, and participating in charitable initiatives.",
    body: [
      "Service means the most when it reaches people directly. We provide meals, organize food drives, support families facing hardship, and join charitable initiatives that share our values.",
      "Every one of these efforts depends on people willing to give their time, and every one of them is an opportunity to practice gratitude by putting it into action.",
    ],
    focus: ["Meals for those in need", "Food drives", "Support for families in need", "Charitable initiatives"],
    giftSupports: ["Meals and food drives", "Direct support for families in need", "Community service initiatives"],
    futureProjects: [
      {
        title: "Meal service",
        text: "Preparing and serving meals for neighbors who need them, in the spirit of Langar.",
      },
      {
        title: "Food drives",
        text: "Collecting food for local families, organized with volunteers and partners.",
      },
    ],
    goal: null,
    completed: [],
  },
];
