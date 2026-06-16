// Section-by-section build. Sektion 01 (Navbar) + 02 (Hero) are live.
// The placeholders below let the nav's anchors + scroll-spy work and mark
// where the next sections (Projekte, …) will be implemented.

import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";
import { StudioServices } from "@/components/studio-services";
import { InstagramStrip } from "@/components/instagram";

const PLACEHOLDERS = [
  { id: "faq", title: "FAQ" },
  { id: "kontakt", title: "Kontakt" },
] as const;

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Gallery />
      <StudioServices />
      <InstagramStrip />

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
