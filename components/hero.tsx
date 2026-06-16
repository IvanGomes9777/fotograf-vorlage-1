"use client";

import * as React from "react";
import Image from "next/image";

// Fitting architecture imagery (Unsplash, hot-linkable). Swap for the client's
// own photography later — keep one wide ~16:9 shot for the expanding frame.
const HERO_IMG =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=75";
const BG_IMG =
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=60";

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// Fire once when the element scrolls into view.
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Count-up number; respects reduced motion (snaps to final value).
function CountUp({
  to,
  start,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  start: boolean;
  suffix?: string;
  duration?: number;
}) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return (
    <>
      {val}
      {suffix}
    </>
  );
}

// Staggered reveal wrapper.
function Reveal({
  show,
  delay = 0,
  className,
  children,
}: {
  show: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className ?? ""}`}
      style={{ transitionDelay: show ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const wrap = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef<HTMLDivElement>(null);
  const bg = React.useRef<HTMLDivElement>(null);
  const t1 = React.useRef<HTMLSpanElement>(null);
  const t2 = React.useRef<HTMLSpanElement>(null);
  const cap = React.useRef<HTMLDivElement>(null);
  const cue = React.useRef<HTMLSpanElement>(null);

  const copy = useInView<HTMLDivElement>(0.25);
  const stats = useInView<HTMLDivElement>(0.5);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = (p: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mob = vw < 768;
      const w0 = Math.min(vw * 0.82, mob ? 300 : 340);
      const h0 = Math.min(vh * 0.6, mob ? 420 : 460);
      const w = w0 + (vw - w0) * p;
      const h = h0 + (vh - h0) * p;
      if (frame.current) {
        frame.current.style.width = `${w}px`;
        frame.current.style.height = `${h}px`;
        frame.current.style.borderRadius = `${18 * (1 - p)}px`;
      }
      if (bg.current) bg.current.style.opacity = String(1 - p * 0.9);
      const shift = reduce ? 0 : p * 42;
      if (t1.current) t1.current.style.transform = `translateX(-${shift}vw)`;
      if (t2.current) t2.current.style.transform = `translateX(${shift}vw)`;
      if (cap.current) cap.current.style.opacity = String(1 - p * 1.5);
      if (cue.current) cue.current.style.opacity = String(1 - p * 1.6);
    };

    // Reduced motion: render the fully-expanded, static hero and stop.
    if (reduce) {
      apply(1);
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = wrap.current;
        if (el) {
          const total = el.offsetHeight - window.innerHeight;
          const p = clamp(total > 0 ? -el.getBoundingClientRect().top / total : 0);
          apply(p);
        }
        ticking = false;
      });
    };

    apply(0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="hero" aria-label="Einstieg" className="relative">
      <div ref={wrap} className="relative" style={{ height: "220svh" }}>
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
          {/* Background hero image — fades out as the media expands */}
          <div ref={bg} aria-hidden className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${BG_IMG})` }}
            />
            <div className="absolute inset-0 bg-paper/60" />
          </div>

          {/* Expanding media frame */}
          <div
            ref={frame}
            className="absolute overflow-hidden border border-black/10 shadow-2xl"
            style={{
              width: "min(82vw,340px)",
              height: "min(60vh,460px)",
              borderRadius: 18,
            }}
          >
            <Image
              src={HERO_IMG}
              alt="Architekturaufnahme einer Fassade in der Dämmerung"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div
              ref={cap}
              className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-center"
            >
              <span className="font-mono text-[12px] tracking-[0.2em] text-white/90">
                ARCHITEKTUR · INTERIORS
              </span>
            </div>
          </div>

          {/* Decorative split brand title (real H1 lives in the revealed content) */}
          <div
            aria-hidden
            className="pointer-events-none relative z-20 flex flex-col items-center text-white mix-blend-difference"
          >
            <span
              ref={t1}
              className="font-extrabold leading-[0.86] tracking-tight"
              style={{ fontSize: "clamp(52px,10vw,150px)" }}
            >
              VEDUTA
            </span>
            <span
              ref={t2}
              className="font-extrabold leading-[0.86] tracking-tight"
              style={{ fontSize: "clamp(52px,10vw,150px)" }}
            >
              STUDIO
            </span>
          </div>

          <span
            ref={cue}
            className="absolute bottom-6 z-20 font-mono text-[11px] tracking-[0.2em] text-ink/60 motion-safe:animate-bounce"
          >
            SCROLLEN ↓
          </span>
        </div>
      </div>

      {/* Content — staggered reveal on scroll-in */}
      <div>
        <div
          ref={copy.ref}
          className="mx-auto grid max-w-[1280px] gap-12 px-6 pb-16 pt-4 md:grid-cols-2 md:items-end md:px-10"
        >
          <div>
            <Reveal show={copy.inView} delay={0}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-accent" />
                <span className="font-mono text-[11px] tracking-[0.26em] text-accent">
                  ARCHITEKTURFOTOGRAFIE · BERLIN
                </span>
              </div>
            </Reveal>
            <Reveal show={copy.inView} delay={120}>
              <h1
                className="text-balance font-extrabold leading-[1.04] tracking-tight"
                style={{ fontSize: "clamp(34px,3.6vw,52px)" }}
              >
                Räume, dokumentiert mit{" "}
                <span className="text-accent">Präzision</span>.
              </h1>
            </Reveal>
          </div>
          <div>
            <Reveal show={copy.inView} delay={240}>
              <p className="max-w-md text-pretty text-[17px] leading-relaxed text-muted">
                Formtreue Fotografie von Architektur und Innenräumen — für
                Studios, Bauträger und Marken. Termingerecht geliefert, klar
                lizenziert.
              </p>
            </Reveal>
            <Reveal show={copy.inView} delay={360}>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <a
                  href="#kontakt"
                  className="rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  Angebot anfragen
                </a>
                <a
                  href="#projekte"
                  className="border-b-2 border-accent pb-1 text-sm font-semibold"
                >
                  Ausgewählte Arbeiten →
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div
          ref={stats.ref}
          className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-11 gap-y-6 border-t border-line px-6 py-7 md:px-10"
        >
          <div className="flex gap-10">
            <Stat show={stats.inView} to={120} suffix="+" label="PROJEKTE" delay={0} />
            <Stat show={stats.inView} to={9} suffix=" J." label="IM STUDIO" delay={120} />
            <Stat show={stats.inView} to={48} suffix="h" label="ANGEBOT IN" delay={240} />
          </div>
          <Reveal
            show={stats.inView}
            delay={360}
            className="ml-auto font-mono text-[12px] tracking-[0.16em] text-muted/80"
          >
            BÜRO · HOTELLERIE · RETAIL · WOHNEN · KULTUR
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({
  show,
  to,
  suffix,
  label,
  delay,
}: {
  show: boolean;
  to: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  return (
    <Reveal show={show} delay={delay}>
      <div className="text-2xl font-extrabold tracking-tight tabular-nums">
        <CountUp to={to} start={show} suffix={suffix} />
      </div>
      <div className="mt-1 font-mono text-[10.5px] tracking-[0.12em] text-muted">
        {label}
      </div>
    </Reveal>
  );
}
