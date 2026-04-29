import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { partners } from '../config/partners';
import { useTranslation } from 'react-i18next';

// Подгони эти цифры под реальный SVG если точки немного съедут
function project(lat: number, lng: number) {
  const x = ((lng - 26) / (192 - 26)) * 100;
  const y = (1 - (lat - 41) / (82 - 41)) * 100;
  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(2, Math.min(98, y)),
  };
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

  const pluralize = (n: number) =>
    n === 1 ? t('map.partner') : n < 5 ? t('map.partners2') : t('map.partners5');

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-border bg-bg-card shadow-lg" style={{ aspectRatio: '2.2 / 1' }}>
      
      {/* Просто картинка карты */}
      <img
        src="/russia-map.svg"
        alt="Карта России"
        className="absolute inset-0 w-full h-full object-contain opacity-30 dark:opacity-20 pointer-events-none"
        style={{ filter: 'grayscale(1)' }}
      />

      {/* Точки поверх */}
      {cities.map((city) => {
        const pos = project(city.lat, city.lng);
        const sz = city.count >= 5 ? 16 : city.count >= 2 ? 11 : 8;

        return (
          <motion.div
            key={city.city}
            className="absolute cursor-pointer z-10"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setHovered(city.city)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.6, zIndex: 30 }}
          >
            {/* Пульсирующий круг */}
            <div
              className="absolute rounded-full bg-accent/30 animate-ping"
              style={{ width: sz + 8, height: sz + 8, left: -(sz + 8) / 2 + sz / 2, top: -(sz + 8) / 2 + sz / 2 }}
            />
            {/* Основная точка */}
            <div
              className="rounded-full bg-accent border-2 border-white shadow-lg shadow-accent/40 relative z-10"
              style={{ width: sz, height: sz }}
            />
            {/* Счётчик если несколько */}
            {city.count > 1 && (
              <span className="absolute -top-1 -right-2 bg-bg-card text-accent text-[7px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center z-20 shadow border border-accent/20">
                {city.count}
              </span>
            )}
          </motion.div>
        );
      })}

      {/* Тултип при наведении */}
      <AnimatePresence>
        {hovered && (() => {
          const city = cities.find(c => c.city === hovered);
          if (!city) return null;
          const pos = project(city.lat, city.lng);
          return (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute z-40 pointer-events-none"
              style={{ left: `${pos.x}%`, top: `${pos.y - 8}%`, transform: 'translate(-50%, -100%)' }}
            >
              <div className="bg-bg-card/95 backdrop-blur-sm border border-border rounded-2xl px-4 py-2.5 shadow-xl text-center min-w-[130px]">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <MapPin size={12} className="text-accent" />
                  <span className="text-sm font-bold">{city.city}</span>
                </div>
                <p className="text-xs text-text-muted mb-1">{city.count} {pluralize(city.count)}</p>
                {city.names.slice(0, 3).map(n => (
                  <p key={n} className="text-[10px] text-text-muted truncate">{n}</p>
                ))}
                {city.names.length > 3 && (
                  <p className="text-[10px] text-text-muted">+{city.names.length - 3} ещё</p>
                )}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Легенда */}
      <div className="absolute bottom-3 left-3 bg-bg-card/80 backdrop-blur-sm border border-border rounded-xl px-3 py-1.5 text-[9px] text-text-muted flex items-center gap-2">
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-accent" />1</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent" />2-4</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-accent" />5+</div>
      </div>
    </div>
  );
}