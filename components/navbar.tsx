"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const LINKS = [
  { href: "#projekte", label: "Projekte" },
  { href: "#studio", label: "Studio" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const navRef = React.useRef<HTMLDivElement>(null);
  const linkRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hl, setHl] = React.useState({ left: 0, width: 0, opacity: 0 });

  // Scroll: detach/shrink state + scroll-spy for active section.
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = "";
      for (const l of LINKS) {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top - 120 <= 0) current = l.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding pill highlight — the signature micro-interaction of this nav.
  const moveHighlight = React.useCallback(
    (href: string | null) => {
      const key = href ?? active;
      const el = key ? linkRefs.current[key] : null;
      const container = navRef.current;
      if (!el || !container) {
        setHl((h) => ({ ...h, opacity: 0 }));
        return;
      }
      const c = container.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setHl({ left: r.left - c.left, width: r.width, opacity: 1 });
    },
    [active]
  );

  React.useEffect(() => {
    moveHighlight(null);
  }, [active, scrolled, moveHighlight]);
  React.useEffect(() => {
    const onResize = () => moveHighlight(null);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [moveHighlight]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-[padding] duration-300 motion-reduce:transition-none"
      style={{ paddingTop: scrolled ? 10 : 18 }}
    >
      <nav
        aria-label="Hauptnavigation"
        className={cn(
          "flex animate-fade-down items-center gap-1 rounded-full border border-line bg-white/80 px-2 py-1.5 backdrop-blur transition-all duration-300 motion-reduce:transition-none motion-reduce:animate-none",
          scrolled
            ? "scale-95 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.28)]"
            : "scale-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]"
        )}
      >
        <a
          href="#top"
          className="rounded-full px-3 text-[15px] font-extrabold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          VEDUTA<span className="text-accent">.</span>
        </a>

        {/* Desktop links + moving highlight */}
        <div
          ref={navRef}
          className="relative hidden items-center md:flex"
          onMouseLeave={() => moveHighlight(null)}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-black/[0.06] transition-all duration-300 motion-reduce:transition-none"
            style={{
              left: hl.left,
              width: hl.width,
              height: 36,
              opacity: hl.opacity,
            }}
          />
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              ref={(n) => {
                linkRefs.current[l.href] = n;
              }}
              onMouseEnter={() => moveHighlight(l.href)}
              aria-current={active === l.href ? "page" : undefined}
              className={cn(
                "relative z-10 rounded-full px-3.5 py-2 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                active === l.href ? "text-ink" : "text-muted hover:text-ink"
              )}
            >
              {l.label}
            </a>
          ))}
        </div>

        <Button asChild size="sm" className="ml-1 hidden rounded-full md:inline-flex">
          <a href="#kontakt">Anfragen</a>
        </Button>

        {/* Mobile: hamburger → slide-in sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 rounded-full md:hidden"
              aria-label="Menü öffnen"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[84%] max-w-sm">
            <SheetTitle className="font-extrabold tracking-tight">
              VEDUTA<span className="text-accent">.</span>
            </SheetTitle>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile Navigation">
              {LINKS.map((l) => (
                <SheetClose asChild key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-lg px-3 py-3 text-lg font-semibold text-ink transition-colors hover:bg-black/5"
                  >
                    {l.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href="#kontakt"
                  className="mt-3 rounded-lg bg-accent px-3 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-accent/90"
                >
                  Angebot anfragen
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
