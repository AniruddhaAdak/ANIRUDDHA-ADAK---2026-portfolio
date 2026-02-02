
import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'identity', label: 'ME' },
    { id: 'about', label: 'STORY' },
    { id: 'impact', label: 'PEOPLE' },
    { id: 'projects', label: 'WORK' },
    { id: 'ai-studio', label: 'AI TOOLS' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-12 px-10">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between border-b border-white/5 pb-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-6 cursor-pointer group"
          onClick={() => scrollTo('home')}
        >
          <div className="w-14 h-14 bg-white flex items-center justify-center transition-all group-hover:bg-cyan-500">
             <span className="text-black font-black text-2xl">A.</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-2xl leading-none uppercase">Aniruddha</span>
            <span className="text-[9px] font-black text-cyan-500 tracking-[0.4em] mt-2 uppercase">Online Now</span>
          </div>
        </motion.div>
        
        <nav className="hidden xl:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-8 py-3 text-[10px] font-black tracking-[0.4em] transition-all duration-500 uppercase border border-transparent hover:border-white/20 ${
                activeSection === item.id ? 'text-cyan-400' : 'text-slate-500 hover:text-white'
              }`}
            >
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500"
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-8">
           <div className="hidden md:block text-right">
             <div className="text-[9px] font-black text-slate-700 tracking-[0.5em] uppercase">Security</div>
             <div className="flex items-center gap-3 justify-end mt-1">
               <div className="w-2 h-2 bg-cyan-500 rounded-none animate-pulse" />
               <span className="text-[9px] font-black text-white tracking-[0.3em] uppercase">Safe Site</span>
             </div>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
