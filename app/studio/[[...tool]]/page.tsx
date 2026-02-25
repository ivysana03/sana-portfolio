import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "@/sanity/schema";
import { projectId, dataset } from "@/sanity/env";

const config = defineConfig({
    basePath: "/studio",
    projectId,
    dataset,
    title: "Sana Sheikh | CMS",
    schema,
    plugins: [structureTool()],
});

export default function StudioPage() {
    return <NextStudio config={config} />;
}
