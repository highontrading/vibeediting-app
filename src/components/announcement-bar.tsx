import Link from "next/link";
import { enabledPlans } from "@/config/site";
import { formatInr } from "./ui";

export function AnnouncementBar() {
  const plan = enabledPlans()[0];
  return (
    <Link
      href="/checkout"
      className="block border-b border-ink/15 bg-blue px-4 py-2 text-center text-xs font-semibold tracking-tight hover:underline"
    >
      {plan ? `Launch price ${formatInr(plan.priceInr)}. Pay once, edit forever →` : "Edit your videos with AI →"}
    </Link>
  );
}
