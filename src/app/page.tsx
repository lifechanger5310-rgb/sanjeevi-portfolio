import Navbar from "@/components/Navbar";

const sections = [
  { id: "projects", label: "projects", phase: 3 },
  { id: "ai-matrix", label: "ai-matrix", phase: 2 },
  { id: "experience", label: "experience", phase: 3 },
  { id: "skills", label: "skills", phase: 4 },
  { id: "contact", label: "contact", phase: 4 },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="flex min-h-[60vh] items-center border-b border-line"
          >
            <p className="font-mono text-sm text-muted">
              <span className="text-emerald">{"//"}</span> {s.label} — phase{" "}
              {s.phase} placeholder
            </p>
          </section>
        ))}
      </main>
    </>
  );
}
