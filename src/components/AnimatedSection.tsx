import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
export default function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: 'up'|'down'|'left'|'right'|'none' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const d = { up:{y:50,x:0}, down:{y:-50,x:0}, left:{y:0,x:50}, right:{y:0,x:-50}, none:{y:0,x:0} };
  return <motion.div ref={ref} initial={{ opacity: 0, ...d[direction] }} animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22,1,0.36,1] }} className={className}>{children}</motion.div>;
}
