import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfilePhotos from "@/components/profiles/ProfilePhotos";
import { publicProfiles } from "@/lib/public-profiles";
import { pageMetadata } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return publicProfiles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = publicProfiles.find((item) => item.slug === slug);
  if (!profile)
    return {
      title: "Perfil no encontrado",
      robots: { index: false, follow: false },
    };
  return pageMetadata(
    profile.displayName,
    profile.tagline,
    `/perfiles/${profile.slug}`,
  );
}
export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const profile = publicProfiles.find((item) => item.slug === slug);
  if (!profile) notFound();
  const related = publicProfiles
    .filter(
      (item) =>
        item.id !== profile.id &&
        item.services.some((service) =>
          profile.services.some((other) => other.name === service.name),
        ),
    )
    .slice(0, 3);
  return (
    <>
      <main id="contenido" className="bg-brand-ivory text-brand-ink">
        <section className="relative bg-brand-burgundy px-6 pb-12 pt-32 text-brand-ivory lg:px-10">
          <Navbar />
          <div className="mx-auto grid max-w-350 gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <Link href="/perfiles" className="inline-block py-4 text-sm">
                ← Volver a perfiles
              </Link>
              <p className="mt-7 text-xs uppercase tracking-widest text-brand-rose">
                {profile.city} · {profile.age} años
              </p>
              <h1 className="mt-4 font-editorial text-7xl tracking-tight lg:text-8xl">
                {profile.displayName}.
              </h1>
              <p className="mt-7 max-w-lg font-editorial text-3xl text-brand-rose">
                {profile.tagline}
              </p>
              <p className="mt-6 max-w-lg text-sm leading-7">{profile.bio}</p>
              <a href="#conocer" className="editorial-link mt-7">
                Conocer un poco más ↓
              </a>
            </div>
            <div className="relative aspect-[4/5] max-h-[65svh] overflow-hidden">
              <Image
                src={profile.images[0]}
                alt={`Universo de ${profile.displayName}`}
                fill
                preload
                sizes="(max-width: 767px) 90vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
        <section
          id="conocer"
          className="mx-auto grid max-w-350 gap-12 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] lg:px-10"
        >
          <div>
            <p className="eyebrow">Sobre {profile.displayName}</p>
            <h2 className="mt-4 font-editorial text-4xl">
              El tiempo,
              <br />a nuestro ritmo.
            </h2>
            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="text-text-muted-light">Idiomas</dt>
                <dd className="mt-2">{profile.languages.join(" · ")}</dd>
              </div>
              <div>
                <dt className="text-text-muted-light">
                  Disponibilidad orientativa
                </dt>
                <dd className="mt-2">{profile.availability}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="font-editorial text-3xl">Planes para compartir</h2>
            <ul className="mt-6 divide-y divide-black/15 border-y border-black/15">
              {profile.services.map((service) => (
                <li
                  key={service.name}
                  className="flex items-center justify-between gap-6 py-5"
                >
                  <span className="font-editorial text-2xl">
                    {service.name}
                  </span>
                  <span className="text-sm text-text-muted-light">
                    {service.price}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-l-2 border-brand-rose pl-5">
              <h3 className="font-editorial text-2xl">¿Te imaginas el plan?</h3>
              <p className="mt-3 text-sm leading-7">
                Las solicitudes aún no están disponibles. Puedes seguir
                conociendo la selección sin crear una cuenta.
              </p>
              <Link className="editorial-link mt-5" href="/perfiles">
                Seguir explorando →
              </Link>
            </div>
          </div>
        </section>
        <section className="bg-brand-rose/20 px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-350">
            <p className="eyebrow">Su universo</p>
            <h2 className="mt-4 font-editorial text-4xl">
              Un poco de contexto.
            </h2>
            <ProfilePhotos name={profile.displayName} images={profile.images} />
            <p className="mt-5 text-xs leading-6 text-text-muted-light">
              Perfil de demostración. Las imágenes ilustran experiencias, no
              identifican a una persona real.
            </p>
          </div>
        </section>
        {related.length > 0 && (
          <section className="mx-auto max-w-350 px-6 py-14">
            <h2 className="font-editorial text-3xl">Otras afinidades</h2>
            <div className="mt-7 flex flex-wrap gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  className="editorial-link"
                  href={`/perfiles/${item.slug}`}
                >
                  {item.displayName} →
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
