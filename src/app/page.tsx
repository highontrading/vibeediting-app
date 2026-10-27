import { HeroEditor } from "@/components/hero-editor";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { ButtonLink, Eyebrow, SectionHeading, formatInr } from "@/components/ui";
import { agents, enabledPlans, features, site, steps } from "@/config/site";

const trackColor = {
  video: "bg-violet",
  audio: "bg-teal",
  text: "bg-neon",
  fx: "bg-amber",
} as const;

const trackLabel = { video: "V", audio: "A", text: "T", fx: "FX" } as const;

export default function Home() {
  const startingPrice = Math.min(...enabledPlans().map((p) => p.priceInr));

  return (
    <>
      {/* Hero */}
      <section className="bg-grid relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-neon/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Eyebrow>MCP for AI video editing</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted">
              vibeediting plugs into <span className="text-fg">Claude Code, Codex or Cursor</span> and gives your AI real
              editing tools. Cut silences, add captions, B-roll and motion graphics for Reels, Shorts and YouTube.
              All on your own computer.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/checkout">Get it for {formatInr(startingPrice)}</ButtonLink>
              <ButtonLink href="/docs" variant="ghost">
                See the tutorials
              </ButtonLink>
            </div>
            <p className="mt-4 font-mono text-xs text-dim">One-time payment · Pay with UPI · Key emailed instantly</p>
          </div>
          <HeroEditor />
        </div>
      </section>

      {/* Works with */}
      <section className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-dim">Works inside</p>
          <ul className="grid w-full grid-cols-2 gap-3 md:flex md:w-auto md:gap-8">
            {agents.map((a) => (
              <li key={a.name} className="rounded-lg border border-line px-4 py-2.5 md:border-0 md:p-0">
                <p className="font-semibold">{a.name}</p>
                <p className="text-xs text-dim">{a.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading
          eyebrow="How it works"
          title="From raw footage to a finished reel, by chatting"
          body="No new app to learn. You keep using the AI agent you already have. vibeediting gives it the hands to edit."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-line bg-panel p-6">
              <span className="font-mono text-sm text-neon">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 border-y border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <SectionHeading
            eyebrow="Features"
            title="One MCP. Your whole editing pipeline."
            body="Talking-head reels, YouTube videos, podcasts and ads. Ask for what you want in plain English or Hinglish."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="bg-bg p-6">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-6 rounded-sm ${trackColor[f.track]}`} />
                  <span className="font-mono text-[10px] text-dim">{trackLabel[f.track]}</span>
                  {f.soon && (
                    <span className="ml-auto rounded-full border border-line-strong px-2 py-0.5 font-mono text-[10px] text-muted">
                      soon
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-pretty text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy / local */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <div className="grid gap-10 rounded-2xl border border-line bg-panel p-8 md:grid-cols-2 md:p-12">
          <div>
            <Eyebrow>Runs on your computer</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              Your footage never leaves your machine.
            </h2>
            <p className="mt-4 text-pretty text-muted">
              vibeediting runs locally, next to your files. No uploads, no waiting for a cloud render, no per-video
              credits. Edit as many videos as you like.
            </p>
          </div>
          <ul className="grid content-center gap-4 font-mono text-sm">
            {[
              ["No uploads", "Files stay on your disk"],
              ["No credits", "No per-video fees from us"],
              ["No new app", "Use the AI you already have"],
              ["Copyright-safe B-roll", "Motion graphics made as code + free stock"],
            ].map(([title, body]) => (
              <li key={title} className="flex items-start gap-3 rounded-lg border border-line bg-bg px-4 py-3">
                <span className="text-neon">■</span>
                <span>
                  <span className="text-fg">{title}</span>
                  <span className="block text-xs text-dim">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 border-y border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing. Pay once."
            body="Everything you need to start editing with AI: the MCP, the workflows and the tutorials."
          />
          <Pricing />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Faq />
      </section>

      {/* Final CTA */}
      <section className="border-t border-line">
        <div className="bg-grid mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Stop spending hours on edits. <span className="text-neon">Start vibe editing.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/checkout">Get it for {formatInr(startingPrice)}</ButtonLink>
            <ButtonLink href="/docs/getting-started" variant="ghost">
              Read the setup guide
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
