import { Zap, Lock, Phone } from 'lucide-react';
import { FadeIn, SectionHeading } from '../components/shared';

export default function ServiceSection() {
  return (
    <section id="service" aria-label="Warum RegioDigital und Ablauf" className="py-16 md:py-28 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionHeading
            label="Warum RegioDigital"
            title="Konkrete Versprechen statt leere Floskeln"
            subtitle="Drei Dinge, auf die Sie sich verlassen können – schriftlich."
          />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { num: '01', icon: Zap,   title: 'In 10 Tagen live',                     text: 'Von Erstgespräch bis Go-live in 10 Werktagen. Kein monatelanges Hin und Her – Ihr Betrieb kommt schnell online.', delay: 0 },
            { num: '02', icon: Lock,  title: 'Festpreis, keine Überraschungen',       text: 'Was wir anbieten, das kostet es – nicht mehr. Keine versteckten Stunden, keine Nachberechnungen. Einmal vereinbart, fertig.', delay: 80 },
            { num: '03', icon: Phone, title: 'Ein Ansprechpartner, kein Ticketsystem', text: 'Direkt erreichbar per E-Mail und WhatsApp. Kein Callcenter, keine automatischen Antworten – ein Mensch, der antwortet.', delay: 160 },
          ].map(({ num, icon: Icon, title, text, delay }) => (
            <FadeIn key={title} delay={delay}>
              <div className="group relative bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
  );
}
