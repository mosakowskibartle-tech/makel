import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, Send, ChevronRight, Sun, Moon, Globe } from 'lucide-react';
import { company } from '../config/content';
import { useTheme } from '../lib/theme';
import { useI18n, type Lang } from '../lib/i18n';
import TelegramChat from './TelegramChat';

const navKeys = [
  { path: '/', key: 'nav.home' },
  { path: '/about', key: 'nav.about' },
  { path: '/catalog', key: 'nav.catalog' },
  { path: '/downloads', key: 'nav.downloads' },
  { path: '/dealers', key: 'nav.partners' },
  { path: '/support', key: 'nav.support' },
  { path: '/contacts', key: 'nav.contacts' },
];

const langLabels: Record<Lang, string> = { ru: 'РУ', en: 'EN', tr: 'TR' };
const langOptions: Lang[] = ['ru', 'en', 'tr'];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const loc = useLocation();
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();

  useEffect(() => { setMenuOpen(false); setLangOpen(false); window.scrollTo(0, 0); }, [loc]);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-primary transition-colors duration-400">
      {/* Top bar */}
      <div className="hidden lg:block border-b border-border/50 bg-bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-6">
            <a href={`tel:${company.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Phone size={11}/>{company.phone}</a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Mail size={11}/>{company.email}</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-60">{t('top.official')}</span>
            <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors"><Send size={11}/>{lang === 'ru' ? 'Телеграм' : 'Telegram'}</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'liquid-glass-strong shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center font-bold text-white text-lg group-hover:scale-105 transition-transform shadow-lg shadow-accent/20">M</div>
              <div>
                <span className="text-xl font-extrabold tracking-wide">Makel</span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-text-muted font-medium">
                  {lang === 'tr' ? 'Elektrik' : lang === 'en' ? 'Electrical' : 'Электротехника'}
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navKeys.map(i => (
                <Link key={i.path} to={i.path} className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${loc.pathname === i.path ? 'text-accent bg-accent-bg' : 'text-text-secondary hover:text-text-primary hover:bg-surface/60'}`}>
                  {t(i.key)}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface/60 transition-all"
                >
                  <Globe size={14} />
                  {langLabels[lang]}
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full right-0 mt-1 liquid-glass-strong rounded-xl overflow-hidden min-w-[80px]"
                    >
                      {langOptions.map(l => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setLangOpen(false); }}
                          className={`block w-full px-4 py-2 text-sm text-left transition-colors ${lang === l ? 'text-accent bg-accent-bg' : 'text-text-secondary hover:text-text-primary hover:bg-surface/60'}`}
                        >
                          {langLabels[l]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggle}
                className="p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface/60 transition-all"
                title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                </motion.div>
              </button>

              <Link to="/contacts" className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-2xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5">
                {t('cta.partner')}
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button onClick={toggle} className="p-2 rounded-xl hover:bg-surface transition-colors">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-xl hover:bg-surface transition-colors">
                {menuOpen ? <X size={24}/> : <Menu size={24}/>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="fixed inset-0 top-16 z-40 bg-bg/98 backdrop-blur-2xl lg:hidden overflow-y-auto">
            <nav className="p-6 space-y-1.5">
              {navKeys.map((item, i) => (
                <motion.div key={item.path} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}>
                  <Link to={item.path} className={`flex items-center justify-between p-4 rounded-2xl text-lg font-medium ${loc.pathname===item.path?'bg-accent-bg text-accent':'text-text-secondary hover:bg-surface'}`}>
                    {t(item.key)}<ChevronRight size={18}/>
                  </Link>
                </motion.div>
              ))}
              {/* Language in mobile */}
              <div className="flex gap-2 pt-4">
                {langOptions.map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${lang === l ? 'bg-accent text-white' : 'bg-surface text-text-secondary'}`}>
                    {langLabels[l]}
                  </button>
                ))}
              </div>
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="pt-2">
                <Link to="/contacts" className="block w-full text-center px-6 py-4 bg-accent text-white rounded-2xl text-lg font-bold">{t('cta.partner')}</Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-bg-dark text-white border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center font-bold text-white text-lg">M</div>
                <div>
                  <span className="text-xl font-extrabold tracking-wide">Makel</span>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">{lang === 'tr' ? 'Elektrik' : lang === 'en' ? 'Electrical' : 'Электротехника'}</p>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{company.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">{lang === 'en' ? 'Products' : lang === 'tr' ? 'Ürünler' : 'Продукция'}</h4>
              <div className="space-y-3">
                {(lang === 'en' ? ['Switches & Sockets','Outdoor Series','Modular Systems','Extensions','Panels'] : lang === 'tr' ? ['Anahtarlar','Dış Mekan','Modüler','Uzatmalar','Paneller'] : ['Выключатели и розетки','Наружная серия','Модульные системы','Удлинители','Электрощиты']).map(i =>
                  <Link key={i} to="/catalog" className="block text-sm text-white/50 hover:text-accent transition-colors">{i}</Link>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">{lang === 'en' ? 'Company' : lang === 'tr' ? 'Şirket' : 'Компания'}</h4>
              <div className="space-y-3">
                {[{l:t('nav.about'),p:'/about'},{l:t('nav.partners'),p:'/dealers'},{l:t('nav.support'),p:'/support'},{l:t('nav.contacts'),p:'/contacts'},{l:t('footer.privacy'),p:'/privacy'}].map(i =>
                  <Link key={i.l} to={i.p} className="block text-sm text-white/50 hover:text-accent transition-colors">{i.l}</Link>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">{t('nav.contacts')}</h4>
              <div className="space-y-3 text-sm text-white/50">
                <p>{company.phone}</p><p>{company.email}</p><p>{company.address}</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>© {new Date().getFullYear()} {company.legalName}. ИНН {company.inn} ОГРН {company.ogrn}</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white/60">{t('footer.privacy')}</Link>
              <Link to="/terms" className="hover:text-white/60">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
      <TelegramChat />
    </div>
  );
}
