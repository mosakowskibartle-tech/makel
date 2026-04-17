import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, Send, ChevronRight, Moon, Sun, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../store/theme';
import TelegramChat from './TelegramChat';

const company = { phone: '+7 (495) 123-45-67', email: 'info@makel.ru', address: 'Москва, ул. Электрозаводская, 21', telegram: 'https://t.me/makel_russia', inn: '7701234567', ogrn: '1027700000000', legalName: 'ООО «Макел Рус»' };

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();

  useEffect(() => { document.body.className = theme; }, [theme]);
  useEffect(() => { setIsMenuOpen(false); setLangOpen(false); window.scrollTo(0, 0); }, [location]);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  const navItems = [
    { path: '/', label: t('nav.home') }, { path: '/about', label: t('nav.about') },
    { path: '/catalog', label: t('nav.catalog') }, { path: '/downloads', label: t('nav.downloads') },
    { path: '/dealers', label: t('nav.dealers') }, { path: '/support', label: t('nav.support') },
    { path: '/contacts', label: t('nav.contacts') },
  ];

  const langs = [{ code: 'ru', label: 'РУ' }, { code: 'en', label: 'EN' }, { code: 'tr', label: 'TR' }];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-bg-dark' : 'bg-bg'}`}>
      {/* Top bar */}
      <div className="hidden lg:block border-b border-border-light" style={{ background: theme === 'dark' ? '#111' : 'rgba(255,255,255,0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-6">
            <a href={`tel:${company.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Phone size={12}/>{company.phone}</a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Mail size={12}/>{company.email}</a>
          </div>
          <div className="flex items-center gap-4">
            <span>{t('footer.distributor')}</span>
            <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors"><Send size={12}/>{t('cta.tg')}</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'liquid-glass-strong shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center font-bold text-white text-lg group-hover:scale-105 transition-transform shadow-lg shadow-accent/20">M</div>
              <div><span className="text-xl font-extrabold tracking-wide">Makel</span></div>
            </Link>
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map(item => (
                <Link key={item.path} to={item.path} className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${location.pathname === item.path ? 'text-accent bg-accent-bg' : 'text-text-secondary hover:text-text-primary hover:bg-surface/80'}`}>{item.label}</Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-2">
              {/* Theme toggle */}
              <button onClick={toggle} className="p-2 rounded-xl hover:bg-surface transition-colors" title={theme === 'light' ? t('theme.dark') : t('theme.light')}>
                {theme === 'light' ? <Moon size={18} className="text-text-muted" /> : <Sun size={18} className="text-text-muted" />}
              </button>
              {/* Language */}
              <div className="relative">
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 p-2 rounded-xl hover:bg-surface transition-colors text-text-muted"><Globe size={18}/><span className="text-xs font-bold uppercase">{i18n.language}</span></button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white dark:bg-[#1A1A1F] border border-border rounded-xl shadow-lg overflow-hidden z-50">
                    {langs.map(l => (
                      <button key={l.code} onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }} className={`block w-full px-4 py-2 text-sm text-left hover:bg-surface transition-colors ${i18n.language === l.code ? 'text-accent font-bold' : 'text-text-secondary'}`}>{l.label}</button>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/contacts" className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-2xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5">{t('hero.cta')}</Link>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-xl hover:bg-surface transition-colors">{isMenuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="fixed inset-0 top-16 z-40 backdrop-blur-2xl lg:hidden overflow-y-auto" style={{ background: theme === 'dark' ? 'rgba(12,12,14,0.98)' : 'rgba(255,255,255,0.98)' }}>
            <nav className="p-6 space-y-1.5">
              {navItems.map((item, i) => (
                <motion.div key={item.path} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}>
                  <Link to={item.path} className={`flex items-center justify-between p-4 rounded-2xl text-lg font-medium transition-all ${location.pathname === item.path ? 'bg-accent-bg text-accent' : 'text-text-secondary hover:bg-surface'}`}>{item.label}<ChevronRight size={18}/></Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-2 pt-4">
                <button onClick={toggle} className="flex-1 py-3 rounded-xl bg-surface text-center text-sm font-medium">{theme === 'light' ? '🌙' : '☀️'}</button>
                {langs.map(l => <button key={l.code} onClick={() => i18n.changeLanguage(l.code)} className={`flex-1 py-3 rounded-xl text-center text-sm font-bold ${i18n.language === l.code ? 'bg-accent text-white' : 'bg-surface'}`}>{l.label}</button>)}
              </div>
              <Link to="/contacts" className="block w-full text-center px-6 py-4 bg-accent text-white rounded-2xl text-lg font-semibold mt-4">{t('hero.cta')}</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      {/* Footer */}
      <footer className={theme === 'dark' ? 'bg-[#080808] text-white' : 'bg-text-primary text-white'}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center font-bold text-white text-lg">M</div><span className="text-xl font-extrabold tracking-wide">Makel</span></div>
              <p className="text-white/60 text-sm leading-relaxed">{t('footer.distributor')}</p>
            </div>
            <div><h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">{t('footer.products')}</h4><div className="space-y-3">{['Выключатели','Розетки','Модульные системы','Удлинители','Электрощиты'].map(i => <Link key={i} to="/catalog" className="block text-sm text-white/60 hover:text-accent transition-colors">{i}</Link>)}</div></div>
            <div><h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">{t('footer.company')}</h4><div className="space-y-3">{[{l:t('nav.about'),p:'/about'},{l:t('nav.dealers'),p:'/dealers'},{l:t('nav.support'),p:'/support'},{l:t('nav.contacts'),p:'/contacts'},{l:t('footer.privacy'),p:'/privacy'}].map(i => <Link key={i.l} to={i.p} className="block text-sm text-white/60 hover:text-accent transition-colors">{i.l}</Link>)}</div></div>
            <div><h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">{t('footer.contacts')}</h4><div className="space-y-3 text-sm text-white/60"><p>{company.phone}</p><p>{company.email}</p><p>{company.address}</p></div></div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">© {new Date().getFullYear()} {company.legalName}. {t('footer.rights')}. ИНН {company.inn} ОГРН {company.ogrn}</p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <Link to="/privacy" className="hover:text-white/70 transition-colors">{t('footer.privacy')}</Link>
              <Link to="/terms" className="hover:text-white/70 transition-colors">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
      <TelegramChat />
    </div>
  );
}
