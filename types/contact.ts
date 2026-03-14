/** Contact form submission */
export interface ContactFormData {
    name: string;
    email: string;
    projectType:
    | "cinematic_ai_ad"
    | "music_video"
    | "short_film"
    | "concept_trailer"
    | "virtual_production"
    | "branded_content"
    | "other";
    budget: "under_50k" | "50k_2l" | "2l_10l" | "international";
    vision: string;
}

/** Claude qualification result */
export interface LeadQualification {
    serviceMatch: string;
    complexityScore: number; // 1-5
    budgetAssessment: "under_budget" | "good_fit" | "premium";
    suggestedTimeline: string;
    keyQuestions: string[];
    draftReply: string;
}

/** Brief generator form */
export interface BriefFormData {
    brandName: string;
    mood: string;
    references: string;
    audience?: string;
}
