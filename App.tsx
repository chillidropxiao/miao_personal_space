
import React, { useState, useEffect } from 'react';
import { PROJECTS } from './constants';
import Background from './components/Background';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import CyberCat from './components/CyberCat';
import CustomCursor from './components/CustomCursor';
import HUDOverlay from './components/HUDOverlay';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-cyan-500 selection:text-black">
      {/* Custom Cursor System */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar />

      {/* Dynamic Visual Layer */}
      <Background />

      {/* HUD & Frames */}
      <HUDOverlay />

      {/* Main Content */}
      <main id="home" className="relative z-10 container mx-auto px-4 pt-56 pb-24 flex flex-col items-center">
        {/* Section 1: Hero Identity */}
        <Hero 
          name="喵の项目空间" 
          signature="AI如果不服务于人的需求，那为什么要发展AI？" 
        />

        {/* Section 2: Actuary Welcome - Refined Center Layout */}
        <div className="mt-32 mb-16 flex flex-col items-center w-full max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          {/* Animated Container with fixed height/width to stabilize layout */}
          <div className="relative w-full h-12 flex items-center justify-center overflow-hidden">
            <div className="cyber-push-container">
              <h2 className="text-xl md:text-3xl font-light italic text-cyan-100 tracking-[0.25em] whitespace-nowrap drop-shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                欢迎来到精算师的世界！
              </h2>
            </div>
            {/* Subtle Scanning Bar that follows the push animation */}
            <div className="scanning-line absolute top-0 bottom-0 w-[1px] bg-cyan-400/40 blur-[1px]" />
          </div>
          
          {/* Sub-technical details */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-5">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/30" />
              <p className="text-[9px] md:text-[11px] font-mono text-cyan-500/60 tracking-[0.5em] uppercase font-light">
                Odds · Assumptions · Certainty
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/30" />
            </div>
            
            <div className="text-[7px] font-mono text-cyan-500/20 tracking-[0.6em] uppercase">
              // DATA_STREAM_PERSISTENT // 0xACTUARY_V3
            </div>
          </div>
        </div>

        {/* Section 3: Projects Grid */}
        <div id="projects" className="relative w-full max-w-6xl mt-24 p-1">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-500/20 uppercase tracking-[0.8em] whitespace-nowrap">
            —— PROJECT_MANIFEST_MATRIX ——
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {PROJECTS.map((project, index) => (
              <div 
                key={project.id} 
                className="opacity-0 translate-y-10 animate-fade-in-up" 
                style={{ animationDelay: `${(index + 5) * 200}ms`, animationFillMode: 'forwards' }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder sections with consistent alignment */}
        <div id="wiki" className="w-full h-[40vh] flex flex-col items-center justify-center opacity-20 border-t border-white/5 mt-32">
          <div className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent mb-6" />
          <span className="font-mono text-[9px] tracking-[0.5em] text-cyan-500/50">// KNOWLEDGE_BASE_SYNC_PENDING</span>
        </div>
        
        <div id="articles" className="w-full h-[40vh] flex flex-col items-center justify-center opacity-20 border-t border-white/5">
          <span className="font-mono text-[9px] tracking-[0.5em] text-pink-500/50">// COLUMN_ARTICLES_ENCRYPTED</span>
        </div>

        <footer id="logs" className="mt-40 mb-12 text-gray-500 font-mono flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/20" />
            <div className="text-[9px] text-cyan-500/30 tracking-[0.4em]">MIAO_OS_TERMINAL</div>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/20" />
          </div>
          <div className="text-[10px] opacity-20 tracking-[0.2em] uppercase font-light">
            &copy; {new Date().getFullYear()} Miao's Cyber Space · All Bits Reserved
          </div>
        </footer>
      </main>

      {/* Fixed Elements */}
      <CyberCat />

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes cyber-push-loop {
          0% { 
            clip-path: inset(0 100% 0 0);
            transform: translateX(-20px);
            opacity: 0;
          }
          15% {
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            opacity: 1;
          }
          85% {
            clip-path: inset(0 0 0 0);
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            clip-path: inset(0 0 0 100%);
            transform: translateX(20px);
            opacity: 0;
          }
        }

        @keyframes scan-line-loop {
          0% { left: 30%; opacity: 0; }
          10% { opacity: 1; left: 30%; }
          25% { left: 70%; opacity: 1; }
          30% { opacity: 0; left: 70%; }
          100% { opacity: 0; }
        }

        .cyber-push-container {
          animation: cyber-push-loop 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .scanning-line {
          animation: scan-line-loop 8s ease-in-out infinite;
          height: 60%;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;
