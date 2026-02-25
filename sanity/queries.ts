import { client } from "./lib/client";
import { Project } from "@/types/project";

// Standard GROQ query to fetch all projects, expanded with category titles
const PROJECTS_QUERY = `*[_type == "project"] | order(year desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  role,
  year,
  "categoryId": category->_id,
  "categoryTitle": category->title,
  "thumbnailUrl": thumbnail.asset->url,
  vimeoId,
  isFeatured,
  tools,
  brief,
  approach
}`;

export async function getProjects(): Promise<Project[]> {
    // If no project ID is set (e.g. running locally without CMS config),
    // return an empty array gracefully to prevent build/render crashes.
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        console.warn("⚠️ SANITY_PROJECT_ID is not set. Returning empty projects list.");
        return [];
    }

    try {
        const projects = await client.fetch<Project[]>(PROJECTS_QUERY);
        return projects;
    } catch (error) {
        console.error("Failed to fetch projects from Sanity:", error);
        return [];
    }
}
