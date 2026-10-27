import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyPre } from "./copy-pre";

const linkClass = "font-semibold text-ink underline decoration-pink-deep decoration-2 underline-offset-4 hover:bg-pink";

const components: Components = {
  h2: (p) => <h2 className="mt-12 mb-4 scroll-mt-28 text-2xl font-extrabold tracking-tight" {...p} />,
  h3: (p) => <h3 className="mt-8 mb-3 text-lg font-bold" {...p} />,
  p: (p) => <p className="my-4 leading-7 text-pretty text-ink-soft" {...p} />,
  ul: (p) => <ul className="my-4 list-disc space-y-2 pl-6 text-ink-soft marker:text-pink-deep" {...p} />,
  ol: (p) => <ol className="my-4 list-decimal space-y-2 pl-6 text-ink-soft marker:font-mono marker:text-ink" {...p} />,
  li: (p) => <li className="pl-1 leading-7" {...p} />,
  strong: (p) => <strong className="font-bold text-ink" {...p} />,
  a: ({ href = "", ...p }) =>
    href.startsWith("/") ? (
      <Link href={href} className={linkClass} {...p} />
    ) : (
      <a href={href} target="_blank" rel="noreferrer" className={linkClass} {...p} />
    ),
  pre: (p) => <CopyPre {...p} />,
  code: ({ className, ...p }) =>
    className ? (
      <code className={className} {...p} />
    ) : (
      <code className="rounded-md border border-ink/20 bg-butter/60 px-1.5 py-0.5 font-mono text-[0.85em] text-ink" {...p} />
    ),
  blockquote: (p) => (
    <blockquote className="my-6 rounded-2xl border-[1.5px] border-ink bg-blue px-5 py-1 [&_p]:text-ink" {...p} />
  ),
  table: (p) => (
    <div className="my-6 overflow-x-auto rounded-2xl border-[1.5px] border-ink bg-paper">
      <table className="w-full text-left text-sm" {...p} />
    </div>
  ),
  th: (p) => <th className="border-b border-ink bg-pink px-4 py-2.5 font-bold" {...p} />,
  td: (p) => <td className="border-b border-ink/15 px-4 py-2.5 text-ink-soft" {...p} />,
  hr: () => <hr className="my-10 border-dashed border-ink/30" />,
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
