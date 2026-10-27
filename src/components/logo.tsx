import Link from "next/link";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link
      href="/"
      aria-label="vibeediting home"
      className={`font-serif leading-none tracking-[-0.04em] ${size === "lg" ? "text-7xl sm:text-8xl" : "text-[34px]"}`}
    >
      vibe<span className="text-pink-deep">.</span>
    </Link>
  );
}
