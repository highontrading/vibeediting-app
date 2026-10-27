"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close the menu after navigating to another page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 px-3 pt-3 [view-transition-name:site-header] sm:px-6">
      <div aria-hidden className="absolute inset-x-0 top-0 h-3 bg-cream" />
      <div
        className={`relative mx-auto flex h-[68px] max-w-6xl items-stretch rounded-2xl border border-ink bg-paper/95 backdrop-blur transition-shadow duration-300 ${
          scrolled || open ? "shadow-hard" : ""
        }`}
      >
        <div className="flex items-center border-r border-ink px-4 sm:px-5">
          <Logo />
        </div>
        <nav className="hidden flex-1 items-center justify-end gap-7 pr-6 font-mono text-[11px] uppercase tracking-[0.16em] lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 px-3 lg:ml-0">
          <PillLink href="/checkout" className="px-4 py-2.5">
            Buy now
          </PillLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-ink transition-colors duration-300 lg:hidden ${
              open ? "bg-pink" : "bg-transparent"
            }`}
          >
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 bg-ink transition-transform duration-300 ease-out ${open ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-4 bg-ink transition-transform duration-300 ease-out ${open ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </div>

        <div
          id="mobile-menu"
          inert={!open}
          className={`absolute inset-x-0 top-full mt-2 origin-top rounded-2xl border border-ink bg-paper p-2 shadow-hard transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:hidden ${
            open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.97] opacity-0"
          }`}
        >
          <nav className="flex flex-col font-mono text-[13px] uppercase tracking-[0.14em]">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-300 hover:bg-pink ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                }`}
              >
                {item.label}
                <span aria-hidden>→</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
