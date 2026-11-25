import Link from "next/link";
import { giveLink, mainNav } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ivory/10 bg-burgundy">
      <div className="container-page flex h-[4.75rem] items-center justify-between gap-6 lg:h-[5.5rem]">
        <Link href="/" className="shrink-0" aria-label="Stackzz Foundation, home">
          <Logo tone="light" priority className="h-[3.1rem] w-auto lg:h-[3.75rem]" sizes="130px" />
        </Link>
        <nav aria-label="Main" className="hidden xl:block">
          <NavLinks items={mainNav} />
        </nav>
        <div className="flex items-center gap-3">
          <Link href={giveLink.href} className={buttonClass("rose", "hidden !px-6 !py-3 sm:inline-flex")}>
            {giveLink.label}
          </Link>
          <MobileMenu items={mainNav} give={giveLink} />
        </div>
      </div>
    </header>
  );
}
