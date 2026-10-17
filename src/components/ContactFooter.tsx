"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = "sanjeevikavin@gmail.com";
const PHONE_DISPLAY = "+91 6379604196";
const PHONE_HREF = "tel:+916379604196";
const GITHUB_URL = "https://github.com/lifechanger5310-rgb";
const GITHUB_LABEL = "github.com/lifechanger5310-rgb";

const cardClass =
  "flex min-h-[44px] items-center gap-4 rounded-xl border border-line bg-surface p-5";

export default function ContactFooter() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  };

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-xs text-emerald">CONTACT</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Open to Frontend, Mobile, and AI-accelerated roles.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className={cardClass}>
            <MapPin size={18} className="shrink-0 text-emerald" />
            <div className="min-w-0">
              <p className="font-mono text-xs text-muted">Location</p>
              <p className="text-sm">Erode, Tamil Nadu, India</p>
            </div>
          </div>

          <div className={cn(cardClass, "flex-wrap sm:flex-nowrap")}>
            <Mail size={18} className="shrink-0 text-emerald" />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-muted">Email</p>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all text-sm hover:text-emerald"
              >
                {EMAIL}
              </a>
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-line bg-background px-4 text-sm transition-colors hover:border-muted"
            >
              {state === "copied" ? (
                <Check size={16} className="text-emerald" />
              ) : (
                <Copy size={16} />
              )}
              <span aria-live="polite">
                {state === "copied"
                  ? "Copied!"
                  : state === "failed"
                    ? "Copy failed"
                    : "Copy Email"}
              </span>
            </button>
          </div>

          <a href={PHONE_HREF} className={cn(cardClass, "hover:border-muted")}>
            <Phone size={18} className="shrink-0 text-emerald" />
            <div className="min-w-0">
              <p className="font-mono text-xs text-muted">Phone</p>
              <p className="text-sm">{PHONE_DISPLAY}</p>
            </div>
          </a>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(cardClass, "hover:border-muted")}
          >
            <ArrowUpRight size={18} className="shrink-0 text-emerald" />
            <div className="min-w-0">
              <p className="font-mono text-xs text-muted">GitHub</p>
              <p className="break-all text-sm">{GITHUB_LABEL}</p>
            </div>
          </a>
        </div>

        <p className="mt-12 font-mono text-xs text-muted">
          Sanjeevi N A · Erode, Tamil Nadu, India
        </p>
      </div>
    </footer>
  );
}
