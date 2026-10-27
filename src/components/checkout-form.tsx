"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Plan } from "@/config/site";
import { PillButton, PillLink, formatInr } from "./ui";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", cb: (res: { error: { description?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

function loadRazorpay(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type Status =
  | { kind: "idle" }
  | { kind: "busy"; message: string }
  | { kind: "error"; message: string }
  | { kind: "done"; licenseKey: string; email: string };

export function CheckoutForm({ plans }: { plans: Plan[] }) {
  const searchParams = useSearchParams();
  const [planId, setPlanId] = useState(
    plans.find((p) => p.id === searchParams.get("plan"))?.id ?? plans[0]?.id,
  );
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const plan = plans.find((p) => p.id === planId);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!plan) return;
    const form = new FormData(e.currentTarget);
    const buyer = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
    };

    setStatus({ kind: "busy", message: "Starting secure payment…" });
    const [loaded, orderRes] = await Promise.all([
      loadRazorpay(),
      fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, ...buyer }),
      }),
    ]);
    const order = await orderRes.json().catch(() => ({}));
    if (!orderRes.ok) return setStatus({ kind: "error", message: order.error ?? "Could not start the payment." });
    if (!loaded || !window.Razorpay) {
      return setStatus({ kind: "error", message: "Could not load Razorpay. Check your internet and try again." });
    }

    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "vibeediting",
      description: `${order.planName} license`,
      prefill: { name: buyer.name, email: buyer.email, contact: buyer.phone },
      theme: { color: "#c6f432" },
      modal: { ondismiss: () => setStatus({ kind: "idle" }) },
      handler: async (res: RazorpayResponse) => {
        setStatus({ kind: "busy", message: "Payment received. Creating your license key…" });
        const verifyRes = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(res),
        });
        const data = await verifyRes.json().catch(() => ({}));
        if (verifyRes.ok) {
          setStatus({ kind: "done", licenseKey: data.licenseKey, email: data.email });
        } else {
          setStatus({
            kind: "error",
            message: `${data.error ?? "We could not confirm the payment."} Payment ID: ${res.razorpay_payment_id}. If money was deducted, your key will be emailed within a few minutes, or write to us with this ID.`,
          });
        }
      },
    });
    rzp.on("payment.failed", (res) =>
      setStatus({ kind: "error", message: res.error.description ?? "Payment failed. No money was taken." }),
    );
    rzp.open();
  }

  if (status.kind === "done") return <Success licenseKey={status.licenseKey} email={status.email} />;
  if (!plan) return <p className="text-ink-soft">No plans are on sale right now.</p>;

  const busy = status.kind === "busy";
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {plans.length > 1 && (
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-2 text-sm font-medium">Choose a plan</legend>
          {plans.map((p) => (
            <label
              key={p.id}
              className={`cursor-pointer rounded-xl border p-4 ${p.id === planId ? "border-ink bg-pink" : "border-ink/30 bg-paper"}`}
            >
              <input
                type="radio"
                name="plan"
                value={p.id}
                checked={p.id === planId}
                onChange={() => setPlanId(p.id)}
                className="sr-only"
              />
              <span className="block font-semibold">{p.name}</span>
              <span className="text-sm text-ink-soft">{formatInr(p.priceInr)}</span>
            </label>
          ))}
        </fieldset>
      )}

      <Field label="Full name" name="name" autoComplete="name" required minLength={2} />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        hint="Your license key is sent here. Please check it carefully."
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        required
        pattern="\+?[0-9 ]{10,15}"
        placeholder="+91 98765 43210"
      />

      <label className="flex gap-3 text-sm text-ink-soft">
        <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#f08db0]" />
        <span>
          I have a Mac or Windows computer and my own Claude, ChatGPT or Cursor plan. I agree to the{" "}
          <Link href="/terms" className="font-semibold text-ink underline decoration-pink-deep underline-offset-2">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/refund" className="font-semibold text-ink underline decoration-pink-deep underline-offset-2">
            Refund Policy
          </Link>
          .
        </span>
      </label>

      {status.kind === "error" && (
        <p role="alert" className="rounded-xl border border-ink bg-pink px-4 py-3 text-sm">
          {status.message}
        </p>
      )}

      <PillButton type="submit" variant="solid" disabled={busy} className="w-full py-3.5 text-base">
        {busy ? status.message : `Pay ${formatInr(plan.priceInr)}`}
      </PillButton>
      <p className="text-center font-mono text-[10.5px] uppercase tracking-wider text-ink-mute">
        Secured by Razorpay · UPI · Cards · Net banking · Wallets
      </p>
    </form>
  );
}

function Field({ label, hint, ...props }: { label: string; hint?: string } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em]">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-xl border border-ink bg-paper px-4 py-3 placeholder:text-ink-mute focus:bg-cream focus:shadow-sticker focus:outline-none"
      />
      {hint && <span className="mt-1.5 block text-xs text-ink-mute">{hint}</span>}
    </label>
  );
}

function Success({ licenseKey, email }: { licenseKey: string; email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="text-center">
      <span className="inline-block rounded-full border border-ink bg-green px-3 py-1 font-mono text-[11px] uppercase tracking-wider">
        ✓ Payment successful
      </span>
      <h2 className="mt-4 font-serif text-5xl leading-none tracking-tight">welcome aboard!</h2>
      <p className="mt-3 text-sm text-ink-soft">This is your license key. We also emailed it to {email}.</p>
      <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-dashed border-ink bg-butter p-4">
        <code className="font-mono text-lg font-bold tracking-wider break-all">{licenseKey}</code>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(licenseKey);
            setCopied(true);
          }}
          className="shrink-0 rounded-full border border-ink bg-paper px-3 py-1.5 font-mono text-[11px] hover:bg-pink"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <PillLink href="/docs/getting-started" variant="solid" className="mt-8">
        Start the install guide
      </PillLink>
    </div>
  );
}
