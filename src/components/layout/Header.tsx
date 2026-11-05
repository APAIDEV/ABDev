"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { business } from "@/config/business";
import { bookHref, mainNav } from "@/config/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";

/**
 * Main navigation. `logo` is rendered on the server and passed in so the
 * header can stay a small client component (for the mobile menu and scroll state).
 */
export function Header({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, trap focus, and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const items = [toggle, ...focusables()].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);
  // On the homepage the header floats transparently over the hero photo until you scroll.
  const overlay = pathname === "/" && !scrolled && !open;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-700 ${
        open
          ? "border-b border-ivory/10 bg-black" // no backdrop-filter while open: it would trap the fixed menu inside the header
          : overlay
            ? "border-b border-ivory/0 bg-transparent"
            : scrolled
              ? "border-b border-ivory/10 bg-black/90 backdrop-blur-md"
              : "border-b border-ivory/10 bg-black"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between gap-6 lg:h-24">
        {logo}

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-11">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`label relative py-2 text-ivory transition-opacity duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-ivory after:transition-transform after:duration-500 ${
                    isActive(item.href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-5">
          <a
            href={`tel:${business.phone.tel}`}
            className="label hidden items-center gap-2.5 whitespace-nowrap text-ivory transition-colors hover:text-gold xl:inline-flex"
          >
            <PhoneIcon size={15} />
            {business.phone.display}
          </a>
          <a
            href={`tel:${business.phone.tel}`}
            aria-label={`Call AB Development at ${business.phone.display}`}
            className="inline-flex h-11 w-11 items-center justify-center text-ivory xl:hidden"
          >
            <PhoneIcon size={20} />
          </a>
          <Link
            href="/contact"
            className="label hidden border border-ivory/50 px-6 py-3 whitespace-nowrap text-ivory transition-colors duration-500 hover:border-ivory hover:bg-ivory hover:text-black sm:inline-flex"
          >
            Let&apos;s Talk
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        style={{ top: menuTop }}
        className="fixed inset-x-0 bottom-0 overflow-y-auto bg-black lg:hidden"
      >
        <nav aria-label="Mobile" className="container-luxe flex min-h-full flex-col py-10">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-ivory/10">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-5 font-serif text-4xl font-light ${isActive(item.href) ? "text-gold" : "text-ivory"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4">
            <Link
              href={bookHref}
              onClick={() => setOpen(false)}
              className="label inline-flex min-h-12 items-center justify-center bg-ivory px-6 py-4 text-black"
            >
              Book a Consultation
            </Link>
            <a
              href={`tel:${business.phone.tel}`}
              className="label inline-flex min-h-12 items-center justify-center gap-3 border border-ivory/30 px-6 py-4 text-ivory"
            >
              <PhoneIcon size={15} /> {business.phone.display}
            </a>
          </div>
          <p className="label mt-8 text-center text-stone">{business.hours.display}</p>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="label mt-auto pt-10 text-center text-[0.6rem] text-stone"
          >
            Team Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
