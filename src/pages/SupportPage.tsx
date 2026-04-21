import { Book, Wrench, Shield, HelpCircle, ChevronDown, ChevronUp, FileText, Phone } from 'lucide-react';
import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { company } from '../config/content';
const faqs = [
  { q:'Какой минимальный объём заказа?', a:'Минимальный заказ обсуждается индивидуально. Для новых партнёров — стартовые пакеты.' },
  { q:'Какие сроки поставки?', a:'С завода 14–21 день. Складские позиции — 1–3 дня.' },
  { q:'Есть ли гарантия?', a:'Вся продукция имеет гарантию производителя.' },
  { q:'Как стать дилером?', a:'Оставьте заявку на странице контактов или напишите в Телеграм.' },
  { q:'Какие сертификаты?', a:'VDE, ТСЕ, ИСО 9001, CE, ГОСТ-Р, ЕАС. Доступны для скачивания.' },
  { q:'Можно ли заказать образцы?', a:'Да, свяжитесь с нами для оформления запроса.' },
];
function FAQ({ q, a }: { q:string; a:string }) {
  const [open, setOpen] = useState(false);
  return <div className="border border-border rounded-2xl overflow-hidden bg-bg-card"><button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-colors"><span className="font-semibold pr-4">{q}</span>{open?<ChevronUp size={20} className="text-accent shrink-0"/>:<ChevronDown size={20} className="text-text-muted shrink-0"/>}</button>{open&&<div className="px-6 pb-6 text-text-secondary">{a}</div>}</div>;
}
export default function SupportPage() {
  return (<div className="py-24 md:py-32"><div className="max-w-5xl mx-auto px-4 sm:px-6">
    <SectionTitle badge="Поддержка" title="Поможем разобраться" serif/>
    <div className="grid sm:grid-cols-2 gap-4 mb-16">{[{i:Book,t:'Руководство по монтажу',d:'Инструкции по установке'},{i:Wrench,t:'Технические характеристики',d:'Спецификации продукции'},{i:Shield,t:'Гарантийная политика',d:'Условия гарантии и возврата'},{i:FileText,t:'Сертификаты',d:'Все декларации'}].map((g,i)=>(
      <AnimatedSection key={g.t} delay={i*0.1}><div className="group p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/20 transition-all cursor-pointer card-hover"><g.i className="text-accent mb-4" size={28}/><h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">{g.t}</h3><p className="text-sm text-text-muted">{g.d}</p></div></AnimatedSection>
    ))}</div>
    <SectionTitle badge="Частые вопросы" title="Ответы"/>
    <div className="space-y-3">{faqs.map((f,i)=><AnimatedSection key={i} delay={i*0.04}><FAQ q={f.q} a={f.a}/></AnimatedSection>)}</div>
    <AnimatedSection className="mt-16"><div className="p-8 rounded-3xl bg-bg-card border border-border text-center"><HelpCircle className="mx-auto text-accent mb-4" size={40}/><h3 className="text-xl font-bold mb-2">Не нашли ответ?</h3><p className="text-text-secondary mb-6">Свяжитесь с нами</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center"><a href={`tel:${company.phone}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-semibold transition-all"><Phone size={16}/>Позвонить</a><a href={company.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border rounded-xl font-semibold transition-all hover:bg-border">Телеграм</a></div>
    </div></AnimatedSection>
  </div></div>);
}
