import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabel, gallery, getGalleryItem, itemImage } from "@/content/gallery";
import { GalleryMedia } from "@/components/gallery/GalleryMedia";
import { SpecStatusTag } from "@/components/gallery/SpecStatusTag";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { ShareButton } from "@/components/ui/ShareButton";
import { pageMetadata } from "@/lib/seo";

// Every project page is prerendered at build time, so navigations can wait for the full page.
export const instant = false;

export function generateStaticParams() {
  return gallery.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const item = getGalleryItem(slug);
  if (!item) return {};
  const image = itemImage(item);
  // Social networks can't display SVG placeholders, so the branded image is used until real photos are added.
  const socialImage = image.endsWith(".svg") ? undefined : { url: image, alt: item.alt };
  return pageMetadata({
    title: `${item.title} | ${categoryLabel(item.category)}`,
    description: `${item.description} ${item.location}. A project by AB Development.`,
    path: `/gallery/${item.slug}`,
    image: socialImage,
  });
}

export default async function GalleryItemPage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const index = gallery.findIndex((g) => g.slug === slug);
  if (index < 0) notFound();
  const item = gallery[index];
  const prev = gallery[(index - 1 + gallery.length) % gallery.length];
  const next = gallery[(index + 1) % gallery.length];

  return (
    <article aria-labelledby="item-title" className="bg-black pt-10 pb-24 lg:pt-16 lg:pb-32">
      <div className="container-luxe">
        <nav aria-label="Breadcrumb" className="label text-stone">
          <ol className="flex flex-wrap items-center gap-3">
            <li>
              <Link href="/gallery" className="inline-flex items-center gap-2 hover:text-ivory">
                <ArrowLeftIcon size={14} /> Gallery
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/gallery?category=${item.category}`} className="hover:text-ivory">
                {categoryLabel(item.category)}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="relative mt-8 h-[min(75svh,52rem)] bg-charcoal">
          <GalleryMedia item={item} priority />
          {item.placeholder && <PlaceholderTag className="absolute top-4 left-4" />}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <p className="label text-gold">{categoryLabel(item.category)}</p>
              {item.specStatus && <SpecStatusTag status={item.specStatus} />}
            </div>
            <h1 id="item-title" className="mt-4 text-5xl lg:text-6xl">
              {item.title}
            </h1>
            <p className="label mt-4 text-stone">{item.location}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">{item.description}</p>
            {item.category === "spec-homes" && (
              <p className="mt-6 max-w-2xl text-xs leading-relaxed text-stone">
                Informational only; not an offer to sell. Availability and pricing are subject to change. See our{" "}
                <Link href="/legal/spec-home-disclaimer" className="underline underline-offset-4 hover:text-ivory">
                  Spec Home Disclaimer
                </Link>
                .
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-start gap-4 lg:col-span-4 lg:justify-end">
            <ShareButton
              path={`/gallery/${item.slug}`}
              title={item.title}
              text={item.description}
              className="border border-ivory/30 px-6 py-4 text-ivory hover:border-gold hover:text-gold"
            />
            {item.category === "spec-homes" ? (
              <ButtonLink
                href={`/contact?project=${encodeURIComponent("Spec Home Inquiry")}&home=${encodeURIComponent(item.title)}#book`}
              >
                Inquire About This Home
              </ButtonLink>
            ) : (
              <ButtonLink href="/contact#book">Book a Consultation</ButtonLink>
            )}
          </div>
        </div>

        <nav aria-label="More projects" className="mt-20 grid grid-cols-2 border-t border-ivory/10 pt-8">
          <Link href={`/gallery/${prev.slug}`} className="group">
            <span className="label inline-flex items-center gap-2 text-stone group-hover:text-gold">
              <ArrowLeftIcon size={14} /> Previous
            </span>
            <span className="mt-2 block font-serif text-2xl">{prev.title}</span>
          </Link>
          <Link href={`/gallery/${next.slug}`} className="group text-right">
            <span className="label inline-flex items-center gap-2 text-stone group-hover:text-gold">
              Next <ArrowRightIcon size={14} />
            </span>
            <span className="mt-2 block font-serif text-2xl">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
