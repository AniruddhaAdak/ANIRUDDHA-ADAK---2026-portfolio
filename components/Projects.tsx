
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "OmniSpace",
      category: "Spatial UI",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800",
      color: "from-blue-600/20"
    },
    {
      title: "BioSynth Core",
      category: "Generative Branding",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
      color: "from-purple-600/20"
    },
    {
      title: "Neural Canvas",
      category: "AI Toolset",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      color: "from-pink-600/20"
    },
    {
      title: "Ethos Protocol",
      category: "Web3 Architecture",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
      color: "from-emerald-600/20"
    }
  ];

  // Fix: Explicitly type variants as Variants to satisfy Framer Motion's strict index signature and easing types
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // Fix: Explicitly type variants as Variants to ensure 'ease' string is treated as a valid Easing type
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="py-20">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-16">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter">WORKS.</h2>
        <span className="text-slate-500 font-light text-xl">Selected pieces from the vault</span>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
      >
        {projects.map((project, i) => (
          <motion.div key={i} variants={item} className="group relative">
            <div className={`relative aspect-[16/10] overflow-hidden rounded-[2rem] glass p-1 transition-all duration-500 group-hover:p-0`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 rounded-[1.8rem]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 z-20">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center justify-between">
                   <div className="flex items-center gap-3 text-white">
                      <Layers className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-bold uppercase tracking-widest">{project.category}</span>
                   </div>
                   <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-bold tracking-tight mb-1">{project.title}</h3>
                <p className="text-slate-500 text-sm font-medium">Digital Solution • 2026</p>
              </div>
              <div className="text-[4rem] font-black text-white/5 select-none leading-none">0{i+1}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
