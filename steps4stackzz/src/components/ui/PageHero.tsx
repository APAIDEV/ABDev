import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Burgundy title band at the top of each inner page. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-burgundy text-ivory">
      <div className="container-page pt-16 pb-20 sm:pt-20 lg:pt-28 lg:pb-28">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h1 className="text-[2.8rem] leading-[1.04] sm:text-6xl lg:text-7xl">{title}</h1>
          {lede && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-blush/90 sm:text-xl">{lede}</div>}
          {children}
        </Reveal>
      </div>
      <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-rose/50 to-transparent" />
    </section>
  );
}
