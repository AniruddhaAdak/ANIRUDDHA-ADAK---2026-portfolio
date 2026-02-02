
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ImageSize, AspectRatio } from "../types";

// Knowledge Base about Aniruddha Adak
const ANIRUDDHA_DATA = `
Identity:
- Name: Aniruddha Adak
- Online Handle: aniruddhaadak80
- Location: Kolkata, West Bengal, India
- Role: Software Engineer, AI Enthusiast, Student

Education:
- College: Budge Budge Institute of Technology (BBIT)
- Degree: B.Tech in Computer Science and Engineering (CSE)
- Graduation Year: 2026

Professional Experience & Achievements:
- Role: CTO at Tech Innovators Inc (techinnovators.co.in)
- Open Source: Contributed 238 Pull Requests in a single month during Hacktoberfest.
- Community: Top Author on DEV.to.
- Certifications: Google Cloud Certified.

Projects:
- SupplyGuard AI: A smart tool to make computers more helpful.
- OmniSpace: Spatial UI design for immersive experiences.
- BioSynth Core: Generative branding and digital identity.
- Neural Canvas: A comprehensive AI toolset for creators.
- Ethos Protocol: Web3 architecture and decentralized systems.

Skills:
- Frontend: Next.js, React, Tailwind CSS, GSAP, Framer Motion.
- AI: Gemini API, Neural Logic, Agentic AI, Generative Image/Text.
- Design: Spatial UI, Clean Modern Aesthetics, UI/UX.

Personality & Vision:
- Friendly, hardworking, and kind.
- Believes in strength through coding and vision through AI.
- Dedicated to building fast, accessible websites for everyone.
- Aiming to build a "Neural Genesis" in 2026.

Contact Info:
- Email: hello@aniruddha.dev
- Personal Email: aniruddhaadak80@gmail.com
- Github: aniruddhaadak80
- LinkedIn: aniruddha-adak
`;

export const complexChat = async (history: { role: string; content: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Convert history to the format expected by sendMessage
  const lastMessage = history[history.length - 1].content;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    })),
    config: {
      systemInstruction: `You are Aniruddha's personal AI Assistant. Your goal is to represent him professionally and accurately. 
      Use the following data to answer questions about him: ${ANIRUDDHA_DATA}. 
      Be friendly, concise, and helpful. If you don't know something for sure, offer to help the user contact Aniruddha directly.`,
      thinkingConfig: { thinkingBudget: 16000 }
    }
  });

  return response.text || "I'm having trouble connecting right now.";
};

export const getSuggestions = async (lastQuery: string, lastResponse: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this interaction, suggest 3 short (max 5 words each) follow-up questions for a visitor to ask Aniruddha Adak.
    User asked: ${lastQuery}
    Assistant answered: ${lastResponse}
    Return the suggestions as a simple JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch {
    return ["What are your projects?", "Tell me about BBIT", "Contact info"];
  }
};

// Existing functions remain unchanged below...
export const searchPerson = async (name: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Tell me everything about ${name} as a professional. Search for his latest works, social media presence, and skills. Format the response as a clean, markdown professional bio.`,
    config: { tools: [{ googleSearch: {} }] },
  });
  const urls = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web?.uri).filter(Boolean) || [];
  return { text: response.text || "Could not find specific details.", urls: Array.from(new Set(urls as string[])) };
};

export const generateImage = async (prompt: string, size: ImageSize, ratio: AspectRatio) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const isHighQuality = size === ImageSize.K2 || size === ImageSize.K4;
  const model = isHighQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
  const config: any = { imageConfig: { aspectRatio: ratio } };
  if (isHighQuality) config.imageConfig.imageSize = size;
  const response = await ai.models.generateContent({
    model: model,
    contents: { parts: [{ text: prompt }] },
    config: config,
  });
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  throw new Error("Failed to generate image");
};

export const editImage = async (base64Image: string, prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } }, { text: prompt }] },
  });
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const generateSpeech = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say clearly: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

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
