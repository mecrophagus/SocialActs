"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import ProfileGallery from "./ProfileGallery";
export default function ProfilePhotos({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            aria-label={`Ampliar imagen ${i + 1} de ${name}`}
            onClick={() => setIndex(i)}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src={src}
              alt={`Universo de ${name}, imagen ${i + 1}`}
              fill
              sizes="(max-width: 767px) 46vw, 31vw"
              className="object-cover"
            />
            <span
              className="absolute bottom-3 right-3 bg-brand-ivory px-3 py-2 text-brand-burgundy"
              aria-hidden="true"
            >
              +
            </span>
          </button>
        ))}
      </div>
      {index !== null && (
        <ProfileGallery
          name={name}
          images={images}
          activeIndex={index}
          onChange={setIndex}
          onClose={close}
        />
      )}
    </>
  );
}
