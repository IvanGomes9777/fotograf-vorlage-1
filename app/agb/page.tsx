import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "AGB | VEDUTA Studio",
  description: "Allgemeine Geschäftsbedingungen der VEDUTA Studio.",
  robots: { index: false, follow: true },
};

export default function AgbPage() {
  return (
    <LegalPage
      kicker="RECHTLICHES"
      title="Allgemeine Geschäftsbedingungen"
      updated="Juni 2026"
    >
      <LegalSection heading="§ 1 Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über fotografische
          Leistungen zwischen VEDUTA Studio (nachfolgend „Studio") und dem Auftraggeber.
        </p>
      </LegalSection>

      <LegalSection heading="§ 2 Vertragsschluss & Leistungsumfang">
        <p>
          Der Vertrag kommt mit schriftlicher Auftragsbestätigung des Studios zustande. Der konkrete
          Leistungsumfang (Aufnahmetag, Bildanzahl, Bearbeitung, Lieferfrist) ergibt sich aus dem
          jeweiligen Angebot.
        </p>
      </LegalSection>

      <LegalSection heading="§ 3 Preise & Zahlung">
        <p>
          Es gelten die im Angebot genannten Preise zzgl. der gesetzlichen Umsatzsteuer. Rechnungen
          sind innerhalb von 14 Tagen ohne Abzug zur Zahlung fällig.
        </p>
      </LegalSection>

      <LegalSection heading="§ 4 Nutzungsrechte & Urheberrecht">
        <p>
          Das Urheberrecht an allen erstellten Aufnahmen verbleibt beim Studio. Der Auftraggeber
          erhält die im Angebot beschriebenen Nutzungsrechte. Eine Weitergabe oder Bearbeitung der
          Bilder bedarf der vorherigen Zustimmung.
        </p>
      </LegalSection>

      <LegalSection heading="§ 5 Stornierung & Termine">
        <p>
          Vereinbarte Termine können bis 48 Stunden vorher kostenfrei verschoben werden. Bei
          kurzfristigeren Absagen kann ein angemessener Ausfallbetrag berechnet werden.
        </p>
      </LegalSection>

      <LegalSection heading="§ 6 Haftung">
        <p>
          Das Studio haftet nach den gesetzlichen Bestimmungen. Für leicht fahrlässig verursachte
          Schäden ist die Haftung auf vertragstypische, vorhersehbare Schäden begrenzt.
        </p>
      </LegalSection>

      <LegalSection heading="§ 7 Schlussbestimmungen">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen unwirksam
          sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
