import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

declare function gtag(...args: unknown[]): void;

// GA-Messung-ID – hier echte ID eintragen sobald verfügbar
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

function loadGoogleAnalytics() {
  if (document.getElementById('ga-script')) return;
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  script.onload = () => {
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
  };
}

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (!savedConsent) {
      timer = setTimeout(() => setShowBanner(true), 1000);
    } else {
      const parsed: CookieConsent = JSON.parse(savedConsent);
      setConsent(parsed);
      // Gespeicherten Consent sofort an GA weitergeben
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          analytics_storage: parsed.analytics ? 'granted' : 'denied',
          ad_storage: parsed.marketing ? 'granted' : 'denied',
          ad_user_data: parsed.marketing ? 'granted' : 'denied',
          ad_personalization: parsed.marketing ? 'granted' : 'denied',
        });
      }
      if (parsed.analytics) {
        loadGoogleAnalytics();
      }
    }

    const handleOpenSettings = () => {
      setShowBanner(false);
      setShowModal(true);
    };
    window.addEventListener('openCookieSettings', handleOpenSettings);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('openCookieSettings', handleOpenSettings);
    };
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);

    // Google Consent Mode v2 aktualisieren
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: newConsent.analytics ? 'granted' : 'denied',
        ad_storage: newConsent.marketing ? 'granted' : 'denied',
        ad_user_data: newConsent.marketing ? 'granted' : 'denied',
        ad_personalization: newConsent.marketing ? 'granted' : 'denied',
      });
    }
    if (newConsent.analytics) {
      loadGoogleAnalytics();
    }
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const handleAcceptEssential = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  const handleSaveSettings = () => {
    saveConsent(consent);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[100]"
          >
            <div className="max-w-7xl mx-auto p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-navy-900 mb-2">Wir verwenden Cookies</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern. Personenbezogene Daten können verarbeitet werden (z. B. IP-Adressen), z. B. für personalisierte Anzeigen und Inhalte oder Anzeigen- und Inhaltsmessung.
                </p>
                <div className="mt-3 flex gap-4 text-sm">
                  <Link to="/impressum" className="text-petrol-600 hover:underline font-medium">Impressum</Link>
                  <Link to="/datenschutz" className="text-petrol-600 hover:underline font-medium">Datenschutz</Link>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2.5 text-sm font-medium text-navy-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  Einstellungen
                </button>
                <button 
                  onClick={handleAcceptEssential}
                  className="px-5 py-2.5 text-sm font-medium text-navy-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  Nur essenzielle
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 text-sm font-bold text-navy-900 bg-gold-500 hover:bg-gold-600 rounded-lg transition-colors whitespace-nowrap"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-2xl font-bold text-navy-900">Cookie-Einstellungen</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Essential */}
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg">Essenziell</h4>
                    <p className="text-sm text-gray-600 mt-1">Diese Cookies sind für die Grundfunktionen der Webseite zwingend erforderlich und können nicht deaktiviert werden.</p>
                  </div>
                  <div className="bg-navy-900 relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out opacity-50 cursor-not-allowed">
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </div>
                </div>
                {/* Analytics */}
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg">Statistik</h4>
                    <p className="text-sm text-gray-600 mt-1">Erfassen anonyme Statistiken, um zu verstehen, wie Besucher unsere Website nutzen. Dies hilft uns, die Website zu verbessern.</p>
                  </div>
                  <button 
                    onClick={() => setConsent({ ...consent, analytics: !consent.analytics })}
                    className={`${consent.analytics ? 'bg-navy-900' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className={`${consent.analytics ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                  </button>
                </div>
                {/* Marketing */}
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg">Marketing</h4>
                    <p className="text-sm text-gray-600 mt-1">Werden verwendet, um Besuchern auf Webseiten zu folgen. Die Absicht ist, Anzeigen zu zeigen, die relevant und ansprechend für den einzelnen Benutzer sind.</p>
                  </div>
                  <button 
                    onClick={() => setConsent({ ...consent, marketing: !consent.marketing })}
                    className={`${consent.marketing ? 'bg-navy-900' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className={`${consent.marketing ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                  </button>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button 
                  onClick={handleSaveSettings}
                  className="px-6 py-2.5 text-sm font-bold text-navy-900 bg-gold-500 hover:bg-gold-600 rounded-lg transition-colors"
                >
                  Auswahl speichern
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieBanner;
