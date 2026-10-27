"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Plan } from "@/config/site";
import { Button, formatInr } from "./ui";

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
  if (!plan) return <p className="text-muted">No plans are on sale right now.</p>;

  const busy = status.kind === "busy";
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {plans.length > 1 && (
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-2 text-sm font-medium">Choose a plan</legend>
          {plans.map((p) => (
            <label
              key={p.id}
              className={`cursor-pointer rounded-lg border p-4 ${p.id === planId ? "border-neon bg-panel-2" : "border-line"}`}
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
              <span className="text-sm text-muted">{formatInr(p.priceInr)}</span>
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

      <label className="flex gap-3 text-sm text-muted">
        <input type="checkbox" required className="mt-1 accent-neon" />
        <span>
          I have a Mac or Windows computer and my own Claude, ChatGPT or Cursor plan. I agree to the{" "}
          <Link href="/terms" className="text-fg underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/refund" className="text-fg underline">
            Refund Policy
          </Link>
          .
        </span>
      </label>

      {status.kind === "error" && (
        <p role="alert" className="rounded-lg border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose">
          {status.message}
        </p>
      )}

      <Button type="submit" disabled={busy} className="w-full py-3.5 text-base">
        {busy ? status.message : `Pay ${formatInr(plan.priceInr)}`}
      </Button>
      <p className="text-center font-mono text-xs text-dim">Secured by Razorpay · UPI · Cards · Net banking · Wallets</p>
    </form>
  );
}

function Field({ label, hint, ...props }: { label: string; hint?: string } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-lg border border-line-strong bg-bg px-3.5 py-2.5 text-fg placeholder:text-dim focus:border-neon focus:outline-none"
      />
      {hint && <span className="mt-1 block text-xs text-dim">{hint}</span>}
    </label>
  );
}

function Success({ licenseKey, email }: { licenseKey: string; email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="text-center">
      <p className="font-mono text-sm text-neon">✓ Payment successful</p>
      <h2 className="mt-3 text-2xl font-semibold">Welcome to vibeediting!</h2>
      <p className="mt-2 text-sm text-muted">This is your license key. We also emailed it to {email}.</p>
      <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-neon/50 bg-bg p-4">
        <code className="font-mono text-lg font-semibold tracking-wider break-all">{licenseKey}</code>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(licenseKey);
            setCopied(true);
          }}
          className="shrink-0 rounded-md border border-line-strong px-3 py-1.5 text-xs hover:bg-panel-2"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <Link
        href="/docs/getting-started"
        className="mt-8 inline-flex rounded-lg bg-neon px-5 py-3 text-sm font-semibold text-black"
      >
        Start the install guide →
      </Link>
    </div>
  );
}
