import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Showreel from "@/components/sections/Showreel";
import Archive from "@/components/archive/Archive";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import { getProjects } from "@/sanity/queries";
import { fallbackProjects } from "@/lib/fallbackData";

export default async function Home() {
  // Fetch from CMS, fallback to local hardcoded data if empty/unitialized
  let projects = await getProjects();
  if (!projects || projects.length === 0) {
    projects = fallbackProjects;
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-bg text-text selection:bg-accent/30 selection:text-text">
      <Hero />
      <About />
      <Showreel />
      <Archive initialProjects={projects} />
      <Services />
      <Process />
      <Contact />
    </main>
  );
}
