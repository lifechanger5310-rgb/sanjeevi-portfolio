"use client";

import { useState } from "react";
import { GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = { id: string; title: string; items: string[]; accent?: "blue" };

const CATEGORIES: Category[] = [
  {
    id: "languages",
    title: "Languages",
    items: [
      "TypeScript",
      "JavaScript",
      "Dart",
      "Swift",
      "Java",
      "HTML5",
      "CSS3",
      "SQL",
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    items: [
      "Next.js",
      "Flutter",
      "React.js",
      "UIKit",
      "Tailwind CSS",
      "React Bootstrap",
    ],
  },
  {
    id: "backend",
    title: "Backend, Architecture & Tools",
    items: [
      "Firebase (BaaS)",
      "SQL",
      "MVC",
      "MVVM",
      "REST APIs",
      "SoapUI",
      "Git & GitHub",
      "VS Code",
      "Xcode",
      "Android Studio",
    ],
  },
  {
    id: "ai",
    title: "Multi-Platform AI Stack (1+ Yr Exp)",
    accent: "blue",
    items: ["Claude", "Cursor", "Perplexity", "Gemini", "ChatGPT", "Grok", "Z AI"],
  },
];

const CERTIFICATIONS: [string, string][] = [
  ["iOS App Development", "Greens Tech, Chennai"],
  ["Intern Product Engineer", "Codingmart"],
  ["Flutter App Mobile Development", "Udemy"],
];

export default function SkillsAndEducation() {
  const [filter, setFilter] = useState<string>("all");
  const visible =
    filter === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === filter);

  return (
    <section id="skills" className="border-b border-line py-16 sm:py-24">
      <p className="font-mono text-xs text-emerald">TECHNICAL SKILLS</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        The toolkit behind the shipped work.
      </h2>

      <div
        role="group"
        aria-label="Filter skill categories"
        className="mt-8 flex flex-wrap gap-2"
      >
        {[{ id: "all", title: "All" }, ...CATEGORIES].map((c) => {
          const on = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c.id)}
              className={cn(
                "min-h-[44px] rounded-full border px-4 text-sm transition-colors",
                on
                  ? "border-emerald bg-emerald/10 text-emerald"
                  : "border-line bg-background text-muted hover:text-foreground",
              )}
            >
              {c.title}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visible.map((c) => (
          <div
            key={c.id}
            className={cn(
              "rounded-xl border border-line bg-surface p-5 sm:p-6",
              visible.length === 1 && "md:col-span-2",
            )}
          >
            <h3
              className={cn(
                "font-mono text-xs",
                c.accent === "blue" ? "text-blue" : "text-muted",
              )}
            >
              {c.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-full border border-line bg-background px-3 py-1.5 font-mono text-sm transition-all duration-200 hover:-translate-y-0.5",
                    c.accent === "blue"
                      ? "hover:border-blue hover:text-blue"
                      : "hover:border-emerald hover:text-emerald",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-6 rounded-xl border border-line bg-surface p-5 sm:p-8 md:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 font-mono text-xs text-muted">
            <GraduationCap size={14} className="text-emerald" />
            EDUCATION
          </p>
          <h3 className="mt-4 text-lg font-semibold">
            B.E. Computer Science and Engineering
          </h3>
          <p className="mt-1 text-sm text-muted">
            K.S.R. College of Engineering, Tiruchengode
          </p>
          <p className="mt-3 font-mono text-sm text-muted">
            2019–2023 | CGPA: 7.77
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 font-mono text-xs text-muted">
            <Award size={14} className="text-emerald" />
            CERTIFICATIONS
          </p>
          <ul className="mt-4 space-y-3">
            {CERTIFICATIONS.map(([name, issuer]) => (
              <li key={name}>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-sm text-muted">{issuer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
