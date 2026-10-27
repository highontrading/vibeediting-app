"use client";

import { useEffect, useRef } from "react";
import type { HeroReel } from "@/config/site";

// Cards sit on a gentle arch. `offset` is measured in cards: it drifts on its own
// (cards travel left → right), and dragging or swiping spins it with momentum.
const AUTO_SPEED = 0.22; // cards per second
const RESUME_AFTER = 1600; // ms of no touching before the auto drift comes back

function layout(rel: number, width: number) {
  const mobile = width < 640;
  const spacing = mobile ? 150 : 205;
  const abs = Math.abs(rel);
  const x = rel * spacing * (1 - Math.min(abs, 4) * 0.035);
  const y = abs * abs * (mobile ? 9 : 12);
  const rotate = rel * (mobile ? 5 : 6);
  const scale = 1 - Math.min(abs, 4) * 0.07;
  const opacity = abs > 3.6 ? Math.max(0, 1 - (abs - 3.6) * 1.5) : 1;
  return { x, y, rotate, scale, opacity, z: 100 - Math.round(abs * 10) };
}

function wrap(value: number, count: number) {
  return ((((value + count / 2) % count) + count) % count) - count / 2;
}

function styleFor(rel: number, width: number, bob = 0) {
  const l = layout(rel, width);
  return {
    transform: `translate3d(calc(-50% + ${l.x}px), ${l.y + bob}px, 0) rotate(${l.rotate}deg) scale(${l.scale})`,
    opacity: l.opacity,
    zIndex: l.z,
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
    target: null as number | null, // set by the arrow buttons
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

      if (!s.dragging) {
        if (s.target !== null) {
          const diff = s.target - s.offset;
          s.offset += diff * Math.min(1, dt * 8);
          if (Math.abs(diff) < 0.002) {
            s.offset = s.target;
            s.target = null;
          }
        } else if (Math.abs(s.velocity) > 0.01) {
          s.offset += s.velocity * dt;
          s.velocity *= Math.pow(0.04, dt); // momentum fades out
        } else {
          s.velocity = 0;
        }
        const idle = now - s.lastTouch > RESUME_AFTER && s.target === null;
        s.autoBlend += ((idle ? 1 : 0) - s.autoBlend) * Math.min(1, dt * 2);
        if (!reduceMotion) s.offset -= AUTO_SPEED * s.autoBlend * dt;
      }

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rel = wrap(i - s.offset, count);
        const bob = reduceMotion ? 0 : Math.sin(now / 900 + i * 1.7) * 6;
        Object.assign(el.style, styleFor(rel, width, bob));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const spacing = () => (width < 640 ? 150 : 205);
    const onDown = (e: PointerEvent) => {
      s.dragging = true;
      s.moved = 0;
      s.target = null;
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
    s.velocity = 0;
    s.lastTouch = performance.now();
    s.target = Math.round(s.target ?? s.offset) + dir;
  };

  return (
    <div className="relative">
      <div
        ref={stageRef}
        className="relative h-[400px] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[520px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Videos edited with vibeediting. Drag or swipe to spin."
      >
        {reels.map((reel, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-6 left-1/2 w-[168px] origin-bottom will-change-transform sm:w-[228px]"
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
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">drag to spin</span>
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
    </div>
  );
}
