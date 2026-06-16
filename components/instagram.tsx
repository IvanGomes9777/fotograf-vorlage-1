import { Instagram } from "lucide-react";

import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

// Instagram handle — swap for the studio's real profile.
const IG_HANDLE = "veduta.studio";
const IG_URL = `https://instagram.com/${IG_HANDLE}`;

// Architecture / interior shots — matches the palette used across the site.
const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Treppenhaus, Beton",
    desc: "Licht & Linie · #architektur",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=70",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Wohnküche, Tageslicht",
    desc: "Interior · #zuhause",
    url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=70",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Fassade am Morgen",
    desc: "Detailstudie · #formtreu",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=70",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Loft, weite Sicht",
    desc: "Raumgefühl · #interior",
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Geländer & Schatten",
    desc: "Behind the scenes",
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=70",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Wohnzimmer, Abendlicht",
    desc: "Natürliches Licht · #studio",
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=70",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Vor Ort, am Set",
    desc: "Aus dem Studioalltag",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=70",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

export function InstagramStrip() {
  return (
    <section id="instagram" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-7 bg-accent" />
          <span className="font-mono text-[11px] tracking-[0.26em] text-accent">
            FOLGEN SIE DEM STUDIO
          </span>
          <span className="h-px w-7 bg-accent" />
        </div>

        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title={`@${IG_HANDLE}`}
          description="Neue Projekte, Lichtstudien und Blicke hinter die Kulissen — ziehen Sie ein Bild oder tippen Sie es an."
          footer={
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-18px_rgba(46,91,255,0.7)] motion-reduce:transition-none"
            >
              <Instagram className="size-4" />
              Auf Instagram folgen
              <span className="font-mono text-[12px] text-white/70 transition-colors group-hover:text-white">
                @{IG_HANDLE}
              </span>
            </a>
          }
        />
      </div>
    </section>
  );
}
