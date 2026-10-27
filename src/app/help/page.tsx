import type { Metadata } from "next";
import Link from "next/link";
import { ResendForm } from "@/components/resend-form";
import { Eyebrow } from "@/components/ui";
import { business } from "@/config/site";

export const metadata: Metadata = { title: "Resend my key", description: "Get your vibeediting license key again." };

export default function HelpPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <Eyebrow>Help</Eyebrow>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Lost your license key?</h1>
      <p className="mt-4 text-muted">Enter the email you used when buying. We will email your key again.</p>
      <div className="mt-8 rounded-xl border border-line bg-panel p-6">
        <ResendForm />
      </div>
      <p className="mt-8 text-sm text-muted">
        Other problems? See{" "}
        <Link href="/docs/troubleshooting" className="text-neon underline underline-offset-4">
          Troubleshooting
        </Link>{" "}
        or email{" "}
        <a href={`mailto:${business.email}`} className="text-neon underline underline-offset-4">
          {business.email}
        </a>
        .
      </p>
    </section>
  );
}
