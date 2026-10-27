import Link from "next/link";
import { getDocs, type Doc } from "@/lib/content";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  const docs = getDocs();
  const sections = [...new Set(docs.map((d) => d.section))];

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:grid-cols-[230px_minmax(0,1fr)] md:py-14">
      <aside className="md:sticky md:top-28 md:self-start">
        <details className="rounded-2xl border border-ink bg-paper p-4 md:hidden">
          <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.16em]">All tutorials</summary>
          <DocsNav docs={docs} sections={sections} className="mt-4" />
        </details>
        <DocsNav docs={docs} sections={sections} className="hidden md:block" />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function DocsNav({ docs, sections, className }: { docs: Doc[]; sections: string[]; className: string }) {
  return (
    <nav className={`space-y-6 ${className}`}>
      {sections.map((section) => (
        <div key={section}>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">{section}</p>
          <ul className="mt-2 space-y-0.5">
            {docs
              .filter((d) => d.section === section)
              .map((d) => (
                <li key={d.slug}>
                  <Link href={`/docs/${d.slug}`} className="block rounded-full px-3 py-1.5 text-sm hover:bg-pink">
                    {d.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
