import Link from "next/link";
import { FlowerMark } from "./stickers";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <Link href="/" aria-label="vibeediting home" className="flex items-center gap-2">
      <FlowerMark className={lg ? "w-14" : "w-9"} />
      <span className={`font-serif leading-none tracking-[-0.03em] ${lg ? "text-4xl" : "text-[22px] sm:text-[26px]"}`}>
        vibe<span className="italic">editing</span>
      </span>
    </Link>
  );
}
