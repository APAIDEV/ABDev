import { business } from "@/config/business";

/** "Family-Owned · Licensed & Insured · Available 24/7" */
export function TrustBadges({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const last = business.badges.length - 1;
  return (
    <ul
      className={`label flex flex-wrap items-center gap-x-3 gap-y-2 ${light ? "text-taupe" : "text-stone"} ${className}`}
      aria-label="Credentials"
    >
      {business.badges.map((badge, i) => (
        <li key={badge}>
          {badge}
          {i < last && (
            <span aria-hidden="true" className="ml-3">
              ·
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
