import React, { useState } from 'react';
import { CheckCircle2, Check, ChevronRight, ShieldCheck } from 'lucide-react';
import { FadeIn, SectionHeading } from '../components/shared';

const vergleich = [
  {
    kategorie: 'Design & Technik',
    merkmale: [
      { label: 'Responsive Design',               k: true,        b: true,           f: true },
      { label: 'Anzahl Unterseiten',               k: '1–2',       b: '5–7',          f: '10+' },
      { label: 'Ladegeschwindigkeit (Core Vitals)', k: 'Basis',     b: 'Optimiert',    f: 'Premium' },
      { label: 'Animationen & Micro-Interactions', k: false,       b: true,           f: true },
      { label: 'CMS / eigene Inhaltspflege',       k: false,       b: false,          f: true },
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

export default function PreiseSection() {
  const [openVergleich, setOpenVergleich] = useState(false);

  return (
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
            { id: 'kompakt',     name: 'Kompakt-Lösung',   sub: 'Online präsent sein',      price: '490',   featured: false, cta: 'Jetzt starten',       highlights: ['Klares & funktionales Design','Hochgeschwindigkeits-Layout – mobil optimiert','E-Mail-Verlinkung & Google Maps Integration','Redaktionelle Basistexte inklusive'] },
            { id: 'business',   name: 'Business-Präsenz', sub: 'Gezielte Kundenanfragen',  price: '990',   featured: true,  cta: 'Beratung buchen',     highlights: ['Überzeugende Texte & verkaufsstarke Struktur','Strukturiertes Anfrageformular','Lokales SEO: Sichtbarkeit in Ihrer Region','1 Inhalts-Update pro Monat inklusive'] },
            { id: 'fullservice', name: 'Full-Service Lösung', sub: 'Kunden ohne Stress',   price: '1.890', featured: false, cta: 'Persönliches Gespräch', highlights: ['Exklusives High-End Design','Vollwertiges CMS + Blog / News-System','Intelligenter Conversion-Flow','Digitale Terminbuchung (Automatisierung)'] },
          ] as const).map(({ id, name, sub, price, featured, cta, highlights }, i) => (
            <FadeIn key={id} delay={i * 80}>
              <div className={`relative rounded-2xl flex flex-col transition-all duration-300 h-full ${featured ? 'bg-navy-800 shadow-2xl shadow-black/40 border border-gold-500/50' : 'bg-white border border-white/10 shadow-sm hover:shadow-xl hover:shadow-black/20'}`}>
                {featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-navy-900 text-[11px] font-black uppercase tracking-widest py-1.5 px-5 rounded-full shadow-lg whitespace-nowrap">
                    Empfohlen
                  </div>
                )}
                <div className="p-7 md:p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className={`text-xl font-black tracking-tight mb-1 ${featured ? 'text-white' : 'text-navy-900'}`}>{name}</h3>
                    <p className={`text-sm ${featured ? 'text-slate-400' : 'text-slate-400'}`}>{sub}</p>
                  </div>
                  <div className={`flex items-end gap-1.5 mb-7 pb-7 border-b ${featured ? 'border-white/10' : 'border-slate-100'}`}>
                    <span className={`text-4xl font-black tracking-tight leading-none ${featured ? 'text-white' : 'text-navy-900'}`}>{price}€</span>
                    <span className={`text-sm mb-0.5 ${featured ? 'text-slate-500' : 'text-slate-400'}`}>Festpreis</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {highlights.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${featured ? 'text-gold-500' : 'text-navy-900'}`} />
                        <span className={`text-sm font-medium ${featured ? 'text-slate-200' : 'text-slate-700'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#kontakt" className={`mt-auto block text-center font-bold py-3.5 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm ${featured ? 'bg-gold-500 hover:bg-gold-600 text-navy-900 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/35' : 'bg-navy-950 hover:bg-navy-800 text-white shadow-md'}`}>
                    {cta}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Vergleich */}
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

          <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mb-8 ${openVergleich ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="min-h-0 overflow-hidden">
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[460px]">
                    <div className="grid grid-cols-[minmax(130px,2fr)_repeat(3,minmax(90px,1fr))] bg-navy-900">
                      <div className="px-5 py-4 border-b border-white/10" />
                      {([
                        { name: 'Kompakt',      price: '490€',   featured: false },
                        { name: 'Business',     price: '990€',   featured: true  },
                        { name: 'Full-Service', price: '1.890€', featured: false },
                      ] as const).map(({ name, price, featured: hdr }) => (
                        <div key={name} className={`px-3 py-4 text-center border-b border-l ${hdr ? 'bg-gold-500/10 border-gold-500/30' : 'border-white/10'}`}>
                          <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${hdr ? 'text-gold-500' : 'text-slate-400'}`}>{name}</div>
                          <div className={`text-base font-black ${hdr ? 'text-white' : 'text-slate-300'}`}>{price}</div>
                        </div>
                      ))}
                    </div>
                    {vergleich.map((kat, ki) => (
                      <React.Fragment key={ki}>
                        <div className="bg-navy-950/70 border-t border-white/8 px-5 py-2.5">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gold-500/60">{kat.kategorie}</span>
                        </div>
                        {kat.merkmale.map((m, mi) => (
                          <div key={mi} className={`grid grid-cols-[minmax(130px,2fr)_repeat(3,minmax(90px,1fr))] border-t border-white/5 ${mi % 2 === 0 ? 'bg-navy-900/25' : ''}`}>
                            <div className="px-5 py-3 flex items-center">
                              <span className="text-sm text-slate-300 leading-snug">{m.label}</span>
                            </div>
                            {([m.k, m.b, m.f] as (boolean | string)[]).map((val, vi) => (
                              <div key={vi} className={`flex items-center justify-center px-3 py-3 border-l ${vi === 1 ? 'bg-gold-500/5 border-gold-500/20' : 'border-white/5'}`}>
                                {val === true ? (
                                  <Check className={`w-4 h-4 ${vi === 1 ? 'text-gold-500' : 'text-slate-400'}`} />
                                ) : val === false ? (
                                  <span className="text-slate-600 text-sm select-none">—</span>
                                ) : (
                                  <span className={`text-xs font-bold ${vi === 1 ? 'text-gold-400' : val === '—' ? 'text-slate-600' : 'text-slate-300'}`}>{val}</span>
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
              {[{ label: 'Buchungssystem-Integration', price: '+199€' }, { label: 'Instagram-Feed', price: '+99€' }].map(({ label, price }) => (
                <div key={label} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-3 py-2">
                  <span className="text-sm text-slate-300 font-medium">{label}</span>
                  <span className="text-xs font-black text-gold-400 bg-gold-500/15 px-2 py-0.5 rounded-md">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Wartungspaket */}
        <FadeIn delay={150}>
          <div className="relative bg-gold-500/10 border border-gold-500/30 rounded-2xl p-7 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
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
            <div className="relative z-10 flex items-center gap-4 shrink-0">
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
  );
}
