import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

/**
 * Robust JSON extraction from LLM response.
 * Handles cases with leading/trailing text or markdown backticks.
 */
const extractJson = (text: string) => {
  if (!text) return null;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch (e) {
    try {
      const startBracket = Math.min(
        trimmed.indexOf('{') === -1 ? Infinity : trimmed.indexOf('{'),
        trimmed.indexOf('[') === -1 ? Infinity : trimmed.indexOf('[')
      );
      const endBracket = Math.max(
        trimmed.lastIndexOf('}'),
        trimmed.lastIndexOf(']')
      );

      if (startBracket !== Infinity && endBracket !== -1) {
        const jsonBody = trimmed.substring(startBracket, endBracket + 1);
        return JSON.parse(jsonBody);
      }
    } catch (innerError) {
      console.error("Fuzzy JSON extraction failed:", innerError);
    }
    return null;
  }
};

export const analyzeLog = async (logData: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key Missing");

  try {
    const ai = new GoogleGenAI({ apiKey });
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
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key Missing");

  try {
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the 'CyberShield Elite' mentor in Dr. Omer Elsier Tayfour's Computer Engineering Lab. Provide professional, academic, and technical security guidance. Focus on Computer Engineering principles.`,
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
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key Missing");

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a challenging multiple-choice network security question for the Computer Engineering lab. Topic: ${topic}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              minItems: 4,
              maxItems: 4
            },
            correctAnswer: { type: Type.INTEGER, description: 'Zero-based index' },
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