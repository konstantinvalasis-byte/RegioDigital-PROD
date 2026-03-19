import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  Settings,
  ShieldCheck,
  MapPin,
  Stethoscope,
  Wrench,
  Utensils,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Plus,
  Minus,
  ChevronRight,
} from 'lucide-react';

// ─── FadeIn component (Intersection Observer) ────────────
function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
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

// ─── Section heading ─────────────────────────────────────
function SectionHeading({ label, title, subtitle }: { label?: string; title: ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      {label && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/10 border border-gold-500/30 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="text-xs font-semibold text-gold-600 tracking-wide uppercase">{label}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-navy-900 mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-slate-500 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full mx-auto mt-6" />
    </div>
  );
}

// ─── Mock browser frame ──────────────────────────────────
function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-grow bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono border border-slate-200 text-center">
          {children as any}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────
const Home: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', branche: '', telefon: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitMessage({ type: 'success', text: data.message || 'Ihre Anfrage wurde erfolgreich gesendet!' });
        setFormState({ name: '', branche: '', telefon: '' });
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Es gab ein Problem beim Senden.' });
      }
    } catch {
      setSubmitMessage({ type: 'error', text: 'Netzwerkfehler. Bitte später erneut versuchen.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'Wie setzen sich Ihre Kosten zusammen?',
      answer: 'Wir bieten transparente Festpreise für unsere Webdesign-Pakete an. Eine professionelle Basis-Website startet bei uns bereits ab 690 € (zzgl. MwSt.). In diesem Preis ist die komplette Erstellung und Einrichtung enthalten – es gibt keine versteckten Entwicklungskosten.',
    },
    {
      question: 'Was genau beinhalten Ihre Angebote?',
      answer: 'Unsere Angebote sind Komplettpakete: Webdesign, technische Umsetzung (Responsive Design), grundlegende Suchmaschinenoptimierung (Local SEO) und Kontaktformulare. Je nach Paket sind auch Texterstellung und Buchungssysteme inklusive.',
    },
    {
      question: 'Was ist Hosting und warum braucht jede Website diesen Service?',
      answer: 'Ohne Hosting ist Ihre Website im Netz nicht existent. Jede Website weltweit benötigt Speicherplatz und eine Adresse (Domain), um zu funktionieren. Wir kümmern uns darum – schlüsselfertig.',
    },
    {
      question: 'Was unterscheidet ein Profi-Hosting von Billig-Angeboten?',
      answer: 'Ein Profi-Hosting ist wie ein voll verwaltetes Objekt: schneller, sicherer, ständig überwacht. Bei Massen-Hostern müssen Sie Updates, Sicherheitslücken und Backups selbst managen.',
    },
    {
      question: 'Was beinhaltet Ihr „Digitaler Hausmeister"-Service?',
      answer: (
        <div className="space-y-3">
          <p>Unser monatliches Paket für 39 € ist eine Rundum-Sorglos-Lösung:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Sicherheit:</strong> Wöchentliche Updates, damit Hacker keine Chance haben.</li>
            <li><strong>Backup:</strong> Tägliche Datensicherung. Alles mit einem Klick wiederherstellbar.</li>
            <li><strong>Rechtssicherheit:</strong> Automatische Aktualisierung bei Gesetzesänderungen (DSGVO).</li>
            <li><strong>Support:</strong> Persönlicher Ansprechpartner in Stuttgart.</li>
          </ul>
        </div>
      ),
    },
    {
      question: 'Welche Rolle spielt KI in Ihrem Prozess?',
      answer: 'Wir nutzen modernste KI-Technologie als Effizienz-Turbo. Was klassische Agenturen Tage kostet, erledigen wir mit KI-Unterstützung in Stunden. Das spart Zeit und ermöglicht unsere günstigen Festpreise.',
    },
    {
      question: 'Bedeutet KI-Einsatz weniger Qualität?',
      answer: 'Im Gegenteil. Die KI liefert eine technologisch perfekte Basis. Design, Qualitätskontrolle und individuelle Anpassung bleiben Handarbeit. Sie erhalten Agentur-Qualität zum Bruchteil des üblichen Preises.',
    },
  ];

  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section aria-label="Hero" className="relative min-h-[100dvh] flex items-center pt-16 pb-20 overflow-hidden bg-navy-950">
        {/* Background image – LCP-Element: eager laden, hohe Priorität */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
            referrerPolicy="no-referrer"
          />
          {/* Dark gradient overlay – keeps text readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-950/80 to-navy-900/75" />
        </div>

        {/* Background art (orbs + grid on top of image) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gold-500/10 blur-3xl animate-[pulse-soft_4s_ease-in-out_infinite]" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-navy-700/30 blur-3xl animate-[pulse-soft_4s_ease-in-out_infinite_1.5s]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/15 border border-gold-500/30 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-xs font-semibold text-gold-400 tracking-wide uppercase">
                Webdesign Stuttgart · Handwerk · Praxen · Gastro
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.03em] text-white mb-6">
              Homepages, die{' '}
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                Kunden bringen.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Maßgeschneiderte, rechtssichere und SEO-optimierte Websites für den lokalen Mittelstand – aus Stuttgart, für Stuttgart und die Region.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold text-base rounded-xl transition-all duration-200 shadow-xl shadow-gold-500/20 hover:shadow-gold-500/40 hover:-translate-y-0.5"
              >
                Kostenlose Erstberatung <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#konzepte"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                Design-Konzepte ansehen
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-400">
              {['DSGVO-konform', 'Lokaler Ansprechpartner', 'Festpreise ohne Überraschungen'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. WERTVERSPRECHEN ═══ */}
      <section id="service" aria-label="Warum RegioDigital" className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionHeading
              label="Warum RegioDigital"
              title="Der richtige Partner für Ihren Online-Auftritt"
            />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Settings,
                title: 'Branchenspezifisch',
                text: 'Keine 08/15 Baukästen. Wir entwickeln Konzepte, die exakt zu den Anforderungen und Zielgruppen Ihres Betriebs passen.',
                delay: 0,
              },
              {
                icon: ShieldCheck,
                title: 'Full-Service',
                text: 'Wir kümmern uns um alles: Von der schlüsselfertigen Ersteinrichtung über professionelle Texte und Bilder bis hin zu sicherem Hosting und DSGVO-Konformität.',
                delay: 100,
              },
              {
                icon: MapPin,
                title: 'Regional & Persönlich',
                text: 'Ihr fester Ansprechpartner vor Ort. Kein anonymes Callcenter, sondern direkte Kommunikation auf Augenhöhe.',
                delay: 200,
              },
            ].map(({ icon: Icon, title, text, delay }) => (
              <FadeIn key={title} delay={delay}>
                <div className="group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-navy-900/5 rounded-xl flex items-center justify-center mb-6 text-navy-900 group-hover:bg-navy-900 group-hover:text-gold-500 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. DESIGN-KONZEPTE ═══ */}
      <section id="konzepte" aria-label="Design-Konzepte" className="py-16 md:py-24 px-6 md:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionHeading
              label="Unsere Arbeit"
              title="Design-Konzepte für Ihre Branche"
              subtitle="So könnte Ihre neue Website aussehen – optimiert für Ihre Zielgruppe."
            />
            <div className="bg-gold-500/10 border border-gold-500/20 text-slate-700 text-sm p-4 rounded-xl flex gap-3 items-start max-w-2xl mx-auto text-left mb-16">
              <span className="text-base leading-none">💡</span>
              <p>Diese Design-Vorschläge sind Beispiele. Ihr finales Design wird individuell nach Ihren Farben und Wünschen gestaltet.</p>
            </div>
          </FadeIn>

          <div className="space-y-24">
            {/* Konzept Medizin */}
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                    <Stethoscope className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Webdesign für Ärzte & Praxen</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-navy-900 mb-4">Vertrauen & Seriosität für Ihre Arztpraxis</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Eine Arztpraxis-Website braucht vor allem eines: Vertrauen. Wir gestalten einen professionellen Online-Auftritt mit echten Teamfotos, der Patienten beruhigt und gleichzeitig praktisch ist.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Klares, medizinisch-seriöses Design in Grün & Weiß',
                      'Online-Terminbuchung direkt auf der Website',
                      'Teamvorstellung mit professionellen Fotos',
                      'Übersichtliche Leistungen & Fachgebiete',
                      'Praxiszeiten, Anfahrt & Kontakt auf einen Blick',
                      'Optimiert für Google-Suchen wie „Arzt in [Ihrer Stadt]"',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
                      <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 flex-grow text-center font-mono border border-slate-200">www.praxis-beispiel.de</div>
                    </div>
                    <div className="relative aspect-[16/10] bg-emerald-50 flex overflow-hidden">
                      <div className="w-1/2 p-6 sm:p-8 flex flex-col justify-center z-10">
                        <div className="text-emerald-700 font-bold text-xs sm:text-sm mb-4 flex items-center gap-2">
                          <Stethoscope className="w-4 h-4" /> PRAXISMED
                        </div>
                        <h4 className="text-xl sm:text-3xl font-black text-gray-900 mb-3 leading-tight">Ihre Gesundheit<br />im Fokus</h4>
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-6 max-w-[200px]">Moderne Diagnostik und persönliche Betreuung für die ganze Familie.</p>
                        <a href="#kontakt" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] sm:text-xs px-4 py-2 rounded-lg self-start font-medium transition-colors cursor-pointer shadow-md inline-block">Online Termin</a>
                      </div>
                      <div className="w-1/2 relative">
                        <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80" alt="Webdesign Ärzte Stuttgart" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" width="800" height="500" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Konzept Handwerk */}
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
                      <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 flex-grow text-center font-mono border border-slate-200">www.meisterbetrieb-beispiel.de</div>
                    </div>
                    <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80" alt="Webdesign Handwerker Stuttgart" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" decoding="async" width="800" height="500" referrerPolicy="no-referrer" />
                      <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-center border-b border-white/10">
                        <div className="font-black text-white tracking-tighter text-lg">HOLZ<span className="text-orange-500">WERK</span></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                        <div className="border-l-4 border-orange-500 pl-4 sm:pl-6">
                          <h4 className="text-2xl sm:text-4xl font-black text-white uppercase leading-none mb-3">Qualität<br />aus Meisterhand</h4>
                          <a href="#kontakt" className="bg-orange-500 hover:bg-orange-400 text-white text-[10px] sm:text-xs font-bold px-5 py-2.5 mt-2 uppercase tracking-wider inline-block transition-colors cursor-pointer rounded">Angebot anfordern</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                    <Wrench className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Webdesign für Handwerker</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-navy-900 mb-4">Stark & kompetent – die Homepage für Ihren Handwerksbetrieb</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Ein Handwerksbetrieb braucht eine Website, die Stärke und Verlässlichkeit ausstrahlt. Mit echter Referenzgalerie und direktem Kontaktformular kommen die Aufträge zu Ihnen.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Kraftvolles Design in Dunkel & Orange',
                      'Leistungsübersicht mit echten Projektfotos',
                      'Referenzgalerie mit abgeschlossenen Bauprojekten',
                      'Direktes Anfrageformular für schnelle Kontaktaufnahme',
                      'Zertifikate & Qualifikationen hervorheben',
                      'Lokales SEO: „Maurer in [Ihrer Stadt]" bei Google finden',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Konzept Gastronomie */}
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                    <Utensils className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Webdesign für Gastronomie</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-navy-900 mb-4">Appetit auf mehr – Ihr Restaurant online im Rampenlicht</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Das Auge isst mit – besonders online. Wir kreieren eine geschmackvolle Website, die das Ambiente Ihres Restaurants einfängt und aus Besuchern echte Gäste macht.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Edles Design in Dunkelgrau & Gold',
                      'Digitale, leicht pflegbare Speise- & Getränkekarte',
                      'Nahtlose Integration Ihres Tischreservierungssystems',
                      'Großflächige Fotogalerie für Speisen & Interieur',
                      'Prominente Platzierung von Öffnungszeiten & Anfahrt',
                      'Lokales SEO: Gefunden werden, wenn der Hunger kommt',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
                      <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 flex-grow text-center font-mono border border-slate-200">www.restaurant-beispiel.de</div>
                    </div>
                    <div className="relative aspect-[16/10] bg-[#1a1a1a] flex flex-col overflow-hidden">
                      <div className="p-4 sm:p-6 text-center z-20 absolute top-0 w-full">
                        <div className="font-serif italic text-gold-500 text-xl tracking-widest">Gusto</div>
                      </div>
                      <div className="flex-grow relative flex items-center justify-center mt-12">
                        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" alt="Webdesign Restaurants Stuttgart" className="absolute inset-0 w-full h-full object-cover opacity-40" loading="lazy" decoding="async" width="800" height="500" referrerPolicy="no-referrer" />
                        <div className="relative z-10 border border-gold-500/30 p-6 sm:p-8 text-center bg-black/50 backdrop-blur-sm mx-4 max-w-sm">
                          <h4 className="text-xl sm:text-3xl font-serif text-white mb-3">Kulinarische Momente</h4>
                          <p className="text-[10px] sm:text-xs text-gray-300 mb-6 font-light tracking-wide">Erleben Sie authentische Küche in einer Atmosphäre zum Wohlfühlen.</p>
                          <a href="#kontakt" className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black text-[10px] sm:text-xs px-6 py-2.5 uppercase tracking-widest transition-colors cursor-pointer inline-block">Tisch reservieren</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Konzept Beautysalon */}
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
                      <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 flex-grow text-center font-mono border border-slate-200">www.beauty-beispiel.de</div>
                    </div>
                    <div className="relative aspect-[16/10] bg-rose-50 flex overflow-hidden">
                      <div className="w-5/12 relative">
                        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" alt="Webdesign Beautysalon Stuttgart" className="absolute inset-0 w-full h-full object-cover rounded-r-full shadow-2xl transform -translate-x-4" loading="lazy" decoding="async" width="800" height="500" referrerPolicy="no-referrer" />
                      </div>
                      <div className="w-7/12 p-4 sm:p-8 flex flex-col justify-center items-center text-center z-10">
                        <div className="font-serif text-rose-800 text-xs sm:text-sm mb-4 tracking-widest uppercase">Glow Studio</div>
                        <h4 className="text-xl sm:text-3xl font-serif text-gray-800 mb-3 leading-tight">Zeit für Ihre<br />Schönheit</h4>
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-6 max-w-[180px]">Entspannen Sie in unserer Wohlfühloase und lassen Sie sich verwöhnen.</p>
                        <a href="#kontakt" className="bg-rose-800 hover:bg-rose-700 text-white text-[10px] sm:text-xs px-6 py-2.5 rounded-full uppercase tracking-widest transition-colors cursor-pointer shadow-lg inline-block">Jetzt buchen</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                    <Sparkles className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Webdesign für Kosmetik & Wellness</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-navy-900 mb-4">Eleganz & Stil für Ihren Beautysalon</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Ein Beautysalon lebt von Ästhetik und Atmosphäre. Wir gestalten eine elegante Website mit hochwertigen Fotos, die Ihre Leistungen perfekt in Szene setzt und Buchungen antreibt.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Elegantes Design in Rosa & Weiß mit weichen Formen',
                      'Hochwertige Fotogalerie Ihrer Arbeiten',
                      'Online-Terminbuchung rund um die Uhr',
                      'Behandlungen & Preisliste übersichtlich dargestellt',
                      'Instagram-Feed-Integration möglich',
                      'Gefunden werden bei „Beautysalon in [Ihrer Stadt]"',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 4. SORGLOS-BANNER ═══ */}
      <section aria-label="Digitaler Hausmeister" className="relative py-16 md:py-24 px-6 md:px-10 overflow-hidden bg-navy-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/8 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>
        <FadeIn className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gold-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6">
            Konzentrieren Sie sich auf Ihr Geschäft –{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
              wir machen den Rest.
            </span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8">
            Für einen kleinen monatlichen Betrag sind wir Ihr digitaler Hausmeister. Wir halten Ihre Seite technisch aktuell, schützen sie vor Angriffen und sorgen für dauerhafte Rechtssicherheit (DSGVO).
          </p>
          <a href="#preise" className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-gold-500/20">
            Wartungspaket ansehen <ChevronRight className="w-5 h-5" />
          </a>
        </FadeIn>
      </section>

      {/* ═══ 5. PREISE ═══ */}
      <section id="preise" aria-label="Preise und Pakete" className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionHeading
              label="Transparente Preise"
              title="Keine versteckten Kosten"
              subtitle="Die komplette Ersteinrichtung ist in jedem Paket bereits inklusive."
            />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Starter */}
            <FadeIn delay={0}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-navy-900 mb-1">Starter</h3>
                <p className="text-slate-400 text-sm mb-6">Kompakt-Konzept für Gründer</p>
                <div className="text-4xl font-black text-navy-900 mb-6 tracking-tight">690€ <span className="text-base font-normal text-slate-400">zzgl. MwSt.</span></div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {['Bis zu 3 Unterseiten (Home, Leistungen, Kontakt)', 'Responsive Design (Mobile-First)', 'Kontaktformular & Google Maps', 'Basis SEO-Optimierung'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-petrol-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#kontakt" className="block text-center bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold py-3 px-6 rounded-xl transition-colors">Kostenlos anfragen</a>
              </div>
            </FadeIn>

            {/* Business – Featured */}
            <FadeIn delay={100}>
              <div className="relative bg-navy-950 rounded-2xl p-8 flex flex-col h-full shadow-xl md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-navy-900 text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                  Am beliebtesten
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Business</h3>
                <p className="text-slate-400 text-sm mb-6">Komplett-Lösung für Etablierte</p>
                <div className="text-4xl font-black text-white mb-6 tracking-tight">1.190€ <span className="text-base font-normal text-slate-500">zzgl. MwSt.</span></div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {['Bis zu 8 Unterseiten', 'Individuelles Branchen-Design', 'Texterstellung (SEO-optimiert)', 'Integration von Buchungssystemen', 'Erweiterte SEO-Optimierung'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#kontakt" className="block text-center bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-gold-500/20">Kostenlos anfragen</a>
              </div>
            </FadeIn>

            {/* Premium */}
            <FadeIn delay={200}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-navy-900 mb-1">Premium</h3>
                <p className="text-slate-400 text-sm mb-6">Wachstums-Paket</p>
                <div className="text-4xl font-black text-navy-900 mb-6 tracking-tight">1.990€ <span className="text-base font-normal text-slate-400">zzgl. MwSt.</span></div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {['Unbegrenzte Unterseiten', 'Premium Custom Design', 'Professionelles Fotoshooting (regional)', 'Blog / News-System', 'Performance & Security Setup'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-petrol-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#kontakt" className="block text-center bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold py-3 px-6 rounded-xl transition-colors">Kostenlos anfragen</a>
              </div>
            </FadeIn>
          </div>

          {/* Wartungspaket Banner */}
          <FadeIn>
            <div className="bg-gradient-to-r from-petrol-600 to-navy-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex-1">
                <h4 className="text-2xl font-black tracking-tight mb-2">Monatliches Wartungspaket</h4>
                <p className="text-petrol-100 text-sm">Hosting, Updates, Backups & DSGVO-Sicherheit inklusive.</p>
              </div>
              <div className="flex items-center gap-6 flex-col sm:flex-row">
                <div className="text-3xl font-black whitespace-nowrap">39€ <span className="text-base font-normal text-petrol-200">/ Monat</span></div>
                <a href="#kontakt" className="bg-white text-petrol-600 hover:bg-slate-100 font-bold py-3 px-6 rounded-xl transition-colors whitespace-nowrap shadow">Dazu buchen</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 6. FAQ ═══ */}
      <section id="faq" aria-label="Häufig gestellte Fragen" className="py-16 md:py-24 px-6 md:px-10 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <SectionHeading
              label="FAQ"
              title="Häufig gestellte Fragen"
              subtitle="Alles, was Sie über unsere Kosten, Angebote und das Hosting wissen müssen."
            />
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full flex cursor-pointer items-center justify-between gap-4 p-6 text-navy-900 font-semibold text-left hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-base">{faq.question}</h3>
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                      {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    hidden={openFaq !== i}
                    className="px-6 pb-6 text-slate-500 leading-relaxed text-sm border-t border-slate-100 pt-4"
                  >
                    {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. KONTAKT ═══ */}
      <section id="kontakt" aria-label="Kontakt" className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              {/* Left panel */}
              <div className="relative bg-navy-950 text-white p-10 md:w-2/5 flex flex-col justify-center overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold-500/10 blur-2xl" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-black tracking-tight mb-4">Lassen Sie uns über Ihr Vorhaben sprechen.</h2>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">Kostenlos und unverbindlich. Wir beraten Sie gerne zu den Möglichkeiten für Ihr Unternehmen.</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-8 h-8 bg-gold-500/15 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-gold-500" />
                      </div>
                      <a href="tel:01345554445" className="hover:text-gold-500 transition-colors">0134 5554445</a>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-8 h-8 bg-gold-500/15 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-gold-500" />
                      </div>
                      <a href="mailto:hallo@regio-digital.de" className="hover:text-gold-500 transition-colors">hallo@regio-digital.de</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel – Form */}
              <div className="p-10 md:w-3/5">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Name / Unternehmen</label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 outline-none transition-all text-sm"
                      placeholder="Max Mustermann GmbH"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="branche" className="block text-sm font-medium text-slate-700 mb-1.5">Branche</label>
                    <select
                      id="branche"
                      value={formState.branche}
                      onChange={(e) => setFormState({ ...formState, branche: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 outline-none transition-all bg-white text-sm"
                      required
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="Handwerk">Handwerk</option>
                      <option value="Medizin & Gesundheit">Medizin & Gesundheit</option>
                      <option value="Gastronomie">Gastronomie</option>
                      <option value="Dienstleistung">Dienstleistung</option>
                      <option value="Andere">Andere</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="telefon" className="block text-sm font-medium text-slate-700 mb-1.5">Telefonnummer</label>
                    <input
                      type="tel"
                      id="telefon"
                      value={formState.telefon}
                      onChange={(e) => setFormState({ ...formState, telefon: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 outline-none transition-all text-sm"
                      placeholder="Für einen Rückruf"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-navy-950 hover:bg-navy-900 text-white font-bold py-4 px-6 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-navy-950/20 text-sm ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Beratung anfragen'}
                  </button>
                  {submitMessage && (
                    <p className={`text-sm text-center ${submitMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                      {submitMessage.text}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 text-center">Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.</p>
                </form>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Home;
