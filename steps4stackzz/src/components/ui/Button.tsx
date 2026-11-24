import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "rose" | "light" | "outline" | "outline-light" | "text";

const base =
  "inline-flex items-center justify-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-[var(--ease-gentle)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-burgundy px-7 py-4 text-ivory hover:bg-burgundy-deep",
  rose: "bg-rose px-7 py-4 text-white hover:bg-rose-deep",
  light: "bg-ivory px-7 py-4 text-burgundy hover:bg-blush",
  outline:
    "border border-burgundy/40 px-7 py-[0.95rem] text-burgundy hover:border-burgundy hover:bg-burgundy hover:text-ivory",
  "outline-light":
    "border border-ivory/45 px-7 py-[0.95rem] text-ivory hover:border-ivory hover:bg-ivory hover:text-burgundy",
  text: "group text-burgundy underline-offset-[6px] hover:text-rose-deep [&>span]:transition-transform [&:hover>span]:translate-x-1",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href: string; variant?: Variant; className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>) {
  const external = /^https?:/.test(href);
  if (external) {
    return (
      <a href={href} className={buttonClass(variant, className)} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

/** Text link with a small arrow that nudges forward on hover. */
export function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <ButtonLink href={href} variant="text" className={light ? "!text-blush hover:!text-ivory" : ""}>
      {children}
      <span aria-hidden="true">→</span>
    </ButtonLink>
  );
}
