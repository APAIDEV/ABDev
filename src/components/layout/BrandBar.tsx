import { brands } from "@/config/brands";
import Link from "next/link";
import { business } from "@/config/business";

/**
 * Slim brand-network bar shown above the main navigation on every page.
 * Sister-company URLs live in /src/config/brands.ts. An empty URL renders a
 * non-clickable "Coming Soon" label with a tooltip.
 */
export function BrandBar() {
  return (
    <div className="relative z-50 border-b border-ivory/10 bg-black">
      <div className="container-luxe flex h-9 items-center justify-between gap-6">
        <nav
          aria-label="AB brand network"
          className="no-scrollbar -mx-1 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:[mask-image:none]"
        >
          <ul className="flex items-center whitespace-nowrap">
            {brands.map((brand, i) => (
              <li key={brand.name} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-3 h-3 w-px bg-ivory/20 sm:mx-4" />}
                <BrandItem brand={brand} index={i} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <ul className="hidden items-center gap-4 min-[1340px]:flex" aria-label="Credentials">
            {business.badges.map((badge) => (
              <li key={badge} className="label text-[0.6rem] text-stone">
                {badge}
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="hidden h-3 w-px bg-ivory/20 min-[1340px]:block" />
          <Link
            href="/login"
            className="label hidden shrink-0 text-[0.6rem] text-stone transition-colors hover:text-ivory lg:inline"
          >
            Team Login
          </Link>
        </div>
      </div>
    </div>
  );
}

function BrandItem({ brand, index }: { brand: (typeof brands)[number]; index: number }) {
  const base = "label px-1 py-1 text-[0.6rem] sm:text-[0.625rem]";

  if (brand.current) {
    return (
      <span aria-current="page" className={`${base} flex items-center gap-2 text-gold`}>
        <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
        {brand.name}
      </span>
    );
  }

  if (!brand.url) {
    const tipId = `brand-tip-${index}`;
    return (
      <span className="group relative inline-flex">
        <span
          tabIndex={0}
          aria-disabled="true"
          aria-describedby={tipId}
          className={`${base} cursor-default text-stone/80 outline-none focus-visible:text-ivory`}
        >
          {brand.name}
        </span>
        <span
          id={tipId}
          role="tooltip"
          className="pointer-events-none fixed top-9 z-50 mt-1 -translate-x-1/4 border border-ivory/15 bg-charcoal px-3 py-2 text-[0.65rem] tracking-[0.18em] text-ivory uppercase opacity-0 shadow-lg transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
        >
          {brand.description} · Coming Soon
        </span>
      </span>
    );
  }

  return (
    <a
      href={brand.url}
      target="_blank"
      rel="noopener"
      className={`${base} text-stone transition-colors duration-300 hover:text-ivory`}
      title={`${brand.description} (opens in a new tab)`}
    >
      {brand.name}
      <span className="sr-only"> ({brand.description}, opens in a new tab)</span>
    </a>
  );
}
