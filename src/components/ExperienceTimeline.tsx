"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

type Role = { title: string; period: string };
type Job = {
  company: string;
  location: string;
  roles: Role[];
  summary: string;
  tags: string[];
};

const EXPERIENCE: Job[] = [
  {
    company: "U2 Breakthrough Technologies Private Limited",
    location: "Coimbatore, India",
    roles: [
      { title: "Junior Team Member", period: "Nov 2025 – Feb 2026" },
      {
        title: "Junior Application Developer Intern",
        period: "Jul 2025 – Oct 2025",
      },
    ],
    summary:
      "Owned UI/UX feature upgrades, multi-role web portals, and REST API integrations for the product-based property management app, Jamindhar.",
    tags: ["Jamindhar", "Next.js", "React.js", "Flutter", "REST APIs"],
  },
  {
    company: "Blackstone Infomatics",
    location: "Coimbatore, India",
    roles: [
      { title: "Flutter iOS App Developer", period: "Nov 2024 – Apr 2025" },
    ],
    summary:
      "Engineered native iOS integration and cross-platform real-time car booking flows for Click App.",
    tags: ["Click App", "Flutter", "iOS", "REST APIs"],
  },
  {
    company: "Codingmart Technologies Private Limited",
    location: "Coimbatore, India",
    roles: [{ title: "Intern Product Engineer", period: "Jan 2023 – Feb 2023" }],
    summary:
      "Applied high-efficiency JavaScript to Data Structures, Algorithms, and rapid product engineering workflows.",
    tags: ["JavaScript", "Data Structures", "Algorithms"],
  },
];

export default function ExperienceTimeline() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>("[data-node]").forEach((n) => {
        n.dataset.active = "true";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-exp]").forEach((item) => {
        const node = item.querySelector<HTMLElement>("[data-node]");
        gsap.from(item.querySelector("[data-card]"), {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (node) node.dataset.active = String(self.isActive);
          },
        });
      });
      gsap.from("[data-fill]", {
        scaleY: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-list]",
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={rootRef}
      className="border-b border-line py-16 sm:py-24"
    >
      <p className="font-mono text-xs text-emerald">PRODUCTION EXPERIENCE</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Roughly two years shipping across Web, Android, and iOS.
      </h2>

      <ol data-list className="relative mt-12 space-y-8">
        <span
          aria-hidden
          className="absolute bottom-0 left-2 top-0 w-px bg-line"
        />
        <span
          data-fill
          aria-hidden
          className="absolute bottom-0 left-2 top-0 w-px origin-top bg-emerald"
        />
        {EXPERIENCE.map((job) => (
          <li key={job.company} data-exp className="relative pl-10">
            <span
              data-node
              data-active="false"
              aria-hidden
              className="absolute left-2 top-8 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-line bg-background transition-all duration-300 data-[active=true]:border-emerald data-[active=true]:bg-emerald data-[active=true]:shadow-[0_0_12px_var(--emerald)]"
            />
            <div
              data-card
              className="rounded-xl border border-line bg-surface p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold">{job.company}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={14} />
                {job.location}
              </p>

              <ul className="mt-4 space-y-2">
                {job.roles.map((r) => (
                  <li
                    key={r.title}
                    className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="text-sm font-medium">{r.title}</span>
                    <span className="font-mono text-xs text-muted">
                      {r.period}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {job.summary}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line bg-background px-2 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
