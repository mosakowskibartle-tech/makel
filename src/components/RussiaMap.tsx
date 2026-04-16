import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { partners } from '../config/partners';

function project(lat: number, lng: number) {
  // Фокус на европейскую часть + Урал + Сибирь
  const minLat = 41, maxLat = 70, minLng = 28, maxLng = 100;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
  return { x: Math.max(3, Math.min(97, x)), y: Math.max(3, Math.min(97, y)) };
}

export default function RussiaMap({ compact = false }: { compact?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const cities = useMemo(() => {
    const m = new Map<string, { city: string; lat: number; lng: number; count: number }>();
    partners.forEach(p => {
      const k = p.city;
      if (m.has(k)) m.get(k)!.count++;
      else m.set(k, { city: p.city, lat: p.lat, lng: p.lng, count: 1 });
    });
    return Array.from(m.values());
  }, []);

  return (
    <div className={`relative w-full ${compact ? 'aspect-[2/1]' : 'aspect-[16/9]'} rounded-3xl border border-border overflow-hidden bg-bg-card`}>
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-gold/[0.03]" />

      {/* Сетка */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle, var(--color-border) 0.5px, transparent 0.5px),
          linear-gradient(var(--color-border) 0.5px, transparent 0.5px),
          linear-gradient(90deg, var(--color-border) 0.5px, transparent 0.5px)
        `,
        backgroundSize: '20px 20px, 80px 80px, 80px 80px',
        opacity: 0.4,
      }} />

      {/* Контур России (упрощённый, более детальный) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="russiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.04" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Основной контур */}
        <path
          d="M2,52 Q4,48 7,46 Q9,43 12,41 Q14,38 17,36 Q20,34 23,32 Q26,30 28,28 Q30,30 32,28 Q34,26 36,28 Q38,30 40,27 Q42,25 44,27 Q46,29 48,26 Q50,24 52,26 Q54,28 56,25 Q58,23 60,26 Q62,28 65,26 Q68,24 71,27 Q74,30 77,28 Q80,26 83,30 Q85,33 87,31 Q89,28 91,32 Q93,36 95,38 Q97,42 98,46 Q97,50 95,53 Q93,56 91,58 Q89,60 86,62 Q83,64 80,66 Q77,68 74,66 Q71,64 68,66 Q65,68 62,66 Q59,64 56,66 Q53,68 50,66 Q47,64 44,66 Q41,68 38,66 Q35,64 32,66 Q29,68 26,66 Q23,64 20,66 Q17,68 14,66 Q11,64 8,62 Q5,58 3,55 Z"
          fill="url(#russiaGrad)"
          stroke="var(--color-accent)"
          strokeWidth="0.3"
          strokeOpacity="0.2"
        />
        {/* Линии-связи между городами */}
        {cities.map((c1, i) => {
          if (i === 0) return null;
          const prev = cities[Math.max(0, i - 1)];
          const p1 = project(c1.lat, c1.lng);
          const p2 = project(prev.lat, prev.lng);
          return (
            <line key={`line-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="var(--color-accent)" strokeWidth="0.15" strokeOpacity="0.1" strokeDasharray="1,2" />
          );
        })}
      </svg>

      {/* Точки городов */}
      {cities.map((city, i) => {
        const pos = project(city.lat, city.lng);
        const isHovered = hovered === city.city;
        const sz = city.count >= 5 ? 16 : city.count >= 3 ? 12 : city.count >= 2 ? 9 : 6;

        return (
          <motion.div
            key={city.city}
            className="absolute cursor-pointer z-10"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setHovered(city.city)}
            onMouseLeave={() => setHovered(null)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.03, duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            {/* Пульсирующее кольцо */}
            <motion.div
              className="absolute rounded-full border-2 border-accent/40"
              style={{ width: sz + 14, height: sz + 14, left: -(sz + 14 - sz) / 2, top: -(sz + 14 - sz) / 2 }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
            {/* Свечение */}
            {isHovered && (
              <motion.div
                className="absolute rounded-full bg-accent/20 blur-md"
                style={{ width: sz + 20, height: sz + 20, left: -(sz + 20 - sz) / 2, top: -(sz + 20 - sz) / 2 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {/* Точка */}
            <motion.div
              className="rounded-full bg-accent relative z-10 border-2 border-bg-card shadow-lg"
              style={{ width: sz, height: sz, boxShadow: `0 0 ${sz}px rgba(200,16,46,0.4)` }}
              animate={{ scale: isHovered ? 1.4 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            {/* Счётчик */}
            {city.count > 1 && (
              <span className="absolute -top-1 -right-2.5 bg-accent text-white text-[7px] font-extrabold rounded-full min-w-[16px] h-4 flex items-center justify-center z-20 shadow-md px-1">
                {city.count}
              </span>
            )}
          </motion.div>
        );
      })}

      {/* Тултип */}
      <AnimatePresence>
        {hovered && (() => {
          const c = cities.find(c => c.city === hovered);
          if (!c) return null;
          const pos = project(c.lat, c.lng);
          const count = c.count;
          const word = count === 1 ? 'партнёр' : count >= 2 && count <= 4 ? 'партнёра' : 'партнёров';
          return (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute z-40 pointer-events-none"
              style={{ left: `${pos.x}%`, top: `${pos.y - 8}%`, transform: 'translate(-50%, -100%)' }}
            >
              <div className="liquid-glass-strong rounded-2xl px-5 py-3 text-center shadow-xl border border-accent/10">
                <div className="flex items-center gap-2 justify-center">
                  <MapPin size={14} className="text-accent" />
                  <span className="text-sm font-extrabold text-text-primary">{hovered}</span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5 font-medium">{count} {word}</p>
                {/* Стрелка */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-bg-card border-r border-b border-accent/10" />
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 liquid-glass rounded-2xl px-4 py-2.5 text-[10px] text-text-muted flex items-center gap-4 border border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-sm shadow-accent/50" />
          <span>1 партнёр</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-sm shadow-accent/50" />
          <span>2–4</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-accent shadow-sm shadow-accent/50" />
          <span>5+</span>
        </div>
      </div>

      {/* Заголовок карты */}
      <div className="absolute top-4 right-4 liquid-glass rounded-2xl px-4 py-2 border border-border">
        <p className="text-xs font-bold text-text-primary">🇷🇺 География партнёров</p>
        <p className="text-[10px] text-text-muted">{partners.length} компаний в {cities.length} городах</p>
      </div>
    </div>
  );
}
