
import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';

const HUDOverlay: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isOn, setIsOn] = useState(false);
  
  useEffect(() => {
    const logPool = [
      "DREAM_STREAM: ACTIVE",
      "NEURAL_LINK: SECURE",
      "SONIC_SYNC: OPTIMAL",
      "AMBIENCE: GHIBLI_V3"
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, logPool[Math.floor(Math.random() * logPool.length)]];
        return next.slice(-2); 
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleMusic = async () => {
    const newState = await audioService.toggle();
    setIsOn(newState);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[75] overflow-hidden">
      
      {/* 迷你赛博音乐控制中心 - 右下角悬浮 */}
      <div className="absolute bottom-10 right-10 pointer-events-auto animate-floating-drift">
        <button 
          onClick={handleToggleMusic}
          className={`flex items-center gap-3 px-4 py-2 bg-black/90 backdrop-blur-3xl border rounded-sm transition-all duration-500 shadow-xl group relative overflow-hidden ${
            isOn 
              ? 'border-cyan-500/60 shadow-[0_0_20px_rgba(0,255,255,0.15)]' 
              : 'border-pink-500/20 shadow-none'
          }`}
          style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
        >
          {/* 状态背景微光 */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${
            isOn ? 'bg-cyan-500/5 opacity-100' : 'opacity-0'
          }`} />

          {/* 小型音量指示条 */}
          <div className="flex gap-[2px] items-center h-4 w-6 justify-center">
            {isOn ? (
              [...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-[1.5px] bg-cyan-400 rounded-full animate-audio-bar-v2" 
                  style={{ animationDelay: `${i * 150}ms`, height: '40%' }}
                />
              ))
            ) : (
              <div className="w-4 h-[1px] bg-pink-500/30 rounded-full" />
            )}
          </div>

          {/* 科技感文字标签 */}
          <div className="flex flex-col items-start">
            <span className={`text-[10px] font-['Orbitron'] font-black tracking-[0.2em] transition-colors duration-500 uppercase ${
              isOn ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]' : 'text-pink-500/40'
            }`}>
              MUSIC {isOn ? 'ON' : 'OFF'}
            </span>
            <span className="text-[5px] font-mono uppercase tracking-tighter opacity-30 text-white leading-none">
              {isOn ? 'Syncing_Neural_Audio' : 'Engine_Idle'}
            </span>
          </div>

          {/* 装饰性的小指示灯 */}
          <div className={`w-1 h-1 rounded-full ml-1 transition-all duration-500 ${
            isOn ? 'bg-cyan-400 shadow-[0_0_8px_#00FFFF] animate-pulse' : 'bg-gray-800'
          }`} />
        </button>

        {/* 极简状态行 */}
        <div className="mt-2 mr-2 text-right">
          <span className="text-[6px] font-mono text-cyan-500/20 uppercase tracking-[0.4em]">
            {logs[logs.length - 1]}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes floating-drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, -15px) rotate(1deg); }
          50% { transform: translate(8px, -25px) rotate(-1deg); }
          75% { transform: translate(12px, -8px) rotate(0.5deg); }
        }
        @keyframes audio-bar-v2 {
          0%, 100% { height: 25%; opacity: 0.5; }
          50% { height: 100%; opacity: 1; filter: brightness(1.4); }
        }
        .animate-floating-drift {
          animation: floating-drift 12s ease-in-out infinite;
        }
        .animate-audio-bar-v2 {
          animation: audio-bar-v2 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HUDOverlay;
