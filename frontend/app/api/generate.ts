const GENERATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/generate`;

export const generateContent = async (video_id: string, prompt: string | null, type: 'gist' | 'summary' | 'chapter' | 'highlight' | 'generate'): Promise<any> => {
    const data = {
        video_id,
        prompt,
        type
    };

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(GENERATE_API_URL, requestOptions);
        return await response.json();
    } catch (error) {
        console.error('Error while generating content:', error);
        throw error; 
    }
};
