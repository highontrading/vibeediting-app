import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/site";
import { Label } from "@/components/ui";

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
      <Label>Contact</Label>
      <h1 className="mt-4 font-serif text-6xl leading-[0.92] tracking-[-0.03em]">say hello</h1>
      <p className="mt-5 text-ink-soft">
        Need help with setup, your license key or a payment? Email us and we will reply within 24 hours (Monday to
        Saturday). For setup problems, please check{" "}
        <Link href="/docs/troubleshooting" className="font-semibold underline decoration-pink-deep decoration-2 underline-offset-4">
          Troubleshooting
        </Link>{" "}
        first.
      </p>
      <dl className="mt-10 overflow-hidden rounded-3xl border-[1.5px] border-ink bg-paper">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`grid gap-1 px-6 py-4 sm:grid-cols-[170px_1fr] ${i > 0 ? "border-t border-dashed border-ink/30" : ""}`}
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">{label}</dt>
            <dd>
              {label === "Email" ? (
                <a href={`mailto:${value}`} className="font-semibold underline decoration-pink-deep decoration-2 underline-offset-4">
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
