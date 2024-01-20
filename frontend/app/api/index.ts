import { requestOptions } from "@/lib/utils";

const INDEX_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/index`;


export const getIndexes = async (): Promise<any> => {
    try {
        const response = await fetch(`${INDEX_API_URL}/list`);
        return await response.json();
    } catch (error) {
        console.error('Error while getting indexes:', error);
        throw error; 
    }
};
    
export const getOrCreateIndex = async (index_name: string): Promise<any> => {
    const data = {
        index_name
    };

    try {
        const response = await fetch(`${INDEX_API_URL}/get_or_create`, requestOptions(data));
        return await response.json();
    } catch (error) {
        console.error('Error while getting or creating the index:', error);
        throw error; 
    }
};
