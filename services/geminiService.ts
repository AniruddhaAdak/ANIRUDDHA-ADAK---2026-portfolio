
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ImageSize, AspectRatio } from "../types";

// Note: Always use process.env.API_KEY directly when initializing GoogleGenAI inside functions.

export const searchPerson = async (name: string) => {
  // Initialize right before making an API call to ensure latest key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Tell me everything about ${name} as a professional. Search for his latest works, social media presence, and skills. Format the response as a clean, markdown professional bio.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const urls = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web?.uri).filter(Boolean) || [];
  return {
    text: response.text || "Could not find specific details.",
    urls: Array.from(new Set(urls as string[]))
  };
};

export const generateImage = async (prompt: string, size: ImageSize, ratio: AspectRatio) => {
  // Initialize right before making an API call to ensure latest key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Upgrade to gemini-3-pro-image-preview for high-quality images (2K, 4K)
  const isHighQuality = size === ImageSize.K2 || size === ImageSize.K4;
  const model = isHighQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  
  // imageSize config is only available for gemini-3-pro-image-preview
  const config: any = {
    imageConfig: {
      aspectRatio: ratio,
    }
  };
  
  if (isHighQuality) {
    config.imageConfig.imageSize = size;
  }

  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [{ text: prompt }],
    },
    config: config,
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Failed to generate image");
};

export const editImage = async (base64Image: string, prompt: string) => {
  // Initialize right before making an API call to ensure latest key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
        { text: prompt }
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateSpeech = async (text: string) => {
  // Initialize right before making an API call to ensure latest key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  return base64Audio;
};

export const fastResponse = async (prompt: string) => {
  // Initialize right before making an API call to ensure latest key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: prompt,
  });
  return response.text;
};

export const complexChat = async (history: { role: string; content: string }[]) => {
  // Initialize right before making an API call to ensure latest key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });

  const lastMessage = history[history.length - 1].content;
  const result = await chat.sendMessage({ message: lastMessage });
  return result.text;
};

// Audio Decoding Helper following Gemini raw PCM decoding requirements.
export const decodeBase64Audio = async (base64: string, ctx: AudioContext) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const numChannels = 1;
  const sampleRate = 24000;
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};
