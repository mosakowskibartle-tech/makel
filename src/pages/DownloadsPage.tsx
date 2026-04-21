import { FileText, Download, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { downloadLinks } from '../config/downloads';

const catalogs = [
  { name: 'Общий каталог Makel 2024', desc: 'Полный ассортимент продукции', size: '45 МБ', lang: 'РУ' },
  { name: 'Серия Лилиум', desc: 'Классические выключатели и розетки', size: '12 МБ', lang: 'РУ' },
  { name: 'Серия Мимоза', desc: 'Элегантная линейка', size: '10 МБ', lang: 'РУ' },
  { name: 'Серия Дефне', desc: 'Современный дизайн', size: '11 МБ', lang: 'РУ' },
  { name: 'Серия Манолья', desc: 'Премиум-сегмент', size: '14 МБ', lang: 'РУ' },
  { name: 'Модульные системы', desc: 'Милланта и Каре модульные', size: '8 МБ', lang: 'РУ' },
  { name: 'Наружная серия', desc: 'ИП20/ИП44/ИП55 изделия', size: '9 МБ', lang: 'РУ' },
  { name: 'Электрощиты и автоматика', desc: 'Щиты, автоматы, счётчики', size: '15 МБ', lang: 'РУ' },
  { name: 'Прайс-лист 2024', desc: 'Актуальные цены для дилеров', size: '2 МБ', lang: 'РУ' },
  { name: 'Сертификаты', desc: 'VDE, ИСО, ГОСТ-Р, ЕАС', size: '5 МБ', lang: 'РУ' },
];

export default function DownloadsPage() {
  const handleDownload = (name: string) => {
    const url = downloadLinks[name];
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Если ссылка не указана — предлагаем запросить
      window.location.href = `mailto:info@makel.ru?subject=Запрос каталога: ${encodeURIComponent(name)}`;
    }
  };

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle badge="Каталоги" title="Скачать материалы" subtitle="Каталоги в формате ПДФ, прайс-листы и сертификаты" serif />

        <div className="space-y-3">
          {catalogs.map((c, i) => {
            const url = downloadLinks[c.name];
            const hasLink = url && url !== '#';
            return (
              <AnimatedSection key={c.name} delay={i * 0.05}>
                <div className="group flex items-center gap-5 p-5 rounded-2xl bg-bg-card border border-border hover:border-accent/20 transition-all card-hover">
                  <div className="w-12 h-12 rounded-2xl bg-accent-bg flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                    <FileText className="text-accent" size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-accent transition-colors">{c.name}</h3>
                    <p className="text-sm text-text-muted mt-0.5">{c.desc}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-sm text-text-muted">
                    <span className="px-2 py-1 rounded-lg bg-surface text-xs font-medium">{c.lang}</span>
                    <span>{c.size}</span>
                  </div>
                  <button
                    onClick={() => handleDownload(c.name)}
                    className={`p-3 rounded-xl transition-all ${
                      hasLink
                        ? 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
                        : 'bg-surface text-text-muted hover:bg-accent-bg hover:text-accent'
                    }`}
                    title={hasLink ? 'Скачать ПДФ' : 'Запросить по почте'}
                  >
                    <Download size={18} />
                  </button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-12">
          <div className="p-8 rounded-3xl bg-bg-warm border border-border text-center">
            <p className="text-text-secondary mb-4">Для получения дилерского прайс-листа свяжитесь с нами</p>
            <a href="mailto:info@makel.ru" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-semibold transition-all">
              <ExternalLink size={16} /> Запросить прайс
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
