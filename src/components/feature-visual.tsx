import type { Feature } from "@/config/site";

// Small illustrated "screens" for the top half of each feature card.
export function FeatureVisual({ visual }: { visual: Feature["visual"] }) {
  return (
    <div className="bg-paper-grid relative flex h-44 items-center justify-center overflow-hidden px-5">
      {visuals[visual]}
    </div>
  );
}

const bars = [8, 14, 22, 18, 6, 3, 3, 4, 16, 26, 20, 12, 24, 30, 18, 4, 3, 5, 14, 22, 28, 16, 10, 20];

const visuals: Record<Feature["visual"], React.ReactNode> = {
  cut: (
    <div className="w-full">
      <div className="flex h-16 items-center gap-[3px] rounded-lg border border-ink bg-paper px-2">
        {bars.map((h, i) => {
          const cut = (i >= 4 && i <= 7) || (i >= 15 && i <= 17);
          return (
            <span
              key={i}
              className={`flex-1 rounded-full ${cut ? "bg-pink-deep/35" : "bg-ink"}`}
              style={{ height: `${h + 6}px` }}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-soft">
        <span className="bg-pink px-1">✂ umm…</span>
        <span className="bg-pink px-1">✂ 2.4s silence</span>
      </div>
    </div>
  ),
  captions: (
    <div className="flex h-36 w-20 flex-col justify-end rounded-xl border-[1.5px] border-ink bg-ink/85 p-2 pb-6">
      <p className="text-center text-[11px] leading-tight font-extrabold text-cream">
        yeh trick <span className="bg-butter px-0.5 text-ink">koi nahi</span> batata
      </p>
    </div>
  ),
  motion: (
    <div className="flex h-28 items-end gap-3 rounded-lg border border-ink bg-paper px-5 pt-3 pb-2">
      {[30, 48, 66, 92].map((h, i) => (
        <div key={h} className="flex flex-col items-center gap-1">
          <span className="font-mono text-[9px]">{["1x", "1.5x", "2x", "3x"][i]}</span>
          <span className="w-7 rounded-t-md border border-ink bg-blue" style={{ height: h }} />
        </div>
      ))}
    </div>
  ),
  stock: (
    <div className="grid w-full grid-cols-3 gap-2">
      {["bg-green", "bg-blue", "bg-butter", "bg-peach", "bg-lilac", "bg-pink"].map((c, i) => (
        <div key={c} className={`relative aspect-video rounded-md border border-ink ${c}`}>
          {i === 1 && (
            <span className="absolute -top-2 -right-2 rounded-full border border-ink bg-paper px-1.5 font-mono text-[8px]">
              + add
            </span>
          )}
        </div>
      ))}
      <p className="col-span-3 font-mono text-[10px] text-ink-soft">search: &quot;busy mumbai street&quot;</p>
    </div>
  ),
  analyze: (
    <div className="w-full rounded-lg border border-ink bg-paper p-3">
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span>retention</span>
        <span className="bg-lilac px-1">hook 8.7/10</span>
      </div>
      <svg viewBox="0 0 200 60" className="mt-2 h-14 w-full" aria-hidden>
        <path d="M0 8 C30 10 40 14 60 16 S90 40 100 42 S140 30 160 34 S190 44 200 46" fill="none" stroke="#1f1d1b" strokeWidth="2" />
        <circle cx="100" cy="42" r="4" fill="#f08db0" stroke="#1f1d1b" strokeWidth="1.5" />
      </svg>
      <p className="font-mono text-[9px] text-ink-soft">↳ dip at 0:07, try a cut here</p>
    </div>
  ),
  reframe: (
    <div className="relative flex h-28 w-48 items-center justify-center rounded-md border border-ink bg-peach/40">
      <div className="h-full w-[34%] border-x-2 border-dashed border-ink bg-paper/70" />
      <span className="absolute top-1.5 left-2 font-mono text-[9px]">16:9</span>
      <span className="absolute bottom-1.5 bg-ink px-1 font-mono text-[9px] text-cream">→ 9:16</span>
    </div>
  ),
  style: (
    <div className="flex items-center gap-4">
      <span className="font-display font-medium text-6xl leading-none">Aa</span>
      <div className="grid grid-cols-2 gap-1.5">
        {["bg-pink", "bg-butter", "bg-ink", "bg-blue"].map((c) => (
          <span key={c} className={`h-7 w-7 rounded-full border border-ink ${c}`} />
        ))}
      </div>
      <span className="font-mono text-[10px] leading-tight text-ink-soft">
        my-style
        <br />
        .json
      </span>
    </div>
  ),
  export: (
    <div className="w-full space-y-1.5 rounded-lg border border-ink bg-paper p-2.5">
      {[
        ["V1", "bg-lilac", [0, 30, 55]],
        ["T1", "bg-butter", [5, 40, 70]],
        ["A1", "bg-green", [0]],
      ].map(([label, color, starts]) => (
        <div key={label as string} className="flex items-center gap-2">
          <span className="w-5 font-mono text-[9px]">{label as string}</span>
          <div className="relative h-4 flex-1 rounded-sm bg-rule/60">
            {(starts as number[]).map((s, i, arr) => (
              <span
                key={s}
                className={`absolute inset-y-0.5 rounded-[3px] border border-ink/60 ${color}`}
                style={{ left: `${s}%`, width: `${(arr[i + 1] ?? 100) - s - 3}%` }}
              />
            ))}
          </div>
        </div>
      ))}
      <p className="pt-1 text-right font-mono text-[9px]">→ edit.fcpxml</p>
    </div>
  ),
};
