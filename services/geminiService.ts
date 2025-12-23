import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateEmailDraft = async (
  recipientName: string,
  company: string,
  dealContext: string,
  tone: 'formal' | 'casual' | 'persuasive'
): Promise<string> => {
  try {
    const prompt = `
      You are an expert sales assistant. Write a cold email or follow-up email.
      
      Recipient: ${recipientName}
      Company: ${company}
      Context/Goal: ${dealContext}
      Tone: ${tone}
      
      Keep it concise (under 150 words). Include a clear call to action. 
      Return only the email body text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I couldn't generate the email at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your API key configuration.";
  }
};

export const analyzeDealProbability = async (dealTitle: string, value: number, currentStage: string): Promise<string> => {
    try {
        const prompt = `
          Analyze this sales deal and provide a brief strategic tip (1-2 sentences) on how to move it to the next stage.
          
          Deal: ${dealTitle}
          Value: $${value}
          Current Stage: ${currentStage}
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
    
        return response.text || "No analysis available.";
      } catch (error) {
        console.error("Gemini API Error:", error);
        return "Analysis unavailable.";
      }
}
