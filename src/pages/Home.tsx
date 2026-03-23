import React, { Suspense } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const ServiceSection  = React.lazy(() => import('../sections/ServiceSection'));
const KonzepteSection = React.lazy(() => import('../sections/KonzepteSection'));
const PreiseSection   = React.lazy(() => import('../sections/PreiseSection'));
const FaqSection      = React.lazy(() => import('../sections/FaqSection'));
const KontaktSection  = React.lazy(() => import('../sections/KontaktSection'));

const Home: React.FC = () => {
  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section aria-label="Hero" className="relative min-h-[100dvh] flex items-center pt-16 pb-20 overflow-hidden bg-navy-950">
        {/* Hintergrundbild */}
        <div className="absolute inset-0">
          <picture>
            <source srcSet="/stuttgart-hero.webp" type="image/webp" />
            <img
              src="/stuttgart-hero.jpg"
              alt="Stuttgart Stadtpanorama"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1920"
              height="1080"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-950/80 to-navy-900/75" />
        </div>

        {/* Hintergrund-Deko */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gold-500/10 blur-3xl animate-[pulse-soft_4s_ease-in-out_infinite]" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-navy-700/30 blur-3xl animate-[pulse-soft_4s_ease-in-out_infinite_1.5s]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-1.5 bg-gold-500/15 border border-gold-500/30 rounded-full mb-6 md:mb-8 max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shrink-0" />
              <span className="text-[11px] font-semibold text-gold-400 tracking-wide uppercase text-center">
                Webdesign Stuttgart · Handwerk · Praxen · Gastro
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.03em] text-white mb-5 md:mb-6">
              In 10 Tagen online –{' '}
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                mehr Aufträge für Ihren Betrieb.
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10">
              Websites für Handwerker, Praxen und Gastronomen in Stuttgart – zum Festpreis, rechtssicher, lokal gefunden bei Google.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#kontakt" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold text-base rounded-xl transition-all duration-200 shadow-xl shadow-gold-500/20 hover:shadow-gold-500/40 hover:-translate-y-0.5">
                Kostenlose Erstberatung <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#konzepte" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5">
                Design-Konzepte ansehen
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 md:mt-12 text-sm text-slate-400">
              {['10 Tage bis Go-live', 'Persönlicher Ansprechpartner', 'Festpreis: 490 – 1.890 €'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BELOW-FOLD SEKTIONEN (lazy geladen) ═══ */}
      <Suspense fallback={null}>
        <ServiceSection />
      </Suspense>
      <Suspense fallback={null}>
        <KonzepteSection />
      </Suspense>
      <Suspense fallback={null}>
        <PreiseSection />
      </Suspense>
      <Suspense fallback={null}>
        <FaqSection />
      </Suspense>
      <Suspense fallback={null}>
        <KontaktSection />
      </Suspense>
    </main>
  );
};

export default Home;
