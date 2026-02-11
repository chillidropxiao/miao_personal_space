
import React from 'react';

interface HeroProps {
  name: string;
  signature: string;
}

const Hero: React.FC<HeroProps> = ({ name, signature }) => {
  return (
    <div className="text-center relative flex flex-col items-center">
      {/* Status Bar Top */}
      <div className="mb-10 w-full max-w-sm flex justify-between items-center text-[9px] text-cyan-500/40 font-mono tracking-[0.3em] uppercase">
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_#00FFFF]" />
          STATUS: OPTIMAL
        </span>
        <span className="text-pink-500/30">Node_v2.5.0</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] mb-8 font-['Orbitron'] cyber-glitch relative inline-block text-white">
        {name}
        <div className="absolute -top-6 -right-12 text-[8px] font-mono text-cyan-400 opacity-30 tracking-widest animate-pulse">
          [PORTFOLIO_ACTIVE]
        </div>
      </h1>
      
      <div className="relative h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mb-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-500 rotate-45 shadow-[0_0_8px_#00FFFF]" />
      </div>

      <p className="text-lg md:text-xl font-light text-cyan-50/80 italic max-w-xl mx-auto leading-relaxed tracking-wide">
        “{signature}”
      </p>
      
      <div className="mt-16 flex justify-center gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="relative">
            <div 
              className="w-2 h-2 rounded-full bg-cyan-500/10 border border-cyan-500/30"
            />
            <div className="absolute inset-0 bg-cyan-500/20 blur-[2px] rounded-full animate-ping" style={{ animationDelay: `${i * 400}ms` }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
