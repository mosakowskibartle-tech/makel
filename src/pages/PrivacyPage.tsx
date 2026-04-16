import AnimatedSection from '../components/AnimatedSection';
import { company } from '../config/content';
export default function PrivacyPage() {
  return (<div className="py-24 md:py-32"><div className="max-w-4xl mx-auto px-4 sm:px-6"><AnimatedSection>
    <h1 className="text-3xl md:text-4xl font-bold mb-8">Политика конфиденциальности</h1>
    <div className="text-text-secondary leading-relaxed space-y-6">
      <p className="text-sm text-text-muted">Дата обновления: 01.01.2025</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">1. Общие положения</h2>
      <p>Настоящая Политика действует в отношении всей информации, которую {company.legalName} может получить о Пользователе.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">2. Персональные данные</h2>
      <p>Обработка в соответствии с Федеральным законом №152-ФЗ «О персональных данных». Собираем: имя, телефон, почту, компанию, город.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">3. Цели обработки</h2>
      <p>Обработка заявок, обратная связь, информирование о продукции.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">4. Защита данных</h2>
      <p>Принимаем необходимые организационные и технические меры защиты.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">5. Права субъекта</h2>
      <p>Доступ, исправление, удаление, отзыв согласия — {company.email}.</p>
      <h2 className="text-xl font-bold text-text-primary mt-8">6. Оператор</h2>
      <p>{company.legalName}, ИНН {company.inn}, ОГРН {company.ogrn}, {company.address}, {company.email}, {company.phone}</p>
    </div>
  </AnimatedSection></div></div>);
}
