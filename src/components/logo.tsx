import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="vibeediting home">
      <span className="flex h-6 items-end gap-[3px]" aria-hidden>
        <span className="h-2 w-[5px] rounded-sm bg-violet" />
        <span className="h-4 w-[5px] rounded-sm bg-teal" />
        <span className="h-6 w-[5px] rounded-sm bg-neon" />
        <span className="h-3 w-[5px] rounded-sm bg-amber" />
      </span>
      <span>
        vibe<span className="text-neon">editing</span>
      </span>
    </Link>
  );
}
