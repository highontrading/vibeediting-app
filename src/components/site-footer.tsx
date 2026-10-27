import Link from "next/link";
import { Logo } from "./logo";
import { Label, PillLink } from "./ui";
import { business, site } from "@/config/site";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/checkout", label: "Buy now" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/docs", label: "Tutorials" },
      { href: "/docs/troubleshooting", label: "Troubleshooting" },
      { href: "/help", label: "Resend my key" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/refund", label: "Refund & Cancellation" },
      { href: "/delivery", label: "Delivery Policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-cream px-3 pt-3 pb-3 sm:px-6">
      <div data-reveal className="mx-auto max-w-6xl rounded-3xl border border-ink bg-paper">
        <div className="grid gap-10 p-8 sm:p-10 md:grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{site.tagline}</p>
            <PillLink href="/checkout" className="mt-6">
              Get vibeediting
            </PillLink>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <Label>{col.title}</Label>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:underline hover:decoration-pink-deep hover:decoration-2 hover:underline-offset-4">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-ink px-8 py-5 text-xs text-ink-mute sm:px-10 md:flex-row md:justify-between">
          <p>
            © {business.legalName} ·{" "}
            <a href={`mailto:${business.email}`} className="hover:text-ink">
              {business.email}
            </a>
          </p>
          <p className="max-w-xl md:text-right">
            vibeediting is independent and not affiliated with Anthropic, OpenAI, Anysphere (Cursor), Adobe or Blackmagic
            Design. All product names are trademarks of their owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
