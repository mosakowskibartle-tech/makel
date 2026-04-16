import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { company } from '../config/content';
import { useI18n } from '../lib/i18n';

/**
 * ═══════════════════════════════════════════
 * НАСТРОЙКА EMAIL JS
 * ═══════════════════════════════════════════
 * 1. Зарегистрируйтесь на https://www.emailjs.com/
 * 2. Создайте сервис (Gmail, Outlook и т.д.)
 * 3. Создайте шаблон письма с переменными:
 *    {{from_name}}, {{company}}, {{phone}}, {{email}}, {{city}}, {{type}}, {{message}}
 * 4. Замените значения ниже на ваши:
 */
const EMAILJS_SERVICE_ID = 'service_makel';   // Замените на ваш Service ID
const EMAILJS_TEMPLATE_ID = 'template_makel'; // Замените на ваш Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';  // Замените на ваш Public Key

export default function ContactsPage() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState({ name:'', company:'', phone:'', email:'', city:'', type:'Дистрибьютор', message:'', consent:false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const sendToTelegram = async () => {
    // Замените на реальный токен и chat_id
    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    const text = `📩 Новая заявка с сайта Makel\n\n👤 ${form.name}\n🏢 ${form.company}\n📞 ${form.phone}\n📧 ${form.email}\n📍 ${form.city}\n📋 ${form.type}\n\n💬 ${form.message}`;
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } catch { /* необязательно */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.company) { setError(t('form.required')); return; }
    if (!form.consent) { setError(t('form.consentRequired')); return; }
    setError('');
    setSending(true);

    try {
      // EmailJS — отправка без открытия почтового клиента
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        city: form.city,
        type: form.type,
        message: form.message,
      }, EMAILJS_PUBLIC_KEY);

      // Параллельно в Телеграм
      await sendToTelegram();
      setSent(true);
    } catch {
      // Если EmailJS не настроен — fallback на Telegram
      try {
        await sendToTelegram();
        setSent(true);
      } catch {
        setError('Ошибка отправки. Напишите нам напрямую.');
      }
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="py-32 md:py-48">
        <div className="max-w-lg mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-teal" size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">{t('form.sent')}</h1>
            <p className="text-text-secondary text-lg mb-8">{t('form.sentDesc')}</p>
            <button
              onClick={() => { setSent(false); setForm({ name:'', company:'', phone:'', email:'', city:'', type:'Дистрибьютор', message:'', consent:false }); }}
              className="px-6 py-3 bg-surface border border-border rounded-xl font-medium hover:bg-border transition-all"
            >{t('form.another')}</button>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle badge={t('nav.contacts')} title={t('nav.contacts')} />
        <div className="grid lg:grid-cols-3 gap-8">
          <AnimatedSection className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-bg-card border border-border">
              <h3 className="text-xl font-bold mb-6">{t('cta.partner')}</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.name')} *</label>
                  <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.company')} *</label>
                  <input name="company" value={form.company} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.phone')} *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.email')}</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.city')}</label>
                  <input name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.type')}</label>
                  <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors">
                    <option>Дистрибьютор</option><option>Розничный магазин</option><option>Строительная компания</option><option>Оптовый покупатель</option><option>Другое</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.message')}</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none" />
              </div>
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1 w-4 h-4 accent-accent" />
                  <span className="text-xs text-text-muted leading-relaxed">
                    {t('form.consent')} (<a href="/privacy" className="text-accent underline">{t('footer.privacy')}</a>)
                  </span>
                </label>
              </div>
              {error && <div className="mb-4 p-3 rounded-xl bg-accent-bg border border-accent/10 text-accent text-sm">{error}</div>}
              <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light disabled:opacity-50 text-white rounded-xl text-lg font-bold transition-all hover:shadow-lg hover:shadow-accent/20">
                {sending ? <><Loader2 size={20} className="animate-spin" />{t('form.sending')}</> : <><Send size={18}/>{t('cta.submit')}</>}
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-bg-card border border-border">
                <h3 className="font-bold mb-4">{t('nav.contacts')}</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: t('form.phone'), value: company.phone, href: `tel:${company.phone}` },
                    { icon: Mail, label: t('form.email'), value: company.email, href: `mailto:${company.email}` },
                    { icon: MapPin, label: t('form.city'), value: company.address },
                    { icon: Clock, label: '', value: company.workHours },
                  ].map(item => (
                    <div key={item.value} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-bg flex items-center justify-center"><item.icon size={18} className="text-accent"/></div>
                      <div>
                        {item.label && <p className="text-xs text-text-muted">{item.label}</p>}
                        {item.href ? <a href={item.href} className="text-sm font-medium hover:text-accent transition-colors">{item.value}</a> : <p className="text-sm font-medium">{item.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl bg-[#229ED9]/5 border border-[#229ED9]/15 hover:border-[#229ED9]/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#229ED9]/15 flex items-center justify-center"><Send size={22} className="text-[#229ED9]"/></div>
                  <div><p className="font-bold group-hover:text-[#229ED9] transition-colors">{lang === 'en' ? 'Telegram' : lang === 'tr' ? 'Telegram' : 'Телеграм'}</p><p className="text-sm text-text-muted">{lang === 'en' ? 'Quick response' : lang === 'tr' ? 'Hızlı yanıt' : 'Быстрый ответ'}</p></div>
                </div>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
