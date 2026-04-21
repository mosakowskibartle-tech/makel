import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { partners } from '../config/partners';
import { useTranslation } from 'react-i18next';

function project(lat: number, lng: number) {
  const x = ((lng - 27) / (100 - 27)) * 100;
  const y = (1 - (lat - 41) / (72 - 41)) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(5, Math.min(95, y)) };
}

export default function RussiaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useTranslation();
  const cities = useMemo(() => {
    const m = new Map<string, { city: string; lat: number; lng: number; count: number; names: string[] }>();
    partners.forEach(p => {
      if (m.has(p.city)) { const c = m.get(p.city)!; c.count++; c.names.push(p.name); }
      else m.set(p.city, { city: p.city, lat: p.lat, lng: p.lng, count: 1, names: [p.name] });
    });
    return Array.from(m.values());
  }, []);

  const pluralize = (n: number) => n === 1 ? t('map.partner') : n < 5 ? t('map.partners2') : t('map.partners5');

  return (
    <div className="relative w-full aspect-[2.2/1] rounded-3xl border border-border overflow-hidden bg-gradient-to-br from-surface via-bg-warm to-surface">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(200,16,46,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(200,16,46,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Radial glow center */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(200,16,46,0.06) 0%, transparent 60%)' }} />
      {/* Russia outline simplified */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path d="M3,52 Q6,46 10,44 Q15,38 22,36 Q30,32 38,30 Q44,34 50,28 Q56,32 62,28 Q68,34 74,30 Q80,36 86,34 Q92,40 96,48 Q94,56 88,60 Q80,64 72,62 Q64,66 56,62 Q48,66 40,62 Q32,66 24,62 Q16,66 10,60 Q5,56 3,52 Z" fill="none" stroke="rgba(200,16,46,0.12)" strokeWidth="0.4" strokeDasharray="2 1" />
        {/* Connection lines between cities */}
        {cities.slice(0, 10).map((c, i) => {
          const p = project(c.lat, c.lng);
          const next = cities[(i + 1) % cities.length];
          const np = project(next.lat, next.lng);
          return <line key={i} x1={p.x} y1={p.y} x2={np.x} y2={np.y} stroke="rgba(200,16,46,0.06)" strokeWidth="0.2" />;
        })}
      </svg>

      {cities.map((city) => {
        const pos = project(city.lat, city.lng);
        const sz = city.count >= 5 ? 16 : city.count >= 2 ? 11 : 8;
        return (
          <motion.div key={city.city} className="absolute cursor-pointer" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%,-50%)' }}
            onMouseEnter={() => setHovered(city.city)} onMouseLeave={() => setHovered(null)} whileHover={{ scale: 1.6, zIndex: 30 }}>
            <div className="rounded-full bg-accent/20 animate-ping absolute" style={{ width: sz + 10, height: sz + 10, left: -(sz+10)/2 + sz/2, top: -(sz+10)/2 + sz/2 }} />
            <div className="rounded-full bg-accent shadow-lg shadow-accent/40 relative z-10 border-2 border-white" style={{ width: sz, height: sz }} />
            {city.count > 1 && <span className="absolute -top-1 -right-2 bg-bg-card text-accent text-[7px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center z-20 shadow border border-accent/20">{city.count}</span>}
          </motion.div>
        );
      })}

      <AnimatePresence>
        {hovered && (() => {
          const city = cities.find(c => c.city === hovered);
          if (!city) return null;
          const pos = project(city.lat, city.lng);
          return (
            <motion.div key={hovered} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="absolute z-40 pointer-events-none" style={{ left: `${pos.x}%`, top: `${pos.y - 8}%`, transform: 'translate(-50%,-100%)' }}>
              <div className="liquid-glass-strong rounded-2xl px-5 py-3 shadow-xl text-center min-w-[120px]">
                <div className="flex items-center justify-center gap-1.5 mb-1"><MapPin size={12} className="text-accent" /><span className="text-sm font-bold text-text-primary">{city.city}</span></div>
                <p className="text-xs text-text-muted">{city.count} {pluralize(city.count)}</p>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <div className="absolute bottom-3 left-3 liquid-glass rounded-xl px-3 py-1.5 text-[9px] text-text-muted flex items-center gap-2">
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-accent"/>1</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent"/>2-4</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-accent"/>5+</div>
      </div>
    </div>
  );
}
