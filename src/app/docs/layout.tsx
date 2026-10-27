import Link from "next/link";
import { getDocs, type Doc } from "@/lib/content";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  const docs = getDocs();
  const sections = [...new Set(docs.map((d) => d.section))];

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:grid-cols-[220px_minmax(0,1fr)] md:py-14">
      <aside className="md:sticky md:top-24 md:self-start">
        <details className="rounded-lg border border-line bg-panel p-4 md:hidden">
          <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-dim">All tutorials</summary>
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
          <p className="font-mono text-xs uppercase tracking-widest text-dim">{section}</p>
          <ul className="mt-2 space-y-1 border-l border-line">
            {docs
              .filter((d) => d.section === section)
              .map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/docs/${d.slug}`}
                    className="-ml-px block border-l border-transparent py-1 pl-3 text-sm text-muted hover:border-neon hover:text-fg"
                  >
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
