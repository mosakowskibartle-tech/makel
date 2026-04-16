import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight } from 'lucide-react';
import { company } from '../config/content';

export default function EmailWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Mail size={26} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full">
          <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
        </div>
      )}

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] rounded-3xl overflow-hidden shadow-2xl border border-border"
          >
            <div className="bg-accent text-white p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-bold">Makel Россия</p>
                  <p className="text-xs text-white/70">Ответим в течение 2 часов</p>
                </div>
              </div>
            </div>
            <div className="bg-bg-card p-5">
              <div className="bg-surface rounded-2xl p-4 mb-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  👋 Здравствуйте! Мы — официальный дистрибьютор Makel в России. Готовы ответить на любые вопросы о продукции, ценах и условиях сотрудничества.
                </p>
                <p className="text-[10px] text-text-muted mt-2">Makel Россия • сейчас</p>
              </div>

              <a href={`mailto:${company.email}?subject=${encodeURIComponent('Запрос с сайта Makel')}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-accent hover:bg-accent-light text-white rounded-2xl font-bold text-sm transition-colors mb-2">
                <Mail size={16} /> Написать на почту
              </a>

              <a href={`tel:${company.phone}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-surface hover:bg-border text-text-primary rounded-2xl font-semibold text-sm transition-colors">
                Позвонить {company.phone}
              </a>

              <a href="/contacts" className="flex items-center justify-center gap-1 w-full py-2 text-accent text-xs font-semibold mt-2 hover:underline">
                Оставить заявку <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
