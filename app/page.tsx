import Hero from "@/components/sections/Hero";
import Archive from "@/components/archive/Archive";
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
      <Archive initialProjects={projects} />
    </main>
  );
}
