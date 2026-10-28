import Link from "next/link";
import type { ReactNode } from "react";
import { business, formattedAddress } from "@/config/business";
import { siteUrl } from "@/config/site";

const tokens: Record<string, () => string> = {
  businessName: () => business.name,
  legalName: () => business.legalName,
  email: () => business.email,
  phone: () => business.phone.display,
  address: () => formattedAddress() || "[mailing address to be added]",
  siteUrl: () => siteUrl,
  domain: () => new URL(siteUrl).host,
};

/** Replaces {{tokens}} with values from /src/config/business.ts. */
export function fillTokens(text: string) {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key: string) => tokens[key]?.() ?? match);
}

/**
 * Renders a string with Markdown-style [links](/path) and **bold** text.
 * Everything else is treated as plain text (never as HTML).
 */
export function renderInline(text: string, linkClass = "underline underline-offset-4 hover:text-gold"): ReactNode[] {
  const filled = fillTokens(text);
  const out: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(filled))) {
    if (match.index > last) out.push(filled.slice(last, match.index));
    if (match[1]) {
      const [label, href] = [match[1], match[2]];
      const internal = href.startsWith("/") || href.startsWith("#");
      out.push(
        internal ? (
          <Link key={key++} href={href} className={linkClass}>
            {label}
          </Link>
        ) : (
          <a key={key++} href={href} className={linkClass} target="_blank" rel="noopener">
            {label}
          </a>
        ),
      );
    } else {
      out.push(
        <strong key={key++} className="font-semibold">
          {match[3]}
        </strong>,
      );
    }
    last = pattern.lastIndex;
  }
  if (last < filled.length) out.push(filled.slice(last));
  return out;
}
