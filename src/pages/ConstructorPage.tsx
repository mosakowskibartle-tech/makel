import { useState } from 'react';
import { RotateCcw, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';

const frameColors = [
  { name: 'Белый', color: '#ffffff' },
  { name: 'Крем', color: '#F5E6CC' },
  { name: 'Дымчатый', color: '#8B8B8B' },
  { name: 'Чёрный', color: '#1a1a1a' },
  { name: 'Серебро', color: '#C0C0C0' },
  { name: 'Золото', color: '#D4A843' },
  { name: 'Титан', color: '#7B8894' },
  { name: 'Синий', color: '#1E3A5F' },
  { name: 'Зелёный', color: '#2E7D32' },
  { name: 'Красный', color: '#C62828' },
];

const keyColors = [
  { name: 'Белый', color: '#ffffff' },
  { name: 'Крем', color: '#F5E6CC' },
  { name: 'Дымчатый', color: '#8B8B8B' },
  { name: 'Чёрный', color: '#222222' },
];

const moduleTypes = [
  { name: 'Выключатель', icon: '○' },
  { name: 'Розетка', icon: '⊙' },
  { name: 'Диммер', icon: '◔' },
  { name: 'ТВ', icon: '▣' },
  { name: 'Компьютер', icon: '▨' },
  { name: 'Пусто', icon: '□' },
];

export default function ConstructorPage() {
  const [frameColor, setFrameColor] = useState(frameColors[0]);
  const [keyColor, setKeyColor] = useState(keyColors[0]);
  const [slots, setSlots] = useState(3);
  const [modules, setModules] = useState<string[]>(['Выключатель', 'Розетка', 'Выключатель']);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  const updateSlots = (n: number) => {
    setSlots(n);
    const newModules = [...modules];
    while (newModules.length < n) newModules.push('Пусто');
    setModules(newModules.slice(0, n));
  };

  const setModule = (index: number, type: string) => {
    const newModules = [...modules];
    newModules[index] = type;
    setModules(newModules);
  };

  const reset = () => {
    setFrameColor(frameColors[0]);
    setKeyColor(keyColors[0]);
    setSlots(3);
    setModules(['Выключатель', 'Розетка', 'Выключатель']);
    setOrientation('horizontal');
  };

  const getModuleIcon = (name: string) => moduleTypes.find(m => m.name === name)?.icon || '□';

  return (
    <div className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          badge="Конструктор"
          title="Соберите свою комбинацию"
          subtitle="Визуализируйте сочетания рамок, цветов и модулей"
          serif
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Превью */}
          <AnimatedSection>
            <div className="rounded-3xl bg-bg-card border border-border p-8 md:p-12 flex items-center justify-center min-h-[400px]">
              <div className={`flex gap-1 ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}`}>
                {modules.slice(0, slots).map((mod, i) => (
                  <div key={i} className="relative" style={{ width: '80px', height: '80px' }}>
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        backgroundColor: frameColor.color,
                        border: frameColor.color === '#ffffff' ? '2px solid #e5e7eb' : '2px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                    />
                    <div
                      className="absolute inset-2.5 rounded-lg flex items-center justify-center text-2xl font-light"
                      style={{
                        backgroundColor: keyColor.color,
                        border: keyColor.color === '#ffffff' ? '1px solid #e5e7eb' : '1px solid rgba(0,0,0,0.1)',
                        color: keyColor.color === '#ffffff' || keyColor.color === '#F5E6CC' ? '#555' : '#fff',
                      }}
                    >
                      {getModuleIcon(mod)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-4 rounded-2xl bg-surface text-sm text-text-secondary">
              <p>Рамка: <span className="text-text-primary font-semibold">{frameColor.name}</span> • Клавиши: <span className="text-text-primary font-semibold">{keyColor.name}</span> • {slots}-местная • {orientation === 'horizontal' ? 'Горизонтальная' : 'Вертикальная'}</p>
            </div>
          </AnimatedSection>

          {/* Настройки */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-bg-card border border-border">
                <h3 className="font-semibold mb-4 text-text-primary">Количество мест</h3>
                <div className="flex gap-2">
                  {[1,2,3,4,5,6,7].map(n => (
                    <button key={n} onClick={() => updateSlots(n)}
                      className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${slots === n ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-surface text-text-secondary hover:bg-border'}`}
                    >{n}</button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bg-card border border-border">
                <h3 className="font-semibold mb-4 text-text-primary">Ориентация</h3>
                <div className="flex gap-2">
                  {(['horizontal', 'vertical'] as const).map(o => (
                    <button key={o} onClick={() => setOrientation(o)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${orientation === o ? 'bg-accent text-white' : 'bg-surface text-text-secondary hover:bg-border'}`}
                    >{o === 'horizontal' ? 'Горизонтальная' : 'Вертикальная'}</button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bg-card border border-border">
                <h3 className="font-semibold mb-4">Цвет рамки: <span className="text-accent">{frameColor.name}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {frameColors.map(c => (
                    <button key={c.name} onClick={() => setFrameColor(c)}
                      className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 ${frameColor.name === c.name ? 'border-accent scale-110 shadow-lg' : 'border-border'}`}
                      style={{ backgroundColor: c.color }} title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bg-card border border-border">
                <h3 className="font-semibold mb-4">Цвет клавиш: <span className="text-accent">{keyColor.name}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {keyColors.map(c => (
                    <button key={c.name} onClick={() => setKeyColor(c)}
                      className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 ${keyColor.name === c.name ? 'border-accent scale-110 shadow-lg' : 'border-border'}`}
                      style={{ backgroundColor: c.color }} title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bg-card border border-border">
                <h3 className="font-semibold mb-4">Модули</h3>
                <div className="space-y-3">
                  {modules.slice(0, slots).map((mod, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-text-muted w-6 font-medium">{i + 1}.</span>
                      <select value={mod} onChange={(e) => setModule(i, e.target.value)}
                        className="flex-1 bg-surface border border-border rounded-xl px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                      >
                        {moduleTypes.map(m => (
                          <option key={m.name} value={m.name}>{m.icon} {m.name}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-xl text-sm font-medium hover:bg-border transition-all"
                >
                  <RotateCcw size={16} /> Сбросить
                </button>
                <Link to="/contacts"
                  className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-accent/20"
                >
                  <Send size={16} /> Запросить расчёт
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
