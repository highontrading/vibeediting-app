import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyPre } from "./copy-pre";

const components: Components = {
  h2: (p) => <h2 className="mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight" {...p} />,
  h3: (p) => <h3 className="mt-8 mb-3 text-lg font-semibold" {...p} />,
  p: (p) => <p className="my-4 leading-7 text-pretty text-muted" {...p} />,
  ul: (p) => <ul className="my-4 list-disc space-y-2 pl-6 text-muted marker:text-dim" {...p} />,
  ol: (p) => <ol className="my-4 list-decimal space-y-2 pl-6 text-muted marker:text-neon" {...p} />,
  li: (p) => <li className="pl-1 leading-7" {...p} />,
  strong: (p) => <strong className="font-semibold text-fg" {...p} />,
  a: ({ href = "", ...p }) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-neon underline underline-offset-4" {...p} />
    ) : (
      <a href={href} target="_blank" rel="noreferrer" className="text-neon underline underline-offset-4" {...p} />
    ),
  pre: (p) => <CopyPre {...p} />,
  code: ({ className, ...p }) =>
    className ? (
      <code className={className} {...p} />
    ) : (
      <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-fg" {...p} />
    ),
  blockquote: (p) => (
    <blockquote className="my-6 rounded-r-lg border-l-2 border-neon bg-neon/5 px-5 py-1 [&_p]:text-fg" {...p} />
  ),
  table: (p) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-line">
      <table className="w-full text-left text-sm" {...p} />
    </div>
  ),
  th: (p) => <th className="border-b border-line bg-panel-2 px-4 py-2.5 font-semibold" {...p} />,
  td: (p) => <td className="border-b border-line px-4 py-2.5 text-muted" {...p} />,
  hr: () => <hr className="my-10 border-line" />,
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
