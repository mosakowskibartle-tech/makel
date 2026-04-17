import AnimatedSection from './AnimatedSection';

interface Props { badge?: string; title: string; subtitle?: string; align?: 'left' | 'center'; serif?: boolean; }

export default function SectionTitle({ badge, title, subtitle, align = 'center', serif = false }: Props) {
  return (
    <AnimatedSection className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      {badge && <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-accent/10 text-accent border border-accent/20 mb-5 font-display">{badge}</span>}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight ${serif ? 'font-serif' : 'font-display'}`}>{title}</h2>
      {subtitle && <p className="mt-5 text-text-secondary text-lg max-w-2xl leading-relaxed" style={{ margin: align === 'center' ? '1.25rem auto 0' : undefined }}>{subtitle}</p>}
    </AnimatedSection>
  );
}
