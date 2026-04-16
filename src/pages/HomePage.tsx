import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Shield, Truck, TrendingUp, Package, Star, Send, Zap, Award, Globe, CheckCircle, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import { images } from '../config/images';
import { partnerNames } from '../config/partners';
import { testimonials } from '../config/content';

/* ── Animated Counter with spring + scale + glow ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [val, setVal] = useState(0);
  const scale = useSpring(1, { stiffness: 300, damping: 15 });

  useEffect(() => {
    if (!inView) return;
    scale.set(1.25);
    setTimeout(() => scale.set(1), 300);
    const ctrl = animate(0, target, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v: number) => setVal(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, target, scale]);

  return (
    <motion.span ref={ref} style={{ scale }} className="inline-block">
      {val.toLocaleString('ru-RU')}{suffix}
    </motion.span>
  );
}

/* ── 3D tilt card ── */
function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      style={{ rotateX: rX, rotateY: rY, transformPerspective: 800 }}
      onMouseMove={(e: React.MouseEvent) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Series for horizontal scroll ── */
const series = [
  { name: 'Лилиум', desc: 'Классический дизайн', tag: 'Бестселлер', img: images.catalog.lillium },
  { name: 'Мимоза', desc: 'Элегантные линии', tag: 'Популярное', img: images.catalog.mimoza },
  { name: 'Дефне', desc: 'Современный стиль', tag: 'Новинка', img: images.catalog.defne },
  { name: 'Манолья', desc: 'Премиум-сегмент', tag: 'Премиум', img: images.catalog.manolya },
  { name: 'Кареа', desc: 'Минимализм', tag: 'Тренд', img: images.catalog.karea },
  { name: 'Милланта', desc: 'Модульная система', tag: 'Модуль', img: images.modular.millanta },
];

const iconMap = { shield: Shield, truck: Truck, trending: TrendingUp, package: Package } as const;

export default function HomePage() {
  const { t } = useTranslation();

  /* Hero parallax */
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '40%']);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  /* Sticky parallax — ONE product right, text changes left */
  const stickyRef = useRef(null);
  const { scrollYProgress: sp } = useScroll({ target: stickyRef, offset: ['start start', 'end end'] });
  const bgY = useTransform(sp, [0, 1], ['0%', '-30%']);
  const bgScale = useTransform(sp, [0, 0.5, 1], [1.2, 1, 1.1]);
  const productScale = useTransform(sp, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.9]);
  const productRotate = useTransform(sp, [0, 0.5, 1], [-3, 0, 3]);
  /* Three text phases */
  const t1 = useTransform(sp, [0, 0.08, 0.25, 0.33], [0, 1, 1, 0]);
  const t2 = useTransform(sp, [0.33, 0.41, 0.58, 0.66], [0, 1, 1, 0]);
  const t3 = useTransform(sp, [0.66, 0.74, 0.92, 1], [0, 1, 1, 1]);

  /* Horizontal scroll series */
  const hScrollRef = useRef(null);
  const { scrollYProgress: hsp } = useScroll({ target: hScrollRef, offset: ['start end', 'end start'] });
  const hX = useTransform(hsp, [0, 1], ['10%', '-60%']);

  const advantages = [
    { icon: iconMap.shield, title: t('advantages.guarantee'), desc: t('advantages.guaranteeDesc'), num: '100%' },
    { icon: iconMap.truck, title: t('advantages.direct'), desc: t('advantages.directDesc'), num: '0' },
    { icon: iconMap.trending, title: t('advantages.margin'), desc: t('advantages.marginDesc'), num: '40%' },
    { icon: iconMap.package, title: t('advantages.stock'), desc: t('advantages.stockDesc'), num: '1300+' },
  ];

  return (
    <div>
      {/* ═══════════ HERO WITH VIDEO ═══════════ */}
      <section ref={heroRef} className="relative h-[110vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" poster={images.hero.background}>
            <source src={images.videos.heroBg} type="video/mp4" />
          </video>
          {/* Light theme overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30 dark:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:hidden" />
          {/* Dark theme overlay — отдельно, чтобы видео затемнялось */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 hidden dark:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-dark hidden dark:block" />
        </motion.div>

        <div className="absolute top-[15%] right-[15%] w-80 h-80 rounded-full bg-accent/8 blur-[120px] animate-float" />

        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-accent/8 text-accent border border-accent/15 mb-8">
                <span className="relative w-2.5 h-2.5 rounded-full bg-accent"><span className="absolute inset-0 rounded-full bg-accent animate-ping" /></span>
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight">
              <span className="gradient-text">{t('hero.h1_1')}</span><br />
              <span>{t('hero.h1_2')}</span><br />
              <span className="font-serif italic font-normal text-text-secondary text-[0.6em]">{t('hero.h1_3')}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 text-xl text-text-secondary max-w-xl leading-relaxed">{t('hero.desc')}</motion.p>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/contacts" className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent hover:bg-accent-light text-white rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-accent/25 hover:-translate-y-0.5">
                {t('hero.cta')}<ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link to="/catalog" className="inline-flex items-center justify-center gap-3 px-10 py-5 liquid-glass hover:bg-white/90 dark:hover:bg-white/10 rounded-2xl text-lg font-bold transition-all">
                {t('hero.catalog')}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ STATS — MORPHING COUNTERS ═══════════ */}
      <section className="relative z-10 -mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="liquid-glass-strong rounded-[2rem] p-8 md:p-12 glow-soft">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { n: 47, s: '+', l: t('stats.years'), sub: t('stats.since') },
                { n: 45000, s: '', l: t('stats.production'), sub: t('stats.factory') },
                { n: 40, s: '+', l: t('stats.countries'), sub: t('stats.worldwide') },
                { n: 1300, s: '+', l: t('stats.items'), sub: t('stats.inCatalog') },
              ].map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 30, scale: 0.8 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 200 }} className="text-center">
                  <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-accent animate-counter-glow">
                    <Counter target={s.n} suffix={s.s} />
                  </p>
                  <p className="text-sm font-bold mt-2">{s.l}</p>
                  <p className="text-xs text-text-muted">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ STICKY PARALLAX — ONE PRODUCT RIGHT, TEXT LEFT ═══════════ */}
      <div ref={stickyRef} className="h-[350vh] relative mt-20">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background parallax */}
          <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
            <img src={images.parallax.luxuryInterior} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
              {/* Left: Text that changes */}
              <div className="relative h-[300px]">
                <motion.div style={{ opacity: t1 }} className="absolute inset-0 flex flex-col justify-center">
                  <p className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">{t('sticky.t1')}</p>
                  <p className="text-xl md:text-2xl font-serif italic mt-4 text-white/70">{t('sticky.s1')}</p>
                  <p className="text-sm text-white/40 mt-6 max-w-md">Более 1300 наименований электроустановочных изделий. Каждая серия — произведение инженерного искусства.</p>
                </motion.div>
                <motion.div style={{ opacity: t2 }} className="absolute inset-0 flex flex-col justify-center">
                  <p className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">{t('sticky.t2')}</p>
                  <p className="text-xl md:text-2xl font-serif italic mt-4 text-white/70">{t('sticky.s2')}</p>
                  <p className="text-sm text-white/40 mt-6 max-w-md">Завод площадью 45 000 м², собственная лаборатория VDE, экспорт в 40+ стран мира.</p>
                </motion.div>
                <motion.div style={{ opacity: t3 }} className="absolute inset-0 flex flex-col justify-center">
                  <p className="text-5xl md:text-7xl font-extrabold gradient-text tracking-tighter">{t('sticky.t3')}</p>
                  <p className="text-xl md:text-2xl font-serif italic mt-4 text-white/70">{t('sticky.s3')}</p>
                  <p className="text-sm text-white/40 mt-6 max-w-md">Присоединяйтесь к 47+ партнёрам по всей России. Лучшие условия на рынке.</p>
                </motion.div>
              </div>

              {/* Right: ONE fixed product */}
              <div className="flex items-center justify-center">
                <motion.div
                  style={{ scale: productScale, rotate: productRotate }}
                  className="w-64 h-80 md:w-80 md:h-[28rem] rounded-[2rem] overflow-hidden glow-red border-2 border-white/20 shadow-2xl"
                >
                  <img src={images.stickyProducts.first} alt="Makel" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-extrabold text-xl">Makel</p>
                    <p className="text-white/60 text-sm">Электротехника премиум-класса</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ HORIZONTAL SCROLL SERIES ═══════════ */}
      <section ref={hScrollRef} className="py-28 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <AnimatedSection>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-accent/8 text-accent border border-accent/15 mb-5">Продукция</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Популярные серии</h2>
          </AnimatedSection>
        </div>
        <motion.div style={{ x: hX }} className="flex gap-6 pl-[5vw]">
          {series.map((s) => (
            <Link to="/catalog" key={s.name} className="group shrink-0 w-[300px] md:w-[360px] rounded-3xl bg-white dark:bg-[#1A1A1F] border border-border hover:border-accent/20 overflow-hidden transition-all duration-500 card-hover">
              <div className="aspect-[4/3] overflow-hidden bg-surface">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{s.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    s.tag === 'Премиум' ? 'bg-gold/10 text-gold' : s.tag === 'Новинка' ? 'bg-teal/10 text-teal' : 'bg-accent/8 text-accent'
                  }`}>{s.tag}</span>
                </div>
                <p className="text-sm text-text-secondary">{s.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                  Подробнее <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* ═══════════ ADVANTAGES — 3D CARDS ═══════════ */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">{t('advantages.title')}</h2>
            <p className="mt-5 text-text-secondary text-lg max-w-2xl mx-auto">{t('advantages.subtitle')}</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <motion.div key={adv.title} initial={{ opacity: 0, y: 60, rotateX: 15 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}>
                <Card3D className="group p-8 rounded-3xl bg-white dark:bg-[#1A1A1F] border border-border hover:border-accent/30 transition-colors cursor-default relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 text-[6rem] font-extrabold text-accent/5 leading-none -mt-4 -mr-2 select-none">{adv.num}</div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-accent/8 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <adv.icon className="text-accent group-hover:text-white transition-colors" size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{adv.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{adv.desc}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ DOMINANCE — DARK SECTION ═══════════ */}
      <section className="bg-bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.about.techFactory} alt="" className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="relative py-28 md:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Завод <span className="gradient-text">45 000 м²</span><br />
                <span className="font-serif italic font-normal text-white/60">мощнее любого конкурента</span>
              </h2>
              <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-lg">
                Собственная сертифицированная лаборатория VDE. Полный цикл производства. Контроль качества на каждом этапе.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { i: Zap, l: 'Полный цикл', v: 'производства' },
                  { i: Award, l: 'Сертификаты', v: 'VDE, ГОСТ-Р, ЕАС' },
                  { i: Globe, l: '40+ стран', v: 'доверяют нам' },
                ].map((it) => (
                  <div key={it.l}><it.i className="text-accent mb-2" size={24} /><p className="text-sm font-bold">{it.l}</p><p className="text-xs text-white/50">{it.v}</p></div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3} direction="left">
              <div className="relative">
                <div className="absolute -inset-8 bg-accent/10 rounded-[2rem] blur-3xl" />
                <img src={images.about.factory} alt="" className="relative rounded-[2rem] w-full aspect-[4/3] object-cover border border-white/10" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-6 -right-6 bg-accent rounded-2xl p-6 text-white">
                  <p className="text-3xl font-extrabold">~1000</p><p className="text-sm text-white/80">сотрудников</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ PARTNERS MARQUEE ═══════════ */}
      <section className="py-20 overflow-hidden">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-accent/8 text-accent border border-accent/15 mb-5">
            <CheckCircle size={12} className="inline -mt-0.5 mr-1" />{t('partners.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t('partners.title')}</h2>
        </AnimatedSection>
        {[false, true].map((rev, ri) => (
          <div key={ri} className="relative mb-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg dark:from-bg-dark to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg dark:from-bg-dark to-transparent z-10" />
            <div className="flex animate-marquee" style={{ animationDirection: rev ? 'reverse' : 'normal', animationDuration: rev ? '40s' : '30s' }}>
              {[...partnerNames, ...partnerNames].map((p, i) => (
                <div key={`${ri}-${i}`} className="shrink-0 mx-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#1A1A1F] border border-border text-sm font-semibold text-text-secondary whitespace-nowrap hover:border-accent/30 hover:text-accent transition-all">
                  {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════ INTERIORS ═══════════ */}
      <section className="py-28 md:py-36 bg-bg-warm dark:bg-[#141418]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-serif">
              В каждом интерьере — <span className="gradient-text">Makel</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: images.interiors.livingRoom, label: 'Гостиная' },
              { img: images.interiors.bathroom, label: 'Ванная' },
              { img: images.interiors.kitchen, label: 'Кухня' },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 60, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }} whileHover={{ y: -8 }}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-default">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6"><span className="liquid-glass px-5 py-2.5 rounded-xl text-sm font-bold text-white">{item.label}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold">Партнёры <span className="font-serif italic font-normal text-text-muted">говорят за нас</span></h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((tt, i) => (
              <motion.div key={tt.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }} whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-white dark:bg-[#1A1A1F] border border-border h-full flex flex-col">
                <div className="flex gap-1 mb-5">{[...Array(5)].map((_, j) => <Star key={j} size={16} className="text-gold fill-gold" />)}</div>
                <p className="text-text-secondary leading-relaxed flex-1 text-lg italic">«{tt.text}»</p>
                <div className="mt-6 pt-5 border-t border-border-light"><p className="font-bold">{tt.name}</p><p className="text-sm text-text-muted">{tt.company}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-dark to-accent" />
        <div className="absolute inset-0 opacity-10"><img src={images.parallax.luxuryInterior} alt="" className="w-full h-full object-cover" /></div>
        <div className="relative py-28 md:py-36 text-center text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <p className="text-lg font-bold uppercase tracking-[0.2em] text-white/60 mb-6">{t('cta.ready')}</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                {t('cta.title1')}<br /><span className="font-serif italic font-normal">{t('cta.title2')}</span>
              </h2>
              <p className="mt-8 text-xl text-white/70 max-w-2xl mx-auto">{t('cta.desc')}</p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contacts" className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-white text-accent rounded-2xl text-xl font-extrabold transition-all hover:shadow-2xl">
                  {t('cta.btn')}<ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <a href="https://t.me/makel_russia" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xl font-bold transition-all">
                  <Send size={20} />{t('cta.tg')}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
