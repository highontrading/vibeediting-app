import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const pillBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-full border border-ink px-5 py-2.5 text-sm font-bold tracking-tight transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50";
const pillVariants = {
  primary: "bg-paper hover:bg-pink hover:shadow-sticker hover:-translate-x-0.5 hover:-translate-y-0.5",
  solid: "bg-ink text-cream hover:bg-ink-soft",
  ghost: "bg-transparent hover:bg-paper",
};

function Dot({ variant }: { variant: keyof typeof pillVariants }) {
  return (
    <span
      aria-hidden
      className={`h-2.5 w-2.5 rounded-full ${variant === "solid" ? "bg-pink" : "bg-pink-deep"} transition-transform group-hover:scale-125`}
    />
  );
}

export function PillLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof pillVariants }) {
  return (
    <Link className={`${pillBase} ${pillVariants[variant]} ${className}`} {...props}>
      <Dot variant={variant} />
      {children}
    </Link>
  );
}

export function PillButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof pillVariants }) {
  return (
    <button className={`${pillBase} ${pillVariants[variant]} ${className}`} {...props}>
      <Dot variant={variant} />
      {children}
    </button>
  );
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

export type Pastel = "pink" | "blue" | "green" | "lilac" | "butter" | "peach";
export const pastelBg: Record<Pastel, string> = {
  pink: "bg-pink",
  blue: "bg-blue",
  green: "bg-green",
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
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance capitalize sm:text-4xl">{title}</h2>
      {body && <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-soft">{body}</p>}
    </div>
  );
}

export function SerifHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif text-5xl leading-[0.92] tracking-[-0.03em] text-balance lowercase sm:text-6xl ${className}`}>
      {children}
    </h2>
  );
}

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
