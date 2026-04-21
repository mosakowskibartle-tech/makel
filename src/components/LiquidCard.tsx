import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverScale?: number;
}

export default function LiquidCard({ children, className = '', glowColor = 'rgba(200,16,46,0.08)', hoverScale = 1.02 }: Props) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: hoverScale }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-3xl bg-bg-card/70 backdrop-blur-xl border border-border overflow-hidden ${className}`}
      style={{
        boxShadow: `0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)`,
      }}
    >
      {/* Glow follow cursor */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
