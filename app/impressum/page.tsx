import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Impressum | VEDUTA Studio",
  description: "Impressum und Anbieterkennzeichnung der VEDUTA Studio.",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalPage kicker="RECHTLICHES" title="Impressum">
      <LegalSection heading="Angaben gemäß § 5 DDG">
        <p>
          VEDUTA Studio
          <br />
          M. Keller
          <br />
          Torstraße 1
          <br />
          10119 Berlin
          <br />
          Deutschland
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: +49 30 1234567
          <br />
          E-Mail: studio@veduta.de
        </p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer-ID">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          DE000000000
        </p>
      </LegalSection>

      <LegalSection heading="Redaktionell verantwortlich">
        <p>
          M. Keller, Anschrift wie oben.
        </p>
      </LegalSection>

      <LegalSection heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a className="text-accent hover:underline" href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
