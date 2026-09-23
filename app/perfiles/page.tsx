import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfilesExplorer from "@/components/profiles/ProfilesExplorer";
import { publicProfiles } from "@/lib/public-profiles";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Perfiles",
  "Explora compañía en Madrid por experiencia: cena, copas, salidas, eventos y planes en casa.",
  "/perfiles",
);
export default function ProfilesPage() {
  return (
    <>
      <main id="contenido">
        <section className="relative bg-brand-burgundy px-6 pb-12 pt-36 text-brand-ivory lg:px-10 lg:pb-16">
          <Navbar />
          <div className="mx-auto grid max-w-350 gap-8 md:grid-cols-[1.4fr_0.6fr] md:items-end">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.25em] text-brand-rose">
                03 / Perfiles
              </p>
              <h1 className="font-editorial text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.05em]">
                Encuentra
                <br />
                <em className="font-normal text-brand-rose">tu compañía.</em>
              </h1>
            </div>
            <div className="max-w-sm md:pb-2">
              <p className="text-sm leading-7 text-brand-ivory/85">
                Cada persona tiene una forma de compartir el tiempo. Descubre la
                que encaja con tu próximo plan.
              </p>
              <a
                href="#explorar"
                className="mt-6 inline-flex min-h-11 items-center gap-5 border-b border-brand-rose text-sm"
              >
                Explorar la selección ↓
              </a>
            </div>
          </div>
        </section>
        <Suspense
          fallback={
            <p className="bg-brand-ivory p-10 text-brand-ink">
              Preparando la selección…
            </p>
          }
        >
          <ProfilesExplorer items={publicProfiles} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
