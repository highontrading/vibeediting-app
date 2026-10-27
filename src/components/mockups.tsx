// Light, paper-style UI mockups used on the landing page.

const toolCalls = [
  { name: "analyze_video", detail: "hook weak in first 3s" },
  { name: "cut_silences", detail: "removed 41 pauses · −1:12" },
  { name: "add_captions", detail: "hinglish · yellow pop" },
  { name: "render_motion_graphic", detail: "title card + chart" },
  { name: "export_video", detail: "reel_final.mp4 · 9:16" },
];

export function ChatMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border-[1.5px] border-ink bg-paper shadow-sticker">
      <div className="flex items-center gap-2 border-b border-ink bg-blue px-4 py-2.5">
        <span className="h-3 w-3 rounded-full border border-ink bg-pink" />
        <span className="h-3 w-3 rounded-full border border-ink bg-butter" />
        <span className="h-3 w-3 rounded-full border border-ink bg-green" />
        <span className="ml-2 font-mono text-[11px]">claude code · ~/videos/reel-42</span>
      </div>
      <div className="space-y-4 p-5 font-mono text-[12.5px] leading-relaxed">
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm border border-ink bg-pink px-4 py-3 font-sans text-sm font-semibold">
          Cut the silences, add yellow Hinglish captions and a title card. Make it a 9:16 reel.
        </p>
        <ul className="space-y-2">
          {toolCalls.map((call) => (
            <li key={call.name} className="flex flex-wrap items-baseline gap-x-2">
              <span className="flex h-4 w-4 shrink-0 translate-y-0.5 items-center justify-center rounded-full bg-green text-[9px]">
                ✓
              </span>
              <span className="font-bold">vibeediting.{call.name}</span>
              <span className="text-ink-mute">{call.detail}</span>
            </li>
          ))}
        </ul>
        <p className="max-w-[90%] rounded-2xl rounded-bl-sm border border-ink/30 bg-cream px-4 py-3 font-sans text-sm">
          Done! Your reel is ready in <span className="font-mono font-bold">exports/reel_final.mp4</span>
          <span className="animate-blink ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-ink" />
        </p>
      </div>
    </div>
  );
}

const files = [
  { name: "raw_take_03.mp4", meta: "2.1 GB · stays here", color: "bg-lilac" },
  { name: "my-style.json", meta: "fonts, colours, timing", color: "bg-butter" },
  { name: "broll/", meta: "motion graphics · stock", color: "bg-blue" },
  { name: "exports/reel_final.mp4", meta: "ready to post ✓", color: "bg-green" },
];

export function FolderMockup() {
  return (
    <div className="relative">
      <div className="absolute -top-5 left-6 h-8 w-32 rounded-t-xl border-[1.5px] border-b-0 border-ink bg-butter" />
      <div className="relative rounded-2xl rounded-tl-none border-[1.5px] border-ink bg-butter p-2 shadow-sticker">
        <div className="rounded-xl border border-dashed border-ink/50 bg-paper p-4 sm:p-6">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
            <span>~/Videos/reel-42</span>
            <span className="rounded-full border border-ink px-2 py-0.5 normal-case tracking-normal">your laptop</span>
          </div>
          <ul className="mt-5 space-y-2.5">
            {files.map((f) => (
              <li key={f.name} className="flex items-center gap-3 rounded-lg border border-ink bg-paper px-3 py-2.5">
                <span className={`h-8 w-8 shrink-0 rounded-md border border-ink ${f.color}`} />
                <span className="min-w-0">
                  <span className="block truncate font-mono text-[12.5px] font-bold">{f.name}</span>
                  <span className="block text-xs text-ink-mute">{f.meta}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex items-center gap-2 font-mono text-[11px] text-ink-soft">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ink bg-pink text-[10px]">
              ✕
            </span>
            uploaded to the cloud: nothing
          </p>
        </div>
      </div>
    </div>
  );
}
