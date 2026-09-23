"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { profiles } from "@/data/profiles";

export default function FeaturedProfiles() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-15% 0px -10% 0px",
  });

  // Solo necesitamos tres referencias visuales.
  // No mostramos nombres ni datos personales en Home:
  // la intención es generar curiosidad y conducir a /perfiles.
  const teaserProfiles = profiles
    .filter((profile) => profile.featured)
    .slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="perfiles-destacados"
      aria-labelledby="profiles-teaser-title"
      className="relative overflow-hidden bg-brand-burgundy px-6 py-24 text-brand-ivory md:py-28 lg:px-10 lg:py-32"
    >
      {/* Líneas editoriales de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-6 w-px bg-white/[0.06] lg:left-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-6 w-px bg-white/[0.06] lg:right-10"
      />

      <div className="relative mx-auto max-w-350">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* CONTENIDO */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 32,
                  }
            }
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="font-functional text-xs uppercase tracking-[0.28em] text-brand-rose">
                03 / Perfiles
              </span>

              <span
                aria-hidden="true"
                className="h-px w-10 bg-brand-rose/70"
              />
            </div>

            <h2
              id="profiles-teaser-title"
              className="font-editorial text-[clamp(3.7rem,7vw,7.2rem)] leading-[0.88] tracking-[-0.05em]"
            >
              El plan
              <br />
              ya lo tienes.
            </h2>

            <p className="mt-7 max-w-lg font-editorial text-2xl leading-snug text-brand-rose md:text-3xl">
              Ahora descubre con quién quieres compartirlo.
            </p>

            {/* Copy semántico y útil para SEO.
                No repetimos el contenido completo de /perfiles. */}
            <p className="mt-7 max-w-xl font-functional text-base leading-7 text-white/55">
              Explora perfiles en Madrid y descubre distintas formas de
              compartir una cena, una salida, un evento o simplemente tu
              tiempo.
            </p>

            <Link
              href="/perfiles"
              className="group mt-10 inline-flex items-center gap-5 border-b border-brand-rose pb-3 font-functional text-xs uppercase tracking-[0.22em] text-brand-ivory"
            >
              Explorar perfiles en Madrid

              <span
                aria-hidden="true"
                className="text-lg text-brand-rose transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </motion.div>

          {/* COMPOSICIÓN EDITORIAL */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 50,
                  }
            }
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : undefined
            }
            transition={{
              duration: 1,
              delay: shouldReduceMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Marco exterior:
                las fotografías funcionan como una sola pieza,
                no como cards independientes. */}
            <div className="relative border border-white/12 p-3 md:p-4">
              {/* Cabecera del contact sheet */}
              <div className="flex items-center justify-between border-b border-white/12 px-2 pb-3">
                <span className="font-functional text-[9px] uppercase tracking-[0.28em] text-white/40">
                  Selección / Madrid
                </span>

                <span className="font-functional text-[9px] uppercase tracking-[0.28em] text-brand-rose">
                  01 — 03
                </span>
              </div>

              {/* Un único panel fotográfico */}
              <div className="mt-3 grid h-[390px] grid-cols-[0.82fr_1.16fr_0.82fr] gap-2 overflow-hidden md:h-[460px] lg:h-[500px]">
                {teaserProfiles.map((profile, index) => {
                  const isCenter = index === 1;

                  return (
                    <Link
                      key={profile.id}
                      href="/perfiles"
                      aria-label="Explorar perfiles disponibles en Lolitas"
                      className={`group relative overflow-hidden ${
                        isCenter
                          ? "translate-y-0"
                          : "translate-y-8"
                      }`}
                    >
                      <Image
                        src={profile.images[0]}
                        alt="Vista editorial de uno de los perfiles disponibles en Lolitas"
                        fill
                        sizes="(max-width: 1023px) 33vw, 20vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                      />

                      {/* Tratamiento común:
                          baja protagonismo individual y unifica las tres imágenes. */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-black/20"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-brand-burgundy/[0.12] transition-colors duration-500 group-hover:bg-brand-burgundy/[0.04]"
                      />

                      {/* Número editorial, sin nombre */}
                      <span className="absolute left-3 top-3 font-functional text-[9px] tracking-[0.28em] text-white/60 md:left-4 md:top-4">
                        {profile.id}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Pie de la pieza */}
              <div className="mt-3 flex items-center justify-between border-t border-white/12 px-2 pt-3">
                <span className="font-functional text-[9px] uppercase tracking-[0.26em] text-white/35">
                  Perfiles seleccionados
                </span>

                <span className="font-functional text-[9px] uppercase tracking-[0.26em] text-white/35">
                  Lolitas
                </span>
              </div>
            </div>

            {/* Pequeño desplazamiento gráfico exterior */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 -z-10 h-full w-full border border-brand-rose/20"
            />
          </motion.div>
        </div>

        {/* Cierre narrativo */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          animate={
            isInView
              ? {
                  opacity: 1,
                }
              : undefined
          }
          transition={{
            duration: 0.8,
            delay: shouldReduceMotion ? 0 : 0.45,
          }}
          className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 lg:mt-20"
        >
          <p className="font-functional text-[10px] uppercase tracking-[0.24em] text-white/35">
            Elige el momento
          </p>

          <span className="font-editorial text-2xl text-brand-rose">
            ↓
          </span>

          <p className="font-functional text-[10px] uppercase tracking-[0.24em] text-white/35">
            Descubre la compañía
          </p>
        </motion.div>
      </div>
    </section>
  );
}