import { ReelCarousel } from "@/components/reel-carousel";
import { FeatureRail } from "@/components/feature-rail";
import { FeatureVisual } from "@/components/feature-visual";
import { ChatMockup, FolderMockup } from "@/components/mockups";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Bolt, ChatBubble, Clapper, Cursor, Heart, PlayBadge, Scissors, Sparkle, SpinBadge } from "@/components/stickers";
import {
  Label,
  PillLink,
  SectionIntro,
  SerifHeading,
  Sheet,
  Tag,
  formatInr,
  pastelBg,
  type Pastel,
} from "@/components/ui";
import { agents, business, enabledPlans, features, heroReels, steps } from "@/config/site";

const marqueeItems = [
  "cut silences",
  "auto captions",
  "motion graphics",
  "free stock b-roll",
  "hook analysis",
  "reels · shorts · youtube",
  "hinglish captions",
  "your own style",
];

const localPoints = [
  "Throw in your raw takes and watch them turn into finished reels",
  "Your footage stays on your disk. Nothing is uploaded, ever",
  "No credits, no render queue. Edit as many videos as you like",
  "Motion graphics made fresh as code, plus free stock clips. No copyright stress",
];

const audiences: { title: string; body: string; color: Pastel; rotate: string }[] = [
  {
    title: "Creators",
    body: "You post every day and editing eats your evenings. Record, ask, post.",
    color: "pink",
    rotate: "-rotate-2",
  },
  {
    title: "Founders & personal brands",
    body: "You know what to say on camera, not how to cut it. Your AI now does that part.",
    color: "lime",
    rotate: "rotate-1",
  },
  {
    title: "Editors & agencies",
    body: "Let the AI do the rough cut and captions. You spend your time on the craft.",
    color: "lilac",
    rotate: "-rotate-1",
  },
];

const floatR = (deg: number) => ({ "--r": `${deg}deg` }) as React.CSSProperties;

export default function Home() {
  const startingPrice = Math.min(...enabledPlans().map((p) => p.priceInr));

  return (
    <>
      {/* Hero */}
      <section className="bg-paper-grid relative -mt-20 overflow-hidden pt-20">
        <div className="relative mx-auto max-w-6xl px-4 pt-14 text-center sm:px-6 sm:pt-20">
          <ChatBubble className="animate-float absolute top-6 right-[6%] w-12 [animation-delay:-2s] sm:w-16" style={floatR(8)} />
          <Sparkle className="animate-float absolute top-[46%] left-[4%] hidden w-10 [animation-delay:-1s] md:block" />

          <h1 data-reveal className="mx-auto max-w-4xl font-serif text-[42px] leading-[1.04] tracking-[-0.025em] text-balance sm:text-6xl lg:text-[76px]">
            Edit your videos by just talking. Meet your new <span className="highlight">AI video editor</span>.
          </h1>
          <p data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="mx-auto mt-6 max-w-xl font-mono text-[14.5px] leading-relaxed text-pretty sm:text-[15.5px]">
            Cut, caption and animate Reels, Shorts and YouTube videos with Claude Code, Codex or Cursor, right on your
            own computer.
          </p>
          <div data-reveal style={{ "--reveal-delay": "220ms" } as React.CSSProperties} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PillLink href="/checkout">Get it for {formatInr(startingPrice)}</PillLink>
            <PillLink href="/docs" variant="ghost">
              See the tutorials
            </PillLink>
          </div>
        </div>

        <div data-reveal="scale" style={{ "--reveal-delay": "320ms" } as React.CSSProperties} className="relative mx-auto mt-10 max-w-[1400px] pb-12">
          <ReelCarousel reels={heroReels} />
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y-[1.5px] border-ink bg-lime py-2.5" aria-hidden>
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={`${copy}-${i}`} className="px-5 font-mono text-[12.5px] whitespace-nowrap uppercase tracking-[0.12em]">
                  {item} <span className="pl-5">✿</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Works inside */}
      <section className="pb-8">
        <div data-reveal className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-9 sm:px-6 md:flex-row md:justify-between">
          <Label>Works inside the AI you already use</Label>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {agents.map((a) => (
              <li key={a.name} className="rounded-full border border-ink bg-paper px-4 py-2 text-sm">
                <span className="font-bold">{a.name}</span>
                <span className="ml-2 font-mono text-[11px] text-ink-mute">{a.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <Sheet id="features" tone="paper" className="pt-20 pb-28 md:pt-24">
        <SectionIntro
          className="px-4"
          icon={<Bolt className="w-5" />}
          label="Welcome to vibe editing"
          title="For the overwhelmed creator, the editing-tired founder and the reel-obsessed."
          body="One MCP gives your AI agent the hands to edit. Ask in plain English or Hinglish, and watch it cut, caption and animate your videos."
        />
        <div className="mx-auto mt-10 flex max-w-6xl justify-end px-4 sm:px-6">
          <Tag color="pink" className="rotate-2">
            one mcp
            <br />
            every edit you need
          </Tag>
        </div>
        <div className="mt-4">
          <FeatureRail features={features} visuals={features.map((f) => <FeatureVisual key={f.title} visual={f.visual} />)} />
        </div>
      </Sheet>

      {/* Runs locally */}
      <Sheet tone="grid" className="pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 pt-20 pb-20 sm:px-6 md:pt-28 lg:grid-cols-[1.1fr_1fr]">
          <div data-reveal>
            <Label>Runs on your computer</Label>
            <SerifHeading className="mt-5">Turn raw takes into ready-to-post reels</SerifHeading>
            <ul className="mt-10 space-y-4">
              {localPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-2xl border-[1.5px] border-ink bg-paper px-6 py-4 font-mono text-[14px] leading-relaxed sm:px-8 sm:text-[15px]"
                >
                  {point}
                </li>
              ))}
            </ul>
            <PillLink href="/docs/getting-started" variant="ghost" className="mt-9">
              Read the setup guide
            </PillLink>
          </div>
          <div data-reveal="scale" style={{ "--reveal-delay": "150ms" } as React.CSSProperties} className="relative px-4 py-10 sm:px-8">
            <Heart className="animate-float absolute top-0 right-6 z-10 w-12" style={floatR(10)} />
            <Clapper className="animate-float absolute -top-2 left-0 z-10 w-14 [animation-delay:-2s]" style={floatR(-10)} />
            <Scissors className="animate-float absolute right-0 bottom-0 z-10 w-14 [animation-delay:-3s]" style={floatR(-20)} />
            <Sparkle className="animate-float absolute bottom-6 left-2 z-10 w-9 [animation-delay:-1.5s]" fill="#d6f5a2" />
            <FolderMockup />
          </div>
        </div>
      </Sheet>

      {/* How it works */}
      <Sheet id="how" tone="paper" className="pb-24">
        <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 md:pt-24">
          <SectionIntro
            label="How it works"
            title="Turn late-night recordings into morning uploads"
            icon={<PlayBadge className="w-6" />}
          />
          <div data-reveal className="mt-14 rounded-[32px] border-[1.5px] border-ink bg-lime p-6 sm:p-10 lg:p-14">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h3 className="font-serif text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl">Three steps to your first reel</h3>
                <p className="mt-4 font-mono text-[14px] leading-relaxed">No new app to learn. You keep the AI you already have.</p>
                <ol className="mt-8 space-y-3">
                  {steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4 rounded-2xl border-[1.5px] border-ink bg-paper p-4">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink font-serif text-xl ${
                          pastelBg[(["pink", "blue", "lilac"] as const)[i % 3]]
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-bold">{step.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{step.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="relative">
                <Tag color="butter" className="absolute -right-2 -bottom-5 z-10 rotate-3">
                  your ai&apos;s new
                  <br />
                  editing hands
                </Tag>
                <ChatMockup />
              </div>
            </div>
          </div>
        </div>
      </Sheet>

      {/* Who it's for */}
      <Sheet tone="grid" className="pb-16">
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-20 sm:px-6 md:pt-24">
          <SectionIntro label="Who it's for" title="Made for people who would rather be creating" icon={<Cursor className="w-5" />} />
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {audiences.map((a, i) => (
              <div
                key={a.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                className={`rounded-2xl border-[1.5px] border-ink p-1.5 shadow-hard transition-transform hover:rotate-0 ${a.rotate} ${pastelBg[a.color]}`}
              >
                <div className="h-full rounded-xl border border-dashed border-ink/50 p-6">
                  <h3 className="font-serif text-3xl leading-[1.05] tracking-[-0.02em]">{a.title}</h3>
                  <p className="mt-3 font-mono text-[13.5px] leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* Pricing */}
      <Sheet id="pricing" tone="paper" className="pb-16">
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-20 sm:px-6 md:pt-24">
          <SectionIntro
            label="Pricing"
            title="Simple pricing. Pay once."
            body="The MCP, every workflow and all the tutorials. No subscriptions, no per-video credits."
            icon={<Sparkle className="w-5" fill="#f9c6d8" />}
          />
          <Pricing />
        </div>
      </Sheet>

      {/* FAQ */}
      <Sheet id="faq" tone="grid" className="pb-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-20 pb-20 sm:px-6 md:pt-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <Label>FAQ</Label>
            <SerifHeading className="mt-5">Questions? We&apos;ve got answers</SerifHeading>
            <p className="mt-6 max-w-sm font-mono text-[14px] leading-relaxed text-ink-soft">
              Can&apos;t find what you need? Write to us at{" "}
              <a href={`mailto:${business.email}`} className="font-medium text-ink underline decoration-pink-deep decoration-2 underline-offset-4">
                {business.email}
              </a>
              .
            </p>
            <SpinBadge className="relative mt-10 hidden h-28 w-28 lg:block" text="ask us anything · " />
          </div>
          <Faq />
        </div>
      </Sheet>

      {/* Final CTA */}
      <Sheet tone="pink" className="overflow-hidden">
        <Sparkle className="animate-float absolute top-14 left-[8%] w-12" />
        <Clapper className="animate-float absolute right-[7%] bottom-14 hidden w-16 [animation-delay:-2s] sm:block" style={floatR(10)} />
        <div data-reveal className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-28 text-center sm:px-6">
          <Label className="text-ink">Ready when you are</Label>
          <h2 className="mt-6 font-serif text-[52px] leading-[1] tracking-[-0.03em] text-balance sm:text-7xl lg:text-8xl">
            Stop editing. <span className="italic">Start vibing.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PillLink href="/checkout">Get it for {formatInr(startingPrice)}</PillLink>
            <PillLink href="/docs/getting-started" variant="ghost">
              Read the setup guide
            </PillLink>
          </div>
        </div>
      </Sheet>
    </>
  );
}
