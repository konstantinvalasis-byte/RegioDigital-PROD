import { useState } from 'react';
import { Mail } from 'lucide-react';
import { FadeIn } from '../components/shared';

export default function KontaktSection() {
  const [formState, setFormState] = useState({ name: '', branche: '', telefon: '', nachricht: '', website: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.website !== '') {
      setSubmitMessage({ type: 'success', text: 'Ihre Anfrage wurde erfolgreich gesendet!' });
      setFormState({ name: '', branche: '', telefon: '', nachricht: '', website: '' });
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formState.name, branche: formState.branche, telefon: formState.telefon, nachricht: formState.nachricht }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitMessage({ type: 'success', text: data.message || 'Ihre Anfrage wurde erfolgreich gesendet!' });
        setFormState({ name: '', branche: '', telefon: '', nachricht: '', website: '' });
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Es gab ein Problem beim Senden.' });
      }
    } catch {
      setSubmitMessage({ type: 'error', text: 'Netzwerkfehler. Bitte später erneut versuchen.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" aria-label="Kontakt" className="py-16 md:py-24 px-6 md:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            {/* Linke Panel */}
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

            {/* Rechte Panel – Formular */}
            <div className="p-6 md:p-10 md:w-3/5">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
                  <label htmlFor="website">Website leer lassen</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={formState.website} onChange={(e) => setFormState({ ...formState, website: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Name / Unternehmen</label>
                  <input type="text" id="name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 outline-none transition-all text-sm" placeholder="Max Mustermann GmbH" required />
                </div>
                <div>
                  <label htmlFor="branche" className="block text-sm font-medium text-slate-700 mb-1.5">Branche</label>
                  <select id="branche" value={formState.branche} onChange={(e) => setFormState({ ...formState, branche: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 outline-none transition-all bg-white text-sm" required>
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
                  <input type="tel" id="telefon" value={formState.telefon} onChange={(e) => setFormState({ ...formState, telefon: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 outline-none transition-all text-sm" placeholder="Für einen Rückruf" required />
                </div>
                <div>
                  <label htmlFor="nachricht" className="block text-sm font-medium text-slate-700 mb-1.5">Nachricht <span className="text-slate-400 font-normal">(optional)</span></label>
                  <textarea id="nachricht" value={formState.nachricht} onChange={(e) => setFormState({ ...formState, nachricht: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 outline-none transition-all text-sm resize-none" placeholder="Was kann ich für Sie tun? Z.B. neue Website, Redesign, lokales SEO..." />
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full bg-navy-950 hover:bg-navy-900 text-white font-bold py-4 px-6 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-navy-950/20 text-sm ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}>
                  {isSubmitting ? 'Wird gesendet...' : 'Beratung anfragen'}
                </button>
                {submitMessage && (
                  <p className={`text-sm text-center ${submitMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{submitMessage.text}</p>
                )}
                <p className="text-xs text-slate-400 text-center">Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.</p>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
