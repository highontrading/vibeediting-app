"use client";

import { useEffect } from "react";

// Fades in every element marked with `data-reveal` as it scrolls into view.
// The `reveal-ready` class is added by an inline script in <head> before first paint,
// so nothing flashes; this component then reveals elements and keeps watching for new ones.
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("reveal-ready")) return;
    root.classList.add("reveal-live");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const watch = (scope: ParentNode) =>
      scope.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => io.observe(el));

    watch(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]")) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

// Runs before first paint. Only hides content when animations are allowed and JS works;
// if the app never starts, everything becomes visible again after 2.5s.
export const revealBootScript = `(function(){try{var d=document.documentElement;if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('reveal-ready');setTimeout(function(){if(!d.classList.contains('reveal-live'))d.classList.remove('reveal-ready')},2500)}catch(e){}})();`;
