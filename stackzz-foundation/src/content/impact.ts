/**
 * OUR IMPACT
 * ----------------------------------------------------------------------------
 * Record only completed, verifiable work here. Never estimates or projections.
 *
 * METRICS: while `value` is null, the tile shows "To be recorded".
 * When there is a real number, enter it, e.g. value: 250
 *
 * MILESTONES: add an entry each time something meaningful is completed,
 * newest first, e.g.
 *   { date: "November 2026", title: "First Memorial Walk", text: "..." },
 */

export type Metric = { label: string; value: number | null; note: string };

export const metrics: Metric[] = [
  { label: "Meals Distributed", value: null, note: "Meals served and food drive contributions." },
  {
    label: "Educational Opportunities Funded",
    value: null,
    note: "Students supported with assistance, supplies, or resources.",
  },
  {
    label: "Religious Institutions Supported",
    value: null,
    note: "Gurdwaras and religious spaces we have helped improve.",
  },
  {
    label: "Community Projects Completed",
    value: null,
    note: "Service initiatives carried through from start to finish.",
  },
];

export type Milestone = { date: string; title: string; text: string };

export const milestones: Milestone[] = [];
