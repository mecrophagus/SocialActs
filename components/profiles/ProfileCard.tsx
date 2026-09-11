"use client";

import Image from "next/image";
import type { Profile } from "@/data/profiles";

type ProfileCardProps = {
  profile: Profile;
  index: number;
  onOpen: (profile: Profile) => void;
};

export default function ProfileCard({
  profile,
  index,
  onOpen,
}: ProfileCardProps) {
  const reverse = index % 2 !== 0;

  return (
    <article
      className={`grid items-center gap-10 border-t border-black/10 py-16 md:py-20 lg:grid-cols-2 lg:gap-20 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Fotografía */}
      <button
        type="button"
        onClick={() => onOpen(profile)}
        aria-label={`Abrir vista rápida de ${profile.displayName}`}
        className="group relative aspect-[4/5] w-full overflow-hidden bg-brand-ink text-left"
      >
        <Image
          src={profile.images[0]}
          alt={`Perfil de ${profile.displayName}`}
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent"
        />

        <span className="absolute bottom-6 left-6 font-functional text-[10px] uppercase tracking-[0.24em] text-white/70">
          Vista rápida +
        </span>
      </button>

      {/* Información */}
      <div className="max-w-xl">
        <div className="mb-7 flex items-center gap-4">
          <span className="font-functional text-[10px] tracking-[0.28em] text-brand-burgundy">
            {profile.id}
          </span>

          <span
            aria-hidden="true"
            className="h-px w-8 bg-brand-rose"
          />

          <span className="font-functional text-[10px] uppercase tracking-[0.24em] text-text-muted-light">
            {profile.city}
          </span>
        </div>

        <h2 className="font-editorial text-6xl leading-[0.9] tracking-[-0.05em] md:text-8xl">
          {profile.displayName}.
        </h2>

        <p className="mt-6 max-w-md font-editorial text-2xl leading-snug text-brand-burgundy md:text-3xl">
          {profile.tagline}
        </p>

        <p className="mt-7 max-w-lg font-functional text-base leading-7 text-text-muted-light">
          {profile.bio}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-black/10 py-5">
          {profile.services.map((service) => (
            <span
              key={service.name}
              className="font-functional text-xs uppercase tracking-[0.16em]"
            >
              {service.name}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpen(profile)}
          className="group mt-8 inline-flex items-center gap-4 border-b border-brand-burgundy pb-2 font-functional text-xs uppercase tracking-[0.2em] text-brand-burgundy"
        >
          Ver perfil

          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>
    </article>
  );
}