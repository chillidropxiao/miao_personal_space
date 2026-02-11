
import React, { useEffect, useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { audioService } from '../services/audioService';
import { Message } from '../types';

const CyberCat: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello, User. 我是喵的 AI 助理。你想了解哪个项目？或者有什么留言要留给喵？' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const catRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showChat]);

  const handleHeadClick = () => {
    setIsJumping(true);
    setShowChat(!showChat);
    audioService.playShortMelody();
    setTimeout(() => setIsJumping(false), 600);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioService.playShortMelody();
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await geminiService.sendMessage(input);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const getEyeStyle = (isLeft: boolean) => {
    if (!catRef.current) return {};
    const rect = catRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + (isLeft ? -15 : 15);
    const centerY = rect.top + rect.height / 2 - 10;
    
    const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
    const distance = Math.min(3, Math.hypot(mousePos.x - centerX, mousePos.y - centerY) / 50);
    
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    return {
      transform: `translate(${tx}px, ${ty}px)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <div 
      ref={catRef}
      className="fixed bottom-36 right-12 z-40 group"
    >
      {/* Chat Dialog from Cat */}
      {showChat && (
        <div className="absolute bottom-32 right-0 w-[320px] bg-black/70 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.3)] flex flex-col overflow-hidden animate-slide-up-cat">
          <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center bg-cyan-500/10">
            <span className="text-[11px] font-mono font-black tracking-[0.2em] text-cyan-400 uppercase">Miao_Neural_Chat</span>
            <button onClick={() => setShowChat(false)} className="text-cyan-500/50 hover:text-cyan-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="h-72 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-100' 
                    : 'bg-white/5 border border-white/10 text-gray-300'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-75" />
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-white/5 flex gap-2 bg-black/40">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="你想了解什么？..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className="px-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg flex items-center justify-center text-white disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(0,255,255,0.4)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Speech Bubble - Shows on Hover */}
      <div 
        className={`absolute -top-16 -left-32 bg-cyan-500/10 border border-cyan-500/40 backdrop-blur-xl px-5 py-2.5 rounded-2xl text-[12px] text-cyan-300 font-black tracking-tighter transition-all duration-500 pointer-events-none whitespace-nowrap shadow-[0_0_20px_rgba(0,255,255,0.2)]
        ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'}`}
      >
        跟我聊聊，听听星空旋律。
        <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-black border-r border-b border-cyan-500/40 rotate-45" />
      </div>

      <div 
        className={`relative cursor-pointer transition-transform duration-300 ${isJumping ? 'animate-cat-jump' : 'animate-float'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleHeadClick}
      >
        <svg width="85" height="85" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears with glow */}
          <path d="M25 35L15 10L40 25" stroke="#00FFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_#00FFFF]"/>
          <path d="M75 35L85 10L60 25" stroke="#00FFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_#00FFFF]"/>
          
          {/* Head */}
          <path d="M20 50C20 30 80 30 80 50C80 75 50 85 20 50Z" fill="rgba(5,5,5,0.95)" stroke="#00FFFF" strokeWidth="2.5" className="drop-shadow-[0_0_12px_#00FFFF] hover:stroke-pink-500 transition-colors duration-500"/>
          
          {/* Eyes */}
          <circle cx="35" cy="45" r="9" fill="#000" stroke="#FF00FF" strokeWidth="1.5" strokeDasharray="3 2"/>
          <circle cx="65" cy="45" r="9" fill="#000" stroke="#FF00FF" strokeWidth="1.5" strokeDasharray="3 2"/>
          
          {/* Moving Pupils */}
          <g style={getEyeStyle(true)}>
            <circle cx="35" cy="45" r="5" fill="#00FFFF" className="animate-pulse shadow-[0_0_10px_#00FFFF]" />
          </g>
          <g style={getEyeStyle(false)}>
            <circle cx="65" cy="45" r="5" fill="#00FFFF" className="animate-pulse shadow-[0_0_10px_#00FFFF]" />
          </g>

          {/* Digital Collar */}
          <path d="M30 80H70" stroke="#FF00FF" strokeWidth="4" strokeLinecap="round" className="animate-pulse shadow-[0_0_10px_#FF00FF]"/>
        </svg>

        {/* Interaction Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 150}ms`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes cat-jump {
          0%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-40px) scale(1.1, 0.9); }
          50% { transform: translateY(-45px) scale(1.2, 0.8); }
          70% { transform: translateY(-30px) scale(1.05, 0.95); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-cat-jump {
          animation: cat-jump 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default CyberCat;
