import { useState, type ReactNode } from 'react';
import { Plus, Minus, ChevronRight } from 'lucide-react';
import { FadeIn, SectionHeading } from '../components/shared';

const faqGroups: { group: string; items: { question: string; answer: ReactNode }[] }[] = [
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
      { question: 'Wie lange dauert es, bis meine Website online ist?', answer: 'Ihre neue Website ist innerhalb von 10 Tagen nach dem ersten Gespräch live – das ist unser Standard.' },
      { question: 'Was muss ich selbst liefern – und was übernehmen Sie?', answer: 'Von Ihnen benötigen wir immer: Ihr Logo (falls vorhanden) und grobe Infos zu Ihrem Betrieb. Bei der Kompakt-Lösung liefern Sie zusätzlich die Rohtexte – wir bringen sie in Form. Ab der Business-Präsenz übernehmen wir die komplette Texterstellung: verkaufspsychologisch aufgebaut, SEO-optimiert, fertig zum Launch. Design, Technik und Einrichtung erledigen wir in jedem Paket vollständig.' },
      { question: 'Kann ich meine Website später selbst bearbeiten?', answer: 'Das hängt vom Paket ab. In der Full-Service Lösung richten wir ein vollwertiges CMS ein – Sie pflegen Texte, Bilder, Blog-Beiträge und News ganz ohne technisches Vorwissen. In der Business-Präsenz sind 1 Inhalts-Update pro Monat inklusive, in der Full-Service Lösung sogar 3. Für alle weiteren Änderungen sind wir per Wartungspaket direkt erreichbar.' },
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
              {['Individuelles Design (kein Baukasten, kein Template)','Responsive Entwicklung – mobil, Tablet und Desktop','E-Mail-Verlinkung & Google Maps (Kompakt) / Kontaktformular ab Business-Präsenz','Impressum & Datenschutz (DSGVO-konform)','Favicon, Branding & Social-Media-Verlinkung','Google-taugliche Grundstruktur (Meta-Tags, Ladezeiten)'].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 list-none">
                  <span className="text-gold-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-slate-500">Ab der Business-Präsenz (990 €) kommen hinzu: strukturiertes Kontaktformular mit Spam-Schutz, Texterstellung, Keyword-Recherche, Google My Business, Analytics und Referenzgalerie. Die Full-Service Lösung (1.890 €) ergänzt CMS, Blog, Terminbuchung und Conversion-Optimierung.</p>
          </div>
        ),
      },
      { question: 'Was kostet eine Änderung nach dem Launch?', answer: 'Kleine Korrekturen direkt nach dem Launch sind immer inklusive. Darüber hinaus gilt: Bei der Business-Präsenz ist 1 Inhalts-Update pro Monat enthalten, bei der Full-Service Lösung 3. Mit dem Wartungspaket sind zusätzlich 1–2 kleinere Textanpassungen monatlich abgedeckt. Größere Erweiterungen werden transparent nach Aufwand berechnet – immer mit vorheriger Abstimmung.' },
      { question: 'Wie setzen sich Ihre Kosten zusammen?', answer: 'Wir arbeiten ausschließlich mit Festpreisen. Keine Stundensätze, keine Nachkalkulation. Was wir Ihnen anbieten, kostet genau das – fertig. Einzige Ausnahme: zusätzliche Leistungen außerhalb des ursprünglichen Pakets, z.B. eine Buchungsplattform-Integration oder ein Blog-System, die vorher nicht besprochen wurden.' },
    ],
  },
  {
    group: 'Technik & Hosting',
    items: [
      { question: 'Wo wird meine Website gehostet?', answer: 'Wir hosten ausschließlich auf deutschen Servern (DSGVO-konform). Im Wartungspaket ist das Hosting inklusive – SSL-Zertifikat, tägliche Backups und Uptime-Monitoring gehören dazu.' },
      { question: 'Was beinhaltet Ihr Wartungspaket?', answer: 'Unser monatliches Wartungspaket beinhaltet: wöchentliche Sicherheitsupdates, tägliche Datensicherung, DSGVO-Aktualisierungen, 1–2 Textanpassungen pro Monat und einen persönlichen Ansprechpartner.' },
    ],
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
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
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-gold-600">{group.group}</span>
                <div className="flex-1 h-px bg-gold-500/20" />
              </div>
              <div className="space-y-2">
                {group.items.map((faq, i) => {
                  const id = `${gi}-${i}`;
                  const isOpen = openFaq === id;
                  return (
                    <div key={id} className={`rounded-xl bg-white overflow-hidden transition-all duration-200 ${isOpen ? 'border border-gold-500/40 shadow-[0_0_0_1px_rgba(212,175,55,0.15),0_4px_16px_rgba(0,0,0,0.07)]' : 'border border-slate-200 shadow-sm hover:border-slate-300'}`}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${id}`}
                        className="w-full flex cursor-pointer items-start justify-between gap-4 px-6 py-5 text-left group"
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <span className={`shrink-0 mt-0.5 w-1 self-stretch rounded-full transition-colors duration-200 ${isOpen ? 'bg-gold-500' : 'bg-slate-200 group-hover:bg-slate-300'}`} />
                          <h3 className={`text-base font-semibold leading-snug transition-colors ${isOpen ? 'text-navy-900' : 'text-slate-700 group-hover:text-navy-900'}`}>{faq.question}</h3>
                        </div>
                        <span className={`shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-gold-500/15 text-gold-600' : 'bg-slate-100 text-slate-400'}`}>
                          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      <div id={`faq-answer-${id}`} role="region" hidden={!isOpen} className="px-6 pb-6 pl-11 text-slate-500 leading-relaxed text-sm border-t border-slate-100 pt-4">
                        {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm mb-4">Ihre Frage ist nicht dabei?</p>
            <a href="#kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-md">
              Direkt fragen <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
