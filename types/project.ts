/** Project type — matches Sanity GROQ query shape */
export interface Project {
    _id: string;             // Internal ID (Sanity)
    title: string;
    slug: string;            // URL-friendly slug
    client: string;
    role: string;            // e.g. "Director & Editor"
    year: string;
    categoryId: string;      // Back-reference to category document
    categoryTitle: string;   // Hydrated category name (e.g. "Music Videos")
    thumbnailUrl: string;    // Resolved Sanity image URL
    vimeoId: string;         // For the hover loop
    isFeatured: boolean;     // Featured on the main page?
    tools?: string[];        // AI tools used (e.g. ["Runway", "Midjourney"])
    brief?: string;
    approach?: string;
    aiDescription?: string; // Claude-generated cinematic description
    order: number;
}
