import { Factory, Globe, Award, Users, Shield, Beaker, CheckCircle, Trophy, Medal, Star, Gem, Warehouse, MapPin, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { images } from '../config/images';

const timeline = [
  { year: '1977', text: 'Основание компании Makel в Стамбуле, Турция. Начало производства электроустановочных изделий.' },
  { year: '1985', text: 'Запуск первой автоматизированной производственной линии. Выход на рынки стран Ближнего Востока.' },
  { year: '1995', text: 'Расширение экспорта в страны СНГ. Начало поставок в Россию.' },
  { year: '2005', text: 'Модернизация завода до 45 000 м². Получение международных сертификатов VDE и ISO 9001.' },
  { year: '2014', text: 'Регистрация ООО «МАКЕЛ РУС» в Москве. Официальное представительство в России.' },
  { year: '2020', text: 'Экспорт в 40+ стран мира. Каталог расширен до 1300+ наименований.' },
  { year: '2024', text: 'Открытие склада в Москве. Отгрузка по всей России за 1-3 дня. Более 45 активных партнёров.' },
];

export default function AboutPage() {
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.about.factory} alt="" className="w-full h-full object-cover opacity-12" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-accent/8 text-accent border border-accent/15 mb-6">О компании</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.05]">
              <span className="font-serif italic font-normal text-text-secondary">Более </span>
              <span className="gradient-text">47 лет</span>
              <br />на рынке электротехники
            </h1>
            <p className="mt-8 text-xl text-text-secondary max-w-2xl leading-relaxed">
              Makel — турецкая компания, основанная в 1977 году. Группа предприятий работает исключительно на турецком капитале и является лидером по экспорту электроматериалов из Турции. В России с 2014 года.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ КЛЮЧЕВЫЕ ЦИФРЫ ═══ */}
      <section className="py-20 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '45 000 м²', label: 'Площадь завода', sub: 'Современное оборудование', icon: Factory },
              { num: '40+ стран', label: 'География экспорта', sub: 'По всему миру', icon: Globe },
              { num: '1 300+', label: 'Наименований', sub: 'В каталоге', icon: Award },
              { num: '~1 000', label: 'Сотрудников', sub: 'На производстве', icon: Users },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="p-8 rounded-3xl bg-bg-card border border-border text-center card-hover"
              >
                <item.icon className="text-accent mx-auto mb-4" size={36} />
                <p className="text-3xl font-extrabold text-text-primary">{item.num}</p>
                <p className="text-sm font-bold text-text-primary mt-1">{item.label}</p>
                <p className="text-xs text-text-muted">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ЗАВОД — ПАРАЛЛАКС ═══ */}
      <section ref={parallaxRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[10%] h-[120%]">
          <img src={images.about.techFactory} alt="Завод Makel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
        </motion.div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <AnimatedSection>
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Завод <span className="gradient-text">мирового</span> уровня
                </h2>
                <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                  Производственный комплекс площадью 45 000 м² оснащён современным европейским оборудованием. Собственная сертифицированная лаборатория VDE обеспечивает контроль качества на каждом этапе.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  {['Полный цикл производства', 'Лаборатория VDE', 'Контроль качества 100%'].map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full text-sm font-semibold bg-white/80 backdrop-blur-sm border border-border text-text-primary">{tag}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ СКЛАД В МОСКВЕ ═══ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-teal/8 text-teal border border-teal/15 mb-5">Логистика</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Склад в <span className="gradient-text">Москве</span>
              </h2>
              <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                Собственный складской комплекс в Москве позволяет отгружать продукцию по всей России за 1-3 рабочих дня. Более 1300 позиций всегда в наличии.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Warehouse, text: 'Складской комплекс в Москве' },
                  { icon: Zap, text: 'Отгрузка за 1-3 рабочих дня' },
                  { icon: MapPin, text: 'Доставка по всей России' },
                  { icon: Shield, text: 'Все товары сертифицированы для РФ' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center shrink-0">
                      <item.icon size={22} className="text-teal" />
                    </div>
                    <p className="text-text-secondary font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="left">
              <div className="relative">
                <div className="absolute -inset-6 bg-teal/5 rounded-[2rem] blur-3xl" />
                <img src={images.about.background} alt="Склад Москва" className="relative rounded-[2rem] w-full aspect-[4/3] object-cover border border-border glow-soft" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-6 liquid-glass-strong rounded-2xl p-5 shadow-xl">
                  <p className="text-3xl font-extrabold text-accent">1-3 дня</p>
                  <p className="text-sm text-text-muted">отгрузка по РФ</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ ИСТОРИЯ — ТАЙМЛАЙН ═══ */}
      <section className="py-24 md:py-32 bg-bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle badge="История" title="Наш путь" subtitle="От небольшого производства до мирового лидера" serif />
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent/10" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 hidden md:block ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <p className="text-text-secondary leading-relaxed">{item.text}</p>
                  </div>
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-bg-card border-2 border-accent/30 flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-sm font-extrabold text-accent">{item.year}</span>
                  </div>
                  <div className="flex-1 md:hidden pt-2">
                    <p className="text-text-secondary leading-relaxed">{item.text}</p>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ НАГРАДЫ 3D ═══ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge="🏆 Достижения" title="Признание качества" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Trophy, title: 'Лидер экспорта', desc: '№1 по экспорту электроматериалов из Турции', grad: 'from-gold/20 to-gold/5' },
              { icon: Medal, title: 'Сертификация VDE', desc: 'Немецкий стандарт электробезопасности', grad: 'from-accent/15 to-accent/5' },
              { icon: Star, title: '47 лет качества', desc: 'Непрерывное производство с 1977 года', grad: 'from-teal/15 to-teal/5' },
              { icon: Gem, title: '40+ стран', desc: 'Международное признание и доверие', grad: 'from-purple-500/15 to-purple-500/5' },
            ].map((award, i) => (
              <motion.div key={award.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.03, rotateY: 5 }}
                style={{ transformPerspective: 800 }}
                className={`p-8 rounded-3xl bg-gradient-to-br ${award.grad} border border-border h-full cursor-default`}
              >
                <div className="w-16 h-16 rounded-2xl bg-bg-card flex items-center justify-center mb-6 shadow-lg">
                  <award.icon size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                <p className="text-sm text-text-secondary">{award.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ СЕРТИФИКАТЫ ═══ */}
      <section className="py-24 md:py-32 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge="Сертификаты" title="Международные стандарты" subtitle="Продукция Makel сертифицирована по ведущим мировым стандартам" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'VDE', desc: 'Немецкий стандарт' },
              { name: 'ТСЕ', desc: 'Турецкий институт' },
              { name: 'ИСО 9001', desc: 'Менеджмент качества' },
              { name: 'CE', desc: 'Европейские нормы' },
              { name: 'ГОСТ-Р', desc: 'Российский стандарт' },
              { name: 'ЕАС', desc: 'Евразийский союз' },
            ].map((cert, i) => (
              <motion.div key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-bg-card border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="text-gold" size={24} />
                </div>
                <p className="font-bold text-lg">{cert.name}</p>
                <p className="text-xs text-text-muted mt-1">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
