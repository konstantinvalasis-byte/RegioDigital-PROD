import { Stethoscope, Wrench, Utensils, Sparkles, CheckCircle2 } from 'lucide-react';
import { FadeIn, SectionHeading } from '../components/shared';

export default function KonzepteSection() {
  return (
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
          {/* Medizin */}
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                  <Stethoscope className="w-5 h-5" />
                  <span className="uppercase tracking-wider text-xs">Webdesign für Ärzte & Praxen</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-navy-900 mb-4">Vertrauen & Seriosität für Ihre Arztpraxis oder Klinik</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">Eine medizinische Website braucht vor allem eines: Vertrauen. Wir gestalten einen professionellen Online-Auftritt, der Patienten überzeugt und gleichzeitig praktisch ist – für Einzelpraxis oder Klinik.</p>
                <ul className="space-y-3 mb-8">
                  {['Seriöses Design, z.B. in Dunkelblau & Weiß','Online-Terminbuchung direkt auf der Website','Teamvorstellung mit professionellen Fotos','Übersichtliche Leistungen & Fachgebiete','Öffnungszeiten, Anfahrt & Kontakt auf einen Blick','Optimiert für Google-Suchen wie „Arzt in [Ihrer Stadt]"'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" /><span>{item}</span></li>
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

          {/* Handwerk */}
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
                <p className="text-slate-500 mb-6 leading-relaxed">Ein Handwerksbetrieb braucht eine Website, die Stärke und Verlässlichkeit ausstrahlt. Mit echter Referenzgalerie und direktem Kontaktformular kommen die Aufträge zu Ihnen.</p>
                <ul className="space-y-3">
                  {['Kraftvolles Design, z.B. in Dunkel & Rot','Leistungsübersicht mit echten Projektfotos','Referenzgalerie mit abgeschlossenen Bauprojekten','Direktes Anfrageformular für schnelle Kontaktaufnahme','Zertifikate & Qualifikationen hervorheben','Lokales SEO: „Maurer in [Ihrer Stadt]" bei Google finden'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Gastronomie */}
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4 text-petrol-600 font-semibold">
                  <Utensils className="w-5 h-5" />
                  <span className="uppercase tracking-wider text-xs">Webdesign für Gastronomie</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-navy-900 mb-4">Appetit auf mehr – Ihr Restaurant online im Rampenlicht</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">Das Auge isst mit – besonders online. Wir kreieren eine geschmackvolle Website, die das Ambiente Ihres Restaurants einfängt und aus Besuchern echte Gäste macht.</p>
                <ul className="space-y-3">
                  {['Edles Design, z.B. in Dunkelgrau & Gold','Digitale, leicht pflegbare Speise- & Getränkekarte','Nahtlose Integration Ihres Tischreservierungssystems','Großflächige Fotogalerie für Speisen & Interieur','Prominente Platzierung von Öffnungszeiten & Anfahrt','Lokales SEO: Gefunden werden, wenn der Hunger kommt'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" /><span>{item}</span></li>
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

          {/* Beauty */}
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
                <p className="text-slate-500 mb-6 leading-relaxed">Ein Beautysalon lebt von Ästhetik und Atmosphäre. Wir gestalten eine elegante Website mit hochwertigen Fotos, die Ihre Leistungen perfekt in Szene setzt und Buchungen antreibt.</p>
                <ul className="space-y-3">
                  {['Elegantes Design, z.B. in Creme & Beige mit warmer Atmosphäre','Hochwertige Fotogalerie Ihrer Arbeiten','Online-Terminbuchung rund um die Uhr','Behandlungen & Preisliste übersichtlich dargestellt','Instagram-Feed-Integration möglich','Gefunden werden bei „Beautysalon in [Ihrer Stadt]"'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
