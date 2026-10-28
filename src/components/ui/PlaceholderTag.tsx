/** Small visible tag marking temporary content that must be replaced before launch. */
export function PlaceholderTag({
  children = "Placeholder",
  className = "",
}: {
  children?: string;
  className?: string;
}) {
  return (
    <span
      className={`label inline-flex items-center border border-dashed border-gold/60 bg-black/70 px-2.5 py-1 text-[0.6rem] text-gold-soft ${className}`}
    >
      {children}
    </span>
  );
}
