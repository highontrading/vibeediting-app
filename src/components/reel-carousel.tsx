"use client";

import { useEffect, useRef } from "react";
import type { HeroReel } from "@/config/site";

// Laptop/tablet: cards sit on a gentle arch and drift left → right continuously.
// Phone: a stack. One card sits in the middle, its neighbours tucked behind it; every few
// seconds the next card swings out from behind and slides over the middle one.
// `offset` is measured in cards; dragging or swiping moves it in both layouts.
const AUTO_SPEED = 0.22; // arch: cards per second
const RESUME_AFTER = 1600; // ms of no touching before the automatic movement comes back
const STACK_HOLD = 1700; // stack: ms each card stays in the middle
const STACK_MOVE = 1000; // stack: ms for the next card to slide in
const BUTTON_MOVE = 600; // ms for the arrow buttons

const isStack = (width: number) => width < 640;

// Smoothly interpolates between keyframes [a, value] (eased between each pair).
function keyframes(points: [number, number][], a: number) {
  if (a <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [a1, v1] = points[i];
    if (a <= a1) {
      const [a0, v0] = points[i - 1];
      const t = (a - a0) / (a1 - a0);
      return v0 + (v1 - v0) * t * t * (3 - 2 * t);
    }
  }
  return points[points.length - 1][1];
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const STACK_CARD = 200; // px, must match the phone card width below

function layout(rel: number, width: number) {
  const abs = Math.abs(rel);
  const side = Math.sign(rel);
  if (isStack(width)) {
    // At abs 0.5 (half way through a change) the two cards are side by side, so the one on top
    // can switch without any flicker; at abs 1 a card is tucked behind the middle one.
    const x = side * STACK_CARD * keyframes([[0, 0], [0.5, 0.47], [1, 0.34], [2, 0.6], [3, 0.78]], abs);
    return {
      x,
      y: keyframes([[0, 0], [0.5, 8], [1, 14], [2, 26], [3, 36]], abs),
      rotate: side * keyframes([[0, 0], [0.5, 4], [1, 6], [2, 9], [3, 11]], abs),
      scale: keyframes([[0, 1], [0.5, 0.93], [1, 0.86], [2, 0.76], [3, 0.68]], abs),
      opacity: keyframes([[2, 1], [2.8, 0]], abs),
      shade: keyframes([[0, 0], [1, 0.16], [2, 0.3]], abs),
      z: 100 - Math.round(abs * 10),
    };
  }
  const spacing = 205;
  return {
    x: rel * spacing * (1 - Math.min(abs, 4) * 0.035),
    y: abs * abs * 12,
    rotate: rel * 6,
    scale: 1 - Math.min(abs, 4) * 0.07,
    opacity: abs > 3.6 ? Math.max(0, 1 - (abs - 3.6) * 1.5) : 1,
    shade: 0,
    z: 100 - Math.round(abs * 10),
  };
}

function wrap(value: number, count: number) {
  return ((((value + count / 2) % count) + count) % count) - count / 2;
}

function styleFor(rel: number, width: number, bob = 0) {
  const l = layout(rel, width);
  return {
    transform: `translate3d(calc(-50% + ${l.x}px), ${l.y + bob}px, 0) rotate(${l.rotate}deg) scale(${l.scale})`,
    opacity: String(l.opacity),
    zIndex: String(l.z),
  };
}

export function ReelCarousel({ reels }: { reels: HeroReel[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef({
    offset: 0,
    velocity: 0, // cards per second, from dragging
    dragging: false,
    moved: 0,
    lastX: 0,
    lastT: 0,
    lastTouch: -Infinity,
    autoBlend: 1,
    tween: null as { from: number; to: number; start: number; duration: number } | null,
    restSince: 0, // when the stack last came to rest on a card
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const s = state.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reels.length;
    let raf = 0;
    let prev = performance.now();
    let width = stage.clientWidth;
    const ro = new ResizeObserver(() => (width = stage.clientWidth));
    ro.observe(stage);

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const stack = isStack(width);

      if (!s.dragging) {
        if (s.tween) {
          const t = Math.min(1, (now - s.tween.start) / s.tween.duration);
          s.offset = s.tween.from + (s.tween.to - s.tween.from) * easeInOut(t);
          if (t >= 1) {
            s.tween = null;
            s.restSince = now;
          }
        } else if (Math.abs(s.velocity) > 0.01) {
          s.offset += s.velocity * dt;
          s.velocity *= Math.pow(0.04, dt); // momentum fades out
        } else {
          s.velocity = 0;
        }

        const idle = now - s.lastTouch > RESUME_AFTER && !s.tween;
        if (stack) {
          // Hold on a card, then slide the next one in.
          s.autoBlend = 0;
          if (!reduceMotion && idle && s.velocity === 0 && now - s.restSince > STACK_HOLD) {
            const from = Math.round(s.offset);
            s.tween = { from: s.offset, to: from - 1, start: now, duration: STACK_MOVE };
          }
        } else {
          s.autoBlend += ((idle ? 1 : 0) - s.autoBlend) * Math.min(1, dt * 2);
          if (!reduceMotion) s.offset -= AUTO_SPEED * s.autoBlend * dt;
        }
      }

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rel = wrap(i - s.offset, count);
        const bob = reduceMotion ? 0 : Math.sin(now / 900 + i * 1.7) * (stack ? 3 : 6);
        Object.assign(el.style, styleFor(rel, width, bob));
        const shade = el.querySelector<HTMLElement>("[data-shade]");
        if (shade) shade.style.opacity = String(layout(rel, width).shade);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const spacing = () => (isStack(width) ? STACK_CARD * 0.75 : 205);
    const onDown = (e: PointerEvent) => {
      s.dragging = true;
      s.moved = 0;
      s.tween = null;
      s.velocity = 0;
      s.lastX = e.clientX;
      s.lastT = performance.now();
      s.lastTouch = s.lastT;
      stage.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const now = performance.now();
      const dx = e.clientX - s.lastX;
      const delta = -dx / spacing();
      s.offset += delta;
      s.moved += Math.abs(dx);
      const dt = Math.max(1, now - s.lastT) / 1000;
      s.velocity = s.velocity * 0.6 + (delta / dt) * 0.4;
      s.lastX = e.clientX;
      s.lastT = now;
      s.lastTouch = now;
    };
    const onUp = () => {
      if (!s.dragging) return;
      s.dragging = false;
      s.lastTouch = performance.now();
      if (performance.now() - s.lastT > 80) s.velocity = 0;
      s.velocity = Math.max(-12, Math.min(12, s.velocity));
      if (isStack(width)) {
        // Settle on the nearest card in the swipe direction, so one card always ends up in the middle.
        const to = Math.round(s.offset + s.velocity * 0.18);
        s.velocity = 0;
        s.tween = { from: s.offset, to, start: performance.now(), duration: 520 };
      }
    };
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, [reels.length]);

  const step = (dir: 1 | -1) => {
    const s = state.current;
    const now = performance.now();
    s.velocity = 0;
    s.lastTouch = now;
    s.tween = { from: s.offset, to: Math.round(s.tween?.to ?? s.offset) + dir, start: now, duration: BUTTON_MOVE };
  };

  return (
    <div className="relative">
      <div
        ref={stageRef}
        className="relative h-[430px] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[520px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Videos edited with vibe editing. Swipe or drag to browse."
      >
        {reels.map((reel, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-6 left-1/2 w-[200px] origin-bottom will-change-transform sm:w-[228px]"
            // Same position the first animation frame computes, so there is no jump on load.
            style={styleFor(wrap(i, reels.length), 1200)}
          >
            <ReelCard reel={reel} />
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous video"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-paper text-lg transition hover:bg-pink"
        >
          ←
        </button>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          <span className="sm:hidden">swipe</span>
          <span className="hidden sm:inline">drag to spin</span>
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next video"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-paper text-lg transition hover:bg-pink"
        >
          →
        </button>
      </div>
    </div>
  );
}

function ReelCard({ reel }: { reel: HeroReel }) {
  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-ink/10 shadow-[0_18px_40px_-18px_rgb(31_29_27/0.45)]">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={reel.src}
        poster={reel.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        draggable={false}
      />
      {/* Darkens cards behind the middle one on phones */}
      <span data-shade aria-hidden className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
    </div>
  );
}
