import Anthropic from "@anthropic-ai/sdk";

/**
 * Singleton Anthropic client — only used server-side in API routes.
 * NEVER import this in client components or expose the API key.
 */
let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
    if (!client) {
        client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    }
    return client;
}
