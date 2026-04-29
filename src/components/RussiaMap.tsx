import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Globe } from 'lucide-react';
import { partners } from '../config/partners';
import { useTranslation } from 'react-i18next';

// Проекция координат (Lat/Lng) в проценты SVG viewBox (0 0 100 60)
// Россия широкая, поэтому aspect ratio другой
function project(lat: number, lng: number) {
  const minLat = 41;
  const maxLat = 82;
  const minLng = 19;
  const maxLng = 180;

  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100; // Инверсия Y для SVG

  return { 
    x: Math.max(0, Math.min(100, x)), 
    y: Math.max(0, Math.min(100, y)) 
  };
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

  return (
    <div className="relative w-full aspect-[1.8/1] md:aspect-[2.2/1] rounded-3xl border border-border bg-[#0f1115] overflow-hidden shadow-2xl group">
      
      {/* 1. ФОН И СЕТКА */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Радиальное свечение в центре */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* 2. ВЕКТОРНАЯ КАРТА РОССИИ (SVG) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c1e26" />
            <stop offset="100%" stopColor="#13151a" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Контур России (упрощенный, но узнаваемый) */}
        <path 
          d="M16.5,38 C16,38 15.5,38.5 15,39 C14,40 13,42 12,43 C11,44 10,45 9,45 C8,45 7,44 6,43 C5,42 4,40 3,39 C2,38 1,37 1,36 C1,35 2,34 3,33 C4,32 5,31 6,30 C7,29 8,28 9,27 C10,26 11,25 12,24 C13,23 14,22 15,21 C16,20 17,19 18,18 C19,17 20,16 21,15 C22,14 23,13 24,12 C25,11 26,10 27,9 C28,8 29,7 30,6 C31,5 32,4 33,3 C34,2 35,1 36,1 C37,1 38,2 39,3 C40,4 41,5 42,6 C43,7 44,8 45,9 C46,10 47,11 48,12 C49,13 50,14 51,15 C52,16 53,17 54,18 C55,19 56,20 57,21 C58,22 59,23 60,24 C61,25 62,26 63,27 C64,28 65,29 66,30 C67,31 68,32 69,33 C70,34 71,35 72,36 C73,37 74,38 75,39 C76,40 77,41 78,42 C79,43 80,44 81,45 C82,46 83,47 84,48 C85,49 86,50 87,51 C88,52 89,53 90,54 C91,55 92,56 93,57 C94,58 95,59 96,60 C97,61 98,62 99,63 C99,64 98,65 97,66 C96,67 95,68 94,69 C93,70 92,71 91,72 C90,73 89,74 88,75 C87,76 86,77 85,78 C84,79 83,80 82,81 C81,82 80,83 79,84 C78,85 77,86 76,87 C75,88 74,89 73,90 C72,91 71,92 70,93 C69,94 68,95 67,96 C66,97 65,98 64,99 C63,99 62,98 61,97 C60,96 59,95 58,94 C57,93 56,92 55,91 C54,90 53,89 52,88 C51,87 50,86 49,85 C48,84 47,83 46,82 C45,81 44,80 43,79 C42,78 41,77 40,76 C39,75 38,74 37,73 C36,72 35,71 34,70 C33,69 32,68 31,67 C30,66 29,65 28,64 C27,63 26,62 25,61 C24,60 23,59 22,58 C21,57 20,56 19,55 C18,54 17,53 16,52 C15,51 14,50 13,49 C12,48 11,47 10,46 C9,45 8,44 7,43 C6,42 5,41 4,40 C3,39 2,38 16.5,38 Z"
          fill="url(#mapFill)" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="0.3"
          className="transition-all duration-500 group-hover:stroke-accent/30"
        />
      </svg>

      {/* 3. ТОЧКИ ПАРТНЕРОВ */}
      {citiesData.map((city) => {
        const pos = project(city.lat, city.lng);
        const count = city.partners.length;
        const isHovered = hoveredCity === city.city;
        
        // Размер точки
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
            <div className={`absolute inset-0 rounded-full bg-accent/30 ${isHovered ? 'animate-ping' : ''}`} 
                 style={{ width: `${size * 3.5}rem`, height: `${size * 3.5}rem`, transform: 'translate(-33%, -33%)' }} />
            
            {/* Ядро точки */}
            <div 
              className={`rounded-full border border-white/20 shadow-lg transition-all duration-300 flex items-center justify-center
                ${isHovered ? 'bg-accent scale-125 z-20 shadow-accent/50 border-white' : 'bg-[#C8102E] z-10'}`}
              style={{ width: `${size}rem`, height: `${size}rem`, transform: 'translate(-50%, -50%)' }}
            >
               <div className={`w-[40%] h-[40%] rounded-full ${isHovered ? 'bg-white' : 'bg-black/20'}`} />
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
                  <div className="liquid-glass-strong rounded-xl px-4 py-3 shadow-2xl border border-white/20 backdrop-blur-xl text-left min-w-[160px]">
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
                    {/* Стрелка тултипа */}
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
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent ring-1 ring-white/50"/>1 партнёр</div>
        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-accent ring-1 ring-white/50"/>2-3 партнёра</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent ring-2 ring-white/50"/>4+ партнёров</div>
      </div>
      
      <div className="absolute top-4 left-4 pointer-events-none opacity-50">
         <div className="flex items-center gap-1 text-[10px] font-mono text-white bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
            <Globe size={10} /> MAKEL MAP SYSTEM
         </div>
      </div>
    </div>
  );
}