import type { Metadata } from "next";
import Link from "next/link";
import { getDocs } from "@/lib/content";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Install vibeediting in Claude Code, Codex or Cursor and learn the editing workflows.",
};

export default function DocsIndex() {
  const docs = getDocs();
  const sections = [...new Set(docs.map((d) => d.section))];

  return (
    <>
      <Eyebrow>Tutorials</Eyebrow>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Learn vibeediting</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Start with <Link href="/docs/getting-started" className="text-neon underline underline-offset-4">Getting started</Link>.
        Follow the steps in order and you will finish your first edit in about 15 minutes.
      </p>
      {sections.map((section) => (
        <section key={section} className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-dim">{section}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {docs
              .filter((d) => d.section === section)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/docs/${d.slug}`}
                  className="group rounded-xl border border-line bg-panel p-5 transition-colors hover:border-neon/50"
                >
                  <p className="flex items-center justify-between font-semibold">
                    {d.title}
                    <span className="text-dim transition-colors group-hover:text-neon">→</span>
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{d.description}</p>
                  {d.video && <p className="mt-3 font-mono text-[11px] text-neon">▶ video tutorial</p>}
                </Link>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
