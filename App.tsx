
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import AIStudioSection from './components/AIStudio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IdentityGallery from './components/IdentityGallery';
import ShowcaseGrid from './components/ShowcaseGrid';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = ['home', 'identity', 'about', 'impact', 'projects', 'ai-studio', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30">
      <Header activeSection={activeSection} />
      
      {/* Background Layer */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-[#010409]">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] fluid-blob bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] fluid-blob bg-purple-900/10 rounded-full blur-[120px]" style={{ animationDelay: '-5s' }} />
      </div>

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="identity">
          <IdentityGallery />
        </section>
        
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <section id="about">
            <About />
          </section>
        </div>

        <section id="impact">
          <ShowcaseGrid />
        </section>
        
        <div className="max-w-7xl mx-auto px-6 space-y-64 pb-32 overflow-hidden">
          <section id="projects">
            <Projects />
          </section>
          
          <section id="ai-studio">
            <AIStudioSection />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
