import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

/**
 * Enhanced JSON extraction from LLM response.
 */
const extractJson = (text: string) => {
  if (!text) return null;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch (e) {
    const clean = trimmed.replace(/```json/g, '').replace(/```/g, '').trim();
    try {
      return JSON.parse(clean);
    } catch (e2) {
      const startBracket = Math.min(
        clean.indexOf('{') === -1 ? Infinity : clean.indexOf('{'),
        clean.indexOf('[') === -1 ? Infinity : clean.indexOf('[')
      );
      const endBracket = Math.max(
        clean.lastIndexOf('}'),
        clean.lastIndexOf(']')
      );
      if (startBracket !== Infinity && endBracket !== -1) {
        try {
          const jsonBody = clean.substring(startBracket, endBracket + 1);
          return JSON.parse(jsonBody);
        } catch (innerError) {
          console.error("Fuzzy JSON extraction failed:", innerError);
        }
      }
    }
  }
  return null;
};

// Helper to throw a standardized Auth error
const getAiInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    const error = new Error("AUTH_REQUIRED");
    (error as any).status = 401;
    throw error;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeLog = async (logData: string): Promise<string> => {
  try {
    const ai = getAiInstance();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `As a Lead SOC Analyst for Dr. Omer Elsier Tayfour's Computer Engineering Lab, perform a deep forensic analysis of the following raw network log. Identify attack vectors, IPs, remediation steps, and severity level. Log Data: ${logData}`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, 
      }
    });
    return response.text || "No analysis generated.";
  } catch (error: any) {
    console.error("Forensic Analysis Error:", error);
    throw error;
  }
};

export const chatWithAI = async (message: string) => {
  try {
    const ai = getAiInstance();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the 'CyberShield Elite' mentor in Dr. Omer Elsier Tayfour's Computer Engineering Lab. Provide professional technical security guidance.`,
      },
    });
    const response = await chat.sendMessage({ message });
    return response.text || "No response received.";
  } catch (error: any) {
    console.error("Neural Chat Error:", error);
    throw error;
  }
};

export const generateQuizQuestion = async (topic: string): Promise<any> => {
  try {
    const ai = getAiInstance();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a challenging security quiz question for the Computer Engineering lab on: ${topic}.`,
      config: {
        systemInstruction: "Strictly output JSON. No markdown.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING }, minItems: 4, maxItems: 4 },
            correctAnswer: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ['id', 'question', 'options', 'correctAnswer', 'explanation']
        }
      }
    });
    return extractJson(response.text);
  } catch (e: any) {
    console.error("Quiz Generation Error:", e);
    throw e;
  }
};