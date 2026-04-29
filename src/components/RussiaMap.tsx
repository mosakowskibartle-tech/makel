import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Globe } from 'lucide-react';
import { partners } from '../config/partners';
import { useTranslation } from 'react-i18next';

// Проекция координат
function project(lat: number, lng: number) {
  const minLat = 41;
  const maxLat = 82;
  const minLng = 19;
  const maxLng = 180;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
  return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
}

export default function RussiaMap() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const { t } = useTranslation();

  const citiesData = useMemo(() => {
    const map = new Map<string, { city: string; lat: number; lng: number; partners: typeof partners }>();
    partners.forEach(p => {
      if (!map.has(p.city)) {
        map.set(p.city, { city: p.city, lat: p.lat, lng: p.lng, partners: [] });
      }
      map.get(p.city)?.partners.push(p);
    });
    return Array.from(map.values());
  }, []);

  const pluralizePartners = (count: number) => {
    if (count === 1) return t('map.partner', 'партнёр');
    if (count < 5) return t('map.partners2', 'партнёра');
    return t('map.partners5', 'партнёров');
  };

  // Ссылка на карту (загружается браузером, а не сборщиком!)
  // Используем надежный CDN
  const MAP_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Russia_relief_location_map.jpg/1280px-Russia_relief_location_map.jpg";

  return (
    <div className="relative w-full aspect-[1.8/1] md:aspect-[2.1/1] rounded-3xl border border-border bg-[#1a1a1a] overflow-hidden shadow-2xl group">
      
      {/* 1. ФОН КАРТЫ */}
      <div className="absolute inset-0 transition-all duration-700">
         <img 
            src={MAP_IMAGE_URL}
            alt="Map of Russia"
            loading="lazy" // Важно! Не блокирует сборку
            className="w-full h-full object-cover object-center scale-105 opacity-60 grayscale-[30%] contrast-110 group-hover:grayscale-0 group-hover:opacity-80"
            onError={(e) => {
              // Если картинка не грузится, ставим запасной цвет
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.style.backgroundColor = '#222';
            }}
         />
         {/* Градиенты поверх карты */}
         <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60 pointer-events-none" />
         <div className="absolute inset-0 bg-accent/5 mix-blend-overlay pointer-events-none" />
      </div>

      {/* 2. СЕТКА (Декор) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* 3. ТОЧКИ ПАРТНЕРОВ */}
      {citiesData.map((city) => {
        const pos = project(city.lat, city.lng);
        const count = city.partners.length;
        const isHovered = hoveredCity === city.city;
        const size = count > 3 ? 1.2 : count > 1 ? 0.9 : 0.7; 

        return (
          <motion.div
            key={city.city}
            className="absolute cursor-pointer group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: Math.random() * 0.3 }}
            onMouseEnter={() => setHoveredCity(city.city)}
            onMouseLeave={() => setHoveredCity(null)}
          >
            {/* Пульсация */}
            <div className={`absolute inset-0 rounded-full bg-accent/40 ${isHovered ? 'animate-ping' : ''}`} 
                 style={{ width: `${size * 3.5}rem`, height: `${size * 3.5}rem`, transform: 'translate(-33%, -33%)' }} />
            
            {/* Точка */}
            <div 
              className={`rounded-full border border-white/50 shadow-lg transition-all duration-300 flex items-center justify-center
                ${isHovered ? 'bg-accent scale-125 z-20 shadow-accent/50' : 'bg-[#111] z-10'}`}
              style={{ width: `${size}rem`, height: `${size}rem`, transform: 'translate(-50%, -50%)' }}
            >
               <div className={`w-[40%] h-[40%] rounded-full ${isHovered ? 'bg-white' : 'bg-accent'}`} />
            </div>

            {/* Тултип */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 pointer-events-none w-max"
                >
                  <div className="liquid-glass-strong rounded-xl px-4 py-3 shadow-2xl border border-white/20 backdrop-blur-xl text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <Navigation size={14} className="text-accent" />
                      <span className="font-bold text-text-primary text-sm">{city.city}</span>
                    </div>
                    <div className="text-xs text-text-secondary space-y-1">
                      <p className="font-semibold text-accent bg-accent/10 inline-block px-1.5 py-0.5 rounded">{count} {pluralizePartners(count)}</p>
                      <div className="pt-1 border-t border-white/10 mt-1">
                        {city.partners.slice(0, 2).map(p => (
                          <div key={p.name} className="truncate max-w-[180px] opacity-90">{p.name}</div>
                        ))}
                        {count > 2 && <div className="opacity-60 text-[10px] mt-1">+{count - 2} ещё...</div>}
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-white/90" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Легенда */}
      <div className="absolute bottom-4 right-4 liquid-glass rounded-lg px-3 py-2 text-[10px] text-text-muted flex flex-col gap-1.5 shadow-sm border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent ring-1 ring-white/50"/>1</div>
        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-accent ring-1 ring-white/50"/>2-3</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent ring-2 ring-white/50"/>4+</div>
      </div>
      
      <div className="absolute top-4 left-4 pointer-events-none opacity-50">
         <div className="flex items-center gap-1 text-[10px] font-mono text-white bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
            <Globe size={10} /> LIVE MAP
         </div>
      </div>
    </div>
  );
}