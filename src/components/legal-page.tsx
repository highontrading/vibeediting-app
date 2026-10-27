import { notFound } from "next/navigation";
import { getLegal } from "@/lib/content";
import { Markdown } from "./markdown";
import { Label } from "./ui";

export function legalMetadata(slug: string) {
  const doc = getLegal(slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export function LegalPage({ slug }: { slug: string }) {
  const doc = getLegal(slug);
  if (!doc) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <Label>Legal</Label>
      <h1 className="mt-4 font-serif text-5xl leading-[1.04] tracking-[-0.025em] sm:text-6xl">{doc.title}</h1>
      <div data-reveal className="mt-8 rounded-3xl border border-ink bg-paper px-6 py-4 sm:px-10 sm:py-6">
        <Markdown>{doc.body}</Markdown>
      </div>
    </article>
  );
}
