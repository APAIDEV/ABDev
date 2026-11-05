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
                <ArrowLeftIcon size={14} /> Projects
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
      </div>

      <div className="relative mt-8 h-[min(82svh,60rem)] bg-charcoal">
        <GalleryMedia item={item} priority fit="cover" />
        {item.placeholder && <PlaceholderTag className="absolute bottom-4 left-4">Placeholder photo</PlaceholderTag>}
      </div>

      <div className="container-luxe">
        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h1 id="item-title" className="text-[clamp(3rem,6vw,5.5rem)]">
              {item.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-stone">{item.description}</p>
            {item.category === "spec-homes" && (
              <p className="mt-8 max-w-2xl text-xs leading-relaxed text-stone">
                Informational only; not an offer to sell. Availability and pricing are subject to change. See our{" "}
                <Link href="/legal/spec-home-disclaimer" className="underline underline-offset-4 hover:text-ivory">
                  Spec Home Disclaimer
                </Link>
                .
              </p>
            )}
          </div>
          <aside aria-label="Project details" className="lg:col-span-5">
            <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
              <div className="flex justify-between gap-6 py-4">
                <dt className="label text-stone">Type</dt>
                <dd>{categoryLabel(item.category)}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="label text-stone">Location</dt>
                <dd>{item.location}</dd>
              </div>
              {item.specStatus && (
                <div className="flex items-center justify-between gap-6 py-4">
                  <dt className="label text-stone">Status</dt>
                  <dd>
                    <SpecStatusTag status={item.specStatus} />
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {item.category === "spec-homes" ? (
                <ButtonLink
                  href={`/contact?project=${encodeURIComponent("Spec Home Inquiry")}&home=${encodeURIComponent(item.title)}#book`}
                >
                  Inquire About This Home
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact#book">Book a Consultation</ButtonLink>
              )}
              <ShareButton
                path={`/gallery/${item.slug}`}
                title={item.title}
                text={item.description}
                className="py-3 text-stone hover:text-ivory"
              />
            </div>
          </aside>
        </div>

        <nav aria-label="More projects" className="mt-28 grid grid-cols-2 border-t border-ivory/10 pt-10">
          <Link href={`/gallery/${prev.slug}`} className="group">
            <span className="label inline-flex items-center gap-2 text-stone group-hover:text-ivory">
              <ArrowLeftIcon size={14} /> Previous
            </span>
            <span className="mt-3 block font-serif text-3xl font-light">{prev.title}</span>
          </Link>
          <Link href={`/gallery/${next.slug}`} className="group text-right">
            <span className="label inline-flex items-center gap-2 text-stone group-hover:text-ivory">
              Next <ArrowRightIcon size={14} />
            </span>
            <span className="mt-3 block font-serif text-3xl font-light">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
