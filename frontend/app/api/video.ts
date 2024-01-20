const VIDEO_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/video`;


export const getVideo = async (index_id: string, video_id: string) => {
    try {
        const data = {
            index_id,
            video_id
        };
        const res = await fetch(VIDEO_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const json = await res.json();
        return json;
    } catch (error) {
        console.error('Error while fetching video:', error);
        throw error;
    }
};
