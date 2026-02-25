/** Project type — matches Sanity schema */
export interface Project {
    _id: string;
    title: string;
    role: string;
    tools: string[];
    year: string;
    vimeoId: string; // short hover clip
    vimeoIdFull: string; // full project film
    thumbnailUrl: string;
    brief: string; // 1 sentence: what was asked for
    approach: string; // 1-2 sentences: the creative solution
    aiDescription?: string; // Claude-generated cinematic description
    client?: string;
    order: number;
}
