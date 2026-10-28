import { business } from "@/config/business";

/** "Woman-Owned · Licensed & Insured · Available 24/7" */
export function TrustBadges({
  variant = "inline",
  light = false,
  className = "",
}: {
  variant?: "inline" | "stacked" | "row";
  light?: boolean;
  className?: string;
}) {
  const text = light ? "text-taupe" : "text-stone";
  const dot = light ? "bg-gold-deep" : "bg-gold";

  if (variant === "row") {
    return (
      <ul
        className={`grid grid-cols-1 border-y sm:grid-cols-3 ${light ? "border-black/10" : "border-ivory/10"} ${className}`}
        aria-label="Why clients choose AB Development"
      >
        {business.badges.map((badge, i) => (
          <li
            key={badge}
            className={`flex items-center justify-center gap-4 py-7 ${
              i > 0 ? `sm:border-l ${light ? "border-black/10" : "border-ivory/10"} border-t sm:border-t-0` : ""
            }`}
          >
            <span aria-hidden="true" className={`h-1.5 w-1.5 rotate-45 ${dot}`} />
            <span className={`label ${light ? "text-black" : "text-ivory"}`}>{badge}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`flex ${variant === "stacked" ? "flex-col gap-3" : "flex-wrap items-center gap-x-5 gap-y-2"} ${className}`}
      aria-label="Credentials"
    >
      {business.badges.map((badge) => (
        <li key={badge} className={`label flex items-center gap-2.5 ${text}`}>
          <span aria-hidden="true" className={`h-1 w-1 rotate-45 ${dot}`} />
          {badge}
        </li>
      ))}
    </ul>
  );
}
