/**
 * MEMORIES AND STORIES
 * ----------------------------------------------------------------------------
 * Memories shared through the form on the His Legacy page are emailed to the
 * foundation privately. Nothing is published automatically.
 *
 * After the family has read a memory and the person who wrote it has agreed to
 * share it, add it here to show it on the His Legacy page. Example:
 *
 *   {
 *     name: "First name or initials",
 *     relationship: "Friend since high school",
 *     text: "The memory, in their words.",
 *   },
 */

export type Memory = {
  name: string;
  relationship?: string;
  text: string;
};

export const memories: Memory[] = [];
