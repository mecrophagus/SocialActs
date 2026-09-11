import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import {
  getProfileBySlug,
  profiles,
} from "@/data/profiles";

type ProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return profiles.map((profile) => ({
    slug: profile.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);

  if (!profile) {
    return {
      title: "Perfil no encontrado | Lolitas",
    };
  }

  return {
    title: `${profile.displayName} | Lolitas`,
    description: profile.tagline,
  };
}

export default async function ProfilePage({
  params,
}: ProfilePageProps) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  return (
    <main className="bg-brand-ivory text-brand-ink">
      {/* Hero individual */}
      <section className="relative min-h-screen overflow-hidden bg-surface-night text-brand-ivory">
        <Navbar />

        <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10 flex items-end px-6 pb-16 pt-36 lg:px-10 lg:pb-20">
            <div className="mx-auto w-full max-w-2xl">
              <Link
                href="/perfiles"
                className="mb-12 inline-flex items-center gap-3 font-functional text-[10px] uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-white"
              >
                ← Volver a perfiles
              </Link>

              <p className="font-functional text-xs uppercase tracking-[0.28em] text-brand-rose">
                {profile.city} / Perfil {profile.id}
              </p>

              <h1 className="mt-7 font-editorial text-[clamp(5rem,10vw,10rem)] leading-[0.78] tracking-[-0.065em]">
                {profile.displayName}.
              </h1>

              <p className="mt-8 max-w-xl font-editorial text-2xl leading-snug text-brand-rose md:text-3xl">
                {profile.tagline}
              </p>

              <p className="mt-8 max-w-xl font-functional text-base leading-7 text-white/60">
                {profile.bio}
              </p>
            </div>
          </div>

          <div className="relative min-h-[70svh] lg:min-h-screen">
            <Image
              src={profile.images[0]}
              alt={`Perfil de ${profile.displayName}`}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="object-cover"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Información */}
      <section className="px-6 py-24 md:py-32 lg:px-10">
        <div className="mx-auto grid max-w-350 gap-16 lg:grid-cols-[0.65fr_1fr] lg:gap-24">
          <div>
            <p className="font-functional text-xs uppercase tracking-[0.24em] text-brand-burgundy">
              Sobre {profile.displayName}
            </p>

            <h2 className="mt-6 font-editorial text-5xl leading-[0.92] tracking-[-0.045em] md:text-7xl">
              Conocer antes
              <br />
              de elegir.
            </h2>
          </div>

          <div>
            <p className="max-w-2xl font-functional text-lg leading-8 text-text-muted-light">
              {profile.bio}
            </p>

            <div className="mt-12 border-t border-black/10">
              {profile.services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between border-b border-black/10 py-6"
                >
                  <span className="font-editorial text-2xl">
                    {service.name}
                  </span>

                  <span className="font-functional text-sm text-text-muted-light">
                    {service.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Galería editorial */}
      <section className="bg-brand-burgundy px-6 py-24 text-brand-ivory md:py-32 lg:px-10">
        <div className="mx-auto max-w-350">
          <p className="font-functional text-xs uppercase tracking-[0.28em] text-brand-rose">
            Galería
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {profile.images.map((image, index) => (
              <div
                key={image}
                className={`relative overflow-hidden ${
                  index === 0
                    ? "aspect-[4/5] md:row-span-2"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image}
                  alt={`${profile.displayName} — fotografía ${index + 1}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}