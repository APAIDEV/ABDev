"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/config/site";
import { foundation } from "@/config/site";
import { CloseIcon, InstagramIcon, MenuIcon } from "@/components/ui/Icons";

export function MobileMenu({ items, give }: { items: NavItem[]; give: NavItem }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-mr-2 flex size-11 items-center justify-center text-ivory"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[4.75rem] bottom-0 z-40 overflow-y-auto bg-burgundy lg:top-[5.5rem]"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pt-8 pb-12">
          <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
            <li>
              <Link
                href="/"
                className="block py-4 font-serif text-[1.75rem] text-ivory"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="block py-4 font-serif text-[1.75rem] text-ivory aria-[current=page]:text-blush"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={give.href}
            className="mt-8 inline-flex items-center justify-center bg-rose px-7 py-4 text-[0.78rem] font-medium tracking-[0.2em] text-white uppercase"
          >
            {give.label}
          </Link>
          <a
            href={foundation.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center gap-3 pt-10 text-sm text-blush"
          >
            <InstagramIcon /> {foundation.instagram.handle}
          </a>
        </nav>
      </div>
    </div>
  );
}
