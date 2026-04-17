import { Factory, Globe, Award, Users, Shield, Beaker, CheckCircle, X, Trophy, Medal, Star, Gem } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import ProfitCalculator from '../components/ProfitCalculator';
import { images } from '../config/images';

function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ rotateY: 5, rotateX: -5, scale: 1.05 }} transition={{ type: 'spring', stiffness: 200 }}
      style={{ transformPerspective: 800 }} className={className}>{children}</motion.div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();
  const compareRows = t('compare.rows', { returnObjects: true }) as string[];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0"><img src={images.about.factory} alt="" className="w-full h-full object-cover opacity-15"/><div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/90 to-bg dark:from-bg-dark dark:via-bg-dark/90 dark:to-bg-dark"/></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-accent-bg text-accent border border-accent/10 mb-6">{t('about.badge')}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl font-serif">{t('about.title')}</h1>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">{t('about.desc')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Key facts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{i:Factory,t:'45 000 м²',d:'Площадь фабрики'},{i:Globe,t:'40+ стран',d:'География экспорта'},{i:Beaker,t:'Лаборатория VDE',d:'Сертифицированная'},{i:Award,t:'1 300+',d:'Наименований'},{i:Users,t:'~1 000',d:'Сотрудников'},{i:Shield,t:'100%',d:'Турецкий капитал'}].map((it,i) => (
              <AnimatedSection key={it.t} delay={i*0.1}>
                <div className="p-8 rounded-3xl bg-white dark:bg-[#1A1A1F] border border-border h-full card-hover">
                  <it.i className="text-accent mb-4" size={32}/><h3 className="text-2xl font-bold mb-2">{it.t}</h3><p className="text-text-secondary">{it.d}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="py-24 md:py-32 bg-bg-warm dark:bg-[#141418]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-accent/8 text-accent border border-accent/15 mb-5">📊</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">{t('about.compare')}</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden border border-border bg-white dark:bg-[#1A1A1F]">
              {/* Header */}
              <div className="grid grid-cols-3 bg-surface dark:bg-[#222228] p-4 md:p-5">
                <span className="text-sm font-bold text-text-muted">{t('compare.param')}</span>
                <span className="text-sm font-extrabold text-accent text-center">{t('compare.makel')}</span>
                <span className="text-sm font-bold text-text-muted text-center">{t('compare.others')}</span>
              </div>
              {/* Rows */}
              {compareRows.map((row: string, i: number) => (
                <motion.div key={i} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.06}}
                  className={`grid grid-cols-3 p-4 md:p-5 items-center ${i % 2 === 0 ? '' : 'bg-surface/30 dark:bg-[#1A1A1F]'} border-t border-border-light`}>
                  <span className="text-sm text-text-secondary font-medium">{row}</span>
                  <div className="flex justify-center">
                    <motion.div initial={{scale:0}} whileInView={{scale:1}} viewport={{once:true}} transition={{delay:i*0.06+0.2,type:'spring',stiffness:300}}
                      className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle size={18} className="text-accent"/>
                    </motion.div>
                  </div>
                  <div className="flex justify-center">
                    <motion.div initial={{scale:0}} whileInView={{scale:1}} viewport={{once:true}} transition={{delay:i*0.06+0.3,type:'spring',stiffness:300}}
                      className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                      <X size={16} className="text-red-400"/>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
              {/* Score */}
              <div className="grid grid-cols-3 p-5 bg-accent/5 border-t border-accent/10">
                <span className="text-sm font-extrabold">Итого</span>
                <span className="text-center text-2xl font-extrabold text-accent">10/10</span>
                <span className="text-center text-2xl font-extrabold text-text-muted">1/10</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ AWARDS 3D CARDS ═══ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-gold/10 text-gold border border-gold/15 mb-5">🏆</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">{t('about.awards')}</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Trophy, title: 'Лидер экспорта', desc: '№1 по экспорту электроматериалов из Турции', color: 'from-gold/20 to-gold/5' },
              { icon: Medal, title: 'VDE Сертификация', desc: 'Немецкий стандарт электробезопасности', color: 'from-accent/20 to-accent/5' },
              { icon: Star, title: '47 лет качества', desc: 'Непрерывное производство с 1977 года', color: 'from-teal/20 to-teal/5' },
              { icon: Gem, title: '40+ стран', desc: 'Международное признание качества', color: 'from-purple-500/20 to-purple-500/5' },
            ].map((award, i) => (
              <AnimatedSection key={award.title} delay={i * 0.1}>
                <Card3D className={`p-8 rounded-3xl bg-gradient-to-br ${award.color} border border-border h-full cursor-default`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-white/10 flex items-center justify-center mb-6 shadow-lg">
                    <award.icon size={28} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                  <p className="text-sm text-text-secondary">{award.desc}</p>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-24 md:py-32 bg-bg-warm dark:bg-[#141418]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-extrabold">Международные стандарты</h2></AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['VDE','ТСЕ','ИСО 9001','CE','ГОСТ-Р','ЕАС'].map((c,i) => (
              <AnimatedSection key={c} delay={i*0.08}>
                <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1F] border border-border text-center card-hover">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3"><CheckCircle className="text-gold" size={24}/></div>
                  <p className="font-bold text-lg">{c}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-accent/8 text-accent border border-accent/15 mb-5">📊</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t('calc.title')}</h2>
          </AnimatedSection>
          <ProfitCalculator />
        </div>
      </section>
    </div>
  );
}
