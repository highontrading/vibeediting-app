"use client";

import { useRef, useState } from "react";

// Code block with a copy button, for commands in the tutorials.
export function CopyPre(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative my-5">
      <pre
        ref={ref}
        {...props}
        className="overflow-x-auto rounded-2xl border-[1.5px] border-ink bg-ink p-4 pr-20 font-mono text-[13px] leading-relaxed text-cream"
      />
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(ref.current?.innerText.trim() ?? "");
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute top-2.5 right-2.5 rounded-full border border-ink bg-pink px-3 py-1 font-mono text-[11px] text-ink hover:bg-butter"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
