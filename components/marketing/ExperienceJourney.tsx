"use client";

import Image from "next/image";
import { useRef } from "react";

const experiences = [
  {
    id: "01",
    name: "Cena",
    eyebrow: "Compartir la mesa",
    description:
      "Una cena, una conversación y el tiempo suficiente para disfrutar del momento.",
    image: "/images/experiences/cena.png",
    imageAlt:
      "Mesa elegante preparada para una cena nocturna en un entorno cálido.",
  },
  {
    id: "02",
    name: "Copas",
    eyebrow: "Que empiece la noche",
    description:
      "Una terraza, un bar especial o ese lugar que apetece descubrir acompañado.",
    image: "/images/experiences/copas.png",
    imageAlt:
      "Copas sobre una barra elegante con iluminación nocturna cálida.",
  },
  {
    id: "03",
    name: "Salida",
    eyebrow: "La ciudad es el plan",
    description:
      "Madrid de noche, nuevos lugares y un plan que no tiene por qué estar escrito.",
    image: "/images/experiences/salida.png",
    imageAlt:
      "Escena urbana nocturna en Madrid con luces cálidas y ambiente elegante.",
  },
  {
    id: "04",
    name: "Eventos",
    eyebrow: "Una ocasión diferente",
    description:
      "Conciertos, celebraciones y ocasiones especiales que merece la pena compartir.",
    image: "/images/experiences/eventos.png",
    imageAlt:
      "Evento nocturno elegante con iluminación ambiental y personas adultas.",
  },
  {
    id: "05",
    name: "En casa",
    eyebrow: "Tu espacio. Tu ritmo.",
    description:
      "Cuando el mejor plan es disfrutar de un entorno más tranquilo y personal.",
    image: "/images/experiences/en-casa.png",
    imageAlt:
      "Interior residencial elegante con iluminación cálida y ambiente nocturno.",
  },
];

export default function ExperienceJourney() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "previous" | "next") => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    // Desplazamos aproximadamente el ancho de una tarjeta.
    // El navegador mantiene la animación suave y Scroll Snap
    // termina de colocar la siguiente tarjeta correctamente.
    const distance = slider.clientWidth * 0.72;

    slider.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="experiencias"
      aria-labelledby="experiences-title"
      className="overflow-hidden bg-surface-light py-24 text-text-on-light md:py-32 lg:py-36"
    >
      {/* Cabecera */}
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[0.35fr_1fr_auto] lg:items-end">
          <p className="font-functional text-xs uppercase tracking-[0.28em] text-brand-burgundy">
            02 / Experiencias
          </p>

          <div>
            <h2
              id="experiences-title"
              className="max-w-4xl font-editorial text-5xl leading-[0.92] tracking-[-0.045em] md:text-7xl lg:text-8xl"
            >
              ¿Qué te apetece hoy?
            </h2>

            <p className="mt-5 max-w-xl font-functional text-sm leading-6 text-text-muted-light md:text-base">
              Elige primero el plan. Después, descubre con quién quieres
              compartirlo.
            </p>
          </div>

          {/* Controles desktop */}
          <div className="hidden gap-3 lg:flex">
            <button
              type="button"
              aria-label="Ver experiencia anterior"
              onClick={() => scrollSlider("previous")}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-colors duration-300 hover:border-brand-burgundy hover:bg-brand-burgundy hover:text-brand-ivory"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              >
                ←
              </span>
            </button>

            <button
              type="button"
              aria-label="Ver siguiente experiencia"
              onClick={() => scrollSlider("next")}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-colors duration-300 hover:border-brand-burgundy hover:bg-brand-burgundy hover:text-brand-ivory"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6 lg:px-[max(2.5rem,calc((100vw-1400px)/2))]"
      >
        {experiences.map((experience) => (
          <article
            key={experience.id}
            className="group relative aspect-[4/5] w-[78vw] max-w-[420px] shrink-0 snap-start overflow-hidden bg-surface-night md:w-[46vw] lg:w-[31vw] lg:max-w-[460px]"
          >
            {/* Imagen */}
            <Image
              src={experience.image}
              alt={experience.imageAlt}
              fill
              sizes="(max-width: 767px) 78vw, (max-width: 1023px) 46vw, 31vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />

            {/* Oscurecimiento inferior */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/5"
            />

            {/* Velo borgoña muy ligero */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-brand-burgundy/[0.08] transition-colors duration-500 group-hover:bg-brand-burgundy/[0.14]"
            />

            {/* Número */}
            <div className="absolute left-6 top-6 flex items-center gap-3">
              <span className="font-functional text-[10px] uppercase tracking-[0.28em] text-brand-rose">
                {experience.id}
              </span>

              <span
                aria-hidden="true"
                className="h-px w-7 bg-brand-rose/70"
              />
            </div>

            {/* Contenido */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <p className="mb-3 font-functional text-[10px] uppercase tracking-[0.24em] text-brand-rose">
                {experience.eyebrow}
              </p>

              <h3 className="font-editorial text-5xl leading-none tracking-[-0.05em] text-brand-ivory md:text-6xl">
                {experience.name}.
              </h3>

              <p className="mt-5 max-w-sm font-functional text-sm leading-6 text-white/65">
                {experience.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                <span className="font-functional text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Descubrir
                </span>

                <span
                  aria-hidden="true"
                  className="text-lg text-brand-rose transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </div>
          </article>
        ))}

        {/* Espacio final para que la última tarjeta no quede pegada al viewport */}
        <div
          aria-hidden="true"
          className="w-1 shrink-0 lg:w-4"
        />
      </div>

      {/* Mobile hint */}
      <div className="mx-auto mt-2 flex max-w-350 items-center justify-between px-6 lg:hidden">
        <p className="font-functional text-[10px] uppercase tracking-[0.24em] text-text-muted-light">
          Desliza para explorar
        </p>

        <span
          aria-hidden="true"
          className="font-functional text-lg text-brand-burgundy"
        >
          ← →
        </span>
      </div>
    </section>
  );
}