import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { enabledPlans } from "@/config/site";
import { Label, Tag, formatInr } from "@/components/ui";
import { Sparkle } from "@/components/stickers";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  const plans = enabledPlans();
  const plan = plans[0];

  return (
    <section className="bg-paper-grid -mt-20 pt-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.1fr] md:py-20">
        <div>
          <Label>Checkout</Label>
          <h1 className="mt-4 font-serif text-6xl leading-[1.02] tracking-[-0.025em]">Get vibeediting</h1>
          <p className="mt-4 text-ink-soft">Your license key appears on screen and in your inbox right after payment.</p>
          {plan && (
            <div className="relative mt-8 rounded-3xl border-[1.5px] border-ink bg-pink p-2">
              <Sparkle className="animate-float absolute -top-5 -right-3 w-10" />
              <div className="rounded-[18px] border border-dashed border-ink/50 bg-paper p-6">
                <div className="flex items-baseline justify-between">
                  <p className="font-serif text-3xl">{plan.name}</p>
                  <p className="font-serif text-4xl">{formatInr(plan.priceInr)}</p>
                </div>
                <ul className="mt-5 space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green text-[9px]">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="relative rounded-3xl border-[1.5px] border-ink bg-paper p-6 shadow-lilac sm:p-8">
          <Tag className="absolute -top-4 right-6 rotate-2">secure · razorpay</Tag>
          <Suspense>
            <CheckoutForm plans={plans} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
