import { Search, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import RussiaMap from '../components/RussiaMap';
import { partners } from '../config/partners';

// Список федеральных гигантов (без Минимакса)
const FEDERAL_NETWORKS = ['РУССКИЙ СВЕТ', 'ЭТМ', 'ПЕТРОВИЧ', 'ВСЕИНСТРУМЕНТЫ.РУ'];

export default function DealersPage() {
  const [search, setSearch] = useState('');
  const { t } = useTranslation();
  
  // Убираем Минимакс из списка прямо на лету (на случай, если он еще остался в partners.ts)
  const activePartners = partners.filter(p => p.name !== 'МИНИМАКС');

  // Общий фильтр по поиску
  const filtered = activePartners.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.city.toLowerCase().includes(search.toLowerCase())
  );

  // Разделяем на категории
  const rawFederal = filtered.filter(p => FEDERAL_NETWORKS.includes(p.name));
  const federalPartners = Array.from(new Map(rawFederal.map(p => [p.name, p])).values());
  
  const rawRegional = filtered.filter(p => !FEDERAL_NETWORKS.includes(p.name));
  const regionalPartners = Array.from(new Map(rawRegional.map(p => [p.name, p])).values());

  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-bg-warm dark:bg-[#141418]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-accent/8 text-accent border border-accent/15 mb-5">
            {activePartners.length} {t('nav.dealers').toLowerCase()}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold">{t('map.title')}</h1>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection><RussiaMap /></AnimatedSection>
        </div>
      </section>

      {/* Search */}
      <section className="py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={20}/>
            <input 
              type="text" 
              placeholder="Найти партнёра или город..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-bg-card border border-border rounded-2xl text-lg focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-text-muted text-lg">Партнёр не найден</div>
          ) : (
            <div className="space-y-12">
              
              {/* --- ФЕДЕРАЛЬНЫЕ СЕТИ --- */}
              {federalPartners.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Star className="text-accent" size={24} /> 
                    <span>Федеральные сети</span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {federalPartners.map((p, i) => (
                      <motion.div 
                        key={p.name} 
                        initial={{opacity:0,y:20}} 
                        whileInView={{opacity:1,y:0}} 
                        viewport={{once:true}} 
                        transition={{delay:Math.min(i*0.02,0.5)}} 
                        whileHover={{y:-4,scale:1.03}}
                        className="group flex items-center gap-3 p-4 rounded-2xl bg-bg-card border-2 border-accent/15 hover:border-accent/60 hover:shadow-lg transition-all cursor-default"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-all">
                          <Star size={14} className="text-accent group-hover:text-white transition-colors"/>
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-extrabold truncate block text-text">{p.name}</span>
                          <span className="text-[10px] text-text-muted uppercase tracking-wider">Вся Россия</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- РЕГИОНАЛЬНЫЕ ПАРТНЁРЫ --- */}
              {regionalPartners.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <CheckCircle className="text-text-muted" size={24} /> 
                    <span>Региональные партнёры</span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {regionalPartners.map((p, i) => (
                      <motion.div 
                        key={p.name} 
                        initial={{opacity:0,y:20}} 
                        whileInView={{opacity:1,y:0}} 
                        viewport={{once:true}} 
                        transition={{delay:Math.min(i*0.02,0.5)}} 
                        whileHover={{y:-4,scale:1.03}}
                        className="group flex items-center gap-3 p-4 rounded-2xl bg-bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all cursor-default"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent transition-all">
                          <CheckCircle size={14} className="text-accent group-hover:text-white transition-colors"/>
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-semibold truncate block">{p.name}</span>
                          <span className="text-[10px] text-text-muted">{p.city}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="p-10 md:p-14 rounded-[2rem] bg-gradient-to-br from-accent/5 via-bg-warm to-gold/5 dark:from-accent/10 dark:via-[#141418] dark:to-gold/5 border border-accent/10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[10rem] font-extrabold text-accent/3 leading-none -mt-8 -mr-4 select-none">+</div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Хотите стать партнёром?</h3>
              <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                Присоединяйтесь к {activePartners.length}+ компаниям, которые уже зарабатывают с Makel.
              </p>
              <Link to="/contacts" className="group inline-flex items-center gap-3 px-10 py-5 bg-accent hover:bg-accent-light text-white rounded-2xl text-lg font-bold transition-all hover:shadow-xl hover:-translate-y-0.5">
                {t('cta.btn')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}