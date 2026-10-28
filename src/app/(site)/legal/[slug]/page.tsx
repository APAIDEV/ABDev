import { notFound } from "next/navigation";
import { getLegalDoc, legalDocs } from "@/content/legal";
import type { LegalBlock } from "@/content/legal/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fillTokens, renderInline } from "@/lib/inline";
import { pageMetadata } from "@/lib/seo";

// Legal pages are prerendered at build time.
export const instant = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return pageMetadata({ title: doc.title, description: doc.metaDescription, path: `/legal/${doc.slug}` });
}

const isDraftNotice = (text: string) => text.startsWith("DRAFT:");

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  const draft = doc.intro.find(isDraftNotice);
  const intro = doc.intro.filter((t) => !isDraftNotice(t));

  return (
    <article aria-labelledby="legal-title" className="on-light bg-ivory text-black">
      {draft && (
        <div role="note" className="border-b border-gold-deep/30 bg-[#f3ead9]">
          <p className="container-luxe label py-3 text-center text-gold-deep">{draft}</p>
        </div>
      )}
      <div className="container-luxe py-20 lg:py-28">
        <header className="max-w-3xl">
          <Eyebrow tone="gold-deep">Legal</Eyebrow>
          <h1 id="legal-title" className="mt-6 text-5xl sm:text-6xl">
            {doc.title}
          </h1>
          <p className="label mt-6 text-taupe">Last updated: {doc.lastUpdated}</p>
        </header>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-36">
              <p className="label text-gold-deep">On this page</p>
              <ol className="mt-5 space-y-3 border-l border-black/15 pl-5 text-sm">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-taupe hover:text-black">
                      {fillTokens(s.heading)}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-3xl text-base leading-relaxed text-[#2b2a27] lg:col-span-9">
            <div className="space-y-5 text-lg">
              {intro.map((p, i) => (
                <p key={i}>{renderInline(p, "underline underline-offset-4 hover:text-gold-deep")}</p>
              ))}
            </div>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-14 scroll-mt-32">
                <h2 id={`${s.id}-h`} className="border-t border-black/15 pt-10 text-3xl">
                  <span className="label mr-4 align-middle text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  {fillTokens(s.heading)}
                </h2>
                <div className="mt-6 space-y-5">
                  {s.blocks.map((b, j) => (
                    <Block key={j} block={b} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Block({ block }: { block: LegalBlock }) {
  const link = "underline underline-offset-4 hover:text-gold-deep";
  switch (block.type) {
    case "p":
      return <p>{renderInline(block.text, link)}</p>;
    case "h3":
      return (
        <h3 className="pt-2 font-sans text-sm font-semibold tracking-[0.12em] uppercase">{fillTokens(block.text)}</h3>
      );
    case "ul":
      return (
        <ul className="list-none space-y-3 pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-6">
              <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-1 w-1 rotate-45 bg-gold-deep" />
              {renderInline(item, link)}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p
          role="note"
          className="border border-dashed border-gold-deep/50 bg-[#f3ead9] px-5 py-4 text-sm text-gold-deep"
        >
          <span className="label mr-2">Drafting note</span>
          {renderInline(block.text, link)}
        </p>
      );
  }
}
