import { faqs } from "@/config/site";

export function Faq() {
  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-line rounded-xl border border-line bg-panel">
      {faqs.map((item) => (
        <details key={item.q} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="font-mono text-neon transition-transform group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
