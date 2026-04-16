import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Factory, Globe, Award, Users, Shield, Beaker, CheckCircle, Zap, X, Trophy, Gem, Target } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import ParallaxImage from '../components/ParallaxImage';
import ProfitCalculator from '../components/ProfitCalculator';
import { images } from '../config/images';

/* 3D hover card for awards */
function Award3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  return (
    <div style={{ perspective: 1000 }}>
      <motion.div ref={ref}
        onMouseMove={(e: React.MouseEvent) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); setRot({ x: ((e.clientY-r.top)/r.height-0.5)*-20, y: ((e.clientX-r.left)/r.width-0.5)*20 }); }}
        onMouseLeave={() => setRot({ x:0, y:0 })}
        animate={{ rotateX: rot.x, rotateY: rot.y, scale: rot.x===0?1:1.05 }}
        transition={{ type:'spring', stiffness:200, damping:20 }}
        className={`${className}`} style={{ transformStyle:'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  );
}

/* Comparison table data */
const comparison = [
  { param: 'Прямые поставки с завода', makel: true, competitors: false },
  { param: 'Собственная лаборатория VDE', makel: true, competitors: false },
  { param: 'Маржинальность до 40%', makel: true, competitors: false },
  { param: 'Более 1300 наименований', makel: true, competitors: false },
  { param: 'Сертификация ГОСТ-Р, ЕАС', makel: true, competitors: true },
  { param: 'Отгрузка за 1-3 дня', makel: true, competitors: false },
  { param: 'Персональный менеджер', makel: true, competitors: false },
  { param: 'Маркетинговая поддержка', makel: true, competitors: false },
  { param: '47+ лет на рынке', makel: true, competitors: false },
  { param: 'Экспорт в 40+ стран', makel: true, competitors: false },
];

const awards = [
  { icon: Trophy, title: 'Лидер экспорта', desc: '№1 по экспорту электроматериалов из Турции', color: 'gold' },
  { icon: Gem, title: 'Премиум качество', desc: 'Сертификация VDE — высший стандарт', color: 'accent' },
  { icon: Target, title: '40+ стран', desc: 'Глобальное присутствие на 5 континентах', color: 'teal' },
  { icon: Award, title: '47 лет доверия', desc: 'Непрерывное производство с 1977 года', color: 'gold' },
];

export default function AboutPage() {
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: '-100px' });

  return (
    <div>
      {/* Hero */}
      <ParallaxImage src={images.about.factory} className="h-[50vh] md:h-[60vh]" overlay overlayColor="linear-gradient(to bottom, rgba(14,15,17,0.85), rgba(14,15,17,0.6))" speed={0.3}>
        <div className="flex items-center h-[50vh] md:h-[60vh] px-4"><div className="max-w-7xl mx-auto w-full px-4 sm:px-6"><AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-accent/10 text-accent border border-accent/20 mb-6 font-display">О компании</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl font-display">Более <span className="gradient-text">47 лет</span> на рынке</h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl">Makel — турецкая компания, основанная в 1977 году, лидер по экспорту электроматериалов из Турции. 100% турецкий капитал.</p>
        </AnimatedSection></div></div>
      </ParallaxImage>

      {/* Key facts */}
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[{i:Factory,t:'45 000 м²',d:'Площадь фабрики'},{i:Globe,t:'40+ стран',d:'География экспорта'},{i:Beaker,t:'Лаборатория',d:'Сертифицированная VDE'},{i:Award,t:'1 300+ позиций',d:'Широкий ассортимент'},{i:Users,t:'~1 000 сотрудников',d:'Квалифицированный персонал'},{i:Shield,t:'100% турецкий капитал',d:'Независимое производство'}].map((it,i)=>(
          <AnimatedSection key={it.t} delay={i*0.1}><div className="p-8 rounded-3xl bg-bg-card border border-border h-full card-hover"><it.i className="text-accent mb-4" size={32}/><h3 className="text-2xl font-bold mb-2 font-display">{it.t}</h3><p className="text-text-secondary">{it.d}</p></div></AnimatedSection>
        ))}
      </div></div></section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="py-24 bg-bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle badge="Сравнение" title="Makel vs Конкуренты" serif />
          <div ref={tableRef} className="rounded-3xl bg-bg-card border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_140px_140px] gap-0 p-4 md:p-6 bg-surface border-b border-border">
              <span className="text-sm font-bold text-text-muted font-display">Параметр</span>
              <span className="text-sm font-bold text-accent text-center font-display">Makel</span>
              <span className="text-sm font-bold text-text-muted text-center font-display">Другие</span>
            </div>
            {/* Rows */}
            {comparison.map((row, i) => (
              <motion.div
                key={row.param}
                initial={{ opacity: 0, x: -30 }}
                animate={tableInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_140px_140px] gap-0 p-4 md:p-5 items-center ${i % 2 === 0 ? '' : 'bg-surface/30'} ${i < comparison.length - 1 ? 'border-b border-border/50' : ''}`}
              >
                <span className="text-sm text-text-secondary">{row.param}</span>
                <div className="flex justify-center">
                  {row.makel ? (
                    <motion.div initial={{ scale:0 }} animate={tableInView?{ scale:1 }:{}} transition={{ delay:i*0.08+0.3, type:'spring' }}
                      className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center"><CheckCircle size={18} className="text-accent"/></motion.div>
                  ) : <X size={18} className="text-text-muted/30"/>}
                </div>
                <div className="flex justify-center">
                  {row.competitors ? (
                    <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center"><CheckCircle size={18} className="text-text-muted/50"/></div>
                  ) : <X size={18} className="text-text-muted/30"/>}
                </div>
              </motion.div>
            ))}
            {/* Score */}
            <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_140px_140px] gap-0 p-4 md:p-6 bg-accent/5 border-t border-accent/20">
              <span className="text-sm font-bold text-text-primary font-display">Итого</span>
              <span className="text-center text-xl font-extrabold text-accent font-display">10/10</span>
              <span className="text-center text-xl font-extrabold text-text-muted font-display">1/10</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AWARDS 3D ═══ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge="Награды" title="Достижения и признание" serif />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.1}>
                <Award3D className={`p-8 rounded-3xl bg-bg-card border border-border h-full cursor-default hover:border-${a.color === 'accent' ? 'accent' : a.color === 'teal' ? 'teal' : 'gold'}/30 transition-colors`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${a.color==='gold'?'bg-gold/10':'bg-accent/10'}`}>
                    <a.icon size={30} className={a.color==='gold'?'text-gold':a.color==='teal'?'text-teal':'text-accent'} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-display">{a.title}</h3>
                  <p className="text-sm text-text-secondary">{a.desc}</p>
                </Award3D>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax */}
      <ParallaxImage src={images.about.global} className="h-[40vh]" overlay overlayColor="linear-gradient(135deg, rgba(14,15,17,0.85), rgba(200,16,46,0.5))" speed={0.3}>
        <div className="flex items-center justify-center h-[40vh] text-white text-center px-4"><AnimatedSection><h2 className="text-3xl md:text-5xl font-bold font-display">Экспорт в более чем 40 стран</h2></AnimatedSection></div>
      </ParallaxImage>

      {/* Timeline */}
      <section className="py-24"><div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionTitle badge="История" title="Наш путь" serif/>
        <div className="relative"><div className="absolute left-8 top-0 bottom-0 w-px bg-border"/>
          {[{y:'1977',t:'Основание Makel в Турции'},{y:'1990',t:'Начало экспорта в СНГ'},{y:'2000',t:'Расширение до 45 000 м²'},{y:'2010',t:'Международные сертификаты'},{y:'2020',t:'40+ стран, 1300+ наименований'},{y:'2024',t:'Официальное представительство в России'}].map((it,i)=>(
            <AnimatedSection key={it.y} delay={i*0.1} direction="left"><div className="flex gap-8 items-start mb-12"><div className="relative z-10 w-16 h-16 rounded-2xl bg-bg-card border border-accent/20 flex items-center justify-center shrink-0 shadow-lg shadow-accent/10"><span className="text-sm font-extrabold text-accent font-display">{it.y}</span></div><div className="pt-4"><p className="text-lg text-text-secondary">{it.t}</p></div></div></AnimatedSection>
          ))}
        </div>
      </div></section>

      {/* Certificates */}
      <section className="py-24 bg-bg-warm"><div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle badge="Сертификаты" title="Международные стандарты"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['VDE','ТСЕ','ИСО 9001','CE','ГОСТ-Р','ЕАС'].map((c,i)=>(
            <AnimatedSection key={c} delay={i*0.08}><div className="p-6 rounded-2xl bg-bg-card border border-border text-center card-hover"><div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3"><CheckCircle className="text-gold" size={24}/></div><p className="font-bold text-lg font-display">{c}</p></div></AnimatedSection>
          ))}
        </div>
      </div></section>

      {/* Calculator */}
      <section className="py-28"><div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle badge="Калькулятор" title="Рассчитайте выгоду" serif/>
        <ProfitCalculator/>
      </div></section>
    </div>
  );
}
