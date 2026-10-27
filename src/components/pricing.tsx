import { enabledPlans } from "@/config/site";
import { ButtonLink, formatInr } from "./ui";

export function Pricing() {
  const plans = enabledPlans();
  return (
    <div className="mx-auto mt-12 grid max-w-4xl items-start gap-6 md:grid-cols-[1.2fr_1fr]">
      <div className={`grid gap-6 ${plans.length > 1 ? "sm:grid-cols-2 md:col-span-2" : ""}`}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border p-7 ${
              plan.highlighted ? "border-neon/60 bg-panel shadow-[0_0_60px_-20px] shadow-neon/40" : "border-line bg-panel"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-7 rounded-full bg-neon px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-black">
                {plan.badge}
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted">{plan.description}</p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="text-5xl font-semibold tracking-tight">{formatInr(plan.priceInr)}</span>
              {plan.compareAtInr && (
                <span className="text-lg text-dim line-through">{formatInr(plan.compareAtInr)}</span>
              )}
            </p>
            <p className="mt-1 font-mono text-xs text-dim">one-time payment · UPI, cards, net banking</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="text-neon">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href={`/checkout?plan=${plan.id}`} className="mt-8 w-full">
              Get vibeediting
            </ButtonLink>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-line-strong p-7 text-sm">
        <h3 className="font-semibold">What else you need</h3>
        <p className="mt-1 text-muted">Be sure you have these before buying.</p>
        <ul className="mt-5 space-y-4">
          <li>
            <p className="font-medium">An AI agent plan</p>
            <p className="text-muted">
              Claude Pro (or higher), ChatGPT Plus for Codex, or Cursor Pro. Paid to them separately.
            </p>
          </li>
          <li>
            <p className="font-medium">A Mac or Windows computer</p>
            <p className="text-muted">Editing runs on your computer. Phones and Claude.ai web chat are not supported.</p>
          </li>
          <li>
            <p className="font-medium">10 minutes for setup</p>
            <p className="text-muted">Our video tutorial walks you through every click.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
