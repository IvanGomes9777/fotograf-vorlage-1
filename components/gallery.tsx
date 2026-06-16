import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

export function Gallery() {
  return (
    <section id="projekte">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-24 text-center md:px-10">
        <div className="font-mono text-[12px] tracking-[0.28em] text-accent">
          AUSGEWÄHLTE PROJEKTE
        </div>
        <h2
          className="mt-5 font-extrabold leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(46px,7vw,96px)" }}
        >
          Die Galerie
        </h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
          Eine fortlaufende Auswahl — klicken Sie ein Bild für die Vollbildansicht.
        </p>
      </div>
      <ImageAutoSlider />
    </section>
  );
}
