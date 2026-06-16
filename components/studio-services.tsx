"use client";

import * as React from "react";
import Image from "next/image";

// Portrait for the studio block — swap for the photographer's own image later.
const PORTRAIT_IMG =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=70";

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

// Staggered reveal wrapper (matches the hero's pattern).
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

// Subtle 3D tilt on the portrait; no-op under reduced motion.
function useTilt<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const parent = el.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.03)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

const PRINCIPLES = [
  {
    k: "FORMTREU",
    t: "Geraden bleiben gerade",
    d: "Perspektiven werden korrigiert, Proportionen gewahrt — Architektur wie geplant.",
  },
  {
    k: "NATÜRLICHES LICHT",
    t: "Stimmung statt Effekt",
    d: "Vorhandenes Licht, behutsam ergänzt. Räume wirken so, wie man sie erlebt.",
  },
  {
    k: "KLAR LIZENZIERT",
    t: "Rechte ohne Kleingedrucktes",
    d: "Transparente Nutzungsrechte, sauber dokumentiert und planbar.",
  },
] as const;

type Tier = {
  name: string;
  price: string;
  unit: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "EDITORIAL",
    price: "€1.200",
    unit: "/ Tag",
    blurb: "Magazin- & Studio-Strecken mit klarer Bildsprache.",
    features: [
      "Bis zu 1 Tag vor Ort",
      "15–25 final bearbeitete Bilder",
      "Web-Lizenz inklusive",
      "Lieferung in 7 Werktagen",
    ],
  },
  {
    name: "COMMERCIAL",
    price: "€2.400",
    unit: "/ Projekt",
    blurb: "Art-directed Kampagnen über mehrere Räume.",
    features: [
      "Multi-Raum, art-directed",
      "30–50 final bearbeitete Bilder",
      "Web- & Social-Lizenz",
      "Express-Lieferung möglich",
    ],
    featured: true,
  },
  {
    name: "ARCHITECTURE",
    price: "€3.600",
    unit: "/ Projekt",
    blurb: "Vollständige Gebäudedokumentation, innen wie außen.",
    features: [
      "Ganztägig, Innen + Außen",
      "50+ final bearbeitete Bilder",
      "Erweiterte Print-Lizenz",
      "Getetherter Workflow",
    ],
  },
];

const WORKFLOW = [
  { n: "01", t: "Briefing & Umfang", d: "Räume, Stimmung, Lizenz und Zeitplan abstimmen." },
  { n: "02", t: "Shooting", d: "Vor Ort, natürliches + ergänzendes Licht, getethert." },
  { n: "03", t: "Auswahl & Bearbeitung", d: "Kuratiert, formtreu, zeitlos — nie überzogen." },
  { n: "04", t: "Lieferung & Lizenz", d: "Web- + Print-Dateien, klare Nutzungsrechte." },
] as const;

const DELIVERY = [
  { k: "LIEFERUNG", v: "Web- & Print-Dateien über eine private Galerie zum Download." },
  { k: "LIZENZ", v: "Nutzungsrechte schriftlich fixiert — keine versteckten Folgekosten." },
  { k: "RAW-DATEN", v: "Originaldateien auf Wunsch archiviert und nachlieferbar." },
] as const;

function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export function StudioServices() {
  const about = useInView<HTMLDivElement>(0.2);
  const intro = useInView<HTMLDivElement>(0.3);
  const cards = useInView<HTMLDivElement>(0.15);
  const flow = useInView<HTMLDivElement>(0.2);
  const portrait = useTilt<HTMLDivElement>();

  return (
    <>
      {/* ───────────────── ÜBER DAS STUDIO — Editorial Two-Column ───────────────── */}
      <section id="studio" className="border-t border-line bg-paper">
        <div
          ref={about.ref}
          className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28"
        >
          {/* Left — sticky portrait with tilt */}
          <div className="md:sticky md:top-24 md:self-start">
            <Reveal show={about.inView}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line shadow-2xl">
                <div ref={portrait} className="absolute inset-0 transition-transform duration-300">
                  <Image
                    src={PORTRAIT_IMG}
                    alt="Porträt des Studio-Gründers vor einer Fassade"
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-white/90">
                    VEDUTA · BERLIN
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.22em] text-white/70">
                    EST. 2017
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — copy + principles */}
          <div>
            <Reveal show={about.inView} delay={80}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-accent" />
                <span className="font-mono text-[11px] tracking-[0.26em] text-accent">
                  ÜBER DAS STUDIO
                </span>
              </div>
            </Reveal>
            <Reveal show={about.inView} delay={160}>
              <h2
                className="text-balance font-extrabold leading-[1.06] tracking-tight"
                style={{ fontSize: "clamp(30px,3.2vw,46px)" }}
              >
                Ein präziser Blick dafür, wie Gebäude wirklich leben.
              </h2>
            </Reveal>
            <Reveal show={about.inView} delay={240}>
              <p className="mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-muted">
                VEDUTA ist ein Ein-Personen-Studio für Architekten, Bauträger und
                Interior-Marken. Struktur, fotografiert wie sie erlebt wird — das
                Licht über einer Fassade, die Ruhe eines fertig eingerichteten Raums.
              </p>
            </Reveal>
            <Reveal show={about.inView} delay={320}>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted">
                Jedes Projekt wird persönlich betreut — vom ersten Briefing bis zur
                lizenzierten Datei. Keine Massenproduktion, sondern eine kuratierte
                Auswahl, die Ihre Arbeit langfristig repräsentiert.
              </p>
            </Reveal>
            <Reveal show={about.inView} delay={400}>
              <div className="mt-7 flex items-center gap-4">
                <span className="font-mono text-sm font-bold tracking-tight">
                  M. Keller
                </span>
                <span className="h-px w-6 bg-line" />
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted">
                  GRÜNDER & FOTOGRAF
                </span>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.k} show={about.inView} delay={460 + i * 90}>
                  <div className="h-full rounded-xl border border-line bg-white p-4">
                    <div className="font-mono text-[10px] tracking-[0.14em] text-accent">
                      {p.k}
                    </div>
                    <div className="mt-2 font-bold leading-snug">{p.t}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── LEISTUNGEN & INVESTITION ───────────────── */}
      <section id="leistungen" className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div ref={intro.ref} className="max-w-2xl">
            <Reveal show={intro.inView}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-accent" />
                <span className="font-mono text-[11px] tracking-[0.26em] text-accent">
                  LEISTUNGEN & INVESTITION
                </span>
              </div>
            </Reveal>
            <Reveal show={intro.inView} delay={120}>
              <h2
                className="text-balance font-extrabold leading-[1.04] tracking-tight"
                style={{ fontSize: "clamp(32px,3.6vw,52px)" }}
              >
                Klare Pakete, klare Lizenzen.
              </h2>
            </Reveal>
            <Reveal show={intro.inView} delay={200}>
              <p className="mt-5 text-pretty text-[17px] leading-relaxed text-muted">
                Drei Ausgangspunkte — jedes Projekt wird auf Umfang, Räume und
                Nutzung zugeschnitten. Preise verstehen sich als Richtwert exkl. MwSt.
              </p>
            </Reveal>
          </div>

          {/* Pricing tiers with what's included */}
          <div ref={cards.ref} className="mt-12 grid gap-5 md:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} show={cards.inView} delay={i * 120} className="h-full">
                <div
                  className={`group flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1.5 motion-reduce:transition-none ${
                    t.featured
                      ? "bg-ink text-white shadow-[0_40px_80px_-36px_rgba(46,91,255,0.6)]"
                      : "border border-line bg-white hover:shadow-2xl"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[10px] tracking-[0.16em] ${
                        t.featured ? "text-white/60" : "text-muted"
                      }`}
                    >
                      {t.name}
                    </span>
                    {t.featured && (
                      <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] tracking-wide text-white">
                        AM HÄUFIGSTEN
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight">{t.price}</span>
                    <span
                      className={`text-sm font-normal ${
                        t.featured ? "text-white/60" : "text-muted"
                      }`}
                    >
                      {t.unit}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      t.featured ? "text-white/70" : "text-muted"
                    }`}
                  >
                    {t.blurb}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className={`flex gap-2.5 text-sm ${
                          t.featured ? "text-white/90" : "text-ink"
                        }`}
                      >
                        <span className="text-accent">
                          <Check />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#kontakt"
                    className={`mt-7 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:transition-none ${
                      t.featured
                        ? "bg-accent text-white"
                        : "border border-line text-ink hover:border-accent hover:text-accent"
                    }`}
                  >
                    {t.name.charAt(0) + t.name.slice(1).toLowerCase()} anfragen
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Workflow — fills the area after the prices */}
          <div ref={flow.ref} className="mt-20">
            <Reveal show={flow.inView}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-10">
                <h3 className="text-xl font-extrabold tracking-tight">So läuft es ab</h3>
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted">
                  VON DER IDEE ZUR LIZENZIERTEN AUFNAHME
                </span>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {WORKFLOW.map((s, i) => (
                <Reveal key={s.n} show={flow.inView} delay={i * 100}>
                  <div className="h-full rounded-xl border border-line bg-white p-5">
                    <div className="font-mono text-sm font-bold text-accent">{s.n}</div>
                    <div className="mt-3 font-bold leading-snug">{s.t}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Delivery & licensing details */}
          <div className="mt-12 grid gap-5 rounded-2xl border border-line bg-white p-6 sm:grid-cols-3 md:p-8">
            {DELIVERY.map((d) => (
              <div key={d.k}>
                <div className="font-mono text-[10px] tracking-[0.16em] text-accent">{d.k}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.v}</p>
              </div>
            ))}
          </div>

          {/* Closing CTA band */}
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink p-8 text-white md:flex-row md:items-center md:p-10">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] text-accent">
                EIN PROJEKT IM KOPF?
              </div>
              <p className="mt-3 max-w-md text-pretty text-lg font-semibold leading-snug">
                Erzählen Sie mir von Ihrem Raum — Sie erhalten innerhalb von 48 Stunden
                ein konkretes Angebot.
              </p>
            </div>
            <a
              href="#kontakt"
              className="shrink-0 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              Angebot anfragen
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
