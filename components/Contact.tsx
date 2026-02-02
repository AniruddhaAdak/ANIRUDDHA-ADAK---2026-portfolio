
import React, { useState, useRef, useEffect } from 'react';
import { complexChat } from '../services/geminiService';
import { Message } from '../types';
import { Terminal as TerminalIcon, Send, Shield, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I am Aniruddha's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;
    
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const response = await complexChat(messages.concat(userMsg));
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center py-40">
      <div>
        <h2 className="text-7xl md:text-9xl font-black mb-12 leading-[0.85] tracking-tighter italic uppercase">
          SAY <span className="gradient-text">HELLO.</span>
        </h2>
        <div className="space-y-10">
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 glass border border-white/5 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all">
               <Shield className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">My Email</p>
              <p className="text-2xl font-black tracking-tight uppercase">hello@aniruddha.dev</p>
            </div>
          </div>
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 glass border border-white/5 flex items-center justify-center text-lime-400 group-hover:border-lime-500 group-hover:bg-lime-500 group-hover:text-black transition-all">
               <Globe className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">My City</p>
              <p className="text-2xl font-black tracking-tight uppercase italic">Kolkata, India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass border border-white/5 flex flex-col h-[700px] relative overflow-hidden">
        <div className="p-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase ml-4">Chat with my AI</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
             <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">Online</span>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 font-sans text-sm">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end text-right' : 'items-start text-left'}`}>
              <div className="flex items-center gap-3 mb-2 opacity-30">
                 <span className="text-[9px] font-bold tracking-widest uppercase">{msg.role === 'user' ? 'YOU' : 'AI'}</span>
              </div>
              <div className={`max-w-[90%] px-6 py-4 border ${
                msg.role === 'user' 
                  ? 'border-white/10 text-white italic bg-white/[0.02]' 
                  : 'border-cyan-500/30 text-cyan-400 bg-cyan-500/[0.02]'
              }`}>
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex items-start text-left animate-pulse">
               <div className="max-w-[90%] px-6 py-4 border border-lime-500/30 text-lime-400 bg-lime-500/[0.02]">
                  <p className="tracking-widest">Thinking...</p>
               </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-black/50 border-t border-white/5">
          <div className="flex gap-4 items-center">
            <span className="text-cyan-500 font-black">$</span>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none font-sans placeholder:text-slate-800"
            />
            <button 
              onClick={handleSend}
              disabled={isThinking}
              className="p-4 bg-cyan-500 hover:bg-white text-black transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
