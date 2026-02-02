
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Globe, Terminal, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const collaborations = [
  { name: "TECH INNOVATORS INC", url: "techinnovators.co.in", role: "CTO", color: "from-cyan-500/10" },
  { name: "HACKTOBERFEST", url: "hacktoberfest.com", role: "238 PRs", color: "from-lime-500/10" },
  { name: "BBIT KOLKATA", url: "bbit.edu.in", role: "B.Tech CSE", color: "from-indigo-500/10" },
  { name: "DEV.TO COMMUNITY", url: "dev.to/aniruddhaadak80", role: "Top Author", color: "from-emerald-500/10" },
  { name: "GOOGLE CLOUD", url: "cloud.google.com", role: "Certified", color: "from-blue-500/10" },
];

const ShowcaseGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textLayerRef.current, {
        xPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });

      gsap.utils.toArray('.showcase-card').forEach((card: any, i) => {
        gsap.from(card, {
          y: 150,
          scale: 0.9,
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 70%",
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-80 overflow-hidden bg-[#020202]">
      {/* Massive Background Text with color glimpse */}
      <div 
        ref={textLayerRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none z-0"
      >
        <span className="text-[30vw] font-black opacity-[0.03] tracking-tighter text-white uppercase italic leading-none block">
          NEURAL LOGIC • AGENTIC AI • NEURAL LOGIC • AGENTIC AI •
        </span>
        <span className="text-[30vw] font-black opacity-[0.02] tracking-tighter text-cyan-500 uppercase leading-none block -mt-32">
          KOLKATA • SYSTEM • SCALE • KOLKATA • SYSTEM • SCALE •
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32 flex justify-between items-end">
          <div>
            <h2 className="text-xs font-black tracking-[0.8em] text-cyan-500 uppercase mb-6 flex items-center gap-4">
               <Cpu className="w-4 h-4" /> Network Integrity
            </h2>
            <h3 className="text-7xl md:text-9xl font-black tracking-tighter leading-none italic">ECOSYSTEM.</h3>
          </div>
          <div className="hidden md:block text-right opacity-30 text-[10px] font-mono">
            SYNC_NODE_OK<br/>DATA_STREAM_OK
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborations.map((collab, i) => (
            <div 
              key={i} 
              className="showcase-card group glass p-12 border-white/5 relative overflow-hidden flex flex-col justify-between aspect-square transition-all duration-700 hover:border-cyan-500/30"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${collab.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="glimpse-overlay" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-16 h-16 bg-white/5 rounded-none flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                   {i % 2 === 0 ? <Globe className="w-8 h-8 text-cyan-500" /> : <Terminal className="w-8 h-8 text-lime-500" />}
                </div>
                <a href={`https://${collab.url}`} target="_blank" className="p-5 rounded-none glass border border-white/10 hover:bg-white text-white hover:text-black transition-all">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase block mb-4 border-l-2 border-cyan-500 pl-4">{collab.role}</span>
                <h4 className="text-4xl font-bold tracking-tighter leading-tight mb-3 italic">{collab.name}</h4>
                <p className="text-[10px] text-slate-500 font-mono tracking-widest">{collab.url}</p>
              </div>

              {/* Technical Scanline effect */}
              <div className="absolute left-0 top-0 w-full h-[1px] bg-cyan-500/50 -translate-y-full group-hover:animate-scan z-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseGrid;
