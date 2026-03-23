import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Seitenfu&szlig;zeile" className="bg-navy-950 text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-800 to-navy-950 border border-white/10 flex items-center justify-center">
            <span className="text-gold-500 font-black text-xs tracking-tight">RD</span>
          </div>
          <span className="text-white font-extrabold tracking-tight text-lg">
            Regio<span className="text-gold-500">Digital</span>
          </span>
        </div>

        {/* Tagline + Adresse */}
        <address className="not-italic text-sm text-center md:text-left">
          <p className="text-slate-300 font-medium">Professionelles Webdesign aus Stuttgart.</p>
          <p className="mt-1 text-xs">Für Handwerker, Ärzte, Gastronomie und Dienstleister.</p>
          <p className="mt-1 text-xs">
            <a href="mailto:hallo@regio-digital.de" className="hover:text-gold-500 transition-colors">hallo@regio-digital.de</a>
          </p>
          <p className="mt-1 text-xs">© {currentYear} RegioDigital. Alle Rechte vorbehalten.</p>
        </address>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
            className="hover:text-white transition-colors"
          >
            Cookies
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
