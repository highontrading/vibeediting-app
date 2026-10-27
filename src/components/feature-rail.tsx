"use client";

import { useRef } from "react";
import type { Feature } from "@/config/site";
import { pastelBg } from "./ui";

// Horizontal, swipeable row of feature cards with arrow buttons.
export function FeatureRail({ features, visuals }: { features: Feature[]; visuals: React.ReactNode[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => railRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pt-2 pb-6 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((f, i) => (
          <article
            key={f.title}
            className="flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink bg-paper sm:w-[300px]"
          >
            {visuals[i]}
            <div className={`flex flex-1 flex-col border-t border-ink p-1.5 ${pastelBg[f.color]}`}>
              <div className="flex flex-1 flex-col rounded-xl border border-dashed border-ink/50 px-5 pt-5 pb-6 text-center">
                <h3 className="text-lg font-extrabold tracking-tight">
                  {f.title}
                  {f.soon && (
                    <span className="ml-2 inline-block -translate-y-0.5 rounded-full border border-ink bg-paper px-2 py-0.5 align-middle font-mono text-[9px] font-normal uppercase">
                      soon
                    </span>
                  )}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl justify-end gap-3 px-4 sm:px-6">
        <RailButton label="Previous features" onClick={() => scroll(-1)}>
          ←
        </RailButton>
        <RailButton label="Next features" onClick={() => scroll(1)}>
          →
        </RailButton>
      </div>
    </div>
  );
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-paper text-lg transition hover:bg-pink"
    >
      {children}
    </button>
  );
}
