import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const getAI = () => {
  // Use globalThis cast to satisfy TS without Node types
  const apiKey = (globalThis as any).process?.env?.API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

export const analyzeLog = async (logData: string): Promise<string> => {
  const ai = getAI();
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `As a Lead SOC Analyst, perform a deep forensic analysis of the following raw network log. Identify attack vectors, IPs, remediation steps, and severity level. Log Data: ${logData}`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }, 
    }
  });
  return response.text || "Forensic node returned empty response.";
};

export const chatWithAI = async (message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the 'CyberShield Elite' mentor. You provide professional and technical security guidance.`,
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generateQuizQuestion = async (topic: string): Promise<any> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a difficult multiple-choice scenario-based question about ${topic} for engineering students.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER, description: 'Unique question identifier' },
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 4,
            maxItems: 4
          },
          correctAnswer: { type: Type.INTEGER },
          explanation: { type: Type.STRING }
        },
        required: ['id', 'question', 'options', 'correctAnswer', 'explanation']
      }
    }
  });
  
  try {
    const text = response.text;
    return JSON.parse(text?.trim() || '{}');
  } catch (e) {
    console.error("Quiz parsing error:", e);
    return null;
  }
};