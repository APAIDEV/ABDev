import type { Metadata } from "next";
import { business, hasAddress } from "@/config/business";
import { serviceArea } from "@/config/serviceArea";
import { services } from "@/config/services";
import { siteUrl } from "@/config/site";

export const defaultOgImage = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "AB Development logo on black",
};

/** Unique title, description, canonical URL, and social tags for a page. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
  absoluteTitle?: boolean;
}): Metadata {
  const images = [image ?? defaultOgImage];
  const fullTitle = absoluteTitle ? title : `${title} | ${business.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: business.name,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** HomeAndConstructionBusiness structured data for local search. */
export function businessJsonLd() {
  const { address } = business;
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    slogan: business.tagline,
    description: business.description,
    url: siteUrl,
    logo: `${siteUrl}/brand/monogram.png`,
    image: `${siteUrl}${defaultOgImage.url}`,
    telephone: business.phone.tel,
    email: business.email,
    openingHours: business.hours.schema,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        ...(address.street && { streetAddress: address.street }),
        ...(address.city && { addressLocality: address.city }),
        addressRegion: address.state,
        ...(address.postalCode && { postalCode: address.postalCode }),
        addressCountry: address.country,
      },
    }),
    areaServed: serviceArea.flatMap((r) => r.areas.map((a) => ({ "@type": a.schemaType, name: a.schemaName }))),
    sameAs: [business.instagram.url],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home Building Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
          url: `${siteUrl}/#${s.id}`,
        },
      })),
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
