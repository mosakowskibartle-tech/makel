import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Shield, Truck, TrendingUp, Package, Star, Send, Zap, Award, Globe, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { images } from '../config/images';
import { company, testimonials } from '../config/content';
import { partnerNames } from '../config/partners';

/* ── Counter with morphing glow ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => { if (!inView) return; const c = animate(0, target, { duration: 2.5, ease: [0.22,1,0.36,1], onUpdate: (v: number) => setVal(Math.round(v)) }); return () => c.stop(); }, [inView, target]);
  return <span ref={ref}>{val.toLocaleString('ru-RU')}{suffix}</span>;
}

/* ── Magnetic Button ── */
function MagBtn({ children, className, ...props }: React.ComponentProps<typeof Link>) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 }), sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.div style={{ x: sx, y: sy }} onMouseMove={(e: React.MouseEvent) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX-r.left-r.width/2)*0.15); y.set((e.clientY-r.top-r.height/2)*0.15); }} onMouseLeave={() => { x.set(0); y.set(0); }}>
      <Link className={className} {...props}>{children}</Link>
    </motion.div>
  );
}

/* ── 3D Perspective Card ── */
function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    setRot({ x: cy * -15, y: cx * 15 });
  };
  return (
    <div className="perspective-container">
      <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setRot({ x: 0, y: 0 })}
        animate={{ rotateX: rot.x, rotateY: rot.y, scale: rot.x === 0 ? 1 : 1.03 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`card-3d ${className}`}>
        {children}
      </motion.div>
    </div>
  );
}

/* ── Series data for horizontal scroll ── */
const series = [
  { name: 'Лилиум', desc: 'Классический дизайн', tag: 'Бестселлер', img: images.catalog.lillium, colors: 'Белый, крем' },
  { name: 'Мимоза', desc: 'Элегантные линии', tag: 'Популярное', img: images.catalog.mimoza, colors: 'Металлик' },
  { name: 'Дефне', desc: 'Современный стиль', tag: 'Новинка', img: images.catalog.defne, colors: 'Широкая палитра' },
  { name: 'Манолья', desc: 'Премиум-сегмент', tag: 'Премиум', img: images.catalog.manolya, colors: 'Серебро, золото' },
  { name: 'Кареа', desc: 'Геометричный минимализм', tag: 'Тренд', img: images.catalog.karea, colors: 'Комбинации' },
  { name: 'Милланта', desc: 'Модульная система', tag: 'Модуль', img: images.modular.millanta, colors: 'До 7 модулей' },
];

const advantages = [
  { icon: Shield, title: 'Гарантия подлинности', desc: 'Каждое изделие — оригинал с завода. Полная сертификация РФ.', num: '100%' },
  { icon: Truck, title: 'Прямые поставки', desc: 'Без посредников. Напрямую с завода — минимальные цены.', num: '0' },
  { icon: TrendingUp, title: 'Высокая маржа', desc: 'До 40% маржинальности. Ваш бизнес растёт с нами.', num: '40%' },
  { icon: Package, title: 'Всё в наличии', desc: '1300+ позиций на складе. Отгрузка за 1-3 дня.', num: '1300+' },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: hs } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(hs, [0, 0.7], [1, 0]);
  const heroTextY = useTransform(hs, [0, 1], ['0px', '-80px']);

  /* Sticky parallax — single product */
  const stickyRef = useRef(null);
  const { scrollYProgress: sp } = useScroll({ target: stickyRef, offset: ['start start', 'end end'] });
  const bgScale = useTransform(sp, [0, 0.5, 1], [1.15, 1, 1.1]);
  const productScale = useTransform(sp, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.9]);
  const productRotate = useTransform(sp, [0, 0.5, 1], [-5, 0, 5]);
  const txtOp1 = useTransform(sp, [0, 0.15, 0.4, 0.5], [0, 1, 1, 0]);
  const txtOp2 = useTransform(sp, [0.5, 0.65, 0.9, 1], [0, 1, 1, 1]);

  /* Horizontal scroll for series */
  const hScrollRef = useRef(null);
  const { scrollYProgress: hsp } = useScroll({ target: hScrollRef, offset: ['start end', 'end start'] });
  const hX = useTransform(hsp, [0, 1], ['10%', '-60%']);

  return (
    <div>
      {/* ═══ HERO WITH VIDEO ═══ */}
      <section ref={heroRef} className="relative h-[110vh] flex items-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src={images.videos.heroBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-[15%] right-[15%] w-80 h-80 rounded-full bg-accent/10 blur-[140px] animate-float" />
        <div className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-gold/5 blur-[160px] animate-float" style={{ animationDelay: '3s' }} />

        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:1 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-accent/10 text-accent border border-accent/20 mb-8 font-display">
                <span className="relative w-2 h-2 rounded-full bg-accent"><span className="absolute inset-0 rounded-full bg-accent animate-ping"/></span>
                №1 дистрибьютор Makel в России
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.2 }} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold leading-[0.92] tracking-tight font-display">
              <span className="gradient-text">Makel.</span><br/>
              <span>Мощнее.</span><br/>
              <span className="font-serif italic font-normal text-text-secondary text-[0.55em]">Надёжнее. Выгоднее.</span>
            </motion.h1>
            <motion.p initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }} className="mt-8 text-lg text-text-secondary max-w-xl leading-relaxed">
              Прямые поставки с завода. Более <strong className="text-text-primary">1 300 позиций</strong> на складе. Лучшие условия для дистрибьюторов.
            </motion.p>
            <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.7 }} className="mt-10 flex flex-col sm:flex-row gap-4">
              <MagBtn to="/contacts" className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent hover:bg-accent-light text-white rounded-2xl text-lg font-bold font-display transition-all hover:shadow-2xl hover:shadow-accent/30">
                Стать партнёром <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform"/>
              </MagBtn>
              <MagBtn to="/catalog" className="inline-flex items-center justify-center gap-3 px-10 py-5 liquid-glass hover:bg-surface text-text-primary rounded-2xl text-lg font-bold font-display transition-all">Каталог</MagBtn>
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y:[0,12,0] }} transition={{ duration:2.5, repeat:Infinity }} className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1.5"><div className="w-1.5 h-3 rounded-full bg-accent"/></motion.div>
        </motion.div>
      </section>

      {/* ═══ SCROLL-TRIGGERED MORPHING STATS ═══ */}
      <section className="relative z-10 -mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity:0, y:60 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="liquid-glass-strong rounded-[2rem] p-8 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[{ n:47, s:'+', l:'Лет на рынке', sub:'С 1977 года' }, { n:45000, s:'', l:'м² производство', sub:'Современный завод' }, { n:40, s:'+', l:'Стран экспорта', sub:'По всему миру' }, { n:1300, s:'+', l:'Наименований', sub:'В каталоге' }].map((s, i) => (
                <motion.div key={s.l} initial={{ opacity:0, y:30, scale:0.8 }} whileInView={{ opacity:1, y:0, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.15, duration:0.8, type:'spring' }} className="text-center">
                  <p className="text-4xl md:text-5xl font-extrabold text-accent animate-counter-glow font-display"><Counter target={s.n} suffix={s.s}/></p>
                  <p className="text-sm font-bold mt-2 text-text-primary">{s.l}</p><p className="text-xs text-text-muted">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STICKY PARALLAX — SINGLE PRODUCT ═══ */}
      <div ref={stickyRef} className="h-[300vh] relative mt-24">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ scale: bgScale }} className="absolute inset-0">
            <img src={images.parallax.luxuryInterior} alt="" className="w-full h-full object-cover opacity-30"/>
            <div className="absolute inset-0 bg-bg/70"/>
          </motion.div>
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* LEFT: Text layers */}
              <div className="relative h-[280px]">
                <motion.div style={{ opacity: txtOp1 }} className="absolute inset-0 flex flex-col justify-center">
                  <span className="inline-block w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-accent/10 text-accent border border-accent/20 mb-4 font-display">Розетки и выключатели</span>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display">Безупречный<br/><span className="font-serif italic font-normal text-text-secondary">дизайн в каждой детали</span></h2>
                  <p className="mt-4 text-text-secondary max-w-md">7 серий. 12 цветов рамок. От классики до премиум-сегмента. Для любого интерьера.</p>
                </motion.div>
                <motion.div style={{ opacity: txtOp2 }} className="absolute inset-0 flex flex-col justify-center">
                  <span className="inline-block w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-gold/10 text-gold border border-gold/20 mb-4 font-display">Качество</span>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display">47 лет<br/><span className="font-serif italic font-normal text-text-secondary">безупречной репутации</span></h2>
                  <p className="mt-4 text-text-secondary max-w-md">Сертификация VDE, ГОСТ-Р, ЕАС. Многоступенчатый контроль качества на каждом этапе.</p>
                </motion.div>
              </div>
              {/* RIGHT: Product */}
              <div className="relative h-[400px] flex items-center justify-center">
                <motion.div style={{ scale: productScale, rotate: productRotate }} className="relative">
                  <div className="absolute -inset-8 bg-accent/8 rounded-[2.5rem] blur-[60px]"/>
                  <img src={images.stickyProducts.first} alt="Makel" className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-[2rem] border border-border glow-soft"/>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 3D PERSPECTIVE ADVANTAGES ═══ */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-accent/10 text-accent border border-accent/20 mb-5 font-display">Почему мы</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display">Конкуренты <span className="font-serif italic font-normal text-text-muted">отдыхают</span></h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity:0, y:60, rotateX:20 }} whileInView={{ opacity:1, y:0, rotateX:0 }} viewport={{ once:true }} transition={{ delay:i*0.12, duration:0.8 }}>
                <Card3D className="group p-8 rounded-3xl bg-bg-card border border-border hover:border-accent/30 transition-colors relative overflow-hidden cursor-default h-full">
                  <div className="absolute top-0 right-0 text-[5rem] font-extrabold text-accent/5 leading-none -mt-2 -mr-1 select-none font-display">{a.num}</div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-500"><a.icon className="text-accent group-hover:text-white transition-colors" size={26}/></div>
                    <h3 className="text-lg font-bold mb-3 font-display">{a.title}</h3><p className="text-sm text-text-secondary leading-relaxed">{a.desc}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HORIZONTAL SCROLL SERIES ═══ */}
      <section ref={hScrollRef} className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <AnimatedSection>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-accent/10 text-accent border border-accent/20 mb-5 font-display">Продукция</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display">Популярные <span className="font-serif italic font-normal text-text-muted">серии</span></h2>
          </AnimatedSection>
        </div>
        <motion.div style={{ x: hX }} className="flex gap-6 pl-[5vw]">
          {series.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
              className="shrink-0 w-[320px] md:w-[380px] group">
              <Link to="/catalog" className="block rounded-3xl bg-bg-card border border-border hover:border-accent/30 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10">
                <div className="aspect-[4/3] overflow-hidden"><img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold font-display group-hover:text-accent transition-colors">{s.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${s.tag==='Премиум'?'bg-gold/10 text-gold':s.tag==='Новинка'?'bg-teal/10 text-teal':'bg-accent/10 text-accent'}`}>{s.tag}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{s.desc}</p>
                  <p className="text-xs text-text-muted mt-3 pt-3 border-t border-border">Цвета: {s.colors}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ DARK PRODUCTION ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0"><img src={images.about.techFactory} alt="" className="w-full h-full object-cover opacity-15"/></div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg"/>
        <div className="relative py-28 md:py-36 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-display">Завод <span className="gradient-text">45 000 м²</span><br/><span className="font-serif italic font-normal text-text-muted">мощнее любого конкурента</span></h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed max-w-lg">Собственная сертифицированная лаборатория. Полный цикл производства. Контроль качества на каждом этапе.</p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[{ i:Zap, l:'Полный цикл', v:'производства' },{ i:Award, l:'Сертификаты', v:'VDE, ГОСТ-Р, ЕАС' },{ i:Globe, l:'40+ стран', v:'доверяют нам' }].map(it=>(
                  <div key={it.l}><it.i className="text-accent mb-2" size={24}/><p className="text-sm font-bold font-display">{it.l}</p><p className="text-xs text-text-muted">{it.v}</p></div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3} direction="left">
              <div className="relative">
                <div className="absolute -inset-8 bg-accent/8 rounded-[2rem] blur-[60px]"/>
                <img src={images.about.factory} alt="Завод" className="relative rounded-[2rem] w-full aspect-[4/3] object-cover border border-border"/>
                <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:5, repeat:Infinity }} className="absolute -bottom-6 -right-6 bg-accent rounded-2xl p-6">
                  <p className="text-3xl font-extrabold font-display">~1000</p><p className="text-sm text-white/80">сотрудников</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE PARTNERS ═══ */}
      <section className="py-20 overflow-hidden">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-accent/10 text-accent border border-accent/20 mb-5 font-display"><CheckCircle size={12} className="inline -mt-0.5 mr-1"/>Более 47 партнёров</span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-display">Нам доверяют <span className="gradient-text">лидеры</span></h2>
        </AnimatedSection>
        {[false, true].map((rev, ri) => (
          <div key={ri} className="relative mb-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10"/>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10"/>
            <div className="flex animate-marquee" style={rev ? { animationDirection:'reverse', animationDuration:'45s' } : {}}>
              {[...(rev ? partnerNames.slice().reverse() : partnerNames), ...(rev ? partnerNames.slice().reverse() : partnerNames)].map((p, i) => (
                <div key={`${ri}-${i}`} className="shrink-0 mx-2 px-6 py-3 rounded-2xl bg-bg-card border border-border text-sm font-semibold text-text-secondary whitespace-nowrap hover:border-accent/30 hover:text-accent transition-all">{p}</div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ═══ INTERIORS ═══ */}
      <section className="py-28 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display">В каждом пространстве — <span className="gradient-text">Makel</span></h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ img:images.interiors.livingRoom, l:'Гостиная' },{ img:images.interiors.bathroom, l:'Ванная' },{ img:images.interiors.kitchen, l:'Кухня' }].map((it, i) => (
              <motion.div key={it.l} initial={{ opacity:0, y:60 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.15 }} whileHover={{ y:-8 }} className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-default">
                <img src={it.img} alt={it.l} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
                <div className="absolute bottom-6 left-6"><span className="liquid-glass px-5 py-2.5 rounded-xl text-sm font-bold text-white">{it.l}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-extrabold font-display">Партнёры <span className="font-serif italic font-normal text-text-muted">говорят за нас</span></h2></AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.15 }} whileHover={{ y:-6 }} className="p-8 rounded-3xl bg-bg-card border border-border h-full flex flex-col">
                <div className="flex gap-1 mb-5">{[...Array(5)].map((_,j)=><Star key={j} size={16} className="text-gold fill-gold"/>)}</div>
                <p className="text-text-secondary leading-relaxed flex-1 text-lg italic">«{t.text}»</p>
                <div className="mt-6 pt-5 border-t border-border"><p className="font-bold">{t.name}</p><p className="text-sm text-text-muted">{t.company}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-dark to-accent"/>
        <div className="absolute inset-0 opacity-10"><img src={images.parallax.luxuryInterior} alt="" className="w-full h-full object-cover"/></div>
        <div className="absolute inset-0 grid-pattern opacity-20"/>
        <div className="relative py-28 md:py-36 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50 mb-6 font-display">Готовы к росту?</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight font-display">Станьте частью<br/><span className="font-serif italic font-normal">команды лидеров</span></h2>
            <p className="mt-8 text-xl text-white/70 max-w-2xl mx-auto">Оставьте заявку прямо сейчас. Менеджер свяжется в течение 2 часов.</p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <MagBtn to="/contacts" className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-bg-card text-accent rounded-2xl text-xl font-extrabold font-display transition-all hover:shadow-2xl">
                Оставить заявку <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform"/>
              </MagBtn>
              <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xl font-bold font-display transition-all"><Send size={20}/>Телеграм</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
