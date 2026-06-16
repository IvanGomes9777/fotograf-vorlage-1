import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";
import { StudioServices } from "@/components/studio-services";
import { InstagramStrip } from "@/components/instagram";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Gallery />
      <StudioServices />
      <InstagramStrip />
      <Contact />
    </main>
  );
}
