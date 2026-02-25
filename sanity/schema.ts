import { type SchemaTypeDefinition } from "sanity";
import category from "./schemaTypes/category";
import project from "./schemaTypes/project";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [category, project],
};
