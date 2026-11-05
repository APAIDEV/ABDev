"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

export type Slide = { src: string; alt: string; caption: string; placeholder?: boolean };

const INTERVAL = 6500;

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Full-bleed crossfading photos for the homepage hero, with pause control (WCAG 2.2.2). */
export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const playing = !paused && !reducedMotion && slides.length > 1;
  // Only the first photo loads with the page; each next one is added shortly before it's shown.
  const [mounted, setMounted] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(timer);
  }, [playing, slides.length]);

  useEffect(() => {
    if (mounted >= slides.length) return;
    const timer = window.setTimeout(() => setMounted((m) => Math.max(m, index + 2)), index === 0 ? 3000 : 0);
    return () => window.clearTimeout(timer);
  }, [index, mounted, slides.length]);

  const current = slides[index];

  return (
    <>
      <div className="absolute inset-0 -z-10 bg-black">
        {slides.slice(0, Math.max(mounted, index + 1)).map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-(--ease-luxe) ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload={i === 0}
              sizes="100vw"
              quality={85}
              className={`object-cover transition-transform duration-[9000ms] ease-out motion-reduce:transition-none ${
                i === index ? "scale-100" : "scale-[1.06]"
              }`}
            />
          </div>
        ))}
      </div>

      {slides.length > 0 && (
        <div className="absolute right-0 bottom-0 left-0 z-10">
          <div className="container-luxe flex items-end justify-between gap-6 pb-8">
            <p className="label flex items-center gap-3 text-ivory/90" aria-live="polite">
              {current.caption}
              {current.placeholder && (
                <PlaceholderTag className="hidden sm:inline-flex">Placeholder photo</PlaceholderTag>
              )}
            </p>
            {slides.length > 1 && (
              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 sm:flex">
                  {slides.map((slide, i) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => {
                        setMounted((m) => Math.max(m, i + 1));
                        setIndex(i);
                      }}
                      aria-label={`Show photo ${i + 1}: ${slide.caption}`}
                      aria-current={i === index ? "true" : undefined}
                      className="group flex h-8 items-center"
                    >
                      <span
                        className={`block h-px w-10 transition-colors duration-500 ${
                          i === index ? "bg-ivory" : "bg-ivory/30 group-hover:bg-ivory/70"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {!reducedMotion && (
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                    className="label flex h-8 items-center text-[0.6rem] text-ivory/80 hover:text-ivory"
                  >
                    {paused ? "Play" : "Pause"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
