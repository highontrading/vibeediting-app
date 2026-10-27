import { PillLink } from "@/components/ui";
import { Scissors } from "@/components/stickers";

export default function NotFound() {
  return (
    <section className="bg-paper-grid -mt-20 flex flex-col items-center px-4 pt-48 pb-32 text-center">
      <Scissors className="animate-float w-16" />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em]">404 · clip not found</p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.03em]">
        this page was cut from the timeline
      </h1>
      <PillLink href="/" className="mt-9">
        Back to home
      </PillLink>
    </section>
  );
}
