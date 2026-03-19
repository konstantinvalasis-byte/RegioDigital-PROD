import React from 'react';

const Datenschutz: React.FC = () => {
  return (
    <main className="py-20 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">Datenschutzerklärung</h1>
        <p className="text-sm text-gray-400 mb-10">Stand: März 2026</p>

        {/* 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-navy-900 mb-4">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-base font-semibold text-navy-900 mb-2">Allgemeine Hinweise</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
            Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
            Text aufgeführten Datenschutzerklärung.
          </p>
          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Datenerfassung auf dieser Website
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
            <br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
            Kontaktdaten können Sie dem Abschnitt „Verantwortliche Stelle" in dieser
            Datenschutzerklärung entnehmen.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Wie erfassen wir Ihre Daten?</strong>
            <br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z.&nbsp;B.
            über unser Kontaktformular. Andere Daten werden automatisch oder nach Ihrer
            Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
            allem technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder Uhrzeit des
            Seitenaufrufs).
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Wofür nutzen wir Ihre Daten?</strong>
            <br />
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
            gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet
            werden.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
            <br />
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
            Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
            Recht auf Berichtigung oder Löschung dieser Daten. Wenn Sie eine Einwilligung zur
            Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die
            Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die
            Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des
            Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          </p>
        </section>

        {/* 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-navy-900 mb-4">2. Hosting</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Wir hosten die Inhalte unserer Website bei den folgenden Anbietern:
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">GitHub Pages</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Anbieter ist die GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA
            (nachfolgend „GitHub"). Wenn Sie unsere Website besuchen, erfasst GitHub bestimmte
            Protokolldaten (sog. Server-Logfiles), darunter Ihre IP-Adresse.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            GitHub ist nach dem EU-US Data Privacy Framework zertifiziert. Die Übermittlung von
            Daten in die USA erfolgt auf Grundlage des Angemessenheitsbeschlusses der
            EU-Kommission (Art. 45 DSGVO) sowie auf Basis der Standardvertragsklauseln (Art. 46
            Abs. 2 DSGVO). Weitere Informationen finden Sie in der Datenschutzerklärung von
            GitHub:{' '}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-petrol-600 hover:underline break-all"
            >
              https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
            </a>
            .
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">Vercel</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Anbieter ist die Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
            (nachfolgend „Vercel"). Vercel stellt eine Infrastruktur für Hosting und Deployment
            bereit. Beim Aufruf unserer Website werden durch Vercel automatisch Server-Logfiles
            erfasst, die u.&nbsp;a. IP-Adressen, Browsertyp und Betriebssystem enthalten können.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Die Übermittlung von Daten in die USA erfolgt auf Grundlage der
            Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO). Weitere
            Informationen finden Sie in der Datenschutzerklärung von Vercel:{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-petrol-600 hover:underline"
            >
              https://vercel.com/legal/privacy-policy
            </a>
            .
          </p>
          <p className="text-gray-600 leading-relaxed">
            Die Nutzung von GitHub und Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
            DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen
            Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde,
            erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
          </p>
        </section>

        {/* 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-navy-900 mb-4">
            3. Allgemeine Hinweise und Pflichtinformationen
          </h2>

          <h3 className="text-base font-semibold text-navy-900 mb-2">Datenschutz</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
            behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
            Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden
            können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und
            wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Verantwortliche Stelle
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            <br />
            <br />
            Konstantin Valasis
            <br />
            RegioDigital Webdesign
            <br />
            Darmstädter Str. 7
            <br />
            70376 Stuttgart
            <br />
            <br />
            E-Mail:{' '}
            <a href="mailto:hallo@regio-digital.de" className="text-petrol-600 hover:underline">
              hallo@regio-digital.de
            </a>
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">Speicherdauer</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
            wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
            Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen
            oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht,
            sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
            personenbezogenen Daten haben (z.&nbsp;B. steuer- oder handelsrechtliche
            Aufbewahrungsfristen); im letzteren Fall erfolgt die Löschung nach Fortfall dieser
            Gründe.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre
            personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9
            Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO
            verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung
            personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf
            Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies
            oder in den Zugriff auf Informationen in Ihr Endgerät eingewilligt haben (z.&nbsp;B.
            via Device-Fingerprinting), erfolgt die Datenverarbeitung zusätzlich auf Grundlage
            von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten
            zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich,
            verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des
            Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen
            Verpflichtung erforderlich sind, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die
            Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach
            Art. 6 Abs. 1 lit. f DSGVO erfolgen.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA oder sonstigen
            datenschutzrechtlich nicht sicheren Drittstaaten. Wenn diese Tools aktiv sind, können
            Ihre personenbezogene Daten in diese Drittstaaten übertragen und dort verarbeitet
            werden. Wir weisen darauf hin, dass in diesen Ländern kein mit der EU vergleichbares
            Datenschutzniveau garantiert werden kann. Wir übertragen personenbezogene Daten in
            solche Länder nur, wenn ein angemessenes Schutzniveau besteht, z.&nbsp;B. durch
            EU-Standardvertragsklauseln oder ein Angemessenheitsbeschluss der EU-Kommission.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Widerruf Ihrer Einwilligung zur Datenverarbeitung
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
            möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die
            Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
            unberührt.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Beschwerderecht bei der zuständigen Aufsichtsbehörde
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei
            einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen
            Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das
            Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
            gerichtlicher Rechtsbehelfe.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Recht auf Datenübertragbarkeit
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
            Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in
            einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die
            direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt
            dies nur, soweit es technisch machbar ist.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Auskunft, Berichtigung und Löschung
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
            unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren
            Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf
            Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
            personenbezogene Daten können Sie sich jederzeit an uns wenden.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Recht auf Einschränkung der Verarbeitung
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
            zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf
            Einschränkung der Verarbeitung besteht in folgenden Fällen:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mt-2 ml-4 space-y-1">
            <li>
              Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten
              bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen.
            </li>
            <li>
              Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht,
              können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
            </li>
            <li>
              Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur
              Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben
              Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen.
            </li>
            <li>
              Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine
              Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch
              nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </li>
          </ul>
        </section>

        {/* 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-navy-900 mb-4">
            4. Datenerfassung auf dieser Website
          </h2>

          <h3 className="text-base font-semibold text-navy-900 mb-2">Server-Log-Dateien</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
            Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 ml-4 space-y-1">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-6">
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
            Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien
            Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files
            erfasst werden.
          </p>

          <h3 className="text-base font-semibold text-navy-900 mb-2">Kontaktformular</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
            dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
            Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
            sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
            Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
            beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
            Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
            Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns
            zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
            für die Datenspeicherung entfällt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihrer
            Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen –
            bleiben unberührt.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold text-navy-900 mb-4">5. Plugins und Tools</h2>

          <h3 className="text-base font-semibold text-navy-900 mb-2">
            Google Fonts (lokales Hosting)
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Google Fonts. Google
            Fonts sind lokal installiert, d.&nbsp;h. es findet keine Verbindung zu Servern von
            Google statt. Weitere Informationen zu Google Fonts finden Sie unter{' '}
            <a
              href="https://developers.google.com/fonts/faq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-petrol-600 hover:underline"
            >
              https://developers.google.com/fonts/faq
            </a>{' '}
            und in der Datenschutzerklärung von Google:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-petrol-600 hover:underline"
            >
              https://policies.google.com/privacy
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
};

export default Datenschutz;
