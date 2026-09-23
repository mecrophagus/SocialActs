import Image from "next/image";
import Link from "next/link";
import { publicProfiles } from "@/lib/public-profiles";
export default function FeaturedProfiles() {
  const selected = publicProfiles
    .filter((profile) => profile.featured)
    .slice(0, 3);
  return (
    <section
      id="perfiles-destacados"
      className="overflow-hidden bg-brand-burgundy px-6 py-20 text-brand-ivory lg:px-10"
    >
      <div className="mx-auto grid max-w-350 items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-rose">
            03 / La compañía
          </p>
          <h2 className="mt-6 font-editorial text-5xl leading-tight lg:text-7xl">
            El plan tiene
            <br />
            nombre propio.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-brand-ivory/85">
            Hay muchas formas de compartir una noche. Empieza por conocer a
            quien podría acompañarte.
          </p>
          <Link className="editorial-link mt-8" href="/perfiles">
            Explorar perfiles en Madrid →
          </Link>
        </div>
        <div className="border border-white/25 p-4">
          <p className="border-b border-white/25 pb-3 text-xs uppercase tracking-widest">
            Selección / Madrid
          </p>
          <div className="mt-4 flex gap-3">
            {selected.map((profile, i) => (
              <Link
                key={profile.id}
                href={`/perfiles/${profile.slug}`}
                aria-label={`Conocer a ${profile.displayName}`}
                className={`relative block min-h-80 flex-1 overflow-hidden ${i === 1 ? "mt-6" : ""}`}
              >
                <Image
                  src={profile.images[0]}
                  alt={`Universo de ${profile.displayName}`}
                  fill
                  sizes="(max-width: 767px) 90vw, 45vw"
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent px-5 pb-5 pt-16 font-editorial text-3xl">
                  {profile.displayName} →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-brand-ivory/80">
            Una primera afinidad.
          </p>
        </div>
      </div>
    </section>
  );
}
