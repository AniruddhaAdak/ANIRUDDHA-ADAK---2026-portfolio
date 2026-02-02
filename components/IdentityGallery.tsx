
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const personaImages = [
  "https://i.ibb.co/VWVw4kG/image.png", 
  "https://i.ibb.co/6yVnL7r/image.png", 
  "https://i.ibb.co/4T1sQ2C/image.png", 
  "https://i.ibb.co/Zms5D3m/image.png", 
  "https://i.ibb.co/VWyD6C3/image.png", 
  "https://i.ibb.co/GMcWf5L/image.png", 
  "https://i.ibb.co/QvL0L6k/image.png", 
  "https://i.ibb.co/s6k8k8k/image.png", 
  "https://i.ibb.co/m9m9m9m/image.png", 
  "https://i.ibb.co/v4v4v4v/image.png", 
  "https://i.ibb.co/x4x4x4x/image.png"
];

const personaLabels = [
  "Building Sites", "Modern Design", "Coding Help", "Problem Solver", 
  "Hard Worker", "Digital Life", "Creative Hub", "Team Leader", 
  "AI Maker", "Friendly Guy", "New Year 2026"
];

const IdentityGallery: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinItems = gsap.utils.toArray('.persona-item');
      
      const horizontalTween = gsap.to(pinItems, {
        xPercent: -100 * (pinItems.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.1,
          end: () => "+=" + (triggerRef.current?.offsetWidth || 0) * 4,
        }
      });
      
      pinItems.forEach((item: any) => {
        const img = item.querySelector('.img-container img');
        if (img) {
          gsap.fromTo(img, 
            { scale: 1.3 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                containerAnimation: horizontalTween,
                start: 'left right',
                end: 'center center',
                scrub: true
              }
            }
          );
        }

        // Add a "lean" or "skew" effect on scroll speed
        gsap.to(item, {
            skewX: 1,
            scrollTrigger: {
                trigger: item,
                containerAnimation: horizontalTween,
                scrub: 0.5
            }
        });
      });
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[40vw] font-black tracking-tighter uppercase italic">PHOTOS</span>
      </div>

      <div ref={containerRef} className="flex h-screen w-[1100vw] relative z-10">
        {personaImages.map((src, i) => (
          <section key={i} className="persona-item w-screen h-full flex items-center justify-center px-10 md:px-24 shrink-0">
            <div className="relative w-full h-[85vh] max-w-7xl flex flex-col md:flex-row items-center gap-12 group">
               
               <div className="img-container relative flex-1 h-full glass rounded-none overflow-hidden border border-white/10 p-2">
                 <div className="glimpse-overlay z-20" />
                 <img 
                    src={src} 
                    alt={`Photo ${i+1}`} 
                    className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/adak${i}/1200/1600?grayscale`; }}
                 />
               </div>

               <div className="flex-1 space-y-12">
                  <div>
                    <span className="text-[10px] font-black tracking-[1em] text-cyan-500 uppercase block mb-6">FACET_{i+1}</span>
                    <h4 className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter">
                      {(personaLabels[i] || "Me").split(' ').map((word, idx) => (
                        <span key={idx} className={idx % 2 === 1 ? 'gradient-text italic block' : 'block'}>{word}</span>
                      ))}
                    </h4>
                  </div>
                  
                  <div className="glass p-12 border-l-4 border-cyan-500 max-w-md">
                     <p className="text-[9px] font-black tracking-[0.5em] text-slate-500 uppercase mb-4">A quick note</p>
                     <p className="text-sm text-slate-300 font-light leading-relaxed">
                       This is a look at my work as a {personaLabels[i]}. I love building new things for the web. 
                     </p>
                  </div>
               </div>

               <div className="absolute -bottom-20 -right-20 text-[25rem] font-black text-white/[0.03] select-none pointer-events-none">
                  0{i+1}
               </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default IdentityGallery;
