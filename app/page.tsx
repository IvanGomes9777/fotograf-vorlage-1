// Section-by-section build. Sektion 01 (Navbar) is live in the layout.
// The placeholders below let the nav's anchors + scroll-spy work and mark
// where the next sections (Hero, Projekte, …) will be implemented.

const PLACEHOLDERS = [
  { id: "projekte", title: "Projekte" },
  { id: "studio", title: "Studio" },
  { id: "leistungen", title: "Leistungen" },
  { id: "faq", title: "FAQ" },
  { id: "kontakt", title: "Kontakt" },
] as const;

export default function Home() {
  return (
    <main id="top">
      <section
        id="hero"
        className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
      >
        <p className="font-mono text-xs tracking-[0.24em] text-accent">
          VEDUTA STUDIO · SEKTION 01 — NAVBAR FERTIG
        </p>
        <h1 className="mt-5 max-w-2xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          Floating Island Navbar steht.
        </h1>
        <p className="mt-4 max-w-md text-pretty text-muted">
          Scrolle nach unten — die Pille löst sich vom Rand, schrumpft und bekommt
          Schatten. Hover über die Links für das gleitende Highlight. Auf dem Handy
          öffnet der Button das Slide-in-Menü.
        </p>
        <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-muted">
          SCROLL ↓
        </p>
      </section>

      {PLACEHOLDERS.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="flex min-h-[80vh] items-center justify-center border-t border-line"
        >
          <span className="font-mono text-sm tracking-[0.2em] text-muted">
            {s.title.toUpperCase()} · folgt als nächste Sektion
          </span>
        </section>
      ))}
    </main>
  );
}
