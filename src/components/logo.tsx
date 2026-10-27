import Link from "next/link";
import { site } from "@/config/site";

// The logo image keeps its own proportions: fixed height, automatic width (capped so a wide logo can't push the menu).
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <Link href="/" aria-label="vibe editing home" className="flex shrink-0 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- remote logo of unknown size; plain img keeps its natural aspect ratio */}
      <img
        src={site.logo}
        alt="vibe editing"
        className={`block w-auto object-contain ${lg ? "h-14 max-w-[260px] sm:h-16" : "h-9 max-w-[150px] sm:h-11 sm:max-w-[190px]"}`}
        decoding="async"
        fetchPriority={lg ? "auto" : "high"}
      />
    </Link>
  );
}
