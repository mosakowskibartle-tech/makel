import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { images } from '../config/images';

const news = [
  {
    id: 'new-series-2025',
    date: '10 апреля 2025',
    category: 'Новинки',
    title: 'Новая серия Дефне — современный дизайн и широкая палитра',
    excerpt: 'Представляем обновлённую серию Дефне с расширенной цветовой палитрой и улучшенными механизмами. Теперь доступно 15 цветов рамок для любого интерьера.',
    img: images.catalog.defne,
    readTime: '3 мин',
  },
  {
    id: 'spring-promo',
    date: '1 апреля 2025',
    category: 'Акция',
    title: 'Весенняя акция: скидка 15% на первый заказ для новых партнёров',
    excerpt: 'До 30 июня 2025 года новые партнёры получают скидку 15% на первый заказ от 300 000 рублей. Отличный момент начать сотрудничество!',
    img: images.interiors.livingRoom,
    readTime: '2 мин',
  },
  {
    id: 'certification-update',
    date: '15 марта 2025',
    category: 'Компания',
    title: 'Обновление сертификатов ГОСТ-Р и ЕАС на 2025 год',
    excerpt: 'Вся продукция Makel прошла повторную сертификацию. Обновлённые сертификаты доступны для скачивания в разделе каталогов.',
    img: images.about.factory,
    readTime: '2 мин',
  },
  {
    id: 'new-partners-q1',
    date: '1 марта 2025',
    category: 'Партнёры',
    title: '8 новых партнёров в первом квартале 2025',
    excerpt: 'Сеть партнёров Makel в России продолжает расти. Мы рады приветствовать новых дистрибьюторов из Тюмени, Омска, Красноярска и других городов.',
    img: images.about.global,
    readTime: '3 мин',
  },
  {
    id: 'hotel-solutions',
    date: '10 февраля 2025',
    category: 'Продукция',
    title: 'Решения Makel для гостиничного бизнеса',
    excerpt: 'Карточные выключатели, диммеры, модульные системы — полный набор электротехники для отелей любого класса.',
    img: images.special.hotelCards,
    readTime: '4 мин',
  },
  {
    id: 'ip55-outdoor',
    date: '20 января 2025',
    category: 'Продукция',
    title: 'Серия ИП55 Плюс — максимальная защита для улицы',
    excerpt: 'Подробный обзор влагозащищённой серии ИП55 Плюс для промышленных объектов и наружной установки.',
    img: images.outdoor.ip55,
    readTime: '3 мин',
  },
];

const categoryColors: Record<string, string> = {
  'Новинки': 'bg-teal/10 text-teal',
  'Акция': 'bg-accent/10 text-accent',
  'Компания': 'bg-gold/10 text-gold',
  'Партнёры': 'bg-blue-500/10 text-blue-600',
  'Продукция': 'bg-purple-500/10 text-purple-600',
};

export default function NewsPage() {
  return (
    <div>
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge="Новости и акции" title="Будьте в курсе" subtitle="Новинки продукции, специальные предложения и события компании" serif />
        </div>
      </section>

      {/* Главная новость */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8 rounded-3xl bg-bg-card border border-border overflow-hidden card-hover">
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-surface">
                <img src={news[0].img} alt={news[0].title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[news[0].category] || 'bg-surface text-text-muted'}`}>{news[0].category}</span>
                  <span className="text-xs text-text-muted flex items-center gap-1"><Calendar size={12} />{news[0].date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">{news[0].title}</h2>
                <p className="text-text-secondary leading-relaxed mb-6">{news[0].excerpt}</p>
                <div className="flex items-center gap-4">
                  <Link to="/contacts" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-semibold transition-all text-sm">
                    Узнать подробнее <ArrowRight size={16} />
                  </Link>
                  <span className="text-xs text-text-muted flex items-center gap-1"><Clock size={12} />{news[0].readTime}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Сетка новостей */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(1).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group rounded-3xl bg-bg-card border border-border overflow-hidden card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden bg-surface relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md ${categoryColors[item.category] || 'bg-white/80 text-text-muted'}`}>
                    <Tag size={10} className="inline -mt-0.5 mr-1" />{item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Calendar size={11} />{item.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{item.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors leading-snug">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{item.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <div className="p-10 rounded-3xl bg-gradient-to-br from-accent/5 to-gold/5 border border-accent/10">
              <h3 className="text-2xl font-extrabold mb-3">Не пропускайте акции</h3>
              <p className="text-text-secondary mb-6">Подпишитесь на наш Телеграм-канал, чтобы первыми узнавать о новинках и спецпредложениях</p>
              <a href="https://t.me/makel_russia" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#229ED9] hover:bg-[#1a8bc4] text-white rounded-2xl font-bold transition-all hover:shadow-lg">
                Подписаться на канал
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
