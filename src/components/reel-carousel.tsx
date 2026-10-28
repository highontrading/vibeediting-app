"use client";

import { useEffect, useRef } from "react";
import type { HeroReel } from "@/config/site";

// Laptop/tablet: cards sit on a gentle arch and drift left → right.
// Phone: cards drift right → left. The middle card is shown in full on top, with its neighbours
// tucked behind it on both sides. Cards glide quickly between slots and ease into the middle,
// and two cards only swap which is on top while they are side by side, so nothing flickers.
// Both drift continuously; dragging or swiping moves them freely, with momentum.
// `offset` is measured in cards.
const AUTO_SPEED = 0.22; // laptop: cards per second
// Phone: average speed, and how much it eases off while a card is in the centre (0 = constant
// speed, closer to 1 = longer pause in the centre). It never fully stops.
const PHONE_SPEED = 0.42;
const PHONE_EASE = 0.6;
const RESUME_AFTER = 1600; // ms of no touching before the automatic movement comes back
const BUTTON_MOVE = 600; // ms for the arrow buttons

const isStack = (width: number) => width < 640;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const STACK_CARD = 200; // px, must match the phone card width below

function layout(rel: number, width: number) {
  const abs = Math.abs(rel);
  if (isStack(width)) {
    const side = Math.sign(rel);
    // `near` rises smoothly from 0 (card in the centre) to 1 (card tucked to the side). It is flat
    // at the centre, so each card glides in, lingers briefly in full view and glides out, with no
    // stops anywhere else. At abs 0.5, when two cards swap which is on top, they don't overlap.
    const near = 1 - Math.exp(-((abs / 0.42) ** 2));
    return {
      x: side * STACK_CARD * (0.56 * near + 0.06 * abs),
      y: 10 * near + 8 * abs,
      rotate: side * (4 * near + 3 * abs),
      scale: 1 - 0.18 * near - 0.04 * abs,
      opacity: abs > 2 ? Math.max(0, 1 - (abs - 2) * 1.4) : 1,
      shade: 0.12 * near + 0.07 * Math.max(0, abs - 1),
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
          if (t >= 1) s.tween = null;
        } else if (Math.abs(s.velocity) > 0.01) {
          s.offset += s.velocity * dt;
          s.velocity *= Math.pow(0.04, dt); // momentum fades out
        } else {
          s.velocity = 0;
        }

        const idle = now - s.lastTouch > RESUME_AFTER && !s.tween;
        s.autoBlend += ((idle ? 1 : 0) - s.autoBlend) * Math.min(1, dt * 2);
        if (!reduceMotion) {
          if (stack) {
            // Right → left, slowest while a card is centred (offset near a whole number).
            const ease = 1 - PHONE_EASE * Math.cos(2 * Math.PI * (s.offset - Math.floor(s.offset)));
            s.offset += PHONE_SPEED * ease * s.autoBlend * dt;
          } else {
            s.offset -= AUTO_SPEED * s.autoBlend * dt; // left → right
          }
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

    const spacing = () => (isStack(width) ? 150 : 205);
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
