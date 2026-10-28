import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { gallery } from "@/content/gallery";
import { legalDocs } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/gallery", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/faq", priority: 0.7 },
  ];
  return [
    ...pages.map((p) => ({
      url: `${siteUrl}${p.path === "/" ? "" : p.path}`,
      priority: p.priority,
      changeFrequency: "monthly" as const,
    })),
    ...gallery.map((g) => ({
      url: `${siteUrl}/gallery/${g.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    ...legalDocs.map((d) => ({ url: `${siteUrl}/legal/${d.slug}`, priority: 0.3, changeFrequency: "yearly" as const })),
  ];
}
