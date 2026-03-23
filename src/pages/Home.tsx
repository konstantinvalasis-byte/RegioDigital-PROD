import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  Zap,
  Lock,
  Phone,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Utensils,
  Sparkles,
  CheckCircle2,
  Mail,
  Plus,
  Minus,
  ChevronRight,
  Check,
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
function SectionHeading({ label, title, subtitle, dark = false }: { label?: string; title: ReactNode; subtitle?: string; dark?: boolean }) {
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
  const [formState, setFormState] = useState({ name: '', branche: '', telefon: '', nachricht: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [openVergleich, setOpenVergleich] = useState(false);

  const vergleich = [
    {
      kategorie: 'Design & Technik',
      merkmale: [
        { label: 'Anzahl Seiten',               k: '1–2',  b: '5–7',      f: 'Unbegrenzt' },
        { label: 'Branchenspezifisches Design', k: false,  b: true,       f: true },
        { label: 'CMS / Blog',                  k: false,  b: 'Optional', f: true },
        { label: 'High-End Exklusivdesign',     k: false,  b: false,      f: true },
      ],
    },
    {
      kategorie: 'Texte & SEO',
      merkmale: [
        { label: 'Basistexte inklusive',           k: true,  b: true,  f: true },
        { label: 'Verkaufsstarke Texterstellung',  k: false, b: true,  f: true },
        { label: 'Lokales SEO',                    k: false, b: true,  f: true },
        { label: 'Vollständige SEO-Strategie',     k: false, b: false, f: true },
      ],
    },
    {
      kategorie: 'Anfragen & Marketing',
      merkmale: [
        { label: 'Anfrageformular',          k: 'Basis', b: 'Strukturiert', f: 'Conversion-Flow' },
        { label: 'Rezensions-Management',    k: false,   b: true,           f: true },
        { label: 'Terminbuchung (digital)',  k: false,   b: false,          f: true },
      ],
    },
    {
      kategorie: 'Support',
      merkmale: [
        { label: 'Impressum & Datenschutz',  k: true, b: true,  f: true },
        { label: 'Updates / Monat',          k: '—',  b: '1×',  f: '3×' },
      ],
    },
  ] as const;

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
        setFormState({ name: '', branche: '', telefon: '', nachricht: '' });
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Es gab ein Problem beim Senden.' });
      }
    } catch {
      setSubmitMessage({ type: 'error', text: 'Netzwerkfehler. Bitte später erneut versuchen.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqGroups = [
    {
      group: 'Ablauf & Zusammenarbeit',
      items: [
        {
          question: 'Wie läuft ein Projekt bei Ihnen ab?',
          answer: (
            <div className="space-y-2">
              <p>Der Ablauf ist in vier klare Phasen unterteilt, damit Sie immer wissen, wo wir stehen:</p>
              <ol className="space-y-2 mt-3">
                {[
                  ['Erstgespräch', 'Kostenlos & unverbindlich. Wir lernen Ihren Betrieb kennen und klären Ziele, Wünsche und Budget.'],
                  ['Konzept & Design', 'Wir erstellen einen ersten Entwurf Ihrer Website – erst wenn Sie zufrieden sind, geht es weiter.'],
                  ['Umsetzung', 'Technische Entwicklung, Texte, Bilder und SEO-Optimierung – alles aus einer Hand.'],
                  ['Launch & Support', 'Wir schalten Ihre Seite live, richten Hosting und Domain ein und sind danach weiterhin für Sie da.'],
                ].map(([step, desc], idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-gold-500/15 text-gold-600 text-xs font-black flex items-center justify-center mt-0.5">{idx + 1}</span>
                    <span><strong className="text-navy-900">{step}:</strong> {desc}</span>
                  </li>
                ))}
              </ol>
            </div>
          ),
        },
        {
          question: 'Wie lange dauert es, bis meine Website online ist?',
          answer: 'Ihre neue Website ist innerhalb von 10 Tagen nach dem ersten Gespräch live – das ist unser Standard.',
        },
        {
          question: 'Was muss ich selbst liefern – und was übernehmen Sie?',
          answer: 'Von Ihnen benötigen wir immer: Ihr Logo (falls vorhanden) und grobe Infos zu Ihrem Betrieb. Bei der Kompakt-Lösung liefern Sie zusätzlich die Rohtexte – wir bringen sie in Form. Ab der Business-Präsenz übernehmen wir die komplette Texterstellung: verkaufspsychologisch aufgebaut, SEO-optimiert, fertig zum Launch. Design, Technik und Einrichtung erledigen wir in jedem Paket vollständig.',
        },
        {
          question: 'Kann ich meine Website später selbst bearbeiten?',
          answer: 'Das hängt vom Paket ab. In der Full-Service Lösung richten wir ein vollwertiges CMS ein – Sie pflegen Texte, Bilder, Blog-Beiträge und News ganz ohne technisches Vorwissen. In der Business-Präsenz sind 1 Inhalts-Update pro Monat inklusive, in der Full-Service Lösung sogar 3. Für alle weiteren Änderungen sind wir per Wartungspaket direkt erreichbar.',
        },
      ],
    },
    {
      group: 'Kosten & Leistungen',
      items: [
        {
          question: 'Was ist im Festpreis alles enthalten?',
          answer: (
            <div className="space-y-2">
              <p>Alle drei Pakete sind echte Komplettpakete – keine versteckten Extras. In jedem Paket inklusive:</p>
              <ul className="mt-3 space-y-2">
                {[
                  'Individuelles Design (kein Baukasten, kein Template)',
                  'Responsive Entwicklung – mobil, Tablet und Desktop',
                  'E-Mail-Verlinkung & Google Maps (Kompakt) / Kontaktformular ab Business-Präsenz',
                  'Impressum & Datenschutz (DSGVO-konform)',
                  'Favicon, Branding & Social-Media-Verlinkung',
                  'Google-taugliche Grundstruktur (Meta-Tags, Ladezeiten)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-slate-500">Ab der Business-Präsenz (990 €) kommen hinzu: strukturiertes Kontaktformular mit Spam-Schutz, Texterstellung, Keyword-Recherche, Google My Business, Analytics und Referenzgalerie. Die Full-Service Lösung (1.890 €) ergänzt CMS, Blog, Terminbuchung und Conversion-Optimierung.</p>
            </div>
          ),
        },
        {
          question: 'Was kostet eine Änderung nach dem Launch?',
          answer: 'Kleine Korrekturen direkt nach dem Launch sind immer inklusive. Darüber hinaus gilt: Bei der Business-Präsenz ist 1 Inhalts-Update pro Monat enthalten, bei der Full-Service Lösung 3. Mit dem Wartungspaket sind zusätzlich 1–2 kleinere Textanpassungen monatlich abgedeckt. Größere Erweiterungen werden transparent nach Aufwand berechnet – immer mit vorheriger Abstimmung.',
        },
        {
          question: 'Was beinhaltet das monatliche Wartungspaket?',
          answer: (
            <div className="space-y-3">
              <p>Das Wartungspaket für 39 € / Monat ist vor allem <strong className="text-navy-900">Ihr Hosting</strong> – DSGVO-konform, auf deutschen Servern, mit SSL und garantierter Erreichbarkeit. Dazu kommt die komplette technische Betreuung:</p>
              <ul className="mt-3 space-y-2">
                {[
                  ['Hosting & SSL', 'DSGVO-konformes High-Speed Hosting auf deutschen Servern – Ihre Website ist immer erreichbar'],
                  ['Sicherheit', 'Regelmäßige Updates & Schutz vor Angriffen'],
                  ['Backup', 'Tägliche Datensicherung – bei Problemen schnell wiederherstellbar'],
                  ['Rechtssicherheit', 'Automatische Anpassung bei DSGVO-Änderungen'],
                  ['Support', 'Persönlicher Ansprechpartner – kein Ticketsystem, kein Callcenter'],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span><strong className="text-navy-900">{title}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
      ],
    },
    {
      group: 'Technik & Sichtbarkeit',
      items: [
        {
          question: 'Wird meine Website wirklich bei Google gefunden?',
          answer: 'Jede Website, die wir bauen, ist von Grund auf für Suchmaschinen optimiert – schnelle Ladezeiten, saubere Struktur, korrekte Meta-Daten. Ab der Business-Präsenz gehen wir deutlich weiter: lokale Keyword-Recherche, Google My Business Setup, Schema Markup (Bewertungen & Öffnungszeiten direkt in der Suche) und Google Analytics mit Search Console. Die Full-Service Lösung kombiniert lokales SEO, vollständiges Conversion-Tracking und eine kontinuierlich optimierte Online-Präsenz.',
        },
        {
          question: 'Arbeiten Sie nur in Stuttgart oder auch woanders?',
          answer: 'Unser Schwerpunkt liegt in Stuttgart und der Region – kurze Wege, persönlicher Kontakt. Projekte in ganz Deutschland setzen wir selbstverständlich auch um, da die Zusammenarbeit problemlos remote funktioniert.',
        },
        {
          question: 'Was ist der Unterschied zu Website-Baukästen wie Wix oder Squarespace?',
          answer: 'Baukästen sind für Hobby-Projekte gemacht. Wir bauen individuelle Websites: eigenes Design statt Vorlagen, sauberer Code statt aufgeblähter Plattformen, echte SEO-Optimierung statt Baukästen-Einschränkungen – und Sie sind nicht an einen Anbieter gebunden.',
        },
        {
          question: 'Muss ich meine alte Website selbst abschalten?',
          answer: 'Nein. Wir koordinieren den Übergang komplett: Wir bauen Ihre neue Seite zunächst auf einer Staging-Umgebung, und erst wenn alles abgenommen ist, wird die alte Seite durch die neue ersetzt – ohne Downtime.',
        },
      ],
    },
  ];

  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section aria-label="Hero" className="relative min-h-[100dvh] flex items-center pt-16 pb-20 overflow-hidden bg-navy-950">
        {/* Background image – LCP-Element: eager laden, hohe Priorität */}
        <div className="absolute inset-0">
          <img
            src="/stuttgart-hero.jpg"
            alt="Stuttgart Stadtpanorama"
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
            <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-1.5 bg-gold-500/15 border border-gold-500/30 rounded-full mb-6 md:mb-8 max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shrink-0" />
              <span className="text-[11px] font-semibold text-gold-400 tracking-wide uppercase text-center">
                Webdesign Stuttgart · Handwerk · Praxen · Gastro
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.03em] text-white mb-5 md:mb-6">
              In 10 Tagen online –{' '}
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                mehr Aufträge für Ihren Betrieb.
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10">
              Websites für Handwerker, Praxen und Gastronomen in Stuttgart – zum Festpreis, rechtssicher, lokal gefunden bei Google.
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

      {/* ═══ 2. WARUM + PROZESS ═══ */}
      <section id="service" aria-label="Warum RegioDigital und Ablauf" className="py-16 md:py-28 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* ── USPs ── */}
          <FadeIn>
            <SectionHeading
              label="Warum RegioDigital"
              title="Konkrete Versprechen statt leere Floskeln"
              subtitle="Drei Dinge, auf die Sie sich verlassen können – schriftlich."
            />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                num: '01',
                icon: Zap,
                title: 'In 10 Tagen live',
                text: 'Von Erstgespräch bis Go-live in 10 Werktagen. Kein monatelanges Hin und Her – Ihr Betrieb kommt schnell online.',
                delay: 0,
              },
              {
                num: '02',
                icon: Lock,
                title: 'Festpreis, keine Überraschungen',
                text: 'Was wir anbieten, das kostet es – nicht mehr. Keine versteckten Stunden, keine Nachberechnungen. Einmal vereinbart, fertig.',
                delay: 80,
              },
              {
                num: '03',
                icon: Phone,
                title: 'Ein Ansprechpartner, kein Ticketsystem',
                text: 'Direkt erreichbar per Telefon und WhatsApp. Kein Callcenter, keine automatischen Antworten – ein Mensch, der antwortet.',
                delay: 160,
              },
            ].map(({ num, icon: Icon, title, text, delay }) => (
              <FadeIn key={title} delay={delay}>
                <div className="group relative bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Background number */}
                  <span className="absolute top-4 right-5 text-6xl font-black text-slate-100 select-none leading-none group-hover:text-gold-500/10 transition-colors duration-300">{num}</span>
                  <div className="relative z-10">
                    <div className="w-11 h-11 bg-navy-900/5 rounded-xl flex items-center justify-center mb-5 text-navy-900 group-hover:bg-navy-900 group-hover:text-gold-500 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{text}</p>
                  </div>
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
              <p>Diese Design-Vorschläge sind Beispiele. Ihr finales Design wird individuell nach Ihren Farben und Wünschen gestaltet.</p>
            </div>
          </FadeIn>

          <div className="space-y-14 md:space-y-24">
            {/* Konzept Medizin */}
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                    <Stethoscope className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Webdesign für Ärzte & Praxen</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-navy-900 mb-4">Vertrauen & Seriosität für Ihre Arztpraxis oder Klinik</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Eine medizinische Website braucht vor allem eines: Vertrauen. Wir gestalten einen professionellen Online-Auftritt, der Patienten überzeugt und gleichzeitig praktisch ist – für Einzelpraxis oder Klinik.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Seriöses Design, z.B. in Dunkelblau & Weiß',
                      'Online-Terminbuchung direkt auf der Website',
                      'Teamvorstellung mit professionellen Fotos',
                      'Übersichtliche Leistungen & Fachgebiete',
                      'Öffnungszeiten, Anfahrt & Kontakt auf einen Blick',
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
                      <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 flex-grow text-center font-mono border border-slate-200">dr-kessler-stuttgart.de</div>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src="/arzt-preview.jpg" alt="Webdesign Arztpraxis Stuttgart – Konzept von RegioDigital" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" width="1280" height="900" />
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
                      <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 flex-grow text-center font-mono border border-slate-200">schwer-bau-renovierung.de</div>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src="/schwer-bau-preview.jpg" alt="Schwer-Bau Renovierung – echtes Kundenprojekt von RegioDigital" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" width="1280" height="900" />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                    <Wrench className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Webdesign für Handwerker</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-navy-900 mb-4">Stark & kompetent – die Homepage für Ihren Handwerksbetrieb</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Ein Handwerksbetrieb braucht eine Website, die Stärke und Verlässlichkeit ausstrahlt. Mit echter Referenzgalerie und direktem Kontaktformular kommen die Aufträge zu Ihnen.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Kraftvolles Design, z.B. in Dunkel & Rot',
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
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-navy-900 mb-4">Appetit auf mehr – Ihr Restaurant online im Rampenlicht</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Das Auge isst mit – besonders online. Wir kreieren eine geschmackvolle Website, die das Ambiente Ihres Restaurants einfängt und aus Besuchern echte Gäste macht.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Edles Design, z.B. in Dunkelgrau & Gold',
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
                      <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 flex-grow text-center font-mono border border-slate-200">candela-stuttgart.de</div>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src="/gastro-preview.jpg" alt="Webdesign Restaurant Stuttgart – Konzept von RegioDigital" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" width="1280" height="900" />
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
                      <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 flex-grow text-center font-mono border border-slate-200">lume-beautystudio.de</div>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src="/beauty-preview.jpg" alt="Webdesign Beautysalon Stuttgart – Konzept von RegioDigital" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" width="1280" height="900" />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                    <Sparkles className="w-5 h-5" />
                    <span className="uppercase tracking-wider text-xs">Webdesign für Kosmetik & Wellness</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-navy-900 mb-4">Eleganz & Stil für Ihren Beautysalon</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    Ein Beautysalon lebt von Ästhetik und Atmosphäre. Wir gestalten eine elegante Website mit hochwertigen Fotos, die Ihre Leistungen perfekt in Szene setzt und Buchungen antreibt.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Elegantes Design, z.B. in Creme & Beige mit warmer Atmosphäre',
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

      {/* ═══ 4. PREISE ═══ */}
      <section id="preise" aria-label="Preise und Pakete" className="py-16 md:py-24 px-6 md:px-10 bg-navy-950">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionHeading
              label="Transparente Preise"
              title="Das richtige Paket für Ihren Betrieb"
              subtitle="Festpreise, keine versteckten Kosten – Ersteinrichtung immer inklusive."
              dark
            />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10 md:items-stretch pt-4 md:pt-6">
            {([
              {
                id: 'kompakt',
                name: 'Kompakt-Lösung',
                sub: 'Online präsent sein',
                price: '490',
                featured: false,
                cta: 'Jetzt starten',
                highlights: [
                  'Klares & funktionales Design',
                  'Hochgeschwindigkeits-Layout – mobil optimiert',
                  'E-Mail-Verlinkung & Google Maps Integration',
                  'Redaktionelle Basistexte inklusive',
                ],
              },
              {
                id: 'business',
                name: 'Business-Präsenz',
                sub: 'Gezielte Kundenanfragen',
                price: '990',
                featured: true,
                cta: 'Beratung buchen',
                highlights: [
                  'Überzeugende Texte & verkaufsstarke Struktur',
                  'Strukturiertes Anfrageformular',
                  'Lokales SEO: Sichtbarkeit in Ihrer Region',
                  '1 Inhalts-Update pro Monat inklusive',
                ],
              },
              {
                id: 'fullservice',
                name: 'Full-Service Lösung',
                sub: 'Kunden ohne Stress',
                price: '1.890',
                featured: false,
                cta: 'Persönliches Gespräch',
                highlights: [
                  'Exklusives High-End Design',
                  'Vollwertiges CMS + Blog / News-System',
                  'Intelligenter Conversion-Flow',
                  'Digitale Terminbuchung (Automatisierung)',
                ],
              },
            ] as const).map(({ id, name, sub, price, featured, cta, highlights }, i) => (
              <FadeIn key={id} delay={i * 80}>
                <div className={`relative rounded-2xl flex flex-col transition-all duration-300 h-full ${
                  featured
                    ? 'bg-navy-800 shadow-2xl shadow-black/40 border border-gold-500/50'
                    : 'bg-white border border-white/10 shadow-sm hover:shadow-xl hover:shadow-black/20'
                }`}>
                  {featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-navy-900 text-[11px] font-black uppercase tracking-widest py-1.5 px-5 rounded-full shadow-lg whitespace-nowrap">
                      Empfohlen
                    </div>
                  )}

                  <div className="p-7 md:p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className={`text-xl font-black tracking-tight mb-1 ${featured ? 'text-white' : 'text-navy-900'}`}>{name}</h3>
                      <p className={`text-sm ${featured ? 'text-slate-400' : 'text-slate-400'}`}>{sub}</p>
                    </div>

                    {/* Preis */}
                    <div className={`flex items-end gap-1.5 mb-7 pb-7 border-b ${featured ? 'border-white/10' : 'border-slate-100'}`}>
                      <span className={`text-4xl font-black tracking-tight leading-none ${featured ? 'text-white' : 'text-navy-900'}`}>{price}€</span>
                      <span className={`text-sm mb-0.5 ${featured ? 'text-slate-500' : 'text-slate-400'}`}>Festpreis</span>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-6">
                      {highlights.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${featured ? 'text-gold-500' : 'text-navy-900'}`} />
                          <span className={`text-sm font-medium ${featured ? 'text-slate-200' : 'text-slate-700'}`}>{item}</span>
                        </li>
                      ))}
                    </ul>


                    {/* CTA */}
                    <a
                      href="#kontakt"
                      className={`mt-auto block text-center font-bold py-3.5 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm ${
                        featured
                          ? 'bg-gold-500 hover:bg-gold-600 text-navy-900 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/35'
                          : 'bg-navy-950 hover:bg-navy-800 text-white shadow-md'
                      }`}
                    >
                      {cta}
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Vergleich-Button & Matrix */}
          <FadeIn delay={60}>
            <div className="flex justify-center mb-6 -mt-2">
              <button
                onClick={() => setOpenVergleich(!openVergleich)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/8 hover:bg-white/15 border border-white/15 rounded-full text-sm font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <span className={`transition-transform duration-300 ${openVergleich ? 'rotate-180' : ''}`}>
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </span>
                {openVergleich ? 'Vergleich schließen' : 'Pakete vergleichen'}
              </button>
            </div>

            {/* Vergleichsmatrix */}
            <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mb-8 ${
              openVergleich ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}>
              <div className="min-h-0 overflow-hidden">
                <div className="rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                  <div className="min-w-[460px]">

                  {/* Kopfzeile */}
                  <div className="grid grid-cols-[minmax(130px,2fr)_repeat(3,minmax(90px,1fr))] bg-navy-900">
                    <div className="px-5 py-4 border-b border-white/10" />
                    {([
                      { name: 'Kompakt',      price: '490€',   featured: false },
                      { name: 'Business',     price: '990€',   featured: true  },
                      { name: 'Full-Service', price: '1.890€', featured: false },
                    ] as const).map(({ name, price, featured: hdr }) => (
                      <div key={name} className={`px-3 py-4 text-center border-b border-l ${
                        hdr ? 'bg-gold-500/10 border-gold-500/30' : 'border-white/10'
                      }`}>
                        <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${hdr ? 'text-gold-500' : 'text-slate-400'}`}>
                          {name}
                        </div>
                        <div className={`text-base font-black ${hdr ? 'text-white' : 'text-slate-300'}`}>
                          {price}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Kategorien & Merkmale */}
                  {vergleich.map((kat, ki) => (
                    <React.Fragment key={ki}>
                      {/* Kategorie-Label */}
                      <div className="bg-navy-950/70 border-t border-white/8 px-5 py-2.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gold-500/60">{kat.kategorie}</span>
                      </div>

                      {/* Merkmal-Zeilen */}
                      {kat.merkmale.map((m, mi) => (
                        <div key={mi} className={`grid grid-cols-[minmax(130px,2fr)_repeat(3,minmax(90px,1fr))] border-t border-white/5 ${
                          mi % 2 === 0 ? 'bg-navy-900/25' : ''
                        }`}>
                          <div className="px-5 py-3 flex items-center">
                            <span className="text-sm text-slate-300 leading-snug">{m.label}</span>
                          </div>
                          {([m.k, m.b, m.f] as (boolean | string)[]).map((val, vi) => (
                            <div key={vi} className={`flex items-center justify-center px-3 py-3 border-l ${
                              vi === 1 ? 'bg-gold-500/5 border-gold-500/20' : 'border-white/5'
                            }`}>
                              {val === true ? (
                                <Check className={`w-4 h-4 ${vi === 1 ? 'text-gold-500' : 'text-slate-400'}`} />
                              ) : val === false ? (
                                <span className="text-slate-600 text-sm select-none">—</span>
                              ) : (
                                <span className={`text-xs font-bold ${
                                  vi === 1
                                    ? 'text-gold-400'
                                    : val === '—'
                                      ? 'text-slate-600'
                                      : 'text-slate-300'
                                }`}>{val}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Add-Ons */}
          <FadeIn delay={100}>
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 px-7 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 shrink-0">Add-Ons</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Buchungssystem-Integration', price: '+199€' },
                  { label: 'Instagram-Feed', price: '+99€' },
                ].map(({ label, price }) => (
                  <div key={label} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-3 py-2">
                    <span className="text-sm text-slate-300 font-medium">{label}</span>
                    <span className="text-xs font-black text-gold-400 bg-gold-500/15 px-2 py-0.5 rounded-md">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Wartungspaket Banner */}
          <FadeIn delay={150}>
            <div className="relative bg-gold-500/10 border border-gold-500/30 rounded-2xl p-7 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-gold-500">Wartungspaket</span>
                </div>
                <h4 className="text-xl font-black tracking-tight mb-1">Hosting inklusive – Ihre Website läuft, Punkt.</h4>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                  <span className="text-white font-semibold">DSGVO-konformes High-Speed Hosting & SSL</span> sind der Kern des Pakets – dazu: Updates, tägliche Backups, Uptime-Monitoring, 1–2 Textanpassungen/Monat und ein monatlicher Bericht. Monatlich kündbar.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-4 flex-row sm:flex-row shrink-0">
                <div>
                  <span className="text-3xl font-black">39€</span>
                  <span className="text-slate-400 text-sm ml-1.5">/ Monat</span>
                </div>
                <a href="#kontakt" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-6 rounded-xl transition-all hover:-translate-y-0.5 whitespace-nowrap shadow-lg shadow-gold-500/20 text-sm">
                  Dazu buchen
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 6. FAQ ═══ */}
      <section id="faq" aria-label="Häufig gestellte Fragen" className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <SectionHeading
              label="FAQ"
              title="Ihre Fragen, unsere Antworten"
              subtitle="Alles Wichtige zu Ablauf, Kosten und Technik – direkt und ohne Agentur-Blabla."
            />
          </FadeIn>

          <div className="space-y-10">
            {faqGroups.map((group, gi) => (
              <FadeIn key={gi} delay={gi * 60}>
                {/* Gruppen-Label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-black uppercase tracking-widest text-gold-600">{group.group}</span>
                  <div className="flex-1 h-px bg-gold-500/20" />
                </div>

                <div className="space-y-2">
                  {group.items.map((faq, i) => {
                    const id = `${gi}-${i}`;
                    const isOpen = openFaq === id;
                    return (
                      <div
                        key={id}
                        className={`rounded-xl bg-white overflow-hidden transition-all duration-200 ${
                          isOpen
                            ? 'border border-gold-500/40 shadow-[0_0_0_1px_rgba(212,175,55,0.15),0_4px_16px_rgba(0,0,0,0.07)]'
                            : 'border border-slate-200 shadow-sm hover:border-slate-300'
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${id}`}
                          className="w-full flex cursor-pointer items-start justify-between gap-4 px-6 py-5 text-left group"
                        >
                          {/* Gold-Balken links */}
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <span
                              className={`shrink-0 mt-0.5 w-1 self-stretch rounded-full transition-colors duration-200 ${
                                isOpen ? 'bg-gold-500' : 'bg-slate-200 group-hover:bg-slate-300'
                              }`}
                            />
                            <h3 className={`text-base font-semibold leading-snug transition-colors ${isOpen ? 'text-navy-900' : 'text-slate-700 group-hover:text-navy-900'}`}>
                              {faq.question}
                            </h3>
                          </div>
                          <span
                            className={`shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                              isOpen ? 'bg-gold-500/15 text-gold-600 rotate-0' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </span>
                        </button>

                        <div
                          id={`faq-answer-${id}`}
                          role="region"
                          hidden={!isOpen}
                          className="px-6 pb-6 pl-11 text-slate-500 leading-relaxed text-sm border-t border-slate-100 pt-4"
                        >
                          {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Abschluss-Nudge */}
          <FadeIn delay={200}>
            <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm mb-4">Ihre Frage ist nicht dabei?</p>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-md"
              >
                Direkt fragen <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. KONTAKT ═══ */}
      <section id="kontakt" aria-label="Kontakt" className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
              {/* Left panel */}
              <div className="relative bg-navy-950 text-white p-6 md:p-10 md:w-2/5 flex flex-col justify-center overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold-500/10 blur-2xl" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-black tracking-tight mb-4">Lassen Sie uns über Ihr Vorhaben sprechen.</h2>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">Kostenlos und unverbindlich. Wir beraten Sie gerne zu den Möglichkeiten für Ihr Unternehmen.</p>
                  <div className="space-y-4">
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
              <div className="p-6 md:p-10 md:w-3/5">
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
                  <div>
                    <label htmlFor="nachricht" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Nachricht <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="nachricht"
                      value={formState.nachricht}
                      onChange={(e) => setFormState({ ...formState, nachricht: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 outline-none transition-all text-sm resize-none"
                      placeholder="Was kann ich für Sie tun? Z.B. neue Website, Redesign, lokales SEO..."
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
