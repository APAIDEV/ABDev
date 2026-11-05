/** Small, discreet tag marking temporary content that must be replaced before launch. */
export function PlaceholderTag({
  children = "Placeholder",
  className = "",
}: {
  children?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center bg-black/70 px-2 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-ivory uppercase backdrop-blur-sm ${className}`}
    >
      {children}
    </span>
  );
}
