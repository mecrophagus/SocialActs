import Hero from "@/components/marketing/Hero";
import ExperienceJourney from "@/components/marketing/ExperienceJourney";
import FeaturedProfiles from "@/components/marketing/FeaturedProfiles";
import HomeClosing from "@/components/marketing/HomeClosing";
import Footer from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Lolitas | Experiencias y compañía",
  "Elige tu plan en Madrid y descubre con quién compartir una cena, unas copas o una ocasión especial.",
  "/",
);
export default function Home() {
  return (
    <>
      <main id="contenido">
        <Hero />
        <ExperienceJourney />
        <FeaturedProfiles />
        <HomeClosing />
      </main>
      <Footer />
    </>
  );
}
