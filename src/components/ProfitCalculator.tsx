import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, Percent, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProfitCalculator() {
  const [volume, setVolume] = useState(500000);
  const [margin, setMargin] = useState(35);
  const { t } = useTranslation();
  const r = useMemo(() => {
    const profit = volume * (margin / 100);
    const cProfit = volume * 0.18;
    return { profit, yearlyProfit: profit * 12, advantage: profit - cProfit, yearlyAdvantage: (profit - cProfit) * 12 };
  }, [volume, margin]);
  const fmt = (n: number) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-3"><label className="text-sm font-semibold">{t('calc.volume')}</label><span className="text-lg font-extrabold text-accent">{fmt(volume)}</span></div>
          <input type="range" min={100000} max={10000000} step={50000} value={volume} onChange={e => setVolume(+e.target.value)} className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-accent" />
          <div className="flex justify-between text-xs text-text-muted mt-1"><span>100 тыс.</span><span>10 млн.</span></div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3"><label className="text-sm font-semibold">{t('calc.yourMargin')}</label><span className="text-lg font-extrabold text-accent">{margin}%</span></div>
          <input type="range" min={20} max={50} step={1} value={margin} onChange={e => setMargin(+e.target.value)} className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-accent" />
        </div>
        <div className="p-5 rounded-2xl bg-surface/80 border border-border">
          <p className="text-xs text-text-muted mb-2">{t('calc.competitorMargin')}</p>
          <div className="flex items-center gap-2"><div className="h-3 flex-1 bg-border rounded-full overflow-hidden"><div className="h-full bg-text-muted/40 rounded-full" style={{width:'18%'}}/></div><span className="text-sm font-bold text-text-muted">~18%</span></div>
          <div className="flex items-center gap-2 mt-2"><div className="h-3 flex-1 bg-border rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full transition-all duration-500" style={{width:`${margin}%`}}/></div><span className="text-sm font-bold text-accent">{margin}%</span></div>
          <p className="text-xs text-text-muted mt-2">С Makel ваша маржа <strong className="text-accent">в {(margin/18).toFixed(1)}× {t('calc.higher')}</strong></p>
        </div>
      </div>
      <div className="space-y-4">
        {[
          { icon: DollarSign, label: t('calc.profitMonth'), value: fmt(r.profit), color: 'accent' as const },
          { icon: TrendingUp, label: t('calc.profitYear'), value: fmt(r.yearlyProfit), color: 'accent' as const },
          { icon: Percent, label: t('calc.advantage'), value: `+${fmt(r.advantage)}`, color: 'teal' as const, sub: t('calc.vs') },
          { icon: Package, label: t('calc.savings'), value: `+${fmt(r.yearlyAdvantage)}`, color: 'gold' as const, sub: t('calc.extra') },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="p-5 rounded-2xl bg-white border border-border card-hover">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.color==='accent'?'bg-accent/10':item.color==='teal'?'bg-teal/10':'bg-gold/10'}`}>
                <item.icon size={22} className={item.color==='accent'?'text-accent':item.color==='teal'?'text-teal':'text-gold'}/>
              </div>
              <div><p className="text-xs text-text-muted">{item.label}</p><p className={`text-xl font-extrabold ${item.color==='accent'?'text-accent':item.color==='teal'?'text-teal':'text-gold'}`}>{item.value}</p>{item.sub && <p className="text-[10px] text-text-muted">{item.sub}</p>}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
