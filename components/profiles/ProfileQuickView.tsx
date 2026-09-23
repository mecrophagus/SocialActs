"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/data/profiles";

type ProfileQuickViewProps = {
  profile: Profile;
  onClose: () => void;
  onOpenGallery: (index: number) => void;
  suspended?: boolean;
};

export default function ProfileQuickView({
  profile,
  onClose,
  onOpenGallery,
  suspended = false,
}: ProfileQuickViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? profile.images.length - 1 : current - 1,
    );
  };

  const nextImage = () => {
    setActiveImage((current) =>
      current === profile.images.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quick-view-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!suspended) onClose();
      }}
      onKeyDown={(event) => {
        if (suspended) return;
        if (event.key === "ArrowLeft") previousImage();
        if (event.key === "ArrowRight") nextImage();
      }}
      className="fixed inset-0 m-auto h-dvh max-h-dvh w-full max-w-none bg-transparent p-0 backdrop:bg-black/75 md:h-[90vh] md:max-w-7xl"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        inert={suspended}
        className="relative grid h-dvh w-full overflow-y-auto bg-brand-ivory text-brand-ink md:h-[90vh] md:max-w-7xl md:grid-cols-[1.05fr_0.95fr] md:overflow-hidden"
      >
        {/* Carrusel */}
        <div className="relative min-h-[55vh] bg-black md:min-h-0">
          <button
            type="button"
            onClick={() => onOpenGallery(activeImage)}
            aria-label={`Abrir galería ampliada de ${profile.displayName}`}
            className="absolute inset-0 z-0"
          >
            <Image
              src={profile.images[activeImage]}
              alt={`${profile.displayName} — fotografía ${activeImage + 1}`}
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className="object-cover"
            />
          </button>

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

          <button
            type="button"
            onClick={previousImage}
            aria-label="Fotografía anterior"
            className="absolute bottom-6 left-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextImage}
            aria-label="Fotografía siguiente"
            className="absolute bottom-6 left-20 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm"
          >
            →
          </button>

          <span className="absolute bottom-9 right-6 z-20 font-functional text-[10px] tracking-[0.25em] text-white/70">
            {String(activeImage + 1).padStart(2, "0")} /{" "}
            {String(profile.images.length).padStart(2, "0")}
          </span>
        </div>

        {/* Información */}
        <div className="relative flex flex-col px-6 pb-10 pt-20 md:overflow-y-auto md:px-12 md:py-16">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista rápida"
            className="fixed right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-brand-ivory text-xl transition-colors hover:bg-brand-ink hover:text-brand-ivory"
          >
            ×
          </button>

          <p className="font-functional text-[10px] uppercase tracking-[0.28em] text-brand-burgundy">
            {profile.city} / {profile.availability}
          </p>

          <h2
            id="quick-view-title"
            className="mt-7 font-editorial text-6xl leading-[0.88] tracking-[-0.05em] md:text-8xl"
          >
            {profile.displayName}.
          </h2>

          <p className="mt-6 font-editorial text-2xl leading-snug text-brand-burgundy">
            {profile.tagline}
          </p>

          <p className="mt-7 font-functional text-base leading-7 text-text-muted-light">
            {profile.bio}
          </p>

          <div className="mt-10 border-t border-black/10">
            {profile.services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between border-b border-black/10 py-4"
              >
                <span className="font-functional text-sm">{service.name}</span>

                <span className="font-functional text-xs text-text-muted-light">
                  {service.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 border-b border-black/10 pb-8 sm:grid-cols-2">
            <div>
              <p className="font-functional text-[10px] uppercase tracking-[0.24em] text-text-muted-light">
                Edad
              </p>

              <p className="mt-2 font-editorial text-xl">{profile.age}</p>
            </div>

            <div>
              <p className="font-functional text-[10px] uppercase tracking-[0.24em] text-text-muted-light">
                Idiomas
              </p>

              <p className="mt-2 font-editorial text-xl">
                {profile.languages.join(" · ")}
              </p>
            </div>
          </div>

          <Link
            href={`/perfiles/${profile.slug}`}
            className="group mt-auto flex items-center justify-between border-b border-brand-burgundy pb-4 pt-10"
          >
            <span className="font-functional text-xs uppercase tracking-[0.22em]">
              Ver perfil completo
            </span>

            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </dialog>
  );
}
