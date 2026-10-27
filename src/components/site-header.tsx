import Link from "next/link";
import { Logo } from "./logo";
import { ButtonLink } from "./ui";

const nav = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/docs", label: "Tutorials" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <details className="relative md:hidden">
            <summary className="flex h-10 cursor-pointer list-none items-center rounded-lg border border-line-strong px-3 text-sm text-muted [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 flex w-44 flex-col rounded-lg border border-line bg-panel p-2 text-sm shadow-xl">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-muted hover:bg-panel-2 hover:text-fg">
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
          <ButtonLink href="/checkout" className="px-4 py-2.5">
            Buy now
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
