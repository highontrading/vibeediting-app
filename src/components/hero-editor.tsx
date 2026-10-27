// Decorative "editor window": an AI chat calling vibeediting tools above a timeline.
const toolCalls = [
  { name: "analyze_video", detail: "hook weak in first 3s" },
  { name: "cut_silences", detail: "removed 41 pauses · −1:12" },
  { name: "add_captions", detail: "hinglish · yellow pop" },
  { name: "render_motion_graphic", detail: "title card + stat chart" },
  { name: "export_video", detail: "reel_final.mp4 · 9:16" },
];

const tracks = [
  { label: "V2", color: "bg-amber/80", clips: [[8, 14], [46, 12], [78, 10]] },
  { label: "V1", color: "bg-violet/80", clips: [[0, 22], [23, 18], [42, 30], [73, 27]] },
  { label: "T1", color: "bg-neon/80", clips: [[2, 9], [13, 8], [24, 12], [40, 9], [52, 14], [70, 10], [83, 12]] },
  { label: "A1", color: "bg-teal/70", clips: [[0, 100]] },
];

export function HeroEditor() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-panel shadow-2xl shadow-black/60">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-neon/70" />
        <span className="ml-3 font-mono text-[11px] text-dim">claude code · ~/videos/reel-42</span>
      </div>

      <div className="space-y-3 p-4 font-mono text-[12px] leading-relaxed sm:text-[13px]">
        <p className="text-fg">
          <span className="text-neon">{">"}</span> Cut the silences, add yellow Hinglish captions and a title card.
          Make it a 9:16 reel.
        </p>
        <ul className="space-y-1.5">
          {toolCalls.map((call) => (
            <li key={call.name} className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-teal">✓</span>
              <span className="text-violet">vibeediting.{call.name}</span>
              <span className="text-dim">{call.detail}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted">
          Done. Your reel is ready in <span className="text-fg">exports/reel_final.mp4</span>
          <span className="animate-blink ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-neon" />
        </p>
      </div>

      <div className="border-t border-line bg-bg/60 p-3">
        <div className="mb-2 flex justify-between font-mono text-[10px] text-dim">
          <span>00:00</span>
          <span>00:15</span>
          <span>00:30</span>
          <span>00:45</span>
        </div>
        <div className="relative space-y-1.5">
          {tracks.map((track) => (
            <div key={track.label} className="flex items-center gap-2">
              <span className="w-5 font-mono text-[10px] text-dim">{track.label}</span>
              <div className="relative h-5 flex-1 rounded-sm bg-panel-2">
                {track.clips.map(([left, width]) => (
                  <span
                    key={left}
                    className={`absolute inset-y-0.5 rounded-[3px] ${track.color}`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-7 right-0">
            <span className="animate-playhead absolute -top-1 bottom-0 w-px bg-rose">
              <span className="absolute -left-1 -top-0.5 h-2 w-2 rotate-45 bg-rose" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
