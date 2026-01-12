
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// Fix: Initialize GoogleGenAI once using the environment variable directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a network log using Gemini 3's reasoning capabilities.
 * We use thinkingBudget to allow the model to reason through complex attack patterns.
 */
export const analyzeLog = async (logData: string): Promise<string> => {
  // Fix: Upgraded to 'gemini-3-pro-preview' for complex reasoning/forensic analysis tasks
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `As a Lead Security Operations Center (SOC) Analyst, perform a deep forensic analysis of the following raw network log. 
    Identify:
    1. Potential attack vectors (DDoS, SQLi, Brute force, etc.)
    2. Specific suspicious IP addresses or user agents.
    3. Recommended immediate remediation steps.
    4. Severity level (Low, Medium, High, Critical).

    Log Data:
    ${logData}`,
    config: {
      // Fix: Max budget for gemini-3-pro-preview is 32768
      thinkingConfig: { thinkingBudget: 32768 }, 
    }
  });
  // Fix: Directly access the .text property from the response as it is a getter
  return response.text || "Analysis failed to generate. Please ensure the log data is valid.";
};

/**
 * Chat with the Security Consultant AI.
 */
export const chatWithAI = async (message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the 'CyberShield Elite' mentor, assisting Dr. Omer Elsier Tayfour's Computer Engineering students at King Khalid University. 
      Your tone is professional, technical, and highly focused on ethical hacking and academic excellence. 
      Explain complex concepts like Social Engineering, Cryptography, and Network Defense using analogies suitable for engineering students. 
      Always prioritize explaining the 'why' behind security protocols.`,
    },
  });

  const response = await chat.sendMessage({ message });
  // Fix: Access .text property directly (do not use text() method)
  return response.text;
};

/**
 * Generates a dynamic security challenge for the user.
 */
export const generateQuizQuestion = async (topic: string): Promise<any> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a difficult multiple-choice scenario-based question about ${topic} for Computer Engineering students. Focus on real-world application rather than just definitions.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 4,
            maxItems: 4
          },
          correctAnswer: { type: Type.INTEGER, description: '0-based index of the correct answer' },
          explanation: { type: Type.STRING, description: 'Explanation of why the answer is correct and others are wrong' }
        },
        required: ['question', 'options', 'correctAnswer', 'explanation']
      }
    }
  });
  
  try {
    // Fix: Access .text and trim the result for safe JSON parsing
    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
};
