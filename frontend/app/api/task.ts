const TASK_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/task`;


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
        const response = await fetch(`${TASK_API_URL}/upload_video`, requestOptions);
        return await response.json();
    } catch (error) {
        console.error('Error while uploading the video:', error);
        throw error; 
    }
};
