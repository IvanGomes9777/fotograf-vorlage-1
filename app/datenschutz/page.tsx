import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | VEDUTA Studio",
  description: "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten.",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalPage kicker="RECHTLICHES" title="Datenschutzerklärung" updated="Juni 2026">
      <LegalSection heading="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          VEDUTA Studio, M. Keller, Torstraße 1, 10119 Berlin, Deutschland,
          E-Mail: studio@veduta.de.
        </p>
      </LegalSection>

      <LegalSection heading="2. Erhebung und Verarbeitung personenbezogener Daten">
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung der Website
          sowie zur Bearbeitung Ihrer Anfragen erforderlich ist. Rechtsgrundlagen sind insbesondere
          Art. 6 Abs. 1 lit. a, b und f DSGVO.
        </p>
      </LegalSection>

      <LegalSection heading="3. Kontaktformular">
        <p>
          Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
          Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
          Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
        </p>
      </LegalSection>

      <LegalSection heading="4. Hosting">
        <p>
          Diese Website wird bei einem externen Dienstleister gehostet. Personenbezogene Daten, die
          auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
        </p>
      </LegalSection>

      <LegalSection heading="5. Google Maps">
        <p>
          Diese Seite bindet Kartenmaterial des Dienstes Google Maps (Google Ireland Limited) ein.
          Beim Aufruf der Kontaktseite kann eine Verbindung zu Servern von Google hergestellt werden,
          wobei Ihre IP-Adresse übertragen wird. Weitere Informationen finden Sie in der
          Datenschutzerklärung von Google.
        </p>
      </LegalSection>

      <LegalSection id="cookies" heading="6. Cookies & Cookie-Einstellungen">
        <p>
          Diese Vorlage setzt standardmäßig keine nicht notwendigen Cookies und kein Tracking ein.
          Technisch notwendige Cookies können erforderlich sein, um grundlegende Funktionen
          bereitzustellen.
        </p>
        <p>
          Sobald Analyse- oder Marketing-Dienste ergänzt werden, sollte hier ein
          Cookie-Consent-Tool eingebunden werden, über das sich Ihre Einwilligung verwalten und
          jederzeit widerrufen lässt.
        </p>
      </LegalSection>

      <LegalSection heading="7. Ihre Rechte">
        <p>
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
          Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Zudem steht Ihnen ein
          Beschwerderecht bei einer Aufsichtsbehörde zu.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
