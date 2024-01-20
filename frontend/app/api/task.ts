import { Task } from "@/types/task";

const TASK_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/task`;


export const checkTaskStatus = async (task_id: string): Promise<Task> => {
    try {
        const response = await fetch(`${TASK_API_URL}/check_status/${task_id}`);
        return await response.json();
    } catch (error) {
        console.error('Error while checking the video status:', error);
        throw error; 
    }
}