import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, getDocs } from "@/lib/content";
import { Markdown } from "@/components/markdown";
import { Label } from "@/components/ui";
import { PlayBadge } from "@/components/stickers";

export function generateStaticParams() {
  return getDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const doc = getDoc((await params).slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export default async function DocPage({ params }: PageProps<"/docs/[slug]">) {
  const { slug } = await params;
  const docs = getDocs();
  const index = docs.findIndex((d) => d.slug === slug);
  if (index === -1) notFound();
  const doc = docs[index];
  const prev = docs[index - 1];
  const next = docs[index + 1];

  return (
    <article className="max-w-3xl">
      <Label>{doc.section}</Label>
      <h1 className="mt-4 font-display font-medium text-5xl leading-[1.04] tracking-[-0.035em] text-balance sm:text-6xl">{doc.title}</h1>
      <p className="mt-4 text-lg text-ink-soft">{doc.description}</p>

      <div data-reveal="scale" className="mt-8 aspect-video overflow-hidden rounded-3xl border-[1.5px] border-ink bg-paper">
        {doc.video ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${doc.video}`}
            title={doc.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="bg-paper-grid flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <PlayBadge className="w-14" />
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              Video tutorial coming soon. Follow the written steps below.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Markdown>{doc.body}</Markdown>
      </div>

      <nav className="mt-14 grid gap-4 border-t border-dashed border-ink/30 pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="rounded-2xl border border-ink bg-paper p-4 hover:bg-blue">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-mute">← Previous</span>
            <span className="mt-1 block font-bold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/docs/${next.slug}`}
            className="rounded-2xl border border-ink bg-paper p-4 text-right hover:bg-pink"
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-mute">Next →</span>
            <span className="mt-1 block font-bold">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
