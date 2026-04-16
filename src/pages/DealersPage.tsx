import { Search, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import RussiaMap from '../components/RussiaMap';
import { partnerNames } from '../config/partners';

export default function DealersPage() {
  const [search, setSearch] = useState('');
  const filtered = partnerNames.filter(p => p.toLowerCase().includes(search.toLowerCase()));
  return (<div>
    <section className="pt-24 pb-12 md:pt-32 md:pb-16"><div className="max-w-7xl mx-auto px-4 sm:px-6"><SectionTitle badge={`${partnerNames.length} партнёров`} title="Наши партнёры" subtitle="Крупнейшие дистрибьюторы России уже работают с Makel" serif/></div></section>
    <section className="pb-12"><div className="max-w-7xl mx-auto px-4 sm:px-6"><AnimatedSection><RussiaMap /></AnimatedSection></div></section>
    <section className="py-6"><div className="max-w-3xl mx-auto px-4 sm:px-6"><div className="relative"><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={20}/><input type="text" placeholder="Найти партнёра..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-bg-card border border-border rounded-2xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors text-lg"/></div></div></section>
    <section className="py-12"><div className="max-w-7xl mx-auto px-4 sm:px-6"><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {filtered.map((p,i)=>(<motion.div key={p} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:Math.min(i*0.02,0.5)}} whileHover={{y:-4,scale:1.03}} className="group flex items-center gap-3 p-4 rounded-2xl bg-bg-card border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all cursor-default">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-all"><CheckCircle size={14} className="text-accent group-hover:text-white transition-colors"/></div>
        <span className="text-sm font-semibold truncate">{p}</span>
      </motion.div>))}
    </div>{filtered.length===0&&<div className="text-center py-16 text-text-muted">Партнёр не найден</div>}</div></section>
    <section className="py-20"><div className="max-w-4xl mx-auto px-4 sm:px-6"><AnimatedSection><div className="p-10 md:p-14 rounded-[2rem] bg-gradient-to-br from-accent/5 to-bg-warm border border-accent/10 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 text-[10rem] font-extrabold text-accent/5 leading-none -mt-8 -mr-4 select-none font-display">+</div>
      <div className="relative"><h3 className="text-3xl md:text-4xl font-extrabold mb-4 font-display">Хотите стать партнёром?</h3><p className="text-text-secondary text-lg mb-8">Присоединяйтесь к {partnerNames.length}+ компаниям.</p>
        <Link to="/contacts" className="group inline-flex items-center gap-3 px-10 py-5 bg-accent hover:bg-accent-light text-white rounded-2xl text-lg font-bold font-display transition-all hover:shadow-xl hover:shadow-accent/20">Оставить заявку<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/></Link>
      </div>
    </div></AnimatedSection></div></section>
  </div>);
}
