import type { Metadata } from "next";
import Link from "next/link";
import { getDocs } from "@/lib/content";
import { Label, pastelBg, type Pastel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Install vibeediting in Claude Code, Codex or Cursor and learn the editing workflows.",
};

const colors: Pastel[] = ["pink", "blue", "green", "lilac", "butter", "peach"];

export default function DocsIndex() {
  const docs = getDocs();
  const sections = [...new Set(docs.map((d) => d.section))];

  return (
    <>
      <Label>Tutorials</Label>
      <h1 className="mt-4 font-serif text-6xl leading-[1.02] tracking-[-0.025em]">Learn vibeediting</h1>
      <p className="mt-5 max-w-2xl text-ink-soft">
        Start with{" "}
        <Link href="/docs/getting-started" className="font-semibold underline decoration-pink-deep decoration-2 underline-offset-4">
          Getting started
        </Link>
        . Follow the steps in order and you will finish your first edit in about 15 minutes.
      </p>
      {sections.map((section, s) => (
        <section key={section} className="mt-12">
          <Label>{section}</Label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {docs
              .filter((d) => d.section === section)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/docs/${d.slug}`}
                  className="group flex gap-4 rounded-2xl border border-ink bg-paper p-5 transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
                >
                  <span className={`h-10 w-10 shrink-0 rounded-xl border border-ink ${pastelBg[colors[(d.order + s) % colors.length]]}`} />
                  <span className="min-w-0">
                    <span className="flex items-center justify-between gap-2 font-bold">
                      {d.title}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">{d.description}</span>
                    {d.video && <span className="mt-2 block font-mono text-[10px] uppercase">▶ video tutorial</span>}
                  </span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
