import type { Metadata } from "next";
import Link from "next/link";
import { ResendForm } from "@/components/resend-form";
import { Label } from "@/components/ui";
import { business } from "@/config/site";

export const metadata: Metadata = { title: "Resend my key", description: "Get your vibeediting license key again." };

const link = "font-semibold underline decoration-pink-deep decoration-2 underline-offset-4";

export default function HelpPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <Label>Help</Label>
      <h1 className="mt-4 font-serif text-6xl leading-[1.02] tracking-[-0.025em]">Lost your license key?</h1>
      <p className="mt-5 text-ink-soft">Enter the email you used when buying. We will email your key again.</p>
      <div className="mt-8 rounded-3xl border-[1.5px] border-ink bg-blue p-2">
        <div className="rounded-[18px] border border-dashed border-ink/50 p-5">
          <ResendForm />
        </div>
      </div>
      <p className="mt-8 text-sm text-ink-soft">
        Other problems? See{" "}
        <Link href="/docs/troubleshooting" className={link}>
          Troubleshooting
        </Link>{" "}
        or email{" "}
        <a href={`mailto:${business.email}`} className={link}>
          {business.email}
        </a>
        .
      </p>
    </section>
  );
}
