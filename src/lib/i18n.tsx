import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'ru' | 'en' | 'tr';

const translations: Record<Lang, Record<string, string>> = {
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О компании',
    'nav.catalog': 'Каталог',
    'nav.downloads': 'Каталоги',
    'nav.partners': 'Партнёры',
    'nav.support': 'Поддержка',
    'nav.contacts': 'Контакты',
    'cta.partner': 'Стать партнёром',
    'cta.catalog': 'Каталог продукции',
    'cta.submit': 'Отправить заявку',
    'cta.telegram': 'Написать в Телеграм',
    'hero.badge': '№ 1 дистрибьютор Makel в России',
    'hero.title1': 'Makel.',
    'hero.title2': 'Мощнее.',
    'hero.title3': 'Надёжнее. Выгоднее.',
    'hero.desc': 'Прямые поставки с завода. Более 1\u00a0300 позиций на складе. Лучшие условия для дистрибьюторов в России.',
    'top.official': 'Официальный дистрибьютор в России',
    'footer.rights': 'Все права защищены',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Пользовательское соглашение',
    'form.name': 'Имя',
    'form.company': 'Компания',
    'form.phone': 'Телефон',
    'form.email': 'Электронная почта',
    'form.city': 'Город',
    'form.type': 'Тип сотрудничества',
    'form.message': 'Сообщение',
    'form.consent': 'Я даю согласие на обработку персональных данных',
    'form.sent': 'Заявка отправлена!',
    'form.sentDesc': 'Наш менеджер свяжется с вами в течение 24 часов.',
    'form.another': 'Отправить ещё',
    'form.sending': 'Отправка...',
    'form.required': 'Заполните обязательные поля',
    'form.consentRequired': 'Необходимо согласие на обработку персональных данных',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.catalog': 'Catalog',
    'nav.downloads': 'Downloads',
    'nav.partners': 'Partners',
    'nav.support': 'Support',
    'nav.contacts': 'Contacts',
    'cta.partner': 'Become a Partner',
    'cta.catalog': 'Product Catalog',
    'cta.submit': 'Submit Request',
    'cta.telegram': 'Message on Telegram',
    'hero.badge': '#1 Makel distributor in Russia',
    'hero.title1': 'Makel.',
    'hero.title2': 'Powerful.',
    'hero.title3': 'Reliable. Profitable.',
    'hero.desc': 'Direct factory supply. Over 1,300 products in stock. Best conditions for distributors in Russia.',
    'top.official': 'Official distributor in Russia',
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'form.name': 'Name',
    'form.company': 'Company',
    'form.phone': 'Phone',
    'form.email': 'Email',
    'form.city': 'City',
    'form.type': 'Partnership Type',
    'form.message': 'Message',
    'form.consent': 'I agree to the processing of personal data',
    'form.sent': 'Request Sent!',
    'form.sentDesc': 'Our manager will contact you within 24 hours.',
    'form.another': 'Send Another',
    'form.sending': 'Sending...',
    'form.required': 'Please fill in required fields',
    'form.consentRequired': 'Consent to data processing is required',
  },
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakk\u0131m\u0131zda',
    'nav.catalog': 'Katalog',
    'nav.downloads': '\u0130ndirmeler',
    'nav.partners': 'Ortaklar',
    'nav.support': 'Destek',
    'nav.contacts': '\u0130leti\u015fim',
    'cta.partner': 'Ortak Olun',
    'cta.catalog': '\u00dcr\u00fcn Katalo\u011fu',
    'cta.submit': 'Ba\u015fvuru G\u00f6nder',
    'cta.telegram': 'Telegram\'dan Yaz\u0131n',
    'hero.badge': 'Rusya\'n\u0131n 1 numaral\u0131 Makel distrib\u00fct\u00f6r\u00fc',
    'hero.title1': 'Makel.',
    'hero.title2': 'G\u00fc\u00e7l\u00fc.',
    'hero.title3': 'G\u00fcvenilir. Karl\u0131.',
    'hero.desc': 'Fabrikadan do\u011frudan tedarik. Stokta 1.300\'den fazla \u00fcr\u00fcn. Rusya\'daki distrib\u00fct\u00f6rler i\u00e7in en iyi ko\u015fullar.',
    'top.official': 'Rusya\'daki resmi distrib\u00fct\u00f6r',
    'footer.rights': 'T\u00fcm haklar\u0131 sakl\u0131d\u0131r',
    'footer.privacy': 'Gizlilik Politikas\u0131',
    'footer.terms': 'Kullan\u0131m Ko\u015fullar\u0131',
    'form.name': 'Ad',
    'form.company': '\u015eirket',
    'form.phone': 'Telefon',
    'form.email': 'E-posta',
    'form.city': '\u015eehir',
    'form.type': 'Ortakl\u0131k T\u00fcr\u00fc',
    'form.message': 'Mesaj',
    'form.consent': 'Ki\u015fisel verilerin i\u015flenmesine onay veriyorum',
    'form.sent': 'Ba\u015fvuru G\u00f6nderildi!',
    'form.sentDesc': 'Y\u00f6neticimiz 24 saat i\u00e7inde sizinle ileti\u015fime ge\u00e7ecektir.',
    'form.another': 'Ba\u015fka G\u00f6nder',
    'form.sending': 'G\u00f6nderiliyor...',
    'form.required': 'Gerekli alanlar\u0131 doldurun',
    'form.consentRequired': 'Veri i\u015fleme onay\u0131 gereklidir',
  },
};

interface I18nCtx { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; }
const Ctx = createContext<I18nCtx>({ lang: 'ru', setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('makel-lang') as Lang | null;
      if (saved && translations[saved]) return saved;
    }
    return 'ru';
  });

  const changeLang = (l: Lang) => { setLang(l); localStorage.setItem('makel-lang', l); };
  const t = (key: string) => translations[lang]?.[key] || translations.ru[key] || key;

  return <Ctx.Provider value={{ lang, setLang: changeLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
