import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      nav: { home: 'Главная', about: 'О компании', catalog: 'Каталог', downloads: 'Каталоги', dealers: 'Партнёры', support: 'Поддержка', contacts: 'Контакты' },
      hero: { badge: '№1 дистрибьютор Makel в России', h1_1: 'Makel.', h1_2: 'Мощнее.', h1_3: 'Надёжнее. Выгоднее.', desc: 'Прямые поставки с завода. Более 1 300 позиций на складе. Лучшие условия для дистрибьюторов в России.', cta: 'Стать партнёром', catalog: 'Каталог продукции' },
      stats: { years: 'Лет на рынке', production: 'м² производство', countries: 'Стран экспорта', items: 'Наименований', since: 'С 1977 года', factory: 'Современный завод', worldwide: 'По всему миру', inCatalog: 'В каталоге' },
      advantages: { title: 'Конкуренты отдыхают', subtitle: 'Мы не просто поставляем электротехнику — мы строим ваш прибыльный бизнес', guarantee: 'Гарантия подлинности', guaranteeDesc: 'Каждое изделие — оригинал с завода. Полная сертификация по стандартам РФ.', direct: 'Прямые поставки', directDesc: 'Без посредников. Напрямую с завода в Турции — минимальные цены для вас.', margin: 'Высокая маржа', marginDesc: 'До 40% маржинальности для дистрибьюторов. Ваш бизнес растёт с нами.', stock: 'Всё в наличии', stockDesc: 'Более 1300 позиций на складе. Отгрузка за 1-3 дня по всей России.' },
      sticky: { t1: 'Безупречный', s1: 'дизайн в каждой детали', t2: '47 лет', s2: 'безупречной репутации', t3: 'Makel', s3: 'лидер, которому доверяют' },
      partners: { badge: 'Более 45 партнёров', title: 'Нам доверяют лидеры рынка' },
      cta: { ready: 'Готовы к росту?', title1: 'Станьте частью', title2: 'команды лидеров', desc: 'Оставьте заявку прямо сейчас. Наш менеджер свяжется с вами в течение 2 часов.', btn: 'Оставить заявку', tg: 'Телеграм' },
      footer: { products: 'Продукция', company: 'Компания', contacts: 'Контакты', privacy: 'Политика конфиденциальности', terms: 'Пользовательское соглашение', rights: 'Все права защищены', distributor: 'Официальный дистрибьютор Makel в РФ' },
      about: { badge: 'О компании', title: 'Более 47 лет на рынке электротехники', desc: 'Makel — турецкая компания, основанная в 1977 году, специализирующаяся на производстве электроустановочных изделий.', compare: 'Makel vs Конкуренты', awards: 'Награды и достижения' },
      compare: { param: 'Параметр', makel: 'Makel', others: 'Конкуренты', rows: ['Прямые поставки с завода','Собственная лаборатория VDE','1300+ наименований','Экспорт в 40+ стран','47 лет на рынке','Сертификаты ГОСТ-Р, ЕАС','Маржа до 40%','Отгрузка 1-3 дня','Бесплатные образцы','Персональный менеджер'] },
      map: { title: 'География партнёров', partner: 'партнёр', partners2: 'партнёра', partners5: 'партнёров' },
      calc: { title: 'Калькулятор выгоды', volume: 'Объём закупки в месяц', yourMargin: 'Ваша маржа с Makel', competitorMargin: 'Средняя маржа у конкурентов', profitMonth: 'Ваша прибыль / мес', profitYear: 'Прибыль за год', advantage: 'Преимущество / мес', savings: 'Экономия за год', higher: 'выше', vs: 'vs конкуренты', extra: 'дополнительно' },
      chat: { title: 'Makel Россия', subtitle: 'Обычно отвечаем за 5 минут', greeting: '👋 Здравствуйте! Мы — официальный дистрибьютор Makel в России. Готовы ответить на любые вопросы.', btn: 'Написать в Телеграм', hint: 'Откроется приложение Телеграм' },
      theme: { light: 'Светлая', dark: 'Тёмная' },
    },
  },
  en: {
    translation: {
      nav: { home: 'Home', about: 'About', catalog: 'Catalog', downloads: 'Downloads', dealers: 'Partners', support: 'Support', contacts: 'Contacts' },
      hero: { badge: '#1 Makel distributor in Russia', h1_1: 'Makel.', h1_2: 'Powerful.', h1_3: 'Reliable. Profitable.', desc: 'Direct deliveries from the factory. Over 1,300 items in stock. Best conditions for distributors in Russia.', cta: 'Become a partner', catalog: 'Product catalog' },
      stats: { years: 'Years on market', production: 'm² production', countries: 'Export countries', items: 'Product items', since: 'Since 1977', factory: 'Modern factory', worldwide: 'Worldwide', inCatalog: 'In catalog' },
      advantages: { title: 'Competitors can\'t compete', subtitle: 'We don\'t just supply electrical equipment — we build your profitable business', guarantee: 'Authenticity guarantee', guaranteeDesc: 'Every product is original from the factory. Full RF certification.', direct: 'Direct supply', directDesc: 'No middlemen. Directly from the factory in Turkey — minimum prices.', margin: 'High margin', marginDesc: 'Up to 40% margin for distributors. Your business grows with us.', stock: 'Everything in stock', stockDesc: 'Over 1300 items in stock. Shipping within 1-3 days across Russia.' },
      sticky: { t1: 'Impeccable', s1: 'design in every detail', t2: '47 years', s2: 'of impeccable reputation', t3: 'Makel', s3: 'the leader you can trust' },
      partners: { badge: 'Over 45 partners', title: 'Trusted by market leaders' },
      cta: { ready: 'Ready to grow?', title1: 'Become part of', title2: 'the winning team', desc: 'Submit your application now. Our manager will contact you within 2 hours.', btn: 'Submit application', tg: 'Telegram' },
      footer: { products: 'Products', company: 'Company', contacts: 'Contacts', privacy: 'Privacy policy', terms: 'Terms of service', rights: 'All rights reserved', distributor: 'Official Makel distributor in Russia' },
      about: { badge: 'About us', title: 'Over 47 years in the electrical market', desc: 'Makel is a Turkish company founded in 1977, specializing in electrical installation products.', compare: 'Makel vs Competitors', awards: 'Awards & Achievements' },
      compare: { param: 'Parameter', makel: 'Makel', others: 'Competitors', rows: ['Direct factory supply','Own VDE laboratory','1300+ product items','Export to 40+ countries','47 years on market','GOST-R, EAC certificates','Margin up to 40%','Shipping 1-3 days','Free samples','Personal manager'] },
      map: { title: 'Partner geography', partner: 'partner', partners2: 'partners', partners5: 'partners' },
      calc: { title: 'Profit calculator', volume: 'Monthly purchase volume', yourMargin: 'Your margin with Makel', competitorMargin: 'Average competitor margin', profitMonth: 'Your profit / month', profitYear: 'Annual profit', advantage: 'Advantage / month', savings: 'Annual savings', higher: 'higher', vs: 'vs competitors', extra: 'additional' },
      chat: { title: 'Makel Russia', subtitle: 'Usually replies within 5 min', greeting: '👋 Hello! We are the official Makel distributor in Russia. Ready to answer any questions.', btn: 'Write in Telegram', hint: 'Opens Telegram app' },
      theme: { light: 'Light', dark: 'Dark' },
    },
  },
  tr: {
    translation: {
      nav: { home: 'Ana Sayfa', about: 'Hakkımızda', catalog: 'Katalog', downloads: 'İndirmeler', dealers: 'Ortaklar', support: 'Destek', contacts: 'İletişim' },
      hero: { badge: 'Rusya\'da #1 Makel distribütörü', h1_1: 'Makel.', h1_2: 'Güçlü.', h1_3: 'Güvenilir. Kârlı.', desc: 'Fabrikadan doğrudan teslimat. Stokta 1.300\'den fazla ürün. Rusya\'daki distribütörler için en iyi koşullar.', cta: 'Ortak olun', catalog: 'Ürün kataloğu' },
      stats: { years: 'Yıllık tecrübe', production: 'm² üretim', countries: 'İhracat ülkesi', items: 'Ürün çeşidi', since: '1977\'den beri', factory: 'Modern fabrika', worldwide: 'Dünya genelinde', inCatalog: 'Katalogda' },
      advantages: { title: 'Rakipler geride kalıyor', subtitle: 'Sadece elektrik ekipmanı tedarik etmiyoruz — kârlı işinizi kuruyoruz', guarantee: 'Orijinallik garantisi', guaranteeDesc: 'Her ürün fabrikadan orijinal. Tam RF sertifikası.', direct: 'Doğrudan tedarik', directDesc: 'Aracısız. Türkiye\'deki fabrikadan doğrudan — minimum fiyatlar.', margin: 'Yüksek marj', marginDesc: 'Distribütörler için %40\'a kadar marj. İşiniz bizimle büyüyor.', stock: 'Her şey stokta', stockDesc: 'Stokta 1300\'den fazla ürün. Rusya genelinde 1-3 gün içinde teslimat.' },
      sticky: { t1: 'Kusursuz', s1: 'her detayda tasarım', t2: '47 yıl', s2: 'kusursuz itibar', t3: 'Makel', s3: 'güvenilen lider' },
      partners: { badge: '45+ ortak', title: 'Pazar liderlerinin güveni' },
      cta: { ready: 'Büyümeye hazır mısınız?', title1: 'Kazanan takımın', title2: 'parçası olun', desc: 'Başvurunuzu şimdi gönderin. Yöneticimiz 2 saat içinde sizinle iletişime geçecek.', btn: 'Başvuru gönder', tg: 'Telegram' },
      footer: { products: 'Ürünler', company: 'Şirket', contacts: 'İletişim', privacy: 'Gizlilik politikası', terms: 'Kullanım şartları', rights: 'Tüm hakları saklıdır', distributor: 'Rusya\'da resmi Makel distribütörü' },
      about: { badge: 'Hakkımızda', title: 'Elektrik pazarında 47+ yıl', desc: 'Makel, 1977 yılında kurulan ve elektrik tesisat ürünleri üretiminde uzmanlaşmış bir Türk şirketidir.', compare: 'Makel vs Rakipler', awards: 'Ödüller ve Başarılar' },
      compare: { param: 'Parametre', makel: 'Makel', others: 'Rakipler', rows: ['Fabrikadan doğrudan tedarik','Kendi VDE laboratuvarı','1300+ ürün çeşidi','40+ ülkeye ihracat','47 yıllık tecrübe','GOST-R, EAC sertifikaları','%40\'a kadar marj','1-3 gün teslimat','Ücretsiz numuneler','Kişisel yönetici'] },
      map: { title: 'Ortak coğrafyası', partner: 'ortak', partners2: 'ortak', partners5: 'ortak' },
      calc: { title: 'Kâr hesaplayıcı', volume: 'Aylık alım hacmi', yourMargin: 'Makel ile marjınız', competitorMargin: 'Ortalama rakip marjı', profitMonth: 'Aylık kârınız', profitYear: 'Yıllık kâr', advantage: 'Aylık avantaj', savings: 'Yıllık tasarruf', higher: 'daha yüksek', vs: 'vs rakipler', extra: 'ek' },
      chat: { title: 'Makel Rusya', subtitle: 'Genellikle 5 dk içinde yanıt', greeting: '👋 Merhaba! Rusya\'da resmi Makel distribütörüyüz. Sorularınızı yanıtlamaya hazırız.', btn: 'Telegram\'da yaz', hint: 'Telegram uygulaması açılır' },
      theme: { light: 'Açık', dark: 'Koyu' },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

export default i18n;
