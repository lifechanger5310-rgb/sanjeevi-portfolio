"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type TabId = "overview" | "architecture" | "impact";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture & APIs" },
  { id: "impact", label: "UI/UX Impact" },
];

type Project = {
  id: "jamindhar" | "click";
  index: string;
  name: string;
  subtitle: string;
  stack: string[];
  tabs: Record<TabId, { heading: string; points: string[] }>;
};

const PROJECTS: Project[] = [
  {
    id: "jamindhar",
    index: "01",
    name: "JAMINDHAR",
    subtitle: "Property Management Ecosystem (Android & Web)",
    stack: [
      "Flutter",
      "Dart",
      "Next.js",
      "React.js",
      "TypeScript",
      "React Bootstrap",
      "REST APIs",
    ],
    tabs: {
      overview: {
        heading: "Property management, end to end",
        points: [
          "Built end-to-end property management flows tracking occupancy, rent collection, and maintenance.",
          "Delivered as a product-based application on Android and Web.",
        ],
      },
      architecture: {
        heading: "Three web surfaces on one API layer",
        points: [
          "Separate Employee and Owner web portals built with Next.js, React.js, TypeScript, and React Bootstrap.",
          "A dedicated Admin login web app for administration.",
          "Flutter and Dart on Android, with REST API integrations across Android and Web.",
        ],
      },
      impact: {
        heading: "Upgrades users touch every day",
        points: [
          "Owned UI/UX feature upgrades across the Android and Web versions.",
          "Role-based portals separate the Employee, Owner, and Admin experiences.",
        ],
      },
    },
  },
  {
    id: "click",
    index: "02",
    name: "CLICK APP",
    subtitle: "Real-Time Car Booking Platform (iOS & Cross-Platform)",
    stack: ["Flutter", "iOS (Swift / UIKit)", "REST APIs", "SoapUI"],
    tabs: {
      overview: {
        heading: "Real-time car booking on iOS",
        points: [
          "Integrated iOS real-time car booking flows into a cross-platform Flutter app.",
          "Built and integrated iOS modules with smooth native performance in mind.",
        ],
      },
      architecture: {
        heading: "Flutter shell with a native iOS layer",
        points: [
          "Flutter app with Swift and UIKit integration for native iOS behavior.",
          "Inspected and debugged complex API payloads and responses with SoapUI.",
        ],
      },
      impact: {
        heading: "Cross-platform issues, resolved",
        points: [
          "Resolved critical cross-platform UI/UX issues.",
          "Analyzed complex API payloads and responses while debugging.",
        ],
      },
    },
  },
];

type Role = "employee" | "owner" | "admin";

const ROLES: Role[] = ["employee", "owner", "admin"];

const ROLE_VIEWS: Record<
  Role,
  { label: string; title: string; tiles: [string, string][]; rows: string[] }
> = {
  employee: {
    label: "Employee",
    title: "Employee Portal",
    tiles: [
      ["Assigned", "12"],
      ["Due Today", "3"],
      ["Resolved", "28"],
    ],
    rows: ["Plumbing check, Unit 4B", "Collect rent receipt, Unit 2A", "Lift inspection"],
  },
  owner: {
    label: "Owner",
    title: "Owner Portal",
    tiles: [
      ["Occupancy", "92%"],
      ["Rent Collected", "4.2L"],
      ["Maintenance", "5"],
    ],
    rows: ["Rent received, Unit 1C", "Maintenance request, Unit 3B", "Lease renewal due"],
  },
  admin: {
    label: "Admin",
    title: "Admin Console",
    tiles: [
      ["Users", "148"],
      ["Properties", "36"],
      ["Roles", "3"],
    ],
    rows: ["Create Employee account", "Assign property to Owner", "Review access log"],
  },
};

const TRIP_STEPS = [
  { label: "Booking requested", x: 40, y: 170 },
  { label: "Car on the way", x: 160, y: 100 },
  { label: "Arrived at pickup", x: 280, y: 40 },
];

function JamindharMockup() {
  const [role, setRole] = useState<Role>("owner");
  const view = ROLE_VIEWS[role];
  return (
    <div className="rounded-lg border border-line bg-background p-4">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
      <div
        role="group"
        aria-label="Switch portal role"
        className="mt-3 grid grid-cols-3 gap-2"
      >
        {ROLES.map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={role === r}
            onClick={() => setRole(r)}
            className={cn(
              "min-h-[44px] rounded-md border px-2 text-xs font-medium transition-colors",
              role === r
                ? "border-emerald bg-emerald/10 text-emerald"
                : "border-line bg-surface text-muted hover:text-foreground",
            )}
          >
            {ROLE_VIEWS[r].label}
          </button>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-muted">{view.title}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {view.tiles.map(([k, v]) => (
          <div key={k} className="rounded-md border border-line bg-surface p-3">
            <p className="font-mono text-lg font-semibold tabular-nums">{v}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-muted">{k}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {view.rows.map((row) => (
          <li
            key={row}
            className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-xs text-muted"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
            {row}
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[11px] text-muted">
        Illustrative mockup, sample data
      </p>
    </div>
  );
}

function ClickMockup() {
  const [step, setStep] = useState(0);
  const pos = TRIP_STEPS[step];
  return (
    <div className="rounded-lg border border-line bg-background p-4">
      <svg
        viewBox="0 0 320 210"
        role="img"
        aria-label="Illustrative route map showing a car moving toward the pickup point"
        className="w-full rounded-md border border-line bg-surface"
      >
        <g className="stroke-line" strokeWidth="1">
          {[40, 80, 120, 160, 200].map((y) => (
            <line key={`h${y}`} x1="0" x2="320" y1={y} y2={y} />
          ))}
          {[60, 120, 180, 240, 300].map((x) => (
            <line key={`v${x}`} x1={x} x2={x} y1="0" y2="210" />
          ))}
        </g>
        <polyline
          points="40,170 40,100 160,100 160,40 280,40"
          fill="none"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinejoin="round"
          className="stroke-emerald"
        />
        <circle cx="40" cy="170" r="6" className="fill-blue" />
        <rect x="274" y="34" width="12" height="12" className="fill-foreground" />
        <g
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 600ms ease",
          }}
        >
          <circle r="11" className="fill-emerald" />
          <circle r="4" className="fill-background" />
        </g>
      </svg>

      <p
        aria-live="polite"
        className="mt-3 font-mono text-sm text-foreground"
      >
        {TRIP_STEPS[step].label}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden>
        {TRIP_STEPS.map((s, i) => (
          <span
            key={s.label}
            className={cn(
              "h-1 flex-1 rounded-full",
              i <= step ? "bg-emerald" : "bg-line",
            )}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setStep((s) => (s + 1) % TRIP_STEPS.length)}
        className="mt-4 min-h-[44px] w-full rounded-md border border-line bg-surface px-4 text-sm font-medium transition-colors hover:border-muted"
      >
        {step === TRIP_STEPS.length - 1 ? "Restart trip" : "Advance trip"}
      </button>
      <p className="mt-3 font-mono text-[11px] text-muted">
        Illustrative mockup, sample flow
      </p>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [tab, setTab] = useState<TabId>("overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const content = project.tabs[tab];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      (i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <article className="grid gap-6 rounded-xl border border-line bg-surface p-5 sm:p-8 lg:grid-cols-2 lg:gap-10">
      <div className="min-w-0">
        <p className="font-mono text-xs text-emerald">{project.index}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{project.subtitle}</p>

        <div
          role="tablist"
          aria-label={`${project.name} case study`}
          className="mt-6 flex flex-wrap gap-2"
        >
          {TABS.map((t, i) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${project.id}-tab-${t.id}`}
                aria-selected={on}
                aria-controls={`${project.id}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "min-h-[44px] rounded-full border px-4 text-sm transition-colors",
                  on
                    ? "border-emerald bg-emerald/10 text-emerald"
                    : "border-line bg-background text-muted hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${project.id}-panel`}
          aria-labelledby={`${project.id}-tab-${tab}`}
          className="mt-6 min-h-[11rem]"
        >
          <h4 className="text-base font-semibold">{content.heading}</h4>
          <ul className="mt-3 space-y-2">
            {content.points.map((p) => (
              <li
                key={p}
                className="flex gap-3 text-sm leading-relaxed text-muted"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-line bg-background px-2 py-1 font-mono text-xs text-muted"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0">
        {project.id === "jamindhar" ? <JamindharMockup /> : <ClickMockup />}
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-line py-16 sm:py-24">
      <p className="font-mono text-xs text-emerald">FEATURED CASE STUDIES</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Production apps, from API payloads to pixels.
      </h2>
      <div className="mt-10 space-y-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
