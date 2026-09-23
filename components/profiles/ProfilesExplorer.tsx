"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileCard from "./ProfileCard";
import ProfileGallery from "./ProfileGallery";
import ProfileQuickView from "./ProfileQuickView";
import type { Profile } from "@/data/profiles";
import {
  experiences,
  filterProfiles,
  PAGE_SIZE,
  type Experience,
} from "@/lib/public-profiles";

export default function ProfilesExplorer({ items }: { items: Profile[] }) {
  const params = useSearchParams();
  const initial = params.get("experiencia") as Experience;
  const [experience, setExperience] = useState<Experience>(
    experiences.includes(initial) ? initial : "Todos",
  );
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const results = useRef<HTMLDivElement>(null);
  const filtered = filterProfiles(items, experience, query);
  const featured = items
    .filter((profile) => profile.status === "published" && profile.featured)
    .slice(0, 2);
  const closeQuickView = useCallback(() => {
    setSelectedProfile(null);
    setGalleryIndex(null);
  }, []);
  const closeGallery = useCallback(() => setGalleryIndex(null), []);
  return (
    <>
      <section className="bg-brand-ivory px-4 py-10 text-brand-ink sm:px-6 lg:px-10">
        <div className="mx-auto max-w-350">
          {featured.length > 0 && (
            <aside
              aria-label="Selección destacada"
              className="grid gap-6 border-b border-black/15 pb-10 md:grid-cols-[0.7fr_1.3fr]"
            >
              <div>
                <p className="eyebrow">Una primera afinidad</p>
                <h2 className="mt-3 font-editorial text-3xl">
                  Para empezar
                  <br />a conocerse.
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {featured.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className="flex min-h-28 items-center gap-5 text-left"
                    aria-label={`Vista rápida destacada de ${profile.displayName}`}
                  >
                    <span className="relative h-28 w-22 shrink-0 overflow-hidden">
                      <Image
                        src={profile.images[0]}
                        alt=""
                        fill
                        sizes="88px"
                        className="object-cover"
                      />
                    </span>
                    <span>
                      <span className="block font-editorial text-2xl">
                        {profile.displayName}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-text-muted-light">
                        {profile.tagline}
                      </span>
                      <span className="mt-2 block text-sm text-brand-burgundy">
                        Conocer →
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          )}
          <div id="explorar" className="scroll-mt-6 pt-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">El plan cambia. La compañía también.</p>
                <h2 className="mt-3 font-editorial text-4xl md:text-5xl">
                  ¿Qué tienes en mente?
                </h2>
              </div>
              <label className="block w-full max-w-72 text-xs text-text-muted-light">
                Buscar por nombre, ciudad o idioma
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setLimit(PAGE_SIZE);
                  }}
                  className="mt-2 min-h-11 w-full border-b border-black/30 bg-transparent px-1 text-base text-brand-ink"
                  placeholder="Una afinidad, un lugar…"
                />
              </label>
            </div>
            <div
              role="group"
              aria-label="Filtrar por experiencia"
              className="mt-7 flex gap-2 overflow-x-auto border-b border-black/15 pb-2"
            >
              {experiences.map((item) => (
                <button
                  key={item}
                  aria-pressed={experience === item}
                  onClick={() => {
                    setExperience(item);
                    setLimit(PAGE_SIZE);
                  }}
                  className={`min-h-11 shrink-0 border-b-2 px-4 text-sm ${experience === item ? "border-brand-burgundy text-brand-burgundy" : "border-transparent text-text-muted-light"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <p role="status" className="my-5 text-xs text-text-muted-light">
              {filtered.length}{" "}
              {filtered.length === 1
                ? "perfil encontrado"
                : "perfiles encontrados"}{" "}
              · Mostrando {Math.min(limit, filtered.length)}
            </p>
            <div
              ref={results}
              className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-7 lg:grid-cols-4 lg:gap-x-8"
            >
              {filtered.slice(0, limit).map((profile, index) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  index={index}
                  onOpen={setSelectedProfile}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="py-14">
                <h3 className="font-editorial text-3xl">
                  Otro plan puede encajar.
                </h3>
                <p className="mt-3 text-sm">
                  No hay perfiles con esta selección.
                </p>
                <button
                  className="editorial-link mt-6"
                  onClick={() => {
                    setExperience("Todos");
                    setQuery("");
                    setLimit(PAGE_SIZE);
                  }}
                >
                  Ver todos los perfiles →
                </button>
              </div>
            )}
            {limit < filtered.length && (
              <div className="py-10 text-center">
                <button
                  className="editorial-link"
                  onClick={() => {
                    const previousLimit = limit;
                    setLimit(limit + PAGE_SIZE);
                    requestAnimationFrame(() =>
                      results.current
                        ?.querySelectorAll<HTMLElement>("article button")
                        [previousLimit]?.focus(),
                    );
                  }}
                >
                  Cargar más perfiles ↓
                </button>
              </div>
            )}
            <p className="mt-12 border-t border-black/15 pt-5 text-xs leading-6 text-text-muted-light">
              Selección de demostración. Las imágenes representan experiencias y
              las disponibilidades son orientativas.
            </p>
          </div>
        </div>
      </section>
      {selectedProfile && (
        <ProfileQuickView
          key={selectedProfile.id}
          profile={selectedProfile}
          onClose={closeQuickView}
          onOpenGallery={setGalleryIndex}
          suspended={galleryIndex !== null}
        />
      )}
      {selectedProfile && galleryIndex !== null && (
        <ProfileGallery
          name={selectedProfile.displayName}
          images={selectedProfile.images}
          activeIndex={galleryIndex}
          onChange={setGalleryIndex}
          onClose={closeGallery}
        />
      )}
    </>
  );
}
