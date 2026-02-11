
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '项目清单', sub: 'PROJECTS', id: 'projects' },
    { label: '知识库', sub: 'WIKI', id: 'wiki' },
    { label: '专栏文章', sub: 'COLUMNS', id: 'articles' },
    { label: '社区精选', sub: 'COMMUNITY', id: 'community' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
      scrolled 
        ? 'py-3 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-cyan-500/40 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
        : 'py-8 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo Section: MIAO! with jumping note - 靠左对齐 */}
        <div className="flex items-center gap-2 group cursor-pointer shrink-0">
          <div className="relative">
            <span className="text-3xl text-pink-500 inline-block animate-bounce drop-shadow-[0_0_8px_#FF00FF]">♪</span>
          </div>
          <span className="font-['Orbitron'] font-black text-2xl tracking-tighter text-white group-hover:text-cyan-400 transition-colors cyber-glitch">
            MIAO<span className="text-pink-500">!</span>
          </span>
        </div>

        {/* Navigation & Status Group - 整体靠右对齐 */}
        <div className="flex items-center gap-8 md:gap-12">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className="relative flex flex-col items-end group"
              >
                <span className="text-[14px] font-bold tracking-widest text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.label}
                </span>
                <span className="text-[7px] font-mono text-cyan-500/40 tracking-[0.2em] group-hover:text-pink-500/60 transition-colors">
                  {item.sub}
                </span>
                {/* Animated underline - 从右侧展开 */}
                <span className="absolute -bottom-2 right-0 w-0 h-[2px] bg-gradient-to-r from-cyan-500 to-pink-500 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#00FFFF]" />
              </a>
            ))}
          </div>

          {/* System Status Indicators */}
          <div className="flex items-center gap-4 border-l border-white/10 pl-6 lg:pl-10">
            <div className="flex items-center gap-2 px-4 py-1.5 border border-cyan-500/30 rounded-sm bg-cyan-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00FFFF]" />
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest uppercase">Sys_Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic scanning line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
    </nav>
  );
};

export default Navbar;
