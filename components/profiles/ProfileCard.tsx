"use client";
import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/data/profiles";

export default function ProfileCard({
  profile,
  index,
  onOpen,
}: {
  profile: Profile;
  index: number;
  onOpen: (profile: Profile) => void;
}) {
  return (
    <article className="profile-card min-w-0">
      <button
        onClick={() => onOpen(profile)}
        aria-label={`Abrir vista rápida de ${profile.displayName}`}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-brand-rose/20 text-left"
      >
        <Image
          src={profile.images[0]}
          alt={`Universo de ${profile.displayName}`}
          fill
          sizes="(max-width: 639px) 46vw, (max-width: 1023px) 44vw, 23vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 left-3 bg-brand-ivory px-3 py-2 text-xs text-brand-burgundy">
          Vista rápida +
        </span>
      </button>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="font-editorial text-3xl tracking-tight md:text-4xl">
          <Link href={`/perfiles/${profile.slug}`}>{profile.displayName}</Link>
        </h3>
        <span aria-hidden="true" className="text-xs text-brand-burgundy">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2 text-xs text-text-muted-light">
        {profile.city} · {profile.age} años
      </p>
      <p className="mt-3 font-editorial text-lg leading-snug">
        {profile.tagline}
      </p>
      <p className="mt-4 border-t border-black/15 pt-3 text-xs leading-6 text-brand-burgundy">
        {profile.services.map((service) => service.name).join(" · ")}
      </p>
    </article>
  );
}
