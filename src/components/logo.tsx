import Link from "next/link";
import { site } from "@/config/site";

// The logo image keeps its own proportions: fixed height, automatic width. In the navbar it can shrink
// (never stretch) on very narrow phones so it never pushes the buttons off screen.
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <Link href="/" aria-label="vibe editing home" className={`flex min-w-0 items-center ${lg ? "shrink-0" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote logo of unknown size; plain img keeps its natural aspect ratio */}
      <img
        src={site.logo}
        alt="vibe editing"
        className={`block w-auto object-contain ${lg ? "h-20 max-w-full sm:h-24" : "h-11 max-w-full sm:h-[52px] lg:h-14"}`}
        decoding="async"
        fetchPriority={lg ? "auto" : "high"}
      />
    </Link>
  );
}
