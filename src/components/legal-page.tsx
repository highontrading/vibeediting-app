import { notFound } from "next/navigation";
import { getLegal } from "@/lib/content";
import { Markdown } from "./markdown";
import { Eyebrow } from "./ui";

export function legalMetadata(slug: string) {
  const doc = getLegal(slug);
  return doc ? { title: doc.title, description: doc.description } : {};
}

export function LegalPage({ slug }: { slug: string }) {
  const doc = getLegal(slug);
  if (!doc) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{doc.title}</h1>
      <div className="mt-6">
        <Markdown>{doc.body}</Markdown>
      </div>
    </article>
  );
}
