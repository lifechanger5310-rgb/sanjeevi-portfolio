"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TELEMETRY = [
  "SYS.INIT // ERODE, IN",
  "STACK // NEXT.JS + FLUTTER + IOS",
  "ENGINE // MULTI-MODEL AI ORCHESTRATION",
];

const TITLE = "SANJEEVI N A".split("");

const CORNERS = [
  "left-4 top-4 border-l border-t",
  "right-4 top-4 border-r border-t",
  "bottom-4 left-4 border-b border-l",
  "bottom-4 right-4 border-b border-r",
];

export default function KineticIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      root.style.display = "none";
      document.body.style.overflow = "";
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("intro:done"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    let tl: gsap.core.Timeline | null = null;
    const pct = root.querySelector<HTMLElement>("[data-pct]");
    const proxy = { v: 0 };

    const ctx = gsap.context(() => {
      tl = gsap
        .timeline({ onComplete: finish, defaults: { ease: "power2.out" } })
        .from("[data-corner]", {
          opacity: 0,
          scale: 0.6,
          duration: 0.4,
          stagger: 0.05,
        }, 0)
        .from("[data-rule]", {
          scaleX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.inOut",
        }, 0)
        .from("[data-char]", { yPercent: 110, duration: 0.5, stagger: 0.035 }, 0.1)
        .from("[data-line]", { opacity: 0, x: -16, duration: 0.35, stagger: 0.25 }, 0.3)
        .fromTo("[data-bar]", { scaleX: 0 }, {
          scaleX: 1,
          duration: 1.7,
          ease: "power2.inOut",
        }, 0.2)
        .to(proxy, {
          v: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => {
            if (pct) {
              pct.textContent = `${String(Math.round(proxy.v)).padStart(3, "0")}%`;
            }
          },
        }, 0.2)
        .to("[data-content]", { opacity: 0, duration: 0.25 }, 1.9)
        .to(root, { yPercent: -100, duration: 0.55, ease: "power3.inOut" }, 1.95);
    }, root);

    skipRef.current = () => {
      if (finished) return;
      tl?.kill();
      gsap.to(root, {
        yPercent: -100,
        duration: 0.35,
        ease: "power3.in",
        onComplete: finish,
      });
    };

    return () => {
      skipRef.current = null;
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading intro"
      className="fixed inset-0 z-[100] overflow-hidden bg-background motion-reduce:hidden"
    >
      {CORNERS.map((c) => (
        <span
          key={c}
          data-corner
          aria-hidden
          className={`absolute h-6 w-6 border-emerald/60 ${c}`}
        />
      ))}
      <span
        data-rule
        aria-hidden
        className="absolute inset-x-4 top-16 h-px origin-left bg-line"
      />
      <span
        data-rule
        aria-hidden
        className="absolute inset-x-4 bottom-16 h-px origin-right bg-line"
      />

      <button
        type="button"
        onClick={() => skipRef.current?.()}
        className="absolute right-6 top-6 z-10 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        Skip Intro
      </button>

      <div
        data-content
        className="flex h-full w-full flex-col items-center justify-center px-6"
      >
        <div className="w-full max-w-xl">
          <h2
            aria-label="Sanjeevi N A"
            className="flex flex-wrap text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            {TITLE.map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="inline-block overflow-hidden leading-[1.15]"
              >
                <span data-char className="inline-block">
                  {ch === " " ? "\u00A0" : ch}
                </span>
              </span>
            ))}
          </h2>

          <ul className="mt-8 space-y-2 font-mono text-xs text-muted sm:text-sm">
            {TELEMETRY.map((line) => (
              <li key={line} data-line className="flex gap-3">
                <span className="text-emerald">{">"}</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <div className="h-0.5 w-full bg-line">
              <div
                data-bar
                className="h-full origin-left bg-emerald shadow-[0_0_12px_var(--emerald)]"
              />
            </div>
            <p
              data-pct
              className="mt-3 text-right font-mono text-xs tabular-nums text-muted"
            >
              000%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
