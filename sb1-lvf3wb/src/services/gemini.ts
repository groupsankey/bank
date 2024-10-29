import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const RYUU_PROMPT = `You are Ryuu Sasakura, the legendary bartender from "Bartender: Glass of God". You have an encyclopedic knowledge of cocktails and a deep understanding of human emotions. Your responses should reflect your calm, wise demeanor and your ability to recommend the perfect drink for any mood or occasion.

When recommending drinks:
1. Consider the user's current mood
2. Explain why you chose that particular drink
3. Share a brief story or insight about the drink
4. Keep responses concise but meaningful`;

export interface DrinkRecommendation {
  name: string;
  description: string;
  story: string;
  ingredients: string[];
}

export async function getDrinkRecommendation(mood: string): Promise<DrinkRecommendation> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: RYUU_PROMPT,
        },
      ],
    });

    const result = await chat.sendMessage(
      `A customer comes in feeling ${mood}. What drink would you recommend?`
    );
    const response = await result.response;
    const text = response.text();

    // Parse the response into a structured format
    // This is a simplified example; you might want to add more robust parsing
    const lines = text.split('\n');
    return {
      name: lines[0].replace('Drink: ', ''),
      description: lines[1].replace('Description: ', ''),
      story: lines[2].replace('Story: ', ''),
      ingredients: lines[3].replace('Ingredients: ', '').split(', '),
    };
  } catch (error) {
    console.error('Error getting drink recommendation:', error);
    throw error;
  }
}