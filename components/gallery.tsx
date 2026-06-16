"use client";

import * as React from "react";
import Image from "next/image";

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

type Frame = {
  src: string;
  label: string;
  ox: number; // x offset in vw from center
  oy: number; // y offset in vh from center
  w: number; // base width in vw
  h: number; // base height in vh
};

// 7-frame cluster. Each can become the focused image that zooms to fill.
const FRAMES: Frame[] = [
  { src: "1486406146926-c627a92ad1ab", label: "Fassade · Dämmerung", ox: 0, oy: 0, w: 24, h: 32 },
  { src: "1487958449943-2429e8be8625", label: "Skyline · Langzeit", ox: 20, oy: -24, w: 30, h: 26 },
  { src: "1449157291145-7efd050a4d0e", label: "Treppe · vertikal", ox: -26, oy: -6, w: 18, h: 40 },
  { src: "1501183638710-841dd1904471", label: "Atrium · Licht", ox: 26, oy: 2, w: 22, h: 24 },
  { src: "1429497419816-9ca5cfb4571a", label: "Beton · Textur", ox: 6, oy: 26, w: 20, h: 24 },
  { src: "1511818966892-d7d671e672a2", label: "Lobby · Weitwinkel", ox: -22, oy: 24, w: 26, h: 24 },
  { src: "1494526585095-c41746248156", label: "Dach · Horizont", ox: 24, oy: 20, w: 16, h: 18 },
];

const url = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=65`;

const OUT_SCALE = 6.5; // how far non-focused frames fly out

export function Gallery() {
  const wrap = React.useRef<HTMLDivElement>(null);
  const wrappers = React.useRef<(HTMLDivElement | null)[]>([]);
  const inners = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = React.useState(0);
  const activeRef = React.useRef(0);
  const progRef = React.useRef(0);

  const fillScale = (f: Frame) => Math.max(100 / f.w, 100 / f.h) * 1.08;

  const render = React.useCallback((p: number) => {
    progRef.current = p;
    FRAMES.forEach((f, i) => {
      const wrapEl = wrappers.current[i];
      const inner = inners.current[i];
      if (!wrapEl || !inner) return;
      if (i === activeRef.current) {
        wrapEl.style.transform = "none";
        wrapEl.style.zIndex = "30";
        inner.style.opacity = "1";
        inner.style.transform = `translate(${-f.ox * p}vw, ${-f.oy * p}vh) scale(${
          1 + (fillScale(f) - 1) * p
        })`;
        inner.style.pointerEvents = "auto";
      } else {
        wrapEl.style.transform = `scale(${1 + (OUT_SCALE - 1) * p})`;
        wrapEl.style.zIndex = "10";
        inner.style.transform = "none";
        inner.style.opacity = "1"; // keep the other frames fully visible (no fade)
        inner.style.pointerEvents = p > 0.4 ? "none" : "auto";
      }
    });
  }, []);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    render(0);
    if (reduce) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = wrap.current;
        if (el) {
          const total = el.offsetHeight - window.innerHeight;
          const p = clamp(total > 0 ? -el.getBoundingClientRect().top / total : 0);
          render(p);
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [render]);

  const choose = (i: number) => {
    if (i === activeRef.current) return;
    activeRef.current = i;
    setActive(i);
    // Smooth the switch with a brief transition, then hand back to scroll.
    [...wrappers.current, ...inners.current].forEach((el) => {
      if (el) el.style.transition = "transform .6s cubic-bezier(.2,.7,.2,1), opacity .5s ease";
    });
    render(progRef.current);
    window.setTimeout(() => {
      [...wrappers.current, ...inners.current].forEach((el) => {
        if (el) el.style.transition = "";
      });
    }, 650);
  };

  return (
    <section id="projekte" className="relative bg-paper">
      {/* lead-in */}
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="reveal-base font-mono text-[12px] tracking-[0.28em] text-accent">
          AUSGEWÄHLTE PROJEKTE · IM ZOOM
        </div>
        <h2
          className="mt-5 font-extrabold leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(46px,7vw,96px)" }}
        >
          Die Galerie
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-muted">
          Scrollen Sie — die Aufnahme entfaltet sich aus der Mitte. Tippen Sie ein
          anderes Bild an, um es in den Zoom zu nehmen.
        </p>
      </div>

      {/* zoom stage */}
      <div ref={wrap} className="relative" style={{ height: "320svh" }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute left-6 top-6 z-40 font-mono text-[11px] tracking-[0.2em] text-muted">
            THE GALLERY / 01—0{FRAMES.length}
          </div>
          <div className="absolute right-6 top-6 z-40 font-mono text-[11px] tracking-[0.18em] text-accent">
            ZOOM · PARALLAX
          </div>

          {FRAMES.map((f, i) => (
            <div
              key={f.src}
              ref={(n) => {
                wrappers.current[i] = n;
              }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <button
                ref={(n) => {
                  inners.current[i] = n;
                }}
                onClick={() => choose(i)}
                aria-label={`${f.label} in den Zoom nehmen`}
                aria-pressed={active === i}
                className="group relative overflow-hidden rounded-[3px] border border-black/10 shadow-[0_28px_64px_-32px_rgba(0,0,0,0.35)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{
                  width: `${f.w}vw`,
                  height: `${f.h}vh`,
                  cursor: active === i ? "default" : "zoom-in",
                }}
              >
                <Image
                  src={url(f.src)}
                  alt={f.label}
                  fill
                  sizes="(max-width:768px) 90vw, 30vw"
                  className="object-cover"
                />
                <span
                  className={`absolute left-3 bottom-2.5 font-mono text-[10px] tracking-[0.1em] text-white drop-shadow ${
                    active === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  } transition-opacity`}
                >
                  {f.label}
                </span>
                {active === i && (
                  <span className="pointer-events-none absolute inset-0 rounded-[3px] ring-2 ring-accent/70" />
                )}
              </button>
            </div>
          ))}

          {/* vignette */}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(250,250,248,0.85) 100%)",
            }}
          />
          <span className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-muted motion-safe:animate-bounce">
            SCROLLEN ↓
          </span>
        </div>
      </div>
    </section>
  );
}
