import { faqs } from "@/config/site";

export function Faq() {
  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <details
          key={item.q}
          data-reveal
          style={{ "--reveal-delay": `${Math.min(i, 6) * 50}ms` } as React.CSSProperties}
          className="group rounded-2xl border border-ink bg-paper px-5 py-4 transition-colors open:bg-pink/40 sm:px-6"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold tracking-tight [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink bg-pink text-base transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
