import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, Percent, DollarSign } from 'lucide-react';

export default function ProfitCalculator() {
  const [volume, setVolume] = useState(500000);
  const [margin, setMargin] = useState(35);
  const r = useMemo(() => {
    const profit = volume * (margin / 100), yp = profit * 12;
    const cp = volume * 0.18, adv = profit - cp;
    return { profit, yp, cp, adv, ya: adv * 12 };
  }, [volume, margin]);
  const fmt = (n: number) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-3"><label className="text-sm font-semibold">Объём закупки / месяц</label><span className="text-lg font-extrabold text-accent">{fmt(volume)}</span></div>
          <input type="range" min={100000} max={10000000} step={50000} value={volume} onChange={e => setVolume(+e.target.value)} className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-accent" />
          <div className="flex justify-between text-xs text-text-muted mt-1"><span>100 тыс.</span><span>10 млн.</span></div>
        </div>
        <div>
          <div className="flex justify-between mb-3"><label className="text-sm font-semibold">Ваша маржа с Makel</label><span className="text-lg font-extrabold text-accent">{margin}%</span></div>
          <input type="range" min={20} max={50} step={1} value={margin} onChange={e => setMargin(+e.target.value)} className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-accent" />
          <div className="flex justify-between text-xs text-text-muted mt-1"><span>20%</span><span>50%</span></div>
        </div>
        <div className="p-4 rounded-2xl bg-surface/80 border border-border text-sm">
          <p className="text-xs text-text-muted mb-2">Сравнение маржи</p>
          <div className="flex items-center gap-2 mb-1"><div className="h-3 flex-1 bg-border rounded-full overflow-hidden"><div className="h-full bg-text-muted/40 rounded-full" style={{width:'18%'}}/></div><span className="text-xs font-bold text-text-muted">~18% конкуренты</span></div>
          <div className="flex items-center gap-2"><div className="h-3 flex-1 bg-border rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full transition-all" style={{width:`${margin}%`}}/></div><span className="text-xs font-bold text-accent">{margin}% Makel</span></div>
          <p className="text-xs text-text-muted mt-2">Ваша маржа <strong className="text-accent">в {(margin/18).toFixed(1)}× выше</strong></p>
        </div>
      </div>
      <div className="space-y-4">
        {[
          { icon: DollarSign, label: 'Прибыль / месяц', value: fmt(r.profit), c: 'accent' },
          { icon: TrendingUp, label: 'Прибыль за год', value: fmt(r.yp), c: 'accent' },
          { icon: Percent, label: 'Преимущество / мес', value: `+${fmt(r.adv)}`, c: 'teal', sub: 'vs конкуренты' },
          { icon: Package, label: 'Экономия за год', value: `+${fmt(r.ya)}`, c: 'gold', sub: 'дополнительно' },
        ].map((it, i) => (
          <motion.div key={it.label} initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="p-5 rounded-2xl bg-bg-card border border-border card-hover">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${it.c==='accent'?'bg-accent/10':it.c==='teal'?'bg-teal/10':'bg-gold/10'}`}>
                <it.icon size={22} className={it.c==='accent'?'text-accent':it.c==='teal'?'text-teal':'text-gold'} />
              </div>
              <div><p className="text-xs text-text-muted">{it.label}</p><p className={`text-xl font-extrabold ${it.c==='accent'?'text-accent':it.c==='teal'?'text-teal':'text-gold'}`}>{it.value}</p>{it.sub&&<p className="text-[10px] text-text-muted">{it.sub}</p>}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
