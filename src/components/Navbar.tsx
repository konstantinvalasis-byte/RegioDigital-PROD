import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const solid = !isHome || scrolled;

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { name: 'Konzepte', href: '/#konzepte' },
    { name: 'Service',  href: '/#service'  },
    { name: 'Preise',   href: '/#preise'   },
    { name: 'FAQ',      href: '/#faq'      },
  ];

  return (
    <nav
      aria-label="Hauptnavigation"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-800 to-navy-950 shadow-lg flex items-center justify-center">
            <span className="text-gold-500 font-black text-xs tracking-tight">RD</span>
          </div>
          <span className={`text-lg font-extrabold tracking-tight transition-colors ${solid ? 'text-navy-900' : 'text-white'}`}>
            Regio<span className="text-gold-500">Digital</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold-500 ${
                solid ? 'text-slate-600' : 'text-white/80'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-navy-900 text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:-translate-y-0.5"
          >
            Beratung anfragen
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className={`md:hidden p-2 rounded-lg transition-colors hover:bg-white/10 ${solid ? 'text-navy-900' : 'text-white'}`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-5 space-y-4 animate-[fade-in_0.2s_ease_both]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-slate-700 py-3 min-h-[44px] flex items-center hover:text-navy-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100">
            <a
              href="/#kontakt"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 rounded-xl transition-colors"
            >
              Beratung anfragen
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
