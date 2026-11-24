"use client";

import { useEffect } from "react";

/**
 * Fades in each `.reveal` element as it enters the viewport, including content
 * added after navigation. Uses the Web Animations API rather than toggling
 * classes, so it never touches attributes React is still hydrating.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const done = new WeakSet<Element>();

    const play = (el: Element) => {
      if (done.has(el)) return;
      done.add(el);
      const delay = parseFloat(getComputedStyle(el).getPropertyValue("--reveal-delay")) || 0;
      el.animate(
        [
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: el.classList.contains("reveal-slow") ? 1800 : 1100,
          delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      );
    };

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(play);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            play(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const scan = (root: ParentNode) =>
      root.querySelectorAll(".reveal").forEach((el) => {
        if (done.has(el)) return;
        // Already scrolled past (e.g. after jumping to an anchor): show it without animating.
        if (el.getBoundingClientRect().bottom < 0) {
          done.add(el);
          el.animate([{ opacity: 1 }], { duration: 0, fill: "forwards" });
          return;
        }
        io.observe(el);
      });
    scan(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(".reveal")) io.observe(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
