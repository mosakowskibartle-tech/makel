import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { company } from '../config/content';

export default function ContactsPage() {
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
    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    const text = `📩 Новая заявка\n\n👤 ${form.name}\n🏢 ${form.company}\n📞 ${form.phone}\n📧 ${form.email}\n📍 ${form.city}\n📋 ${form.type}\n\n💬 ${form.message}`;
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } catch { /* ok */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.company) { setError('Заполните обязательные поля'); return; }
    if (!form.consent) { setError('Необходимо согласие на обработку данных'); return; }
    setError(''); setSending(true);
    try { await sendToTelegram(); setSent(true); }
    catch { setError('Ошибка отправки. Напишите нам напрямую.'); }
    finally { setSending(false); }
  };

  if (sent) return (
    <div className="py-32 md:py-48"><div className="max-w-lg mx-auto px-4 text-center"><AnimatedSection>
      <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6"><CheckCircle className="text-teal" size={40}/></div>
      <h1 className="text-3xl font-bold mb-4">Заявка отправлена!</h1>
      <p className="text-text-secondary text-lg mb-8">Наш менеджер свяжется с вами в течение 24 часов.</p>
      <button onClick={() => { setSent(false); setForm({ name:'', company:'', phone:'', email:'', city:'', type:'Дистрибьютор', message:'', consent:false }); }}
        className="px-6 py-3 bg-surface border border-border rounded-xl font-medium hover:bg-border transition-all">Отправить ещё</button>
    </AnimatedSection></div></div>
  );

  return (
    <div className="py-24 md:py-32"><div className="max-w-7xl mx-auto px-4 sm:px-6">
      <SectionTitle badge="Контакты" title="Свяжитесь с нами" subtitle="Оставьте заявку и мы обсудим условия сотрудничества" serif />
      <div className="grid lg:grid-cols-3 gap-8">
        <AnimatedSection className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-border">
            <h3 className="text-xl font-bold mb-6">Заявка на сотрудничество</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Имя *</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors" placeholder="Ваше имя"/></div>
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Компания *</label>
                <input name="company" value={form.company} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors" placeholder="Название"/></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Телефон *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors" placeholder="+7 (___) ___-__-__"/></div>
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Электронная почта</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors"/></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Город</label>
                <input name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors"/></div>
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Тип сотрудничества</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors">
                  <option>Дистрибьютор</option><option>Розничный магазин</option><option>Строительная компания</option><option>Оптовый покупатель</option><option>Другое</option>
                </select></div>
            </div>
            <div className="mb-4"><label className="block text-sm font-medium text-text-secondary mb-2">Сообщение</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Расскажите о вашем бизнесе..."/></div>
            <div className="mb-6"><label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1 w-4 h-4 accent-accent"/>
              <span className="text-xs text-text-muted leading-relaxed">Я даю согласие на обработку персональных данных (<a href="/privacy" className="text-accent underline">Политика конфиденциальности</a>). 152-ФЗ.</span>
            </label></div>
            {error && <div className="mb-4 p-3 rounded-xl bg-accent-bg border border-accent/10 text-accent text-sm">{error}</div>}
            <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light disabled:opacity-50 text-white rounded-xl text-lg font-bold transition-all hover:shadow-lg hover:shadow-accent/20">
              {sending ? <><Loader2 size={20} className="animate-spin"/>Отправка...</> : <><Send size={18}/>Отправить заявку</>}
            </button>
          </form>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-border">
              <h3 className="font-bold mb-4">Контактная информация</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: 'Телефон', value: company.phone, href: `tel:${company.phone}` },
                  { icon: Mail, label: 'Почта', value: company.email, href: `mailto:${company.email}` },
                  { icon: MapPin, label: 'Адрес', value: company.address },
                  { icon: Clock, label: 'График', value: company.workHours },
                ].map(item => (
                  <div key={item.value} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-bg flex items-center justify-center"><item.icon size={18} className="text-accent"/></div>
                    <div><p className="text-xs text-text-muted">{item.label}</p>
                      {item.href ? <a href={item.href} className="text-sm font-medium hover:text-accent transition-colors">{item.value}</a> : <p className="text-sm font-medium">{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl bg-[#229ED9]/5 border border-[#229ED9]/15 hover:border-[#229ED9]/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#229ED9]/15 flex items-center justify-center"><Send size={22} className="text-[#229ED9]"/></div>
                <div><p className="font-bold group-hover:text-[#229ED9] transition-colors">Телеграм</p><p className="text-sm text-text-muted">Быстрый ответ в мессенджере</p></div>
              </div>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div></div>
  );
}
