"use client";

import { useState } from "react";
import {
  Blocks,
  FlaskConical,
  Route,
  Search,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ToolId = "claude" | "perplexity" | "gemini" | "grok";
type Accent = "emerald" | "blue";

type Tool = {
  name: string;
  role: string;
  tags: string[];
  icon: LucideIcon;
  accent: Accent;
  span: string;
};

type Step = { tool: ToolId; action: string; output: string };
type Scenario = { id: string; title: string; summary: string; steps: Step[] };

const ACCENT: Record<Accent, { text: string; chip: string; active: string }> = {
  emerald: {
    text: "text-emerald",
    chip: "border-emerald/40 bg-emerald/10 text-emerald",
    active: "border-emerald/60",
  },
  blue: {
    text: "text-blue",
    chip: "border-blue/40 bg-blue/10 text-blue",
    active: "border-blue/60",
  },
};

const TOOL_ORDER: ToolId[] = ["claude", "perplexity", "gemini", "grok"];

const TOOLS: Record<ToolId, Tool> = {
  claude: {
    name: "Claude & Cursor",
    role: "Architecture & Code Execution",
    tags: [
      "MVC / MVVM state",
      "Next.js App Router",
      "Flutter / Dart",
      "TypeScript refactoring",
    ],
    icon: Blocks,
    accent: "emerald",
    span: "lg:col-span-7",
  },
  perplexity: {
    name: "Perplexity",
    role: "Deep Technical Research & API Docs",
    tags: [
      "SDK changelogs",
      "REST API payload verification",
      "Dependency debugging",
    ],
    icon: Search,
    accent: "blue",
    span: "lg:col-span-5",
  },
  gemini: {
    name: "Gemini & ChatGPT",
    role: "System Logic & Edge-Case Testing",
    tags: [
      "Data structures",
      "SQL / Firebase schema design",
      "Bug root-cause analysis",
    ],
    icon: FlaskConical,
    accent: "emerald",
    span: "lg:col-span-5",
  },
  grok: {
    name: "Grok & Z AI",
    role: "Real-Time Ecosystem & Rapid UI/UX Ideation",
    tags: [
      "Live framework benchmarks",
      "Wireframe prototyping",
      "Modern UI patterns",
    ],
    icon: Zap,
    accent: "blue",
    span: "lg:col-span-7",
  },
};

const SCENARIOS: Scenario[] = [
  {
    id: "ios-payload",
    title: "Fix iOS API Payload Bug",
    summary:
      "A booking screen breaks on iOS after the backend changes its response shape.",
    steps: [
      {
        tool: "perplexity",
        action:
          "Check the API docs and SDK changelog for the changed response contract.",
        output: "Confirmed which fields were renamed or became nullable.",
      },
      {
        tool: "gemini",
        action:
          "Trace the root cause from the failing payload and list the edge cases.",
        output: "Null, empty, and mistyped field cases identified.",
      },
      {
        tool: "claude",
        action:
          "Patch the Dart model and parsing layer, then refactor the service call.",
        output: "Typed model with safe parsing in place.",
      },
      {
        tool: "gemini",
        action:
          "Generate edge-case tests for missing, null, and malformed fields.",
        output: "Regression cases ready before release.",
      },
    ],
  },
  {
    id: "multi-role-portal",
    title: "Architect Multi-Role Web Portal",
    summary:
      "Employee, Owner, and Admin dashboards on a single Next.js codebase.",
    steps: [
      {
        tool: "grok",
        action:
          "Prototype wireframes for each role dashboard and compare current UI patterns.",
        output: "Layout direction agreed per role.",
      },
      {
        tool: "gemini",
        action:
          "Plan the data schema and permission matrix, then test access edge cases.",
        output: "Role rules and schema locked.",
      },
      {
        tool: "claude",
        action:
          "Scaffold App Router routes, layouts, and typed state per role.",
        output: "Route and state structure ready.",
      },
      {
        tool: "perplexity",
        action:
          "Verify auth and component library docs against the pinned versions.",
        output: "No deprecated APIs in the plan.",
      },
      {
        tool: "claude",
        action:
          "Refactor shared TypeScript components and wire the REST API calls.",
        output: "Shared components connected to the API.",
      },
    ],
  },
  {
    id: "flutter-firebase",
    title: "Ship a Flutter + Firebase Feature",
    summary:
      "A new flow with Firebase storage and Provider state in a Flutter app.",
    steps: [
      {
        tool: "gemini",
        action:
          "Design the Firebase schema and test security-rule edge cases.",
        output: "Collections and rules drafted.",
      },
      {
        tool: "perplexity",
        action:
          "Check Flutter and Firebase package changelogs for breaking changes.",
        output: "Safe versions and migration notes.",
      },
      {
        tool: "grok",
        action: "Pull current mobile UI patterns for the screen layout.",
        output: "Layout reference chosen.",
      },
      {
        tool: "claude",
        action:
          "Build the Model, Service, and UI layers with Provider state in Dart.",
        output: "Feature running end to end.",
      },
    ],
  },
];

const ROUTER_LABEL = "TASK ROUTER // PICK A SCENARIO";

export default function AiMatrix() {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [focus, setFocus] = useState<ToolId | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];

  const usage: Record<ToolId, number[]> = {
    claude: [],
    perplexity: [],
    gemini: [],
    grok: [],
  };
  scenario.steps.forEach((s, i) => usage[s.tool].push(i + 1));
  const involved = TOOL_ORDER.filter((id) => usage[id].length > 0).length;

  return (
    <section
      id="ai-matrix"
      className="border-b border-line py-16 sm:py-24"
    >
      <p className="font-mono text-xs text-emerald">AI ORCHESTRATION MATRIX</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        How I route engineering work across AI models.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        1+ year of self-taught, multi-platform AI prompt engineering. Pick a
        real engineering scenario below, then click a model card to isolate the
        steps it handles.
      </p>

      <ul className="mt-10 grid gap-4 lg:grid-cols-12">
        {TOOL_ORDER.map((id) => {
          const t = TOOLS[id];
          const a = ACCENT[t.accent];
          const Icon = t.icon;
          const used = usage[id].length > 0;
          const isFocus = focus === id;
          return (
            <li key={id} className={t.span}>
              <button
                type="button"
                aria-pressed={isFocus}
                onClick={() => setFocus(isFocus ? null : id)}
                className={cn(
                  "flex h-full w-full flex-col gap-4 rounded-xl border bg-surface p-6 text-left transition-all duration-200 hover:-translate-y-0.5",
                  used ? a.active : "border-line opacity-55",
                  isFocus && "ring-2 ring-foreground/20",
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-background">
                    <Icon size={18} className={a.text} />
                  </span>
                  <span className="block">
                    <span className="block text-lg font-semibold">
                      {t.name}
                    </span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </span>
                <span className="flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-line bg-background px-2 py-1 font-mono text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
                <span
                  className={cn(
                    "mt-auto block font-mono text-xs",
                    used ? a.text : "text-muted",
                  )}
                >
                  {used
                    ? `Handles step ${usage[id].join(", ")}`
                    : "Not used in this scenario"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-xl border border-line bg-surface p-6 sm:p-8">
        <p className="flex items-center gap-2 font-mono text-xs text-muted">
          <Route size={14} className="text-emerald" />
          {ROUTER_LABEL}
        </p>

        <div
          role="group"
          aria-label="Engineering scenarios"
          className="mt-4 flex flex-wrap gap-2"
        >
          {SCENARIOS.map((s) => {
            const on = s.id === scenario.id;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setScenarioId(s.id);
                  setFocus(null);
                }}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  on
                    ? "border-emerald bg-emerald/10 text-emerald"
                    : "border-line bg-background text-muted hover:text-foreground",
                )}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-muted">{scenario.summary}</p>
        <p className="mt-1 font-mono text-xs text-muted">
          {`${involved} of 4 model groups involved`}
          {focus ? ` · filtering ${TOOLS[focus].name}` : ""}
        </p>

        <ol className="mt-6 space-y-3">
          {scenario.steps.map((st, i) => {
            const t = TOOLS[st.tool];
            const dim = focus !== null && focus !== st.tool;
            return (
              <li
                key={`${scenario.id}-${i}`}
                className={cn(
                  "flex gap-4 rounded-lg border border-line bg-background p-4 transition-opacity duration-200",
                  dim && "opacity-25",
                )}
              >
                <span className="font-mono text-sm tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "inline-block rounded-full border px-2.5 py-0.5 font-mono text-xs",
                      ACCENT[t.accent].chip,
                    )}
                  >
                    {t.name}
                  </span>
                  <p className="mt-2 text-sm text-foreground">{st.action}</p>
                  <p className="mt-1 text-xs text-muted">{st.output}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
