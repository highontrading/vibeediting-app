import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Buttons: ink outline, mono label and a hard pastel offset shadow that grows on hover.
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-ink px-5 py-3 font-mono text-[13px] font-medium tracking-tight transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-60";
const btnVariants = {
  primary: "bg-lime shadow-lilac hover:shadow-[7px_7px_0_0_var(--color-lilac)]",
  ghost: "bg-paper shadow-pink hover:shadow-[7px_7px_0_0_var(--color-pink)]",
  solid: "bg-ink text-cream shadow-pink hover:shadow-[7px_7px_0_0_var(--color-pink)]",
};
type Variant = keyof typeof btnVariants;

export function PillLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${btnBase} ${btnVariants[variant]} ${className}`} {...props} />;
}

export function PillButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${btnBase} ${btnVariants[variant]} ${className}`} {...props} />;
}

// Small uppercase mono label, e.g. "WELCOME TO VIBEEDITING"
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft ${className}`}>{children}</p>;
}

// Pastel box tag that looks stuck onto the page
export function Tag({
  children,
  color = "blue",
  className = "",
}: {
  children: ReactNode;
  color?: Pastel;
  className?: string;
}) {
  return (
    <span
      className={`inline-block border border-ink/70 px-2.5 py-1.5 text-center font-mono text-[10px] leading-tight uppercase tracking-wider ${pastelBg[color]} ${className}`}
    >
      {children}
    </span>
  );
}

// A tilted chip with something you would type to your AI.
export function PromptChip({
  children,
  color = "butter",
  className = "",
}: {
  children: ReactNode;
  color?: Pastel;
  className?: string;
}) {
  return (
    <span
      className={`inline-block max-w-[230px] rounded-lg border-[1.5px] border-ink px-3 py-2 font-mono text-[12px] leading-snug font-medium shadow-sticker ${pastelBg[color]} ${className}`}
    >
      {children}
    </span>
  );
}

export type Pastel = "pink" | "blue" | "green" | "lime" | "lilac" | "butter" | "peach";
export const pastelBg: Record<Pastel, string> = {
  pink: "bg-pink",
  blue: "bg-blue",
  green: "bg-green",
  lime: "bg-lime",
  lilac: "bg-lilac",
  butter: "bg-butter",
  peach: "bg-peach",
};

export function SectionIntro({
  label,
  title,
  body,
  icon,
  className = "",
}: {
  label: string;
  title: ReactNode;
  body?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      <div className="flex items-center justify-center gap-3">
        {icon}
        <Label>{label}</Label>
      </div>
      <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl">{title}</h2>
      {body && (
        <p className="mx-auto mt-5 max-w-xl font-mono text-[14px] leading-relaxed text-pretty text-ink-soft">{body}</p>
      )}
    </div>
  );
}

export function SerifHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif text-5xl leading-[1.02] tracking-[-0.025em] text-balance sm:text-6xl ${className}`}>
      {children}
    </h2>
  );
}

// Full-width section that sits on the page like a sheet of paper, with rounded top corners.
export function Sheet({
  children,
  id,
  tone = "paper",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "paper" | "grid" | "pink";
  className?: string;
}) {
  const bg = { paper: "bg-[#f6f5f0]", grid: "bg-paper-grid", pink: "bg-pink-grid" }[tone];
  return (
    <section
      id={id}
      className={`relative -mt-8 scroll-mt-20 rounded-t-[36px] border-t-[1.5px] border-ink sm:rounded-t-[48px] ${bg} ${className}`}
    >
      {children}
    </section>
  );
}

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
