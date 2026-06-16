# VEDUTA Studio — Architektur- & Interior-Fotografie

Hochwertige, helle Portfolio-Website für ein Architektur-/Interior-Fotografie-Studio
(Platzhalter-Marke **VEDUTA**). Umgesetzt aus dem Claude-Design-Entwurf
`VEDUTA Studio.dc.html` als eigenständige statische Seite — kein Build-Schritt nötig.

## Öffnen

`index.html` direkt im Browser öffnen, oder lokal servieren:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Aufbau

Einzelne Datei `index.html` (HTML + CSS + Vanilla-JS), Schriften via Google Fonts
(Archivo, Space Mono). Helle Palette: Off-White `#FAFAF8`, Charcoal `#15161A`,
Blau-Akzent `#2E5BFF`.

Sektionen:

1. **Hero — Scroll-to-Expand** — kleiner zentrierter Rahmen, der beim Scrollen auf
   Vollbild expandiert; der Titel `VEDUTA / STUDIO` teilt sich nach links/rechts
   (`mix-blend-difference`). Scroll ist oben gesperrt, bis das Medium voll entfaltet ist.
2. **Die Galerie — Zoom-Parallax** — sticky Bühne (340vh), in der ein 7-Frame-Cluster
   beim Scrollen aus der Mitte heraus skaliert und den Bildschirm füllt.
3. **Das Archiv — Scroll-Velocity-Marquee** — zwei gegenläufige Bildreihen plus große
   Text-Reihe, deren Tempo und Richtung auf die Scroll-Geschwindigkeit reagieren.
4. **Über das Studio** — mit 3D-Tilt-Porträt.
5. **Leistungen & Investition** — drei Preis-Karten.
6. **Workflow** — vierstufiger Ablauf.
7. **Instagram-Strip** — interaktive Bento-Galerie (draggable, Lightbox-Modal mit Dock)
   plus „Auf Instagram folgen"-Button.
8. **Kontakt** — validiertes Formular mit Bestätigung, Kontaktkarten,
   Google-Maps-Embed (Standort) + Footer.

## Platzhalter ersetzen

Die gestreiften Flächen (`repeating-linear-gradient`) sind Platzhalter. Für echte
Fotos die Hintergründe durch `<img>` ersetzen:

- Hero-Medium (`[data-hero-media]`) — quer, ~16:9
- 7 Galerie-Frames (`[data-zoom]`)
- Archiv-Marquee- und Instagram-Kacheln

Außerdem Marke, Texte, Preise und Kontaktangaben anpassen.
