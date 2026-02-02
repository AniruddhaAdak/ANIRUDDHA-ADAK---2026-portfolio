
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, MapPin, Sparkles, Terminal, Code2, Heart, Brain, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-section').forEach((elem: any) => {
        gsap.from(elem, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-64 py-40">
      <section className="reveal-section relative">
        <div className="flex flex-col md:flex-row gap-12 items-baseline mb-20">
          <h2 className="text-[12vw] md:text-[20vw] font-black tracking-tighter leading-none opacity-[0.03] select-none absolute -left-20 -top-40 pointer-events-none uppercase">PROFILE</h2>
          <div className="relative z-10">
            <p className="text-[10px] font-black tracking-[0.8em] text-cyan-500 mb-6 uppercase flex items-center gap-4">
               <Zap className="w-4 h-4 fill-cyan-500" /> Name: Aniruddha Adak
            </p>
            <h3 className="text-6xl md:text-9xl font-black max-w-5xl leading-[0.9] tracking-tighter italic">
              MY STORY AND <span className="gradient-text">CREATIVE</span> LIFE.
            </h3>
          </div>
        </div>
        
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-8 text-2xl text-slate-300 font-light leading-relaxed space-y-12">
            <p className="text-4xl text-white font-bold leading-tight border-l-[12px] border-cyan-500 pl-12 italic">
              "Kolkata gave me strength, coding gave me a vision, and AI helps me build amazing things."
            </p>
            <p className="max-w-3xl">
              I am Aniruddha. People know me as <span className="text-white font-bold underline decoration-cyan-500">aniruddhaadak80</span> online. I build websites and smart tools that help people.
            </p>
          </div>
          <div className="md:col-span-4">
             <div className="glass p-12 border-t-4 border-lime-500 flex flex-col items-center text-center">
                <MapPin className="w-12 h-12 text-lime-500 mb-6" />
                <span className="text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase">My Home</span>
                <h4 className="text-3xl font-black mt-2 italic uppercase">Kolkata</h4>
                <div className="w-full h-[1px] bg-white/10 my-8" />
                <p className="text-xs text-slate-500 leading-relaxed font-mono">West Bengal, India</p>
             </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-x-24 gap-y-40">
        <div className="reveal-section space-y-8 group">
          <div className="flex items-center gap-6 text-cyan-500">
            <Terminal className="w-8 h-8" />
            <h4 className="text-xs font-black uppercase tracking-[0.5em]">01_My Roots</h4>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed border-b border-white/5 pb-8 group-hover:border-cyan-500/50 transition-colors">
            I started in West Bengal. My first time coding was hard because my computer was slow. This taught me to make websites that work fast for everyone.
          </p>
        </div>

        <div className="reveal-section space-y-8 group">
          <div className="flex items-center gap-6 text-lime-500">
            <Code2 className="w-8 h-8" />
            <h4 className="text-xs font-black uppercase tracking-[0.5em]">02_College</h4>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed border-b border-white/5 pb-8 group-hover:border-lime-500/50 transition-colors">
            Budge Budge Institute of Technology (BBIT). Class of 2026. Here, I learned how to turn ideas into real apps.
          </p>
        </div>

        <div className="reveal-section space-y-8 group">
          <div className="flex items-center gap-6 text-white">
            <Sparkles className="w-8 h-8" />
            <h4 className="text-xs font-black uppercase tracking-[0.5em]">03_Hard Work</h4>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed border-b border-white/5 pb-8 group-hover:border-white transition-colors">
            I shared 238 pieces of code in one month! I love working with other coders around the world to build great things.
          </p>
        </div>

        <div className="reveal-section space-y-8 group">
          <div className="flex items-center gap-6 text-cyan-400">
            <Brain className="w-8 h-8" />
            <h4 className="text-xs font-black uppercase tracking-[0.5em]">04_AI Tools</h4>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed border-b border-white/5 pb-8 group-hover:border-cyan-400/50 transition-colors">
            Now I build smart tools like "SupplyGuard AI". I want to make computers more helpful for everyone.
          </p>
        </div>
      </div>

      <section className="reveal-section glass p-16 md:p-32 relative overflow-hidden group">
        <div className="absolute inset-0 bg-cyan-500/[0.02] -z-10" />
        <div className="max-w-5xl mx-auto space-y-12">
          <h3 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase">The <span className="text-cyan-500">Real</span> Me.</h3>
          <div className="space-y-8 text-2xl text-slate-300 font-light leading-relaxed">
             <p>
               Even though I build complex things, I am still a student who loves to learn. I believe that being kind and working hard is the only way to succeed.
             </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-16">
             <div className="space-y-4">
               <Users className="w-10 h-10 text-cyan-500" />
               <span className="font-black text-[10px] tracking-[0.4em] uppercase block">Working Together</span>
             </div>
             <div className="space-y-4">
               <Heart className="w-10 h-10 text-lime-500" />
               <span className="font-black text-[10px] tracking-[0.4em] uppercase block">Helping Others</span>
             </div>
             <div className="space-y-4">
               <Zap className="w-10 h-10 text-white" />
               <span className="font-black text-[10px] tracking-[0.4em] uppercase block">Getting it Done</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
