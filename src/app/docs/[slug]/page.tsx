import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, getDocs } from "@/lib/content";
import { Markdown } from "@/components/markdown";
import { Eyebrow } from "@/components/ui";

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
      <Eyebrow>{doc.section}</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{doc.title}</h1>
      <p className="mt-3 text-lg text-muted">{doc.description}</p>

      <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-line bg-panel">
        {doc.video ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${doc.video}`}
            title={doc.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="bg-grid flex h-full flex-col items-center justify-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-neon">
              ▶
            </span>
            <p className="font-mono text-xs text-dim">Video tutorial coming soon. Follow the written steps below.</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Markdown>{doc.body}</Markdown>
      </div>

      <nav className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="rounded-lg border border-line p-4 hover:border-line-strong">
            <span className="font-mono text-xs text-dim">← Previous</span>
            <span className="mt-1 block font-medium">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/docs/${next.slug}`}
            className="rounded-lg border border-line p-4 text-right hover:border-neon/50"
          >
            <span className="font-mono text-xs text-dim">Next →</span>
            <span className="mt-1 block font-medium">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
