import KineticIntro from "@/components/KineticIntro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AiMatrix from "@/components/AiMatrix";

const placeholders = [
  { id: "experience", label: "experience", phase: 3 },
  { id: "projects", label: "projects", phase: 3 },
  { id: "skills", label: "skills", phase: 4 },
  { id: "contact", label: "contact", phase: 4 },
];

export default function Home() {
  return (
    <>
      <KineticIntro />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <Hero />
        <AiMatrix />
        {placeholders.map((s) => (
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
