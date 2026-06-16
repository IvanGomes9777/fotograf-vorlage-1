import type { Metadata, Viewport } from "next";
import { Archivo, Space_Mono } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/navbar";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const SITE_URL = "https://veduta.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "VEDUTA Studio — Architektur- & Interior-Fotografie | Berlin",
  description:
    "Präzise, formtreue Architektur- und Interior-Fotografie für Studios, Bauträger und Marken. Termingerecht geliefert, klar lizenziert.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "VEDUTA Studio",
    title: "VEDUTA Studio — Architektur- & Interior-Fotografie",
    description:
      "Präzise, formtreue Architektur- und Interior-Fotografie für Studios, Bauträger und Marken.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VEDUTA Studio — Architektur- & Interior-Fotografie",
    description:
      "Präzise, formtreue Architektur- und Interior-Fotografie für Studios, Bauträger und Marken.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${archivo.variable} ${spaceMono.variable}`}>
      <body className="font-sans">
        {/* Site-wide background: faint architecture photo behind everything, fixed on scroll. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(250,250,248,0.90) 0%, rgba(250,250,248,0.86) 50%, rgba(250,250,248,0.92) 100%), url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=60')",
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
