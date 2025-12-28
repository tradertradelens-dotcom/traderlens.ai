
import { GoogleGenAI, Type } from "@google/genai";
import { TradePlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function compressImage(base64: string, quality = 0.7, maxWidth = 1200): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality).split(',')[1]);
    };
  });
}

export async function analyzeMultiTimeframe(primaryBase64: string): Promise<{ data: Partial<TradePlan> }> {
  const model = "gemini-3-pro-preview";
  const compressed = await compressImage(primaryBase64);
  
  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: compressed } },
        { text: "Analise este gráfico para trading SMC/ICT. Forneça par, viés, entrada, SL, TP e score de confiança." }
      ]
    },
    config: {
      responseMimeType: "application/json"
    }
  });

  return { data: JSON.parse(response.text || '{}') };
}

export async function fetchLivePrices(pairs: string[]): Promise<Record<string, number>> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Retorne o preço atual para: ${pairs.join(", ")}. JSON apenas.`,
    config: { tools: [{ googleSearch: {} }], responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || '{}');
}
