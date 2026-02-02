
import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-40 border-t border-white/5 bg-[#020202]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid md:grid-cols-2 gap-24 items-start mb-32">
          <div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic">TERMINATE<br/>SESSION.</h2>
            <p className="text-slate-500 max-w-sm text-lg font-light leading-relaxed border-l-2 border-cyan-500 pl-8">
              Available for high-stakes AI integration, Next.js optimization, and radical spatial design architectures.
            </p>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <div className="text-[10px] font-black tracking-[0.5em] text-slate-700 uppercase mb-4">Transmission Channels</div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a href="https://github.com/aniruddhaadak80" target="_blank" className="p-6 glass border border-white/5 hover:border-cyan-500 hover:text-cyan-400 transition-all flex items-center gap-4">
                <Github className="w-6 h-6" /> <span className="text-[10px] font-black tracking-widest uppercase">Github</span>
              </a>
              <a href="https://linkedin.com/in/aniruddha-adak" target="_blank" className="p-6 glass border border-white/5 hover:border-cyan-500 hover:text-cyan-400 transition-all flex items-center gap-4">
                <Linkedin className="w-6 h-6" /> <span className="text-[10px] font-black tracking-widest uppercase">Linkedin</span>
              </a>
              <a href="mailto:aniruddhaadak80@gmail.com" className="p-6 glass border border-white/5 hover:border-cyan-500 hover:text-cyan-400 transition-all flex items-center gap-4">
                <Mail className="w-6 h-6" /> <span className="text-[10px] font-black tracking-widest uppercase">Direct</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-20 border-t border-white/5">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.8em]">
              © 2026 ANIRUDDHA ADAK
            </p>
            <p className="text-[9px] font-bold text-cyan-500 tracking-[0.4em] uppercase">
              Node: Kolkata_India_026
            </p>
          </div>
          <div className="flex gap-12">
             <div className="text-right">
               <span className="text-[9px] font-black text-slate-800 tracking-widest block mb-1">C_GEN</span>
               <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">BBIT_CSE_2026</span>
             </div>
             <div className="text-right">
               <span className="text-[9px] font-black text-slate-800 tracking-widest block mb-1">M_CORE</span>
               <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">Gemini_3_Pro</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
