import { enabledPlans } from "@/config/site";
import { PillLink, Tag, formatInr } from "./ui";
import { Heart } from "./stickers";

const needs = [
  ["An AI agent plan", "Claude Pro (or higher), ChatGPT Plus for Codex, or Cursor Pro. Paid to them separately."],
  ["A Mac or Windows computer", "Editing runs on your computer. Phones and Claude.ai web chat are not supported."],
  ["10 minutes for setup", "Our video tutorial walks you through every click."],
];

export function Pricing() {
  const plans = enabledPlans();
  return (
    <div className="mx-auto mt-14 grid max-w-4xl items-start gap-8 md:grid-cols-[1.15fr_1fr]">
      <div className={`grid gap-8 ${plans.length > 1 ? "sm:grid-cols-2 md:col-span-2" : ""}`}>
        {plans.map((plan) => (
          <div key={plan.id} data-reveal="scale" className="relative rounded-3xl border-[1.5px] border-ink bg-pink p-2 shadow-hard">
            {plan.badge && <Tag color="butter" className="absolute -top-4 left-6 -rotate-3">{plan.badge}</Tag>}
            <Heart className="animate-float absolute -top-5 -right-4 w-11" />
            <div className="rounded-[18px] border border-dashed border-ink/50 bg-paper p-7">
              <h3 className="font-display font-medium text-4xl leading-none tracking-tight">{plan.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="font-display font-medium text-7xl leading-none tracking-[-0.03em]">{formatInr(plan.priceInr)}</span>
                {plan.compareAtInr && (
                  <span className="text-xl text-ink-mute line-through decoration-pink-deep decoration-2">
                    {formatInr(plan.compareAtInr)}
                  </span>
                )}
              </p>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-wider text-ink-mute">
                one-time · UPI, cards, net banking
              </p>
              <ul className="mt-6 space-y-2.5 text-[14.5px]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink bg-green text-[10px]">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <PillLink href={`/checkout?plan=${plan.id}`} variant="solid" className="mt-8 w-full py-3.5">
                Get vibe editing
              </PillLink>
            </div>
          </div>
        ))}
      </div>

      <div data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties} className="rounded-3xl border-[1.5px] border-ink bg-blue p-2 md:mt-10">
        <div className="rounded-[18px] border border-dashed border-ink/50 p-6">
          <h3 className="text-lg font-extrabold tracking-tight">What else you need</h3>
          <p className="mt-1 text-sm text-ink-soft">Please check these before buying.</p>
          <ul className="mt-5 space-y-4">
            {needs.map(([title, body], i) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink bg-paper font-display font-medium">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[14.5px] font-bold">{title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
