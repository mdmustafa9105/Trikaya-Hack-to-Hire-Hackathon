import { GoogleGenAI } from "@google/genai";

// Ideally this comes from process.env.API_KEY, but for this demo environment 
// we assume it's set or handled by the consumer of this code.
const apiKey = process.env.API_KEY || ''; 

let genAI: GoogleGenAI | null = null;

try {
  if (apiKey) {
    genAI = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize Gemini:", error);
}

export const getVetAdvice = async (userMessage: string): Promise<string> => {
  if (!genAI) {
    return "I'm sorry, I cannot connect to the AI service right now. Please check your API key configuration.";
  }

  try {
    const model = "gemini-2.5-flash";
    const systemInstruction = `You are a helpful, empathetic, and knowledgeable veterinary assistant AI for an app called Pawbrûlée. 
    Your goal is to provide general advice about pet care, nutrition, and behavior. 
    IMPORTANT: If the user describes a life-threatening emergency (bleeding, not breathing, seizure, poisoning), you MUST immediately tell them to use the SOS button in the app and go to a real vet. Do not attempt to treat emergencies.
    Keep answers concise (under 100 words) and friendly. use emojis.`;

    const response = await genAI.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble thinking right now. Please try again later.";
  }
};
