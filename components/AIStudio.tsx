
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateImage, editImage, generateSpeech, decodeBase64Audio } from '../services/geminiService';
import { ImageSize, AspectRatio } from '../types';
import { Wand2, Mic2, Palette, Box, ChevronRight, Loader2, Zap, Play } from 'lucide-react';

// Fix: Use optional modifier for aistudio and ensure it doesn't clash with the component name
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// Fix: Renamed component to AIStudioSection to avoid collision with global window.aistudio property name
const AIStudioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'edit' | 'voice'>('generate');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [size, setSize] = useState<ImageSize>(ImageSize.K1);
  const [ratio, setRatio] = useState<AspectRatio>(AspectRatio.A1_1);
  const [editPrompt, setEditPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [voiceText, setVoiceText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setResultImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = async () => {
    setIsProcessing(true);
    try {
      if (activeTab === 'generate') {
        if (!prompt) return;
        // Mandatory API key selection for Gemini 3 Pro models
        if (typeof window !== 'undefined' && window.aistudio) {
          const hasKey = await window.aistudio.hasSelectedApiKey?.();
          if (!hasKey) {
            await window.aistudio.openSelectKey?.();
          }
        }
        const img = await generateImage(prompt, size, ratio);
        setResultImage(img);
      } else if (activeTab === 'edit') {
        if (!editPrompt || !uploadedImage) return;
        const img = await editImage(uploadedImage, editPrompt);
        if (img) setResultImage(img);
      } else if (activeTab === 'voice') {
        if (!voiceText) return;
        const base64Audio = await generateSpeech(voiceText);
        if (base64Audio) {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const buffer = await decodeBase64Audio(base64Audio, audioCtx);
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(audioCtx.destination);
          source.onended = () => setIsPlayingAudio(false);
          setIsPlayingAudio(true);
          source.start();
        }
      }
    } catch (error) {
      console.error(error);
      // Reset key selection if entity not found
      if (error instanceof Error && error.message.includes("Requested entity was not found")) {
        if (typeof window !== 'undefined' && window.aistudio) {
          await window.aistudio.openSelectKey?.();
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative py-40">
      <div className="absolute top-0 right-0 text-[18rem] font-black text-white/[0.02] pointer-events-none select-none italic uppercase">AI TOOLS</div>
      
      <div className="grid lg:grid-cols-12 gap-10 items-stretch relative z-10">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab('generate')}
            className={`flex items-center gap-6 p-10 transition-all text-left group ${activeTab === 'generate' ? 'bg-white text-black' : 'glass hover:border-cyan-500/30'}`}
          >
            <div className={`p-4 ${activeTab === 'generate' ? 'bg-black text-white' : 'bg-white/5 text-cyan-400'}`}>
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm">Make Pictures</h4>
              <p className={`text-[10px] tracking-widest uppercase font-bold mt-1 ${activeTab === 'generate' ? 'text-black/60' : 'text-slate-500'}`}>AI Magic</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-6 p-10 transition-all text-left group ${activeTab === 'edit' ? 'bg-white text-black' : 'glass hover:border-lime-500/30'}`}
          >
            <div className={`p-4 ${activeTab === 'edit' ? 'bg-black text-white' : 'bg-white/5 text-lime-400'}`}>
              <Palette className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm">Edit Photos</h4>
              <p className={`text-[10px] tracking-widest uppercase font-bold mt-1 ${activeTab === 'edit' ? 'text-black/60' : 'text-slate-500'}`}>Change things</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-6 p-10 transition-all text-left group ${activeTab === 'voice' ? 'bg-white text-black' : 'glass hover:border-white/30'}`}
          >
            <div className={`p-4 ${activeTab === 'voice' ? 'bg-black text-white' : 'bg-white/5 text-white'}`}>
              <Mic2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm">Speak to me</h4>
              <p className={`text-[10px] tracking-widest uppercase font-bold mt-1 ${activeTab === 'voice' ? 'text-black/60' : 'text-slate-500'}`}>Voice Assistant</p>
            </div>
          </button>
        </div>

        <div className="lg:col-span-8 glass p-10 md:p-16 border-white/5 relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-16 h-full">
            <div className="flex flex-col justify-between h-full space-y-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-4xl font-black uppercase tracking-tighter italic border-b-2 border-cyan-500 pb-4 inline-block">
                    {activeTab === 'generate' && "Create an Image"}
                    {activeTab === 'edit' && "Edit an Image"}
                    {activeTab === 'voice' && "Hear a Voice"}
                  </h3>

                  {activeTab === 'generate' && (
                    <div className="space-y-8">
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Type what you want to see..."
                        className="w-full bg-black border border-white/10 p-8 text-white text-lg focus:border-cyan-500 outline-none h-48 resize-none font-sans"
                      />
                      <div className="grid grid-cols-2 gap-6">
                        <select 
                          value={size}
                          onChange={(e) => setSize(e.target.value as ImageSize)}
                          className="bg-black border border-white/10 p-4 text-[10px] font-black text-white uppercase outline-none focus:border-cyan-500"
                        >
                          {Object.values(ImageSize).map(s => <option key={s} value={s}>{s} Quality</option>)}
                        </select>
                        <select 
                          value={ratio}
                          onChange={(e) => setRatio(e.target.value as AspectRatio)}
                          className="bg-black border border-white/10 p-4 text-[10px] font-black text-white uppercase outline-none focus:border-cyan-500"
                        >
                          {Object.values(AspectRatio).map(r => <option key={r} value={r}>Shape: {r}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  {activeTab === 'edit' && (
                    <div className="space-y-8">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-white/10 p-16 text-center group cursor-pointer hover:border-lime-500 transition-all bg-white/[0.02]"
                      >
                        {uploadedImage ? (
                          <img src={uploadedImage} alt="Preview" className="w-24 h-24 object-cover mx-auto mb-4" />
                        ) : (
                          <Box className="w-12 h-12 text-slate-700 mx-auto mb-6 group-hover:text-lime-500 transition-colors" />
                        )}
                        <p className="text-[10px] font-black tracking-widest uppercase text-slate-500">
                          {uploadedImage ? "Click to change photo" : "Click to upload photo"}
                        </p>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                      </div>
                      <input 
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
                        placeholder="What should I change?"
                        className="w-full bg-black border border-white/10 p-5 text-white outline-none font-sans text-sm focus:border-lime-500"
                      />
                    </div>
                  )}

                  {activeTab === 'voice' && (
                    <div className="space-y-8">
                       <textarea 
                        value={voiceText}
                        onChange={(e) => setVoiceText(e.target.value)}
                        placeholder="What should I say?"
                        className="w-full bg-black border border-white/10 p-8 text-white text-lg focus:border-white outline-none h-48 resize-none font-sans"
                      />
                       <div className="py-16 space-y-8 text-center bg-white/[0.01] border border-white/5 relative">
                          <div className="w-28 h-28 glass rounded-full mx-auto flex items-center justify-center relative">
                             {isPlayingAudio && <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-ping" />}
                             {isPlayingAudio ? <Play className="w-12 h-12 text-cyan-400" /> : <Mic2 className="w-12 h-12 text-white/20" />}
                          </div>
                          <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">
                            {isPlayingAudio ? "Speaking..." : "Ready to speak"}
                          </p>
                       </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <button 
                onClick={handleAction}
                disabled={isProcessing}
                className="w-full py-6 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all flex items-center justify-center gap-4 group"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Start Now <Zap className="w-4 h-4" /></>}
              </button>
            </div>

            <div className="relative aspect-square glass overflow-hidden border border-white/5 group bg-black">
              {resultImage ? (
                <>
                  <img src={resultImage} alt="Result" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-800 space-y-4">
                  <div className="w-20 h-[1px] bg-slate-800" />
                  <p className="text-[10px] uppercase font-black tracking-[0.6em]">Waiting for you</p>
                  <div className="w-20 h-[1px] bg-slate-800" />
                </div>
              )}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 border-2 border-cyan-500 border-t-transparent animate-spin mx-auto" />
                    <p className="text-[10px] uppercase font-black tracking-[0.8em] text-cyan-500 animate-pulse">
                      {activeTab === 'voice' ? "Generating speech..." : "Building your image..."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudioSection;
