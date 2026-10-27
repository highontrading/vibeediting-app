import Link from "next/link";

// Text-only wordmark: "vibe" in italic serif on a pink highlighter swipe, "editing" upright.
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <Link
      href="/"
      aria-label="vibe editing home"
      className={`font-serif leading-none tracking-[-0.03em] whitespace-nowrap ${lg ? "text-5xl" : "text-[25px] sm:text-[30px]"}`}
    >
      <span className="highlight italic">vibe</span> editing
    </Link>
  );
}
