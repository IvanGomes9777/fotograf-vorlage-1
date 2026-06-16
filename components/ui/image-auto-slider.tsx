"use client";

import * as React from "react";
import { X } from "lucide-react";

// Architecture/interior imagery (images.unsplash.com → allowed by our CSP).
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=75",
];

function Row({
  images,
  reverse,
  onPick,
}: {
  images: string[];
  reverse?: boolean;
  onPick: (src: string) => void;
}) {
  // Duplicate for a seamless -50% loop.
  const duplicated = [...images, ...images];
  return (
    <div className="w-full overflow-hidden">
      <div
        className={`flex w-max gap-4 animate-scroll-x hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {duplicated.map((src, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onPick(src)}
            aria-label={`Bild ${(index % images.length) + 1} im Vollbild öffnen`}
            className="group h-40 w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:h-48 md:w-48 lg:h-56 lg:w-56"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Galerie ${(index % images.length) + 1}`}
              loading="lazy"
              className="h-full w-full cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ImageAutoSlider({
  images = DEFAULT_IMAGES,
}: {
  images?: string[];
}) {
  const [active, setActive] = React.useState<string | null>(null);

  // Second row: rotated order so it reads as a continuation, not a mirror.
  const rowTwo = React.useMemo(() => {
    const half = Math.ceil(images.length / 2);
    return [...images.slice(half), ...images.slice(0, half)];
  }, [images]);

  // Lightbox: lock scroll + close on Escape.
  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <div className="relative w-full overflow-hidden bg-ink py-10">
      <div className="relative z-10 flex w-full flex-col gap-4">
        <Row images={images} onPick={setActive} />
        <Row images={rowTwo} reverse onPick={setActive} />
      </div>

      {/* Fullscreen lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vollbildansicht"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm animate-in fade-in"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Schließen"
            className="absolute right-5 top-5 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="size-7" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active}
            alt="Vollbildansicht"
            className="max-h-[92vh] max-w-[92vw] rounded-lg object-contain shadow-2xl animate-in zoom-in-95"
          />
        </div>
      )}
    </div>
  );
}
