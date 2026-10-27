import { ReelCarousel } from "@/components/reel-carousel";
import { FeatureRail } from "@/components/feature-rail";
import { FeatureVisual } from "@/components/feature-visual";
import { ChatMockup, FolderMockup } from "@/components/mockups";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Bolt, ChatBubble, Clapper, Cursor, Heart, PlayBadge, Scissors, Sparkle } from "@/components/stickers";
import { Label, PillLink, SectionIntro, SerifHeading, Tag, formatInr, pastelBg, type Pastel } from "@/components/ui";
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
    color: "green",
    rotate: "rotate-1",
  },
  {
    title: "Editors & agencies",
    body: "Let the AI do the rough cut and captions. You spend your time on the craft.",
    color: "lilac",
    rotate: "-rotate-1",
  },
];

export default function Home() {
  const startingPrice = Math.min(...enabledPlans().map((p) => p.priceInr));

  return (
    <>
      {/* Hero */}
      <section className="bg-paper-grid relative -mt-20 overflow-hidden pt-20">
        <div className="relative mx-auto max-w-6xl px-4 pt-14 text-center sm:px-6 sm:pt-20">
          <Clapper className="animate-float absolute top-10 left-[6%] hidden w-16 sm:block" style={{ "--r": "-12deg" } as React.CSSProperties} />
          <ChatBubble className="animate-float absolute top-8 right-[10%] w-14 [animation-delay:-2s] sm:w-16" style={{ "--r": "8deg" } as React.CSSProperties} />
          <Sparkle className="animate-float absolute top-[52%] right-[4%] hidden w-10 [animation-delay:-1s] md:block" />
          <Scissors className="animate-float absolute top-[62%] left-[9%] hidden w-12 [animation-delay:-3s] md:block" style={{ "--r": "-20deg" } as React.CSSProperties} />

          <h1 className="relative mx-auto max-w-5xl">
            <span className="highlight inline-block text-[13vw] leading-[0.95] font-extrabold tracking-[-0.055em] sm:text-7xl lg:text-[104px]">
              edit videos
            </span>
            <span className="mt-1 block font-serif text-[12.5vw] leading-[0.92] tracking-[-0.035em] sm:text-7xl lg:text-[100px]">
              by just talking
            </span>
            <span className="block font-serif text-[12.5vw] leading-[0.92] tracking-[-0.035em] sm:text-7xl lg:text-[100px]">
              to your <span className="italic">AI</span>
            </span>
          </h1>
          <div className="absolute top-[30%] left-[3%] hidden -rotate-3 lg:block">
            <Tag>
              where raw footage
              <br />
              gets edited by ai
            </Tag>
          </div>

          <p className="mx-auto mt-7 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-soft sm:text-base">
            vibeediting is an MCP that gives <b className="text-ink">Claude Code, Codex and Cursor</b> real video-editing
            tools. Cuts, captions, B-roll and motion graphics for Reels, Shorts and YouTube, all on your own computer.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <PillLink href="/checkout">Get it for {formatInr(startingPrice)}</PillLink>
            <PillLink href="/docs" variant="ghost">
              See the tutorials
            </PillLink>
          </div>
        </div>

        <div className="relative mt-6 pb-10 sm:mt-4">
          <ReelCarousel reels={heroReels} />
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-ink bg-green py-2.5" aria-hidden>
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={`${copy}-${i}`} className="px-5 font-mono text-[12px] uppercase tracking-[0.14em] whitespace-nowrap">
                  {item} <span className="pl-5">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Works inside */}
      <section className="border-b border-ink/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-8 sm:px-6 md:flex-row md:justify-between">
          <Label>Works inside the AI you already use</Label>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {agents.map((a) => (
              <li key={a.name} className="rounded-full border border-ink bg-paper px-4 py-2 text-sm">
                <span className="font-bold">{a.name}</span>
                <span className="ml-2 font-mono text-[10px] text-ink-mute">{a.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Welcome + features */}
      <section id="features" className="relative scroll-mt-24 py-20 md:py-28">
        <SectionIntro
          className="px-4"
          icon={<Bolt className="w-5" />}
          label="Welcome to vibeediting"
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
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-24 border-y border-ink bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Label>How it works</Label>
            <SerifHeading className="mt-4">three steps to your first reel</SerifHeading>
            <p className="mt-5 max-w-md text-lg font-extrabold tracking-tight capitalize">
              No new app to learn. You keep the AI you already have.
            </p>
            <ol className="mt-8 space-y-3">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4 rounded-2xl border border-dashed border-ink/50 bg-cream p-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink font-serif text-xl ${
                      pastelBg[(["pink", "blue", "green"] as const)[i % 3]]
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-extrabold">{step.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative">
            <PlayBadge className="animate-float absolute -top-8 -left-6 z-10 w-14" />
            <Tag color="butter" className="absolute -right-2 -bottom-5 z-10 rotate-3">
              your ai&apos;s new
              <br />
              editing hands
            </Tag>
            <ChatMockup />
          </div>
        </div>
      </section>

      {/* Runs locally */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <FolderMockup />
        </div>
        <div className="order-1 lg:order-2">
          <Label>Runs on your computer</Label>
          <div className="mt-4 flex items-start gap-4">
            <SerifHeading>your footage never leaves your laptop</SerifHeading>
            <Heart className="animate-float mt-2 hidden w-12 shrink-0 sm:block" style={{ "--r": "10deg" } as React.CSSProperties} />
          </div>
          <p className="mt-5 text-lg font-extrabold tracking-tight capitalize">
            No uploads. No waiting for cloud renders. No per-video credits.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            vibeediting runs locally, right next to your files. Your AI agent plans the edit, and the work happens on your
            machine. Edit as many videos as you like.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {["No uploads", "No credits", "No new app", "Copyright-safe B-roll"].map((t, i) => (
              <li
                key={t}
                className={`rounded-full border border-ink px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider ${
                  pastelBg[(["pink", "blue", "green", "lilac"] as const)[i]]
                }`}
              >
                {t}
              </li>
            ))}
          </ul>
          <PillLink href="/docs/getting-started" className="mt-8">
            Read the setup guide
          </PillLink>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-ink/15 bg-paper-grid">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <SectionIntro
            label="Who it's for"
            title="Made for people who'd rather be creating"
            icon={<Cursor className="w-5" />}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className={`rounded-2xl border border-ink p-1.5 shadow-sticker transition-transform hover:rotate-0 ${a.rotate} ${pastelBg[a.color]}`}
              >
                <div className="h-full rounded-xl border border-dashed border-ink/50 p-6">
                  <h3 className="font-serif text-3xl leading-none tracking-tight lowercase">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 border-y border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <SectionIntro
            label="Pricing"
            title="Simple pricing. Pay once."
            body="The MCP, every workflow and all the tutorials. No subscriptions, no per-video credits."
            icon={<Sparkle className="w-5" fill="#f9c6d8" />}
          />
          <Pricing />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto grid max-w-6xl scroll-mt-24 gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Label>FAQ</Label>
          <SerifHeading className="mt-4">questions? we&apos;ve got answers</SerifHeading>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Can&apos;t find what you need? Write to us at{" "}
            <a href={`mailto:${business.email}`} className="font-bold text-ink underline decoration-pink-deep decoration-2 underline-offset-4">
              {business.email}
            </a>
            .
          </p>
          <ChatBubble className="animate-float mt-8 hidden w-20 lg:block" style={{ "--r": "-6deg" } as React.CSSProperties} />
        </div>
        <Faq />
      </section>

      {/* Final CTA */}
      <section className="bg-pink-grid relative overflow-hidden border-t border-ink">
        <Sparkle className="animate-float absolute top-10 left-[8%] w-12" />
        <Clapper className="animate-float absolute right-[7%] bottom-12 hidden w-16 [animation-delay:-2s] sm:block" style={{ "--r": "10deg" } as React.CSSProperties} />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6">
          <Label>Ready when you are</Label>
          <h2 className="mt-5 font-serif text-[15vw] leading-[0.9] tracking-[-0.04em] sm:text-8xl">
            stop editing.
            <br />
            <span className="italic">start vibing.</span>
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PillLink href="/checkout">Get it for {formatInr(startingPrice)}</PillLink>
            <PillLink href="/docs/getting-started" variant="ghost">
              Read the setup guide
            </PillLink>
          </div>
        </div>
      </section>
    </>
  );
}
