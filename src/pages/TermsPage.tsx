import AnimatedSection from '../components/AnimatedSection';
import { company } from '../config/content';
export default function TermsPage() {
  return (<div className="py-24 md:py-32"><div className="max-w-4xl mx-auto px-4 sm:px-6"><AnimatedSection>
    <h1 className="text-3xl md:text-4xl font-bold mb-8">Пользовательское соглашение</h1>
    <div className="text-text-secondary leading-relaxed space-y-6">
      <p className="text-sm text-text-muted">Дата обновления: 01.01.2025</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">1. Общие положения</h2>
      <p>Соглашение регулирует отношения между {company.legalName} и пользователем сайта.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">2. Предмет</h2>
      <p>Доступ к информации о продукции Makel, возможность отправки заявок и скачивания каталогов.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">3. Права и обязанности</h2>
      <p>Пользователь обязуется не использовать сайт в целях, противоречащих законодательству РФ. Все материалы — интеллектуальная собственность.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">4. Ответственность</h2>
      <p>Информация носит справочный характер и не является публичной офертой. Споры решаются по законодательству РФ.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">5. Контакты</h2>
      <p>{company.legalName}, {company.address}, {company.email}, {company.phone}</p>
    </div>
  </AnimatedSection></div></div>);
}
