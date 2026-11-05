import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "light" | "dark" | "gold" | "outline" | "outline-dark" | "text" | "text-dark";

const styles: Record<Variant, string> = {
  /** Primary on dark backgrounds */
  light: "bg-ivory text-black border border-ivory hover:bg-gold hover:border-gold",
  /** Primary on light backgrounds */
  dark: "bg-black text-ivory border border-black hover:bg-gold-deep hover:border-gold-deep",
  gold: "bg-gold text-black border border-gold hover:bg-gold-soft hover:border-gold-soft",
  outline: "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-black",
  "outline-dark": "border border-black/40 text-black hover:border-black hover:bg-black hover:text-ivory",
  text: "text-ivory hover:text-gold px-0! border-b border-ivory/40 hover:border-gold",
  "text-dark": "text-black hover:text-gold-deep px-0! border-b border-black/40 hover:border-gold-deep",
};

export function buttonClass(variant: Variant = "light", extra = "") {
  return [
    "label inline-flex items-center justify-center gap-3 px-8 py-4 min-h-12 transition-colors duration-500 ease-(--ease-luxe) disabled:opacity-50 disabled:cursor-not-allowed",
    styles[variant],
    extra,
  ].join(" ");
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "light", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}
