import React from 'react';

const Impressum: React.FC = () => {
  return (
    <main className="py-20 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">Impressum</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4">Angaben gemäß § 5 TMG</h2>
          <p className="text-gray-600 leading-relaxed">
            Konstantin Valasis<br />
            RegioDigital Webdesign<br />
            Darmstädter Str. 7<br />
            70376 Stuttgart
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4">Kontakt</h2>
          <p className="text-gray-600 leading-relaxed">
            E-Mail: <a href="mailto:hallo@regio-digital.de" className="text-petrol-600 hover:underline">hallo@regio-digital.de</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4">Kleinunternehmer gemäß § 19 UStG</h2>
          <p className="text-gray-600 leading-relaxed">
            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4">EU-Streitschlichtung</h2>
          <p className="text-gray-600 leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-petrol-600 hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-900 mb-4">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Impressum;
