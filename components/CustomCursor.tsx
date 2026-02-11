
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number }[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const requestRef = useRef<number>();
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('button') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const animate = () => {
    setTrail(prev => {
      // Add current position to trail
      const newPoint = { x: position.x, y: position.y, opacity: 1 };
      const updatedTrail = [newPoint, ...prev.map(p => ({ ...p, opacity: p.opacity * 0.85 }))];
      return updatedTrail.slice(0, 25); // Longer tail for "shooting star" feel
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [position]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <svg className="w-full h-full overflow-visible">
        <defs>
          <filter id="cursorGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="meteorTrail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isPointer ? "#FF00FF" : "#00FFFF"} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isPointer ? "#FF00FF" : "#00FFFF"} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The Shooting Star Tail */}
        {trail.length > 1 && (
          <path
            d={`M ${trail.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="url(#meteorTrail)"
            strokeWidth={isPointer ? "6" : "3"}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'url(#cursorGlow)' }}
          />
        )}

        {/* The Star Head */}
        <g transform={`translate(${position.x}, ${position.y})`}>
          <circle
            r={isPointer ? "8" : "4"}
            fill="white"
            style={{ filter: 'url(#cursorGlow)' }}
          />
          <circle
            r={isPointer ? "15" : "10"}
            fill="none"
            stroke={isPointer ? "#FF00FF" : "#00FFFF"}
            strokeWidth="1"
            className="animate-ping"
          />
        </g>
      </svg>
    </div>
  );
};

export default CustomCursor;
