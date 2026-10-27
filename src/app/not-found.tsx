import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-grid flex flex-col items-center px-4 py-28 text-center">
      <p className="font-mono text-sm text-neon">404 · clip not found</p>
      <h1 className="mt-3 text-3xl font-semibold">This page was cut from the timeline.</h1>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </section>
  );
}
