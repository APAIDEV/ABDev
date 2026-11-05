/**
 * SITE SETTINGS
 * ----------------------------------------------------------------------------
 * Navigation and site-wide settings. The site URL can be overridden with the
 * NEXT_PUBLIC_SITE_URL environment variable (useful for preview deployments).
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://abdevelopment.ai").replace(/\/$/, "");

export const mainNav = [
  { label: "Projects", href: "/gallery" },
  { label: "What We Build", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Project & Estimate Disclaimer", href: "/legal/project-disclaimer" },
  { label: "Spec Home Disclaimer", href: "/legal/spec-home-disclaimer" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Accessibility", href: "/legal/accessibility" },
];

export const bookHref = "/contact#book";
