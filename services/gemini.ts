
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getStylingAdvice(productName: string, productDescription: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `身為一名高級時裝造型師，請針對這款商品「${productName}」（描述：${productDescription}）提供一段約100字的專業穿搭建議。請使用中文，口吻專業、親切且優雅。`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    });

    return response.text || "目前無法獲取穿搭建議，請稍後再試。";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "我們的 AI 造型師正在休息，請稍後再試。";
  }
}
