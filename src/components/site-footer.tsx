import Link from "next/link";
import { Logo } from "./logo";
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
    <footer className="border-t border-line bg-panel/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm text-muted">{site.tagline}</p>
          <p className="mt-4 text-sm text-dim">
            <a href={`mailto:${business.email}`} className="hover:text-fg">
              {business.email}
            </a>
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-xs uppercase tracking-widest text-dim">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-dim sm:px-6">
          © {business.legalName}. vibeediting is an independent product and is not affiliated with or endorsed
          by Anthropic, OpenAI, Anysphere (Cursor), Adobe or Blackmagic Design. All product names are trademarks
          of their owners.
        </p>
      </div>
    </footer>
  );
}
