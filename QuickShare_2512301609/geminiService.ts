
import { GoogleGenAI, Type } from "@google/genai";
import { AlarmMood } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateMorningBrief = async (mood: AlarmMood, weather?: string) => {
  try {
    const prompt = `Act as Yclock, an advanced temporal AI assistant for an ethereal life-tracking ecosystem.
    Current Mood Setting: ${mood}
    Protocol: Morning Awakening Sync
    ${weather ? `Environmental Sensors: ${weather}` : ""}
    Generate a short, impactful wake-up message (max 60 words). 
    Make it feel futuristic, sleek, and perfectly aligned with the '${mood}' mood.
    If 'Aggressive', use intense motivation. If 'Zen', use peaceful mindfulness. 
    If 'Motivating', use standard high-energy encouragement.
    If 'Intellectual', provide a quick philosophical thought or a complex sounding status report.
    Response must be in Yclock Neural Protocol JSON format with keys "title" and "body".`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ["title", "body"]
        }
      }
    });

    const result = JSON.parse(response.text || '{"title": "Yclock Protocol Initialized", "body": "Temporal synchronization complete. Welcome back to the matrix."}');
    return result;
  } catch (error) {
    console.error("Yclock Neural Sync Error:", error);
    return { title: "Nexus Link Interrupted", body: "Unable to sync with Yclock neural cluster. Reverting to local awakening protocols." };
  }
};
