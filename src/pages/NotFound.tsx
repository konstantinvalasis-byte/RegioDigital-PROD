import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center bg-slate-50 px-6 py-24">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-navy-900/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <MapPin className="w-10 h-10 text-navy-900" />
        </div>

        {/* Fehlercode */}
        <p className="text-8xl font-black text-navy-900/10 leading-none mb-4 tracking-tighter">404</p>

        {/* Überschrift */}
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-navy-900 mb-4">
          Diese Seite existiert nicht.
        </h1>

        {/* Subtext */}
        <p className="text-slate-500 leading-relaxed mb-10">
          Die gesuchte Seite wurde möglicherweise verschoben oder gelöscht. Kein Problem – von der Startseite aus finden Sie alles.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-navy-950/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Zur Startseite
          </Link>
          <a
            href="/#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-gold-500/20"
          >
            Beratung anfragen
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
