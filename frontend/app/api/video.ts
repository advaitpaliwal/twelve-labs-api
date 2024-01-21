import { Video } from "@/types/video";
import { requestOptions } from "@/lib/utils";

const VIDEO_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/video`;

export const uploadVideo = async (index_id: string, language: string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('index_id', index_id);
    formData.append('language', language);

    const requestOptions = {
        method: 'POST',
        body: formData,
    };

    try {
        const response = await fetch(`${VIDEO_API_URL}/upload`, requestOptions);
        return await response.json();
    } catch (error) {
        console.error('Error while uploading the video:', error);
        throw error; 
    }
};

export const addVideoUrl = async (index_id: string, url: string): Promise<any> => {
    const data = {
        index_id,
        url
    };

    try {
        const response = await fetch(`${VIDEO_API_URL}/url`, requestOptions(data));
        return await response.json();
    } catch (error) {
        console.error('Error while adding the video url:', error);
        throw error;
    }
}

export const getVideo = async (index_id: string, video_id: string) : Promise<Video> => {
    try {
        const data = {
            index_id,
            video_id
        };
        const res = await fetch(`${VIDEO_API_URL}/info`, requestOptions(data));
        const json = await res.json();
        return json;
    } catch (error) {
        console.error('Error while fetching video:', error);
        throw error;
    }
};
