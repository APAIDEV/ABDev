import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { events } from "@/content/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/legacy", "/mission", "/events", "/give", "/get-involved", "/impact", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...events.map((e) => ({ url: `${siteUrl}/events/${e.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
