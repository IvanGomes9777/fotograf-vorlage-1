"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Instagram, Check } from "lucide-react";

// Studio details — swap for the real contact data.
const STUDIO = {
  email: "studio@veduta.de",
  phone: "+49 30 1234567",
  location: "Berlin, DE",
  instagram: "veduta.studio",
  // Google Maps embed query (no API key required for the public embed).
  mapQuery: "Torstraße 1, 10119 Berlin, Deutschland",
} as const;

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  STUDIO.mapQuery
)}&output=embed`;

type Errors = { name?: string; email?: string; message?: string };

export function Contact() {
  const [values, setValues] = React.useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<Errors>({});
  const [sent, setSent] = React.useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Bitte Namen angeben.";
    if (!values.email.trim()) e.email = "Bitte E-Mail angeben.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Bitte gültige E-Mail angeben.";
    if (values.message.trim().length < 10)
      e.message = "Bitte etwas mehr zum Projekt schreiben (min. 10 Zeichen).";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const set = (k: keyof typeof values) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: ev.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const fieldClass = (err?: string) =>
    `mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
      err ? "border-red-400" : "border-line"
    }`;

  return (
    <section id="kontakt" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left — form */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-accent" />
              <span className="font-mono text-[11px] tracking-[0.26em] text-accent">
                PROJEKT ANFRAGEN
              </span>
            </div>
            <h2
              className="text-balance font-extrabold leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(30px,3.2vw,46px)" }}
            >
              Erzählen Sie von Ihrem Raum.
            </h2>
            <p className="mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-muted">
              Antwort innerhalb von 48&nbsp;Stunden — mit einem konkreten Angebot.
            </p>

            {sent ? (
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-line bg-white p-6">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Check className="size-5" />
                </span>
                <div>
                  <div className="font-bold">Danke, {values.name.split(" ")[0] || "und bis bald"}!</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Ihre Anfrage ist eingegangen. Sie hören innerhalb von 48&nbsp;Stunden von uns.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setValues({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 font-mono text-[12px] tracking-[0.12em] text-accent hover:underline"
                  >
                    NEUE ANFRAGE →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="font-mono text-[11px] tracking-[0.12em] text-muted">
                      NAME
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      value={values.name}
                      onChange={set("name")}
                      aria-invalid={!!errors.name}
                      className={fieldClass(errors.name)}
                      placeholder="Max Mustermann"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="font-mono text-[11px] tracking-[0.12em] text-muted">
                      E-MAIL
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      value={values.email}
                      onChange={set("email")}
                      aria-invalid={!!errors.email}
                      className={fieldClass(errors.email)}
                      placeholder="max@firma.de"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="c-message" className="font-mono text-[11px] tracking-[0.12em] text-muted">
                    NACHRICHT
                  </label>
                  <textarea
                    id="c-message"
                    rows={5}
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={!!errors.message}
                    className={fieldClass(errors.message) + " resize-none"}
                    placeholder="Wir planen eine Strecke für …"
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-18px_rgba(46,91,255,0.7)] motion-reduce:transition-none"
                >
                  Anfrage senden →
                </button>
              </form>
            )}
          </div>

          {/* Right — contact details + map */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={`mailto:${STUDIO.email}`} className="group rounded-xl border border-line bg-white p-4 transition hover:border-accent">
                <Mail className="size-4 text-accent" />
                <div className="mt-2 font-mono text-[10px] tracking-[0.14em] text-muted">E-MAIL</div>
                <div className="mt-1 font-semibold leading-snug group-hover:text-accent">{STUDIO.email}</div>
              </a>
              <a href={`tel:${STUDIO.phone.replace(/\s/g, "")}`} className="group rounded-xl border border-line bg-white p-4 transition hover:border-accent">
                <Phone className="size-4 text-accent" />
                <div className="mt-2 font-mono text-[10px] tracking-[0.14em] text-muted">TELEFON</div>
                <div className="mt-1 font-semibold leading-snug group-hover:text-accent">{STUDIO.phone}</div>
              </a>
              <div className="rounded-xl border border-line bg-white p-4">
                <MapPin className="size-4 text-accent" />
                <div className="mt-2 font-mono text-[10px] tracking-[0.14em] text-muted">STANDORT</div>
                <div className="mt-1 font-semibold leading-snug">{STUDIO.location}</div>
              </div>
              <a href={`https://instagram.com/${STUDIO.instagram}`} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-line bg-white p-4 transition hover:border-accent">
                <Instagram className="size-4 text-accent" />
                <div className="mt-2 font-mono text-[10px] tracking-[0.14em] text-muted">SOCIAL</div>
                <div className="mt-1 font-semibold leading-snug group-hover:text-accent">@{STUDIO.instagram}</div>
              </a>
            </div>

            {/* Google Maps embed */}
            <div className="relative overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Standort des Studios auf Google Maps"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[280px] w-full md:h-full md:min-h-[320px]"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted md:flex-row md:px-10">
          <a href="#top" className="font-extrabold tracking-tight text-ink">
            VEDUTA<span className="text-accent">.</span>
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer-Navigation">
            <a href="#projekte" className="hover:text-ink">Projekte</a>
            <a href="#studio" className="hover:text-ink">Studio</a>
            <a href="#leistungen" className="hover:text-ink">Leistungen</a>
            <a href="#instagram" className="hover:text-ink">Instagram</a>
          </nav>
          <span className="font-mono text-[12px] tracking-[0.1em]">© 2026 VEDUTA STUDIO · BERLIN</span>
        </div>

        {/* Legal row */}
        <div className="border-t border-line">
          <nav
            className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-5 md:px-10"
            aria-label="Rechtliches"
          >
            <a href="/impressum" className="font-mono text-[12px] tracking-[0.1em] text-muted hover:text-ink">
              Impressum
            </a>
            <a href="/datenschutz" className="font-mono text-[12px] tracking-[0.1em] text-muted hover:text-ink">
              Datenschutz
            </a>
            <a href="/agb" className="font-mono text-[12px] tracking-[0.1em] text-muted hover:text-ink">
              AGB
            </a>
            <a href="/datenschutz#cookies" className="font-mono text-[12px] tracking-[0.1em] text-muted hover:text-ink">
              Cookie-Einstellungen
            </a>
          </nav>
        </div>
      </footer>
    </section>
  );
}
