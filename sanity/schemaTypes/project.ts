import { defineField, defineType } from "sanity";

export default defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "client",
            title: "Client / Brand",
            type: "string",
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
            description: "e.g. Director & AI Architect",
        }),
        defineField({
            name: "year",
            title: "Year",
            type: "string",
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "category" }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "thumbnail",
            title: "Thumbnail Image",
            type: "image",
            options: { hotspot: true },
            description: "Static fallback image",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "vimeoId",
            title: "Vimeo Video ID",
            type: "string",
            description: "Used for hover loops and the main modal player",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "isFeatured",
            title: "Featured on Homepage",
            type: "boolean",
            initialValue: true,
            description: "If unchecked, only appears on the full archive page",
        }),
        defineField({
            name: "tools",
            title: "AI Tools Used",
            type: "array",
            of: [{ type: "string" }],
            description: "e.g., Midjourney, Runway Gen-2, ElevenLabs",
        }),
        defineField({
            name: "brief",
            title: "Project Brief",
            type: "text",
            description: "Short summary of the client ask or project goal.",
        }),
        defineField({
            name: "approach",
            title: "AI Approach",
            type: "text",
            description: "How generative tools were used to construct the piece.",
        }),
    ],
    preview: {
        select: {
            title: "title",
            client: "client",
            media: "thumbnail",
        },
        prepare(selection) {
            const { client } = selection;
            return { ...selection, subtitle: client };
        },
    },
});
