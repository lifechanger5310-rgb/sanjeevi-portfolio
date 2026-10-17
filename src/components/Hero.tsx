"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Mail } from "lucide-react";

const STATUS =
  "Available for Frontend, Mobile & AI-Accelerated Roles • Erode, India";

const SUBHEAD =
  "Sanjeevi N A — Frontend Web & Mobile Developer with ~2 years of experience shipping production apps across Next.js, React, Flutter, and iOS, combined with 1+ year of Multi-Platform AI Prompt Engineering.";

const EMAIL = "sanjeevikavin@gmail.com";

const METRICS = [
  { prefix: "~", value: 2, suffix: "", label: "Yrs Production Dev" },
  { prefix: "", value: 1, suffix: "+", label: "Yr Multi-AI Prompt Engineering" },
  { prefix: "", value: 3, suffix: "", label: "Platforms (Web, Android, iOS)" },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;

    let played = false;
    const counters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-counter]"),
    );

    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", { opacity: 0, y: 24 });
    }, root);
    counters.forEach((el) => {
      el.textContent = "0";
    });

    const play = () => {
      if (played) return;
      played = true;
      ctx.add(() => {
        gsap.to("[data-reveal]", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        });
        counters.forEach((el) => {
          const proxy = { v: 0 };
          const target = Number(el.dataset.value);
          gsap.to(proxy, {
            v: target,
            duration: 1.2,
            delay: 0.3,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(proxy.v));
            },
          });
        });
      });
    };

    let fallback: number | undefined;
    if (document.documentElement.dataset.intro === "done") {
      play();
    } else {
      window.addEventListener("intro:done", play, { once: true });
      fallback = window.setTimeout(play, 4500);
    }

    return () => {
      window.removeEventListener("intro:done", play);
      window.clearTimeout(fallback);
      ctx.revert();
      counters.forEach((el) => {
        el.textContent = el.dataset.value ?? "";
      });
    };
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center border-b border-line py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 30% 25%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 25%, black 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-0 -z-10 h-72 w-72 rounded-full bg-emerald/10 blur-3xl"
      />

      <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            <span className="font-mono text-xs text-muted">{STATUS}</span>
          </div>

          <h1
            data-reveal
            className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Building High-Performance Web & Mobile Apps—
            <span className="text-emerald">Accelerated by Precision AI.</span>
          </h1>

          <p
            data-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {SUBHEAD}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-emerald px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              View Live Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="#ai-matrix"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-muted"
            >
              How I Use AI
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-2 py-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Mail size={16} />
              {EMAIL}
            </a>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
          {METRICS.map((m, i) => (
            <li
              key={m.label}
              data-reveal
              className="rounded-xl border border-line bg-surface p-5"
            >
              <p className="font-mono text-xs text-muted">{`0${i + 1}`}</p>
              <p className="mt-2 font-mono text-4xl font-semibold tabular-nums text-foreground">
                <span className="text-emerald">{m.prefix}</span>
                <span data-counter data-value={m.value}>
                  {m.value}
                </span>
                <span className="text-emerald">{m.suffix}</span>
              </p>
              <p className="mt-1 text-sm text-muted">{m.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
