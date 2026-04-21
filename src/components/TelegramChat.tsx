import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TelegramChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <motion.button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#229ED9] text-white flex items-center justify-center shadow-2xl shadow-[#229ED9]/30 hover:shadow-[#229ED9]/50 transition-shadow" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <AnimatePresence mode="wait">
          {isOpen ? <motion.div key="c" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}><X size={26}/></motion.div>
          : <motion.div key="o" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}}><svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></motion.div>}
        </AnimatePresence>
      </motion.button>
      {!isOpen && <div className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full"><span className="absolute inset-0 rounded-full bg-[#229ED9]/30 animate-ping"/></div>}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{opacity:0,y:20,scale:0.9}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:0.9}} transition={{type:'spring',damping:25,stiffness:300}} className="fixed bottom-24 right-6 z-50 w-[340px] rounded-3xl overflow-hidden shadow-2xl border border-border">
            <div className="bg-[#229ED9] text-white p-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Send size={18}/></div><div><p className="font-bold">{t('chat.title')}</p><p className="text-xs text-white/70">{t('chat.subtitle')}</p></div></div></div>
            <div className="bg-bg-card p-5">
              <div className="bg-surface rounded-2xl p-4 mb-4"><p className="text-sm text-text-secondary leading-relaxed">{t('chat.greeting')}</p></div>
              <a href="https://t.me/makel_russia" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#229ED9] hover:bg-[#1a8bc4] text-white rounded-2xl font-bold text-sm transition-colors"><Send size={16}/>{t('chat.btn')}</a>
              <p className="text-[10px] text-text-muted text-center mt-3">{t('chat.hint')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
