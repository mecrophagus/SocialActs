import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ProfilesExplorer from "@/components/profiles/ProfilesExplorer";

export const metadata: Metadata = {
  title: "Perfiles | Lolitas",
  description:
    "Descubre perfiles y encuentra la compañía que mejor encaja con tu próximo plan.",
};

export default function ProfilesPage() {
  return (
    <main>
      {/* Apertura editorial */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-surface-night px-6 pb-16 pt-36 text-brand-ivory lg:px-10 lg:pb-20">
        <Navbar />

        <div className="mx-auto w-full max-w-350">
          <p className="mb-7 font-functional text-xs uppercase tracking-[0.28em] text-brand-rose">
            03 / Perfiles
          </p>

          <h1 className="max-w-6xl font-editorial text-[clamp(4.5rem,11vw,10rem)] leading-[0.82] tracking-[-0.06em]">
            Encuentra
            <br />
            tu compañía.
          </h1>

          <p className="mt-9 max-w-xl font-functional text-base leading-7 text-white/55 md:text-lg">
            Explora perfiles, descubre afinidades y conoce mejor cada
            experiencia antes de elegir.
          </p>
        </div>
      </section>

      <ProfilesExplorer />
    </main>
  );
}