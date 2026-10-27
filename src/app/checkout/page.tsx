import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { enabledPlans } from "@/config/site";
import { Eyebrow, formatInr } from "@/components/ui";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  const plans = enabledPlans();
  const plan = plans[0];

  return (
    <section className="bg-grid border-b border-line">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.1fr] md:py-20">
        <div>
          <Eyebrow>Checkout</Eyebrow>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Get vibeediting</h1>
          <p className="mt-3 text-muted">Your license key appears on screen and in your inbox right after payment.</p>
          {plan && (
            <div className="mt-8 rounded-xl border border-line bg-panel p-6">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">{plan.name}</p>
                <p className="text-2xl font-semibold">{formatInr(plan.priceInr)}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-neon">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-line-strong bg-panel p-6 sm:p-8">
          <Suspense>
            <CheckoutForm plans={plans} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
