import { useEffect, useRef, useState, type ReactNode } from 'react';

export function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({ label, title, subtitle, dark = false }: { label?: string; title: ReactNode; subtitle?: string; dark?: boolean }) {
  return (
    <div className="text-center mb-10 md:mb-16">
      {label && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/10 border border-gold-500/30 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="text-xs font-semibold text-gold-500 tracking-wide uppercase">{label}</span>
        </div>
      )}
      <h2 className={`text-2xl md:text-4xl font-black tracking-tight mb-4 ${dark ? 'text-white' : 'text-navy-900'}`}>{title}</h2>
      {subtitle && <p className={`text-base md:text-lg max-w-2xl mx-auto ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>}
      <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mx-auto mt-6" />
    </div>
  );
}
