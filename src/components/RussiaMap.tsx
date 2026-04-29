import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { partners } from '../config/partners';
import { useTranslation } from 'react-i18next';

// Калибровка проекции под твой SVG
// Если точки все равно не там, меняй minLng/maxLng.
// Для большинства карт РФ: Lng 19..190, Lat 41..82
function project(lat: number, lng: number) {
  const minLat = 41;
  const maxLat = 82;
  const minLng = 19; 
  const maxLng = 190; // Чуть шире стандартных 180, чтобы захватить Чукотку, если она есть на карте

  // Добавляем небольшие отступы (padding), чтобы точки не обрезались краем контейнера
  const paddingX = 2; 
  const paddingY = 2;

  const x = ((lng - minLng) / (maxLng - minLng)) * (100 - paddingX * 2) + paddingX;
  const y = 100 - (((lat - minLat) / (maxLat - minLat)) * (100 - paddingY * 2) + paddingY);

  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
}

export default function RussiaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useTranslation();

  const cities = useMemo(() => {
    const m = new Map<string, { city: string; lat: number; lng: number; count: number; names: string[] }>();
    partners.forEach(p => {
      if (m.has(p.city)) { 
        const c = m.get(p.city)!; 
        c.count++; 
        c.names.push(p.name); 
      }
      else m.set(p.city, { city: p.city, lat: p.lat, lng: p.lng, count: 1, names: [p.name] });
    });
    return Array.from(m.values());
  }, []);

  const pluralize = (n: number) =>
    n === 1 ? t('map.partner', 'партнёр') : n < 5 ? t('map.partners2', 'партнёра') : t('map.partners5', 'партнёров');

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-border bg-bg-card shadow-lg group" style={{ aspectRatio: '2.2 / 1' }}>
      
      {/* Фон карты */}
      <img
        src="/russia-map.svg"
        alt="Карта России"
        className="absolute inset-0 w-full h-full object-contain opacity-40 dark:opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
        style={{ filter: 'grayscale(1)' }}
      />

      {/* Точки */}
      {cities.map((city) => {
        const pos = project(city.lat, city.lng);
        // Размер точки зависит от количества партнеров
        const sz = city.count >= 5 ? 14 : city.count >= 2 ? 10 : 7;

        return (
          <motion.div
            key={city.city}
            className="absolute cursor-pointer z-10"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setHovered(city.city)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.5, zIndex: 30 }}
          >
            {/* Пульсация */}
            <div
              className="absolute rounded-full bg-accent/30 animate-ping"
              style={{ width: sz * 2.5, height: sz * 2.5, left: -(sz * 2.5 - sz) / 2, top: -(sz * 2.5 - sz) / 2 }}
            />
            
            {/* Ядро точки */}
            <div
              className="rounded-full bg-accent border-2 border-white shadow-lg shadow-accent/40 relative z-10 flex items-center justify-center"
              style={{ width: sz, height: sz }}
            >
               {/* Белая точка внутри для контраста */}
               <div className="w-[40%] h-[40%] rounded-full bg-white/80" />
            </div>

            {/* Бейдж с количеством */}
            {city.count > 1 && (
              <span className="absolute -top-1 -right-1 bg-bg-card text-accent text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center z-20 shadow border border-accent/20">
                {city.count}
              </span>
            )}
          </motion.div>
        );
      })}

      {/* Тултип */}
      <AnimatePresence>
        {hovered && (() => {
          const city = cities.find(c => c.city === hovered);
          if (!city) return null;
          const pos = project(city.lat, city.lng);
          
          return (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute z-50 pointer-events-none"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -110%)' }}
            >
              <div className="liquid-glass-strong rounded-xl px-4 py-3 shadow-xl border border-white/20 backdrop-blur-md text-left min-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                  <Navigation size={14} className="text-accent" />
                  <span className="text-sm font-bold text-text-primary">{city.city}</span>
                </div>
                <div className="text-xs text-text-secondary space-y-1">
                  <p className="font-semibold text-accent bg-accent/10 inline-block px-1.5 py-0.5 rounded">
                    {city.count} {pluralize(city.count)}
                  </p>
                  <div className="pt-1 border-t border-black/5 dark:border-white/10 mt-1">
                    {city.names.slice(0, 2).map(n => (
                      <div key={n} className="truncate max-w-[140px] opacity-90">{n}</div>
                    ))}
                    {city.names.length > 2 && (
                      <div className="opacity-60 text-[10px] mt-0.5">+{city.names.length - 2} ещё...</div>
                    )}
                  </div>
                </div>
                {/* Стрелочка вниз */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-white/90 dark:border-t-gray-800/90" />
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 liquid-glass rounded-lg px-3 py-2 text-[10px] text-text-muted flex items-center gap-3 shadow-sm border border-white/10">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent ring-1 ring-white/50"/>1</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-accent ring-1 ring-white/50"/>2-4</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-accent ring-2 ring-white/50"/>5+</div>
      </div>
    </div>
  );
}