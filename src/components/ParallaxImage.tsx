import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
export default function ParallaxImage({ src, className = '', speed = 0.3, overlay = false, overlayColor = 'rgba(0,0,0,0.3)', children }: { src: string; className?: string; speed?: number; overlay?: boolean; overlayColor?: string; children?: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img src={src} alt="" style={{ y }} className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]" />
      {overlay && <div className="absolute inset-0" style={{ background: overlayColor }} />}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
