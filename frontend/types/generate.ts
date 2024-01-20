export interface GistResponse {
    id: string;
    title: string;
    topics: string[];
    hashtags: string[];
}

export interface SummaryResponse {
    id: string;
    summary: string;
}

export interface Chapter {
    chapter_number: number;
    start: number;
    end: number;
    chapter_title: string;
    chapter_summary: string;
}

export interface ChapterResponse {
    id: string;
    chapters: Chapter[];
}

export interface Highlight {
    start: number;
    end: number;
    highlight: string;
    highlight_summary: string;
}

export interface HighlightResponse {
    id: string;
    highlights: Highlight[];
}

export interface CustomResponse {
    id: string;
    data: string;
}
