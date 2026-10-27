import Link from "next/link";
import { Logo } from "./logo";
import { PillLink } from "./ui";

const nav = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/docs", label: "Tutorials" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <div aria-hidden className="absolute inset-x-0 top-0 h-3 bg-cream" />
      <div className="relative mx-auto flex h-[68px] max-w-6xl items-stretch rounded-2xl border border-ink bg-paper/95 backdrop-blur">
        <div className="flex items-center border-r border-ink px-4 sm:px-5">
          <Logo />
        </div>
        <nav className="hidden flex-1 items-center justify-end gap-7 pr-6 font-mono text-[11px] uppercase tracking-[0.16em] lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-pink-deep">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 px-3 lg:ml-0">
          <PillLink href="/checkout" className="px-4 py-2.5">
            Buy now
          </PillLink>
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-ink [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Menu</span>
              <span aria-hidden className="flex flex-col gap-1">
                <span className="h-0.5 w-4 bg-ink" />
                <span className="h-0.5 w-4 bg-ink" />
              </span>
            </summary>
            <div className="absolute right-0 mt-3 flex w-52 flex-col rounded-xl border border-ink bg-paper p-2 font-mono text-xs uppercase tracking-widest shadow-sticker">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2.5 hover:bg-pink">
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
