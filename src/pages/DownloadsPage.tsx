import { FileText, Download, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
const catalogs = [
  { name:'Общий каталог Makel 2024', desc:'Полный ассортимент', size:'45 МБ', lang:'РУ' },
  { name:'Серия Лилиум', desc:'Классические выключатели и розетки', size:'12 МБ', lang:'РУ' },
  { name:'Серия Мимоза', desc:'Элегантная линейка', size:'10 МБ', lang:'РУ' },
  { name:'Серия Дефне', desc:'Современный дизайн', size:'11 МБ', lang:'РУ' },
  { name:'Серия Манолья', desc:'Премиум', size:'14 МБ', lang:'РУ' },
  { name:'Модульные системы', desc:'Милланта и Каре', size:'8 МБ', lang:'РУ' },
  { name:'Наружная серия', desc:'ИП20/ИП44/ИП55', size:'9 МБ', lang:'РУ' },
  { name:'Электрощиты и автоматика', desc:'Щиты, автоматы, счётчики', size:'15 МБ', lang:'РУ' },
  { name:'Прайс-лист 2024', desc:'Цены для дилеров', size:'2 МБ', lang:'РУ' },
  { name:'Сертификаты', desc:'VDE, ИСО, ГОСТ-Р, ЕАС', size:'5 МБ', lang:'РУ' },
];
export default function DownloadsPage() {
  return (<div className="py-24 md:py-32"><div className="max-w-5xl mx-auto px-4 sm:px-6">
    <SectionTitle badge="Каталоги" title="Скачать материалы" subtitle="Каталоги, прайс-листы и сертификаты" serif/>
    <div className="space-y-3">{catalogs.map((c,i)=>(
      <AnimatedSection key={c.name} delay={i*0.05}><div className="group flex items-center gap-5 p-5 rounded-2xl bg-bg-card border border-border hover:border-accent/20 transition-all card-hover">
        <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center shrink-0"><FileText className="text-accent" size={22}/></div>
        <div className="flex-1 min-w-0"><h3 className="font-semibold group-hover:text-accent transition-colors">{c.name}</h3><p className="text-sm text-text-muted">{c.desc}</p></div>
        <div className="hidden sm:flex items-center gap-3 text-sm text-text-muted"><span className="px-2 py-1 rounded-lg bg-surface text-xs font-medium">{c.lang}</span><span>{c.size}</span></div>
        <button className="p-3 rounded-xl bg-surface hover:bg-accent-bg hover:text-accent transition-all"><Download size={18}/></button>
      </div></AnimatedSection>
    ))}</div>
    <AnimatedSection className="mt-12"><div className="p-8 rounded-3xl bg-bg-warm border border-border text-center">
      <p className="text-text-secondary mb-4">Для получения дилерского прайс-листа свяжитесь с нами</p>
      <a href="mailto:info@makel.ru" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-semibold transition-all"><ExternalLink size={16}/>Запросить прайс</a>
    </div></AnimatedSection>
  </div></div>);
}
