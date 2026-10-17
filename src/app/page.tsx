import KineticIntro from "@/components/KineticIntro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AiMatrix from "@/components/AiMatrix";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsAndEducation from "@/components/SkillsAndEducation";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <KineticIntro />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <Hero />
        <AiMatrix />
        <ExperienceTimeline />
        <ProjectsSection />
        <SkillsAndEducation />
      </main>
      <ContactFooter />
    </>
  );
}
