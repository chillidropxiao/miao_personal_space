
import React from 'react';
import { Project } from '../types';

const Icons = {
  ppt_master: () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
      <rect x="20" y="25" width="60" height="40" rx="2" stroke="#F472B6" fill="none" strokeWidth="2" />
      <path d="M20 55 L35 55 L40 65 L60 65 L65 55 L80 55" stroke="#F472B6" fill="none" strokeWidth="1.5" />
      <circle cx="50" cy="45" r="8" stroke="#00FFFF" fill="none" strokeWidth="1.5" />
      <path d="M42 45 L58 45 M50 37 L50 53" stroke="#00FFFF" strokeWidth="1" />
      <path d="M25 35 H40 M25 40 H35" stroke="#F472B6" strokeWidth="1" opacity="0.6" />
    </svg>
  ),
  risk_shield: () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
      <path d="M50 15 L80 25 V50 C80 70 50 85 50 85 C50 85 20 70 20 50 V25 L50 15Z" stroke="#06B6D4" fill="none" strokeWidth="2.5" />
      <path d="M30 40 Q50 30 70 40 Q50 50 30 40Z" fill="#06B6D4" fillOpacity="0.2" />
      <circle cx="50" cy="50" r="15" stroke="#EC4899" fill="none" strokeWidth="1.5" strokeDasharray="4 4" className="animate-spin" style={{transformOrigin: '50% 50%', animationDuration: '10s'}} />
      <path d="M40 50 H60 M50 40 V60" stroke="#00FFFF" strokeWidth="2" />
    </svg>
  ),
  report_analyzer: () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
      <path d="M30 20 H60 L75 35 V80 H30 V20Z" stroke="#EAB308" fill="none" strokeWidth="2" />
      <path d="M60 20 V35 H75" stroke="#EAB308" fill="none" strokeWidth="2" />
      <rect x="40" y="45" width="20" height="2" fill="#EAB308" opacity="0.6" />
      <rect x="40" y="55" width="25" height="2" fill="#EAB308" opacity="0.6" />
      <circle cx="65" cy="70" r="15" stroke="#22D3EE" fill="none" strokeWidth="2" />
      <line x1="75" y1="80" x2="85" y2="90" stroke="#22D3EE" strokeWidth="3" />
    </svg>
  ),
  info_spider: () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
      <circle cx="50" cy="50" r="12" stroke="#22C55E" fill="none" strokeWidth="2" />
      <path d="M50 38 V20 M50 62 V80 M38 50 H20 M62 50 H80" stroke="#22C55E" strokeWidth="1.5" />
      <path d="M42 42 L30 30 M58 42 L70 30 M42 58 L30 70 M58 58 L70 70" stroke="#22C55E" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="4" fill="#00FFFF" className="animate-pulse" />
      <circle cx="80" cy="50" r="3" fill="#EC4899" className="animate-ping" />
      <circle cx="20" cy="50" r="3" fill="#EC4899" className="animate-ping" style={{animationDelay: '1s'}} />
    </svg>
  )
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:12px_12px] rounded-xl" />
      <div className={`absolute -inset-[1px] bg-gradient-to-br ${project.color} rounded-xl opacity-10 group-hover:opacity-100 blur-sm transition-opacity duration-700`} />
      
      <div className="relative flex flex-col h-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/5 rounded-xl p-8 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Decorative scanline effect on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg group-hover:border-cyan-400 group-hover:w-10 group-hover:h-10 transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg group-hover:border-cyan-400 group-hover:w-10 group-hover:h-10 transition-all duration-500" />

        <div className="flex items-start justify-between mb-8">
          <div className="p-4 bg-black/50 rounded-lg border border-white/5 shadow-inner transform group-hover:scale-110 transition-transform duration-500">
            {Icons[project.icon as keyof typeof Icons]?.()}
          </div>
          <div className="flex flex-col items-end gap-1 font-mono text-[9px] text-cyan-500/60">
            <span className="animate-pulse">PROCESS: 0x{project.id.toUpperCase()}</span>
            <span className="text-pink-500/40 font-bold">STABLE</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 font-['Orbitron'] tracking-widest group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
          {project.name}
        </h3>
        
        <p className="text-gray-400 font-light text-sm leading-relaxed mb-10 group-hover:text-gray-200 transition-colors">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-3">
            <div className="h-1.5 w-12 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-3/4 group-hover:w-full transition-all duration-1000" />
            </div>
            <span className="text-[10px] font-mono text-cyan-500/50">84%_LOAD</span>
          </div>
          <button className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.4em] flex items-center gap-2 group/btn">
            Connect
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping group-hover/btn:bg-pink-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
