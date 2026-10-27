// Hand-drawn style stickers: pastel fills, ink outlines. Decorative only.
type P = { className?: string; style?: React.CSSProperties };
const stroke = { stroke: "#1f1d1b", strokeWidth: 2.2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export function ChatBubble({ className, style }: P) {
  return (
    <svg viewBox="0 0 64 48" className={className} style={style} aria-hidden>
      <path d="M8 6h48a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H24l-12 9 2-9H8a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" fill="#fff" {...stroke} />
      <circle cx="22" cy="20" r="3.4" fill="#1f1d1b" />
      <circle cx="32" cy="20" r="3.4" fill="#1f1d1b" />
      <circle cx="42" cy="20" r="3.4" fill="#1f1d1b" />
    </svg>
  );
}

export function Clapper({ className, style }: P) {
  return (
    <svg viewBox="0 0 64 60" className={className} style={style} aria-hidden>
      <rect x="6" y="22" width="52" height="32" rx="4" fill="#f9c6d8" {...stroke} />
      <path d="M6 22 54 9l3 9L9 31z" fill="#fff" {...stroke} />
      <path d="M17 19l7 7M29 16l7 7M41 13l7 7" {...stroke} />
      <path d="M14 36h36M14 44h22" {...stroke} />
    </svg>
  );
}

export function Scissors({ className, style }: P) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
      <path d="M26 30 56 8M26 34l30 22" {...stroke} strokeWidth={3} />
      <circle cx="16" cy="22" r="9" fill="#bfe3ea" {...stroke} />
      <circle cx="16" cy="42" r="9" fill="#bfe3ea" {...stroke} />
      <circle cx="29" cy="32" r="2.5" fill="#1f1d1b" />
    </svg>
  );
}

export function Sparkle({ className, style, fill = "#fde7a8" }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <path d="M24 3c2 11 6 17 21 21-15 4-19 10-21 21-2-11-6-17-21-21 15-4 19-10 21-21z" fill={fill} {...stroke} />
    </svg>
  );
}

export function PlayBadge({ className, style }: P) {
  return (
    <svg viewBox="0 0 56 56" className={className} style={style} aria-hidden>
      <circle cx="28" cy="28" r="24" fill="#c4dc94" {...stroke} />
      <path d="M23 18v20l16-10z" fill="#1f1d1b" {...stroke} strokeWidth={1.5} />
    </svg>
  );
}

export function Bolt({ className, style }: P) {
  return (
    <svg viewBox="0 0 32 40" className={className} style={style} aria-hidden>
      <path d="M19 2 4 23h10l-3 15 17-23H17z" fill="#fde7a8" {...stroke} strokeWidth={2} />
    </svg>
  );
}

export function Heart({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 44" className={className} style={style} aria-hidden>
      <path d="M24 40S4 28 4 15a10 10 0 0 1 20-4 10 10 0 0 1 20 4c0 13-20 25-20 25z" fill="#f08db0" {...stroke} />
    </svg>
  );
}

export function Cursor({ className, style }: P) {
  return (
    <svg viewBox="0 0 40 44" className={className} style={style} aria-hidden>
      <path d="M6 4l28 16-12 3-6 12z" fill="#d9cdf5" {...stroke} />
    </svg>
  );
}

// Brand mark: an ink flower with a play button in the middle.
export function FlowerMark({ className, style }: P) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
      {petals.map((deg) => (
        <ellipse key={deg} cx="32" cy="15" rx="8.5" ry="13" fill="#1f1d1b" transform={`rotate(${deg} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="12" fill="#1f1d1b" />
      <path d="M28.5 25.5v13l10.5-6.5z" fill="#d6f5a2" />
    </svg>
  );
}

// Round badge with text spinning around a smiley. Pass a position class (relative/absolute) in className.
export function SpinBadge({ className, text = "edit · vibe · post · repeat · " }: P & { text?: string }) {
  return (
    <div className={className ?? "relative"} aria-hidden>
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#fffdf8" stroke="#1f1d1b" strokeWidth="1.5" />
        <text fontFamily="DM Mono, monospace" fontSize="11.5" letterSpacing="2.2" fill="#1f1d1b">
          <textPath href="#badge-circle">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="badge-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f9c6d8" />
            <stop offset="0.5" stopColor="#d9cdf5" />
            <stop offset="1" stopColor="#d6f5a2" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="27" fill="url(#badge-face)" stroke="#1f1d1b" strokeWidth="2.5" />
        <path d="M49 55q3-5 6 0M65 55q3-5 6 0" fill="none" stroke="#1f1d1b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M48 64q12 12 24 0" fill="none" stroke="#1f1d1b" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
