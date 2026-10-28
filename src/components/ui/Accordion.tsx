"use client";

import { useId, useState, type ReactNode } from "react";
import { PlusIcon } from "./Icons";

export type AccordionItem = { id: string; title: string; content: ReactNode; badge?: ReactNode };

/** WAI-ARIA accordion: each heading is a button that controls its panel. */
export function Accordion({
  items,
  light = false,
  headingLevel: Heading = "h3",
}: {
  items: AccordionItem[];
  light?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const uid = useId();
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const border = light ? "border-black/15" : "border-ivory/15";

  return (
    <div className={`border-t ${border}`}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${uid}-${item.id}-button`;
        const panelId = `${uid}-${item.id}-panel`;
        return (
          <div key={item.id} id={item.id} className={`scroll-mt-32 border-b ${border}`}>
            <Heading className="font-sans">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={`group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors ${
                  light ? "hover:text-gold-deep" : "hover:text-gold"
                }`}
              >
                <span className="font-serif text-2xl leading-snug sm:text-3xl">{item.title}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-transform duration-500 ease-(--ease-luxe) ${
                    light ? "border-black/20 text-gold-deep" : "border-ivory/20 text-gold"
                  } ${isOpen ? "rotate-45" : ""}`}
                >
                  <PlusIcon size={18} />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-luxe) motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl pb-8">
                  {item.badge}
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
