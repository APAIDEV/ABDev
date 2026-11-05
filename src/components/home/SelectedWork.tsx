import Image from "next/image";
import Link from "next/link";
import { categoryLabel, gallery, itemImage, type GalleryItem } from "@/content/gallery";
import { home } from "@/content/home";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";

/** Large, editorial showcase of the gallery items marked `featured`. */
export function SelectedWork() {
  const featured = gallery.filter((g) => g.featured).slice(0, 4);
  const [lead, ...rest] = featured;
  if (!lead) return null;
  const pair = rest.slice(0, 2);
  const last = rest[2];

  return (
    <section aria-labelledby="work-title" className="bg-black py-28 lg:py-40">
      <div className="container-luxe">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 id="work-title" className="text-[clamp(2.5rem,5.5vw,4.75rem)]">
              {home.work.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-stone">{home.work.intro}</p>
          </div>
          <Link href="/gallery" className="label group inline-flex shrink-0 items-center gap-3 text-ivory">
            {home.work.cta}
            <ArrowRightIcon size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
          <Project item={lead} aspect="aspect-[4/3] md:aspect-[16/8]" sizes="100vw" />
          {pair.length > 0 && (
            <div className="grid gap-20 md:grid-cols-2 md:gap-10 lg:gap-16">
              {pair.map((item, i) => (
                <Project
                  key={item.slug}
                  item={item}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={i === 1 ? "md:mt-32" : ""}
                />
              ))}
            </div>
          )}
          {last && (
            <div className="lg:ml-[16.66%]">
              <Project item={last} aspect="aspect-[4/3] md:aspect-[16/9]" sizes="(min-width: 1024px) 83vw, 100vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Project({
  item,
  aspect,
  sizes,
  className = "",
}: {
  item: GalleryItem;
  aspect: string;
  sizes: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <Link href={`/gallery/${item.slug}`} className="group block">
        <div className={`relative overflow-hidden bg-charcoal ${aspect}`}>
          <Image
            src={itemImage(item)}
            alt={item.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1.8s] ease-(--ease-luxe) group-hover:scale-[1.03]"
          />
          {item.placeholder && <PlaceholderTag className="absolute bottom-4 left-4">Placeholder photo</PlaceholderTag>}
        </div>
        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-3xl lg:text-4xl">{item.title}</h3>
            <p className="label mt-3 text-stone">
              {categoryLabel(item.category)} · {item.location}
            </p>
          </div>
          <ArrowRightIcon
            size={20}
            className="mt-3 shrink-0 text-stone transition-all duration-500 group-hover:translate-x-1 group-hover:text-ivory"
          />
        </div>
      </Link>
    </Reveal>
  );
}
