import Image from "next/image";
import Link from "next/link";
import { categoryLabel, gallery, itemImage } from "@/content/gallery";
import { home } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GalleryPreview() {
  const featured = gallery.filter((g) => g.featured).slice(0, 5);
  return (
    <section aria-labelledby="work-title" className="bg-charcoal py-24 lg:py-36">
      <div className="container-luxe">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="work-title" eyebrow={home.gallery.eyebrow} title={home.gallery.title} />
          <Reveal>
            <ButtonLink href="/gallery" variant="outline">
              {home.gallery.cta}
            </ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
          {featured.map((item, i) => (
            <Reveal
              as="li"
              key={item.slug}
              delay={i * 90}
              className={i === 0 ? "sm:col-span-2 lg:col-span-3 lg:row-span-2" : "lg:col-span-3 xl:col-span-3"}
            >
              <Link href={`/gallery/${item.slug}`} className="group relative block h-full overflow-hidden bg-black">
                <div
                  className={`relative ${i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]" : "aspect-[16/9]"}`}
                >
                  <Image
                    src={itemImage(item)}
                    alt={item.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-[1.6s] ease-(--ease-luxe) group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                {item.placeholder && <PlaceholderTag className="absolute top-4 left-4" />}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="label text-gold">{categoryLabel(item.category)}</p>
                  <h3 className="mt-2 text-2xl text-ivory lg:text-3xl">{item.title}</h3>
                  <p className="mt-1 text-xs tracking-wider text-stone">{item.location}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
