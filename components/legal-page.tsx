import Link from "next/link";

// Shared shell for the legal pages (Impressum, Datenschutz, AGB).
// Content is placeholder text — replace with the studio's real legal information.
export function LegalPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main id="top">
      <div className="mx-auto max-w-[760px] px-6 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          href="/"
          className="font-mono text-[12px] tracking-[0.12em] text-accent hover:underline"
        >
          ← ZURÜCK ZUR STARTSEITE
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-7 bg-accent" />
          <span className="font-mono text-[11px] tracking-[0.26em] text-accent">{kicker}</span>
        </div>
        <h1
          className="mt-4 font-extrabold leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(30px,4vw,48px)" }}
        >
          {title}
        </h1>
        {updated && (
          <p className="mt-3 font-mono text-[12px] tracking-[0.1em] text-muted">
            STAND: {updated}
          </p>
        )}

        <div className="legal mt-10 space-y-8">{children}</div>

        <p className="mt-14 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-muted">
          <strong className="text-ink">Hinweis:</strong> Dies ist ein Platzhaltertext für eine
          Vorlage. Bitte ersetzen Sie die Inhalte durch Ihre rechtlich geprüften Angaben.
          Dieser Text stellt keine Rechtsberatung dar.
        </p>
      </div>
    </main>
  );
}

// Small heading + body helpers to keep the pages tidy.
export function LegalSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-extrabold tracking-tight">{heading}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}
