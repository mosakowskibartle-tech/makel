import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { images } from '../config/images';

interface Product { name: string; desc: string; features: string[]; colors: string; img: string; tag?: string; }
interface Category { id: string; title: string; desc: string; products: Product[]; }

const categories: Category[] = [
  { id:'flush', title:'Серии скрытой установки', desc:'Выключатели и розетки для встраивания в стену', products:[
    { name:'Лилиум', desc:'Классическая серия с округлыми формами. Надёжные механизмы.', features:['Классический дизайн','Рамки 1-5 мест','Гориз./верт. установка'], colors:'Белый, крем', img:images.catalog.lillium, tag:'Бестселлер' },
    { name:'Лилиум Натурал', desc:'Натуральные текстуры дерева для уюта.', features:['Имитация дерева','Тёплые оттенки'], colors:'Дуб, орех, черешня', img:images.catalog.lilliumNatural },
    { name:'Лилиум Каре', desc:'Квадратный дизайн для современных интерьеров.', features:['Квадратный дизайн','Чёткие линии'], colors:'Белый, крем, дымчатый', img:images.catalog.lilliumKare },
    { name:'Мимоза', desc:'Элегантная серия с плавными линиями.', features:['Плавные линии','Металлические оттенки'], colors:'Белый, крем, зелёный/серый металлик', img:images.catalog.mimoza, tag:'Популярное' },
    { name:'Дефне', desc:'Современный дизайн, широкая палитра.', features:['Яркие цвета','Комбинирование цветов'], colors:'Широкая палитра', img:images.catalog.defne, tag:'Новинка' },
    { name:'Манолья', desc:'Премиум-серия с изогнутыми линиями.', features:['Премиум-материалы','Благородные оттенки'], colors:'Белый, крем, серебро, золото, дерево', img:images.catalog.manolya, tag:'Премиум' },
    { name:'Кареа', desc:'Геометричный минимализм.', features:['Строгие формы','Комбинирование цветов'], colors:'Различные комбинации', img:images.catalog.karea, tag:'Тренд' },
    { name:'Кареа Лайн', desc:'Минимализм с текстурой.', features:['Строгие формы','Комбинирование цветов','Текстура'], colors:'Различные комбинации', img:images.catalog.karealine, tag:'Тренд' },
    { name:'Кареа Риз', desc:'Минимализм.', features:['Строгие формы','Комбинирование цветов'], colors:'Различные комбинации', img:images.catalog.karearizz, tag:'Тренд' },
  ]},
  { id:'outdoor', title:'Наружная серия', desc:'Влагозащищённые изделия', products:[
    { name:'Серия ИП20', desc:'Для сухих помещений.', features:['Простой монтаж','Накладная установка'], colors:'Белый', img:images.outdoor.ip20 },
    { name:'Серия ИП44/ИП54', desc:'Влагозащита для ванных, кухонь, улиц.', features:['Влагозащита','Защитные крышки'], colors:'Белый, серый', img:images.outdoor.ip44, tag:'Влагозащита' },
    { name:'Серия ИП55 Плюс', desc:'Усиленная защита для промышленных объектов.', features:['ИП55','Ударопрочный корпус'], colors:'Серый', img:images.outdoor.ip55 },
  ]},
  { id:'modular', title:'Модульные системы', desc:'До 6 модулей в одной рамке', products:[
    { name:'Рамки Лилиум', desc:'Гибкая система до 6 модулей.', features:['До 6 модулей','Выключатели, розетки, диммеры, ТВ'], colors:'Различные', img:images.modular.lilliumram, tag:'Рамки' },
    { name:'Рамки Мимоза', desc:'Гибкая система до 6 модулей.', features:['До 6 модулей','Выключатели, розетки, диммеры, ТВ'], colors:'Различные', img:images.modular.mimozaram, tag:'Рамки' },
    { name:'Рамки Дефне', desc:'Гибкая система до 6 модулей.', features:['До 6 модулей','Выключатели, розетки, диммеры, ТВ'], colors:'Различные', img:images.modular.defneram, tag:'Рамки' },
    { name:'Рамки Мимоза', desc:'Гибкая система до 6 модулей.', features:['До 6 модулей','Выключатели, розетки, диммеры, ТВ'], colors:'Различные', img:images.modular.manolyaram, tag:'Рамки' },
    { name:'Рамки Кареа', desc:'Гибкая система до 6 модулей.', features:['До 6 модулей','Выключатели, розетки, диммеры, ТВ'], colors:'Различные', img:images.modular.karearam, tag:'Рамки' },
    { name:'Рамки Кареа Лайн', desc:'Гибкая система до 6 модулей.', features:['До 6 модулей','Выключатели, розетки, диммеры, ТВ'], colors:'Различные', img:images.modular.karealineram, tag:'Рамки' },
    { name:'Рамки Кареа Риз', desc:'Гибкая система до 6 модулей.', features:['До 6 модулей','Выключатели, розетки, диммеры, ТВ'], colors:'Различные', img:images.modular.karearizzram, tag:'Рамки' },
  ]},
  { id:'ext', title:'Удлинители и аксессуары', desc:'Удлинители, вилки, тройники, адаптеры', products:[
    { name:'Удлинители и колодки нового поколения', desc:'Удлинители различной длины.', features:['С заземлением','Выключатель','Защита от перегрузки'], colors:'Белый', img:images.accessories.nudl },
    { name:'Удлинтели и колодки', desc:'Вилки, тройники, адаптеры.', features:['Вилки и штепсели','Тройники','Переходники'], colors:'Белый, чёрный', img:images.accessories.mgp },
    { name:'Аксессуары', desc:'Вилки, тройники, адаптеры.', features:['Вилки и штепсели','Тройники','Переходники'], colors:'Белый, чёрный', img:images.accessories.plugs },
  ]},
  { id:'panels', title:'Электрощиты и автоматика', desc:'Щиты, автоматы, счётчики', products:[
    { name:'Боксы', desc:'Для внутренней и наружной установки.', features:['Различные размеры','ДИН-рейка'], colors:'Белый', img:images.panels.boards },
  ]},
];

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group rounded-3xl bg-bg-card border border-border overflow-hidden card-hover">
      <div className="aspect-[4/3] overflow-hidden bg-surface relative"><img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
        {p.tag && <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${p.tag==='Премиум'?'bg-gold/90 text-white':p.tag==='Новинка'?'bg-teal/90 text-white':'bg-accent/90 text-white'}`}>{p.tag}</span>}
      </div>
      <div className="p-6"><h3 className="text-xl font-bold mb-2">{p.name}</h3><p className="text-sm text-text-secondary mb-4">{p.desc}</p>
        <div className="space-y-1.5 mb-4">{p.features.map(f=><div key={f} className="flex items-center gap-2 text-sm text-text-secondary"><div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"/>{f}</div>)}</div>
        <div className="pt-4 border-t border-border-light"><p className="text-xs text-text-muted">Цвета: {p.colors}</p></div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [active, setActive] = useState<string|null>(null);
  return (
    <div>
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-bg-warm"><div className="max-w-7xl mx-auto px-4 sm:px-6"><SectionTitle badge="Каталог" title="Продукция Makel" subtitle="Более 1 300 наименований для любых задач" serif/></div></section>
      <section className="py-12"><div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {categories.map((cat,ci)=>(
          <AnimatedSection key={cat.id} delay={ci*0.05}>
            <div className="rounded-3xl bg-bg-card border border-border overflow-hidden">
              <button onClick={()=>setActive(active===cat.id?null:cat.id)} className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-surface/30 transition-colors">
                <div><h2 className="text-xl md:text-2xl font-bold">{cat.title}</h2><p className="text-sm text-text-secondary mt-1">{cat.desc}</p><span className="text-xs text-accent font-semibold mt-2 inline-block">{cat.products.length} позиций</span></div>
                <ChevronDown size={24} className={`text-text-muted shrink-0 ml-4 transition-transform ${active===cat.id?'rotate-180':''}`}/>
              </button>
              {active===cat.id && <div className="px-6 pb-8 md:px-8"><div className="line-shimmer mb-8"/><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{cat.products.map(p=><ProductCard key={p.name} p={p}/>)}</div></div>}
            </div>
          </AnimatedSection>
        ))}
      </div></section>

      <section className="py-16 bg-bg-warm"><div className="max-w-7xl mx-auto px-4 sm:px-6"><AnimatedSection>
        <div className="rounded-3xl bg-bg-card border border-border p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div><span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-gold/10 text-gold border border-gold/10 mb-4">Кастомизация</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">Дизайн под ваш интерьер</h3>
              <p className="text-text-secondary mb-6">Комбинируйте цвета клавиш и рамок. Рамки от 1 до 7 мест.</p>
              <div className="flex flex-wrap gap-2">{['Белый','Крем','Дымчатый','Чёрный','Серебро','Золото','Титан','Синий','Зелёный','Красный','Дуб','Орех'].map(c=><span key={c} className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-border text-text-secondary">{c}</span>)}</div>
            </div>
            <div className="text-center"><Link to="/contacts" className="inline-flex items-center gap-2 px-8 py-4 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 rounded-2xl font-semibold transition-all">Запросить подбор цветов<ArrowRight size={18}/></Link></div>
          </div>
        </div>
      </AnimatedSection></div></section>

      <section className="py-24"><div className="max-w-4xl mx-auto px-4 sm:px-6 text-center"><AnimatedSection>
        <div className="w-20 h-20 rounded-3xl bg-accent-bg flex items-center justify-center mx-auto mb-6"><FileText className="text-accent" size={36}/></div>
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Заказать печатный каталог</h2>
        <p className="text-text-secondary text-lg mb-8">Полный каталог с ценами для дилеров. Доставка по России.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contacts" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white rounded-2xl font-semibold transition-all hover:shadow-lg hover:shadow-accent/20">Заказать<ArrowRight size={18}/></Link>
          <Link to="/downloads" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bg-card border border-border rounded-2xl font-semibold transition-all hover:bg-surface">Скачать в ПДФ</Link>
        </div>
      </AnimatedSection></div></section>
    </div>
  );
}
