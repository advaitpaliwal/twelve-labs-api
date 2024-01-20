import { requestOptions } from "@/lib/utils";
import { GistResponse, SummaryResponse, ChapterResponse, HighlightResponse, CustomResponse } from "@/types/generate";

const GENERATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/generate`;

export const generateGist = async (video_id: string): Promise<GistResponse> => {
    const data = { video_id };
    try {
        const response = await fetch(`${GENERATE_API_URL}/gist`, requestOptions(data));
        return await response.json();
    } catch (error) {
        console.error('Error while generating gist:', error);
        throw error;
    }
};

export const generateSummary = async (video_id: string, prompt: string = ""): Promise<SummaryResponse> => {
    const data = { video_id, prompt };
    try {
        const response = await fetch(`${GENERATE_API_URL}/summary`, requestOptions(data));
        return await response.json();
    } catch (error) {
        console.error('Error while generating summary:', error);
        throw error;
    }
};

export const generateChapter = async (video_id: string, prompt: string = ""): Promise<ChapterResponse> => {
    const data = { video_id, prompt };
    try {
        const response = await fetch(`${GENERATE_API_URL}/chapter`, requestOptions(data));
        return await response.json();
    } catch (error) {
        console.error('Error while generating chapter:', error);
        throw error;
    }
};

export const generateHighlight = async (video_id: string, prompt: string = ""): Promise<HighlightResponse> => {
    const data = { video_id, prompt };
    try {
        const response = await fetch(`${GENERATE_API_URL}/highlight`, requestOptions(data));
        return await response.json();
    } catch (error) {
        console.error('Error while generating highlight:', error);
        throw error;
    }
};

export const generateCustom = async (video_id: string, prompt: string): Promise<CustomResponse> => {
    const data = { video_id, prompt };
    try {
        const response = await fetch(`${GENERATE_API_URL}/custom`, requestOptions(data));
        return await response.json();
    } catch (error) {
        console.error('Error while generating custom content:', error);
        throw error;
    }
};