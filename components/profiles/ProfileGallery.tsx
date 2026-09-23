"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ProfileGalleryProps = {
  name: string;
  images: string[];
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

export default function ProfileGallery({
  name,
  images,
  activeIndex,
  onChange,
  onClose,
}: ProfileGalleryProps) {
  const previous = () => {
    onChange(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const next = () => {
    onChange(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
      }}
      aria-label={`Galería de ${name}`}
      className="fixed inset-0 m-0 h-dvh max-h-dvh w-screen max-w-none bg-black p-0 text-white"
    >
      <div className="relative flex min-h-dvh items-center justify-center px-5 py-20 md:px-16">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xl transition-colors hover:bg-white hover:text-black"
        >
          ×
        </button>

        <div className="relative h-[72vh] w-full max-w-6xl">
          <Image
            src={images[activeIndex]}
            alt={`${name} — fotografía ${activeIndex + 1}`}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={previous}
          aria-label="Fotografía anterior"
          className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black md:left-8"
        >
          ←
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Fotografía siguiente"
          className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black md:right-8"
        >
          →
        </button>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 font-functional text-xs uppercase tracking-[0.25em] text-white/60">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>
      </div>
    </dialog>
  );
}
