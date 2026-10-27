import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/site";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Contact us", description: "Get in touch with the vibeediting team." };

export default function ContactPage() {
  const rows = [
    ["Business name", business.legalName],
    ["Address", business.address],
    ["Email", business.email],
    ["Phone", business.phone],
    ...(business.gstin ? [["GSTIN", business.gstin]] : []),
  ];
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Contact us</h1>
      <p className="mt-4 text-muted">
        Need help with setup, your license key or a payment? Email us and we will reply within 24 hours (Monday to
        Saturday). For setup problems, please check{" "}
        <Link href="/docs/troubleshooting" className="text-neon underline underline-offset-4">
          Troubleshooting
        </Link>{" "}
        first.
      </p>
      <dl className="mt-10 divide-y divide-line rounded-xl border border-line bg-panel">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-[160px_1fr]">
            <dt className="font-mono text-xs uppercase tracking-widest text-dim">{label}</dt>
            <dd className="text-fg">
              {label === "Email" ? (
                <a href={`mailto:${value}`} className="text-neon underline underline-offset-4">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
