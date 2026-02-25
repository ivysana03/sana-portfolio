export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "00000000";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-25';

export const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set false for development
};
