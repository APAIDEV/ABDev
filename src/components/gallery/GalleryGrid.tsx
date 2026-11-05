"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryLabel, gallery, galleryCategories, itemImage, type GalleryItem } from "@/content/gallery";
import { buttonClass } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, PlayIcon } from "@/components/ui/Icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { ShareButton } from "@/components/ui/ShareButton";
import { useLocationSearch } from "@/lib/use-location-search";
import { GalleryMedia } from "./GalleryMedia";
import { SpecStatusTag } from "./SpecStatusTag";

type CategoryId = (typeof galleryCategories)[number]["id"];

export function GalleryGrid() {
  // `null` until a filter is clicked, so a shared link (?category=dormers) applies on load.
  const [picked, setCategory] = useState<CategoryId | null>(null);
  const query = useLocationSearch();
  const fromUrl = query?.get("category");
  const category: CategoryId =
    picked ?? (galleryCategories.find((c) => c.id === fromUrl)?.id as CategoryId | undefined) ?? "all";
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const items = useMemo(
    () => (category === "all" ? gallery : gallery.filter((g) => g.category === category)),
    [category],
  );

  function choose(id: CategoryId) {
    setCategory(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    window.history.replaceState(null, "", url);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  const step = (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + items.length) % items.length));

  const current = openIndex !== null ? items[openIndex] : null;
  const sharePath = (item: GalleryItem) => `/gallery/${item.slug}`;
  const filterPath = category === "all" ? "/gallery" : `/gallery?category=${category}`;

  return (
    <>
      <div className="flex flex-col gap-6 border-b border-ivory/15 pb-2 md:flex-row md:items-end md:justify-between">
        <div
          role="group"
          aria-label="Filter projects"
          className="no-scrollbar -mx-1 flex gap-6 overflow-x-auto md:flex-wrap md:gap-8"
        >
          {galleryCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => choose(c.id)}
              className={`label relative shrink-0 py-4 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-[9px] after:h-px after:bg-ivory after:transition-transform after:duration-500 ${
                category === c.id ? "text-ivory after:scale-x-100" : "text-stone after:scale-x-0 hover:text-ivory"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <ShareButton
          path={filterPath}
          title={`AB Development Projects${category === "all" ? "" : `: ${categoryLabel(category)}`}`}
          label="Share"
          className="py-4 text-stone hover:text-ivory"
        />
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {items.length} {items.length === 1 ? "project" : "projects"}
      </p>

      <ul className="mt-14 grid gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-16 lg:gap-y-28">
        {items.map((item, i) => {
          const lead = i === 0 && items.length > 2;
          return (
            <li key={item.slug} className={`group ${lead ? "md:col-span-2" : ""}`}>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpenIndex(i);
                  }}
                  className="relative block w-full overflow-hidden bg-charcoal text-left"
                  aria-label={`View ${item.title} larger${item.media === "video" ? " (video)" : ""}`}
                >
                  <div className={`relative ${lead ? "aspect-[4/3] md:aspect-[16/8]" : "aspect-[4/3]"}`}>
                    <Image
                      src={itemImage(item)}
                      alt={item.alt}
                      fill
                      sizes={lead ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className="object-cover transition-transform duration-[1.6s] ease-(--ease-luxe) group-hover:scale-[1.03]"
                    />
                  </div>
                  {item.media === "video" && (
                    <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/70 bg-black/40 text-ivory backdrop-blur-sm">
                      <PlayIcon size={20} />
                    </span>
                  )}
                </button>
                <span className="pointer-events-none absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {item.specStatus && <SpecStatusTag status={item.specStatus} />}
                  {item.placeholder && <PlaceholderTag>Placeholder photo</PlaceholderTag>}
                </span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-3xl lg:text-4xl">
                    <Link href={sharePath(item)} className="hover:text-gold-soft">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="label mt-3 text-stone">
                    {categoryLabel(item.category)} · {item.location}
                  </p>
                </div>
                <ShareButton
                  path={sharePath(item)}
                  title={item.title}
                  text={item.description}
                  iconOnly
                  className="mt-1 h-10 w-10 shrink-0 justify-center text-stone hover:text-ivory"
                />
              </div>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? `${current.title} – image viewer` : "Image viewer"}
        onClose={() => {
          setOpenIndex(null);
          lastTrigger.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black p-0 text-ivory"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
              <p className="label text-stone">
                {openIndex! + 1} / {items.length}
              </p>
              <div className="flex items-center gap-2 sm:gap-6">
                <ShareButton
                  path={sharePath(current)}
                  title={current.title}
                  text={current.description}
                  className="px-2 py-3 text-ivory hover:text-gold"
                />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  aria-label="Close viewer"
                  className="inline-flex h-11 w-11 items-center justify-center text-ivory hover:text-gold"
                >
                  <CloseIcon size={24} />
                </button>
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous project"
                className="absolute left-2 z-10 inline-flex h-12 w-12 items-center justify-center bg-black/50 text-ivory hover:text-gold sm:left-6"
              >
                <ArrowLeftIcon size={22} />
              </button>
              <div className="relative mx-auto h-full w-full max-w-6xl px-14 sm:px-24">
                <div className="relative h-full w-full">
                  <GalleryMedia key={current.slug} item={current} />
                  {current.placeholder && <PlaceholderTag className="absolute top-2 left-2" />}
                </div>
              </div>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next project"
                className="absolute right-2 z-10 inline-flex h-12 w-12 items-center justify-center bg-black/50 text-ivory hover:text-gold sm:right-6"
              >
                <ArrowRightIcon size={22} />
              </button>
            </div>

            <div className="container-luxe flex flex-col gap-4 py-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="label text-gold">{categoryLabel(current.category)}</p>
                  {current.specStatus && <SpecStatusTag status={current.specStatus} />}
                </div>
                <h2 className="mt-2 text-3xl">{current.title}</h2>
                <p className="mt-1 text-sm text-stone">
                  {current.location} · {current.description}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                {current.category === "spec-homes" && (
                  <Link
                    href={`/contact?project=${encodeURIComponent("Spec Home Inquiry")}&home=${encodeURIComponent(current.title)}#book`}
                    className={buttonClass("light", "px-5! py-3!")}
                  >
                    Inquire
                  </Link>
                )}
                <Link href={sharePath(current)} className={buttonClass("outline", "px-5! py-3!")}>
                  Project Page
                </Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
