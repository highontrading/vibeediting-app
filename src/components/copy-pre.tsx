"use client";

import { useRef, useState } from "react";

// Code block with a copy button, for commands in the tutorials.
export function CopyPre(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative my-5">
      <pre
        ref={ref}
        {...props}
        className="overflow-x-auto rounded-lg border border-line bg-bg p-4 pr-20 font-mono text-[13px] leading-relaxed"
      />
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(ref.current?.innerText.trim() ?? "");
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute right-2 top-2 rounded-md border border-line-strong bg-panel px-2.5 py-1 font-mono text-[11px] text-muted hover:text-fg"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
