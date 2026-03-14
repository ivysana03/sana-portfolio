import { defineField, defineType } from "sanity";

export default defineType({
    name: "category",
    title: "Category",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
            description: "e.g., Commercials, Music Videos, Narrative",
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
            name: "order",
            title: "Order",
            type: "number",
            description: "Order in which categories appear in the filter (lowest first)",
        }),
    ],
});
