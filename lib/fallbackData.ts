import { Project } from "@/types/project";

// This is the fallback dataset used if Sanity CMS is empty or not configured.
// It allows the site to fully render and function immediately after deployment.
export const fallbackProjects: Project[] = [
    {
        _id: "p1",
        title: "Party",
        slug: "party",
        client: "Spec",
        role: "Director & Editor",
        year: "2025",
        categoryId: "c1",
        categoryTitle: "Music Videos",
        thumbnailUrl: "", // Intentionally blank to test fallback UI
        vimeoId: "bPLyEk-jUYs",
        isFeatured: true,
        order: 1,
        tools: ["Runway Gen-2", "Premiere Pro"],
        brief: "A high-energy music video specification focusing on AI-generated crowd dynamics.",
        approach: "Used Runway's frame interpolation to smooth latent space transitions between generated party goers."
    },
    {
        _id: "p2",
        title: "Maison Margiela SS24",
        slug: "maison-margiela-ss24",
        client: "Maison Margiela",
        role: "AI Architect",
        year: "2024",
        categoryId: "c2",
        categoryTitle: "Fashion Film",
        thumbnailUrl: "",
        vimeoId: "76979871", // Using placeholder ID as fallback
        isFeatured: true,
        order: 2,
        tools: ["Midjourney v6", "Magnific", "Runway"],
        brief: "Concept specification for Maison Margiela's SS24 collection exploring digital materiality.",
        approach: "Generated highly textured base compositions in Midjourney, upscaled for fabric fidelity, and animated via Runway."
    },
    {
        _id: "p3",
        title: "Neural Dreams",
        slug: "neural-dreams",
        client: "Personal",
        role: "Director",
        year: "2023",
        categoryId: "c3",
        categoryTitle: "Narrative Short",
        thumbnailUrl: "",
        vimeoId: "76979871", // Using placeholder ID as fallback
        isFeatured: false,
        order: 3,
        tools: ["Stable Diffusion", "Deforum", "ElevenLabs"],
        brief: "An experimental short film exploring the subconscious through continuous latent transformation.",
        approach: "Utilized heavy Deforum camera movements synchronized to an AI-generated soundscape."
    }
];
