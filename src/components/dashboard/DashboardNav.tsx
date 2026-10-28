"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";

type Item = { href: string; label: string };

export function DashboardNav({ items, name, title }: { items: Item[]; name: string; title: string }) {
  const pathname = usePathname();
  const active = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));
  return (
    <div className="flex h-full flex-col gap-8">
      <nav aria-label="Dashboard">
        <ul className="no-scrollbar flex gap-1 overflow-x-auto lg:flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                className={`label block px-4 py-3 whitespace-nowrap transition-colors ${
                  active(item.href) ? "bg-ivory/10 text-gold" : "text-stone hover:text-ivory"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto hidden border-t border-ivory/10 pt-6 lg:block">
        <p className="text-sm text-ivory">{name}</p>
        <p className="mt-1 text-xs text-stone">{title}</p>
        <form action={signOut} className="mt-5">
          <button type="submit" className="label text-stone hover:text-ivory">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
