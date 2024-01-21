import { Fact } from "@/types/fact";

const FACT_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/fact`;


export const getRandomFact = async (): Promise<Fact> => {
    try {
        const response = await fetch(`${FACT_API_URL}/random`);
        return await response.json();
    } catch (error) {
        console.error('Error while fetching random fact:', error);
        throw error;
    }
};