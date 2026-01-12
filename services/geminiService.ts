import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const getAI = () => {
  const apiKey = (globalThis as any).process?.env?.API_KEY || "";
  if (!apiKey) {
    console.error("API_KEY is missing in process.env");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Helper to strip markdown formatting if the model returns it
 */
const extractJson = (text: string) => {
  try {
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse JSON from AI response:", text);
    return null;
  }
};

export const analyzeLog = async (logData: string): Promise<string> => {
  try {
    const ai = getAI();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `As a Lead SOC Analyst for Dr. Omer Elsier Tayfour's Computer Engineering Lab, perform a deep forensic analysis of the following raw network log. Identify attack vectors, IPs, remediation steps, and severity level. Log Data: ${logData}`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, 
      }
    });
    return response.text || "Forensic node returned empty response.";
  } catch (error) {
    console.error("AnalyzeLog Error:", error);
    return "Forensic Analysis failed. This usually occurs if the AI quota is exceeded or the log content triggered a safety filter.";
  }
};

export const chatWithAI = async (message: string) => {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the 'CyberShield Elite' mentor in Dr. Omer Elsier Tayfour's Computer Engineering Lab. Provide professional, academic, and technical security guidance.`,
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "Communication link unstable. Please ensure you are asking security-related questions.";
  }
};

export const generateQuizQuestion = async (topic: string): Promise<any> => {
  try {
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
            correctAnswer: { type: Type.INTEGER, description: 'Zero-based index of the correct answer' },
            explanation: { type: Type.STRING }
          },
          required: ['id', 'question', 'options', 'correctAnswer', 'explanation']
        }
      }
    });
    
    return extractJson(response.text || "{}");
  } catch (e) {
    console.error("Quiz generation error:", e);
    return null;
  }
};