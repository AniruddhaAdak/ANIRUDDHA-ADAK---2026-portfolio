
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDownRight, Sparkles, MoveRight, Radio } from 'lucide-react';

const Hero: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = nameRef.current?.querySelectorAll('.char');
    if (letters) {
      gsap.from(letters, {
        opacity: 0,
        y: 200,
        rotateX: -110,
        stagger: 0.03,
        duration: 2.5,
        ease: "expo.out",
      });
    }

    gsap.to('.hero-grid', {
      backgroundPositionY: '+=100px',
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block origin-bottom">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <div ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
      <div className="hero-grid absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="z-10 text-center px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-cyan-500/20 text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-16"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          Welcome to my 2026 Portfolio
        </motion.div>

        <h1 
          ref={nameRef}
          className="text-[16vw] md:text-[11vw] font-black leading-[0.7] tracking-tighter mb-20 perspective-[2000px] select-none"
        >
          <div className="reveal-text">{splitText("ANIRUDDHA")}</div>
          <div className="reveal-text italic gradient-text mt-8">{splitText("ADAK")}</div>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-40"
        >
          <div className="text-left max-w-xs border-l-2 border-cyan-500/50 pl-8">
            <p className="text-slate-400 text-xs leading-relaxed font-medium uppercase tracking-widest">
              I build <span className="text-white">Smart Websites</span> & <span className="text-white">Clean Designs</span>.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-7 bg-white text-black rounded-none font-black uppercase tracking-widest text-[11px] hover:bg-cyan-500 hover:text-white transition-all duration-500 flex items-center gap-4 group overflow-hidden relative"
            >
              <span className="relative z-10">See my work</span>
              <div className="absolute inset-0 bg-cyan-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
            <button 
              onClick={() => document.getElementById('ai-studio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-7 glass border-white/10 text-white rounded-none font-black uppercase tracking-widest text-[11px] hover:border-cyan-500/50 transition-all flex items-center gap-4 group"
            >
              Try AI Tools <ArrowDownRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 right-16 flex flex-col items-end gap-2 opacity-20">
         <span className="text-[9px] font-black tracking-[0.8em] uppercase text-cyan-400">STATUS: FAST</span>
         <span className="text-[9px] font-black tracking-[0.8em] uppercase">YEAR: 2026</span>
      </div>
    </div>
  );
};

export default Hero;
