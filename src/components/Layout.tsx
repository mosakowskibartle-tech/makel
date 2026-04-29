import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, Send, ChevronRight } from 'lucide-react';
import { company } from '../config/content';
import TelegramChat from './TelegramChat';

const navItems = [
  { path: '/', label: 'Главная' },
  { path: '/about', label: 'О компании' },
  { path: '/catalog', label: 'Каталог' },
  { path: '/downloads', label: 'Каталоги' },
  { path: '/dealers', label: 'Партнёры' },
  { path: '/support', label: 'Поддержка' },
  { path: '/contacts', label: 'Контакты' },
];

function Logo({ size = 40 }: { size?: number }) {
  if (company.logoUrl) {
    return <img src={company.logoUrl} alt="Makel" className="rounded-2xl object-contain" style={{ width: size, height: size }} />;
  }
  return (
    <div className="rounded-2xl bg-accent flex items-center justify-center font-bold text-white shadow-lg shadow-accent/20"
      style={{ width: size, height: size, fontSize: size * 0.45 }}>M</div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsMenuOpen(false); window.scrollTo(0, 0); }, [location]);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <div className="min-h-screen bg-bg">
      {/* Верхняя полоса */}
      <div className="hidden lg:block bg-white/80 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-6">
            <a href={`tel:${company.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Phone size={12} />{company.phone}</a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Mail size={12} />{company.email}</a>
          </div>
          <div className="flex items-center gap-4">
            <span>Официальный дистрибьютор в России</span>
            <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors"><Send size={12} />Телеграм</a>
          </div>
        </div>
      </div>

      {/* Шапка */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'liquid-glass-strong shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="group-hover:scale-105 transition-transform"><Logo /></div>
              <div><span className="text-xl font-extrabold tracking-wide text-text-primary">Makel</span>
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Электротехника</span>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map(item => (
                <Link key={item.path} to={item.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${location.pathname === item.path ? 'text-accent bg-accent-bg' : 'text-text-secondary hover:text-text-primary hover:bg-surface/80'}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/contacts" className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-2xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5">
                Стать партнёром
              </Link>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-xl hover:bg-surface transition-colors">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-white/98 backdrop-blur-2xl lg:hidden overflow-y-auto">
            <nav className="p-6 space-y-1.5">
              {navItems.map((item, i) => (
                <motion.div key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link to={item.path}
                    className={`flex items-center justify-between p-4 rounded-2xl text-lg font-medium transition-all ${location.pathname === item.path ? 'bg-accent-bg text-accent' : 'text-text-secondary hover:bg-surface'}`}>
                    {item.label}<ChevronRight size={18} />
                  </Link>
                </motion.div>
              ))}
              <Link to="/contacts" className="block w-full text-center px-6 py-4 bg-accent text-white rounded-2xl text-lg font-semibold mt-2">Стать партнёром</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

            {/* Подвал — теперь темный и трендовый */}
      <footer className="bg-[var(--c-footer-bg)] border-t border-[var(--c-footer-border)]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Лого и описание */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Logo />
                <span className="text-xl font-extrabold tracking-wide text-[var(--c-footer-text)]">Makel</span>
              </div>
              <p className="text-[var(--c-footer-muted)] text-sm leading-relaxed">{company.description}</p>
            </div>

            {/* Продукция */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-footer-muted)] mb-5">Продукция</h4>
              <div className="space-y-3">
                {['Выключатели и розетки', 'Наружная серия', 'Модульные системы', 'Удлинители', 'Электрощиты'].map(item => (
                  <Link key={item} to="/catalog" className="block text-sm text-[var(--c-footer-text)] hover:text-accent transition-colors">{item}</Link>
                ))}
              </div>
            </div>

            {/* Компания */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-footer-muted)] mb-5">Компания</h4>
              <div className="space-y-3">
                {[{ l: 'О нас', p: '/about' }, { l: 'Партнёры', p: '/dealers' }, { l: 'Поддержка', p: '/support' }, { l: 'Контакты', p: '/contacts' }, { l: 'Политика конфиденциальности', p: '/privacy' }].map(item => (
                  <Link key={item.l} to={item.p} className="block text-sm text-[var(--c-footer-text)] hover:text-accent transition-colors">{item.l}</Link>
                ))}
              </div>
            </div>

            {/* Контакты */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--c-footer-muted)] mb-5">Контакты</h4>
              <div className="space-y-3 text-sm text-[var(--c-footer-text)]">
                <p>{company.phone}</p>
                <p>{company.email}</p>
                <p>{company.address}</p>
              </div>
            </div>
          </div>

          {/* Нижняя полоска с копирайтом */}
          <div className="mt-12 pt-8 border-t border-[var(--c-footer-border)]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="text-xs text-[var(--c-footer-muted)] space-y-1">
                <p>© {new Date().getFullYear()} {company.legalName}. Все права защищены.</p>
                <p>ИНН {company.inn} / КПП {company.kpp} / ОГРН {company.ogrn} от {company.ogrnDate}</p>
                <p>Юр. адрес: {company.legalAddress}. Генеральный директор: {company.ceo}</p>
                <p>ОКВЭД: {company.okved}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-[var(--c-footer-muted)]">
                <Link to="/privacy" className="hover:text-accent transition-colors">Политика конфиденциальности</Link>
                <Link to="/terms" className="hover:text-accent transition-colors">Пользовательское соглашение</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <TelegramChat />
    </div>
  );
}
