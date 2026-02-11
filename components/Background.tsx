
import React, { useEffect, useRef } from 'react';
import { audioService } from '../services/audioService';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const stars: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; phase: number }[] = [];
    const musicNotes: { 
      x: number; 
      y: number; 
      type: string; 
      size: number; 
      speedX: number; 
      speedY: number; 
      origSpeedX: number;
      origSpeedY: number;
      rotation: number; 
      rotSpeed: number; 
      opacity: number;
      isHovered: boolean;
      jumpPhase: number;
      flashPhase: number;
    }[] = [];
    const shootingStars: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];
    
    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      stars.length = 0;
      for (let i = 0; i < 250; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: Math.random() * 0.1,
          opacity: Math.random(),
          phase: Math.random() * Math.PI * 2
        });
      }

      musicNotes.length = 0;
      const noteTypes = ['♪', '♫', '♬', '♩', '∮', '♭', '♮', '♯'];
      for (let i = 0; i < 30; i++) {
        const size = 10 + Math.pow(Math.random(), 2) * 50; 
        const speedMultiplier = (size / 30) * 0.5;
        const sx = (Math.random() - 0.5) * speedMultiplier;
        const sy = (Math.random() - 0.5) * speedMultiplier;
        const baseOpacity = 0.1 + (size / 60) * 0.3;

        musicNotes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          type: noteTypes[Math.floor(Math.random() * noteTypes.length)],
          size: size,
          speedX: sx,
          speedY: sy,
          origSpeedX: sx,
          origSpeedY: sy,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.005,
          opacity: baseOpacity,
          isHovered: false,
          jumpPhase: 0,
          flashPhase: 0
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      const nebula1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.8);
      nebula1.addColorStop(0, 'rgba(40, 0, 80, 0.3)');
      nebula1.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.6);
      nebula2.addColorStop(0, 'rgba(0, 50, 100, 0.2)');
      nebula2.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        const pulse = Math.sin(star.phase) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.x += star.speedX;
        star.y += star.speedY;
        star.phase += 0.02;
        if (star.y > height) star.y = 0;
        if (star.x > width) star.x = 0;
        if (star.x < 0) star.x = width;
      });

      if (Math.random() < 0.003) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height / 2),
          length: 60 + Math.random() * 120,
          speed: 10 + Math.random() * 10,
          opacity: 1
        });
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ctx.strokeStyle = `rgba(0, 255, 255, ${ss.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.length, ss.y + ss.length * 0.4);
        ctx.stroke();
        ss.x += ss.speed;
        ss.y += ss.speed * 0.4;
        ss.opacity -= 0.015;
        if (ss.opacity <= 0) shootingStars.splice(i, 1);
      }

      musicNotes.forEach(note => {
        const dx = mousePos.current.x - note.x;
        const dy = mousePos.current.y - (note.y - (note.isHovered ? Math.abs(Math.sin(note.jumpPhase)) * 15 : 0));
        const distance = Math.sqrt(dx * dx + dy * dy);
        const hoverThreshold = note.size * 1.5;
        
        const wasHovered = note.isHovered;
        note.isHovered = distance < hoverThreshold;

        // Trigger sound effect on the precise transition to hover
        if (note.isHovered && !wasHovered) {
          audioService.playNoteSound();
        }

        let currentY = note.y;
        let shadowColor = '#FF00FF';
        let blurSize = note.size / 3;

        if (note.isHovered) {
          note.speedX = 0;
          note.speedY = 0;
          note.jumpPhase += 0.15;
          currentY -= Math.abs(Math.sin(note.jumpPhase)) * 15;
          note.flashPhase += 0.2;
          const flash = Math.sin(note.flashPhase) * 0.5 + 0.5;
          shadowColor = flash > 0.5 ? '#00FFFF' : '#FF00FF';
          blurSize = note.size + flash * 20;
          ctx.fillStyle = flash > 0.5 ? `rgba(0, 255, 255, 1)` : `rgba(255, 0, 255, 1)`;
        } else {
          if (wasHovered) {
            note.speedX = note.origSpeedX;
            note.speedY = note.origSpeedY;
          }
          note.x += note.speedX;
          note.y += note.speedY;
          note.rotation += note.rotSpeed;
          ctx.fillStyle = `rgba(255, 0, 255, ${note.opacity})`;
        }

        ctx.save();
        ctx.translate(note.x, currentY);
        ctx.rotate(note.rotation);
        ctx.shadowBlur = blurSize;
        ctx.shadowColor = shadowColor;
        ctx.font = `bold ${note.size}px 'Orbitron', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(note.type, 0, 0);
        ctx.restore();

        if (note.x < -100) note.x = width + 100;
        if (note.x > width + 100) note.x = -100;
        if (note.y < -100) note.y = height + 100;
        if (note.y > height + 100) note.y = -100;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default Background;
