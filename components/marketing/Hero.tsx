"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Navbar from "@/components/layout/Navbar";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.9,
  });

  // Solo movemos ligeramente el fondo.
  // El contenido permanece legible y estable.
  const mediaY = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "8%"],
  );

  const mediaScale = useTransform(
    smoothProgress,
    [0, 1],
    [1, 1.04],
  );

  return (
    <section
      ref={heroRef}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden bg-surface-night text-text-on-dark"
    >
      {/* CAPA 1 — MEDIA */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: mediaY,
                scale: mediaScale,
              }
        }
      >
        {/* MOBILE */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/hero/lolitas-hero-mobile.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* TABLET / DESKTOP */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/lolitas-hero-mobile.jpg"
          className="hidden h-full w-full object-cover md:block"
        >
          <source
            src="/video/lolitas-hero.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* CAPA 2 — OVERLAYS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-black/30 via-black/35 to-black/90 md:bg-linear-to-r md:from-black/90 md:via-black/60 md:to-black/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-brand-burgundy/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-linear-to-t from-black/80 to-transparent"
      />

      {/* Marco editorial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 bottom-6 top-24 z-10 border-x border-white/6 lg:inset-x-10 lg:bottom-8 lg:top-28"
      />

      {/* CAPA 3 — NAVBAR */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* CAPA 4 — CONTENIDO */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-350 items-end px-6 pb-14 pt-36 lg:px-10 lg:pb-16 lg:pt-40">
        <div className="w-full">
          {/* Contexto */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -40,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 flex items-center gap-4"
          >
            <span
              aria-hidden="true"
              className="h-px w-8 bg-brand-rose"
            />

            <p className="font-functional text-xs uppercase tracking-[0.3em] text-text-muted-dark">
              Experiencias / Madrid
            </p>
          </motion.div>

          {/* Slogan principal */}
          <motion.h1
            id="hero-title"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 50,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-6xl font-editorial text-[clamp(3.6rem,16vw,5.5rem)] leading-[0.88] tracking-tighter md:text-[clamp(4.5rem,10vw,9rem)] md:leading-[0.86] md:tracking-[-0.055em]"
          >
            No todos los planes
            <br />
            deben hacerse
            <br />
            solos.
          </motion.h1>

          {/* Copy + CTA */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 grid items-end gap-8 border-t border-white/10 pt-6 md:grid-cols-[1fr_auto]"
          >
            <p className="max-w-xl font-functional text-base leading-7 text-text-muted-dark md:text-lg">
              Tu tiempo. Tu plan. La compañía la eliges tú.
            </p>

            <a
              href="#experiencias"
              className="group inline-flex w-fit items-center gap-4 font-functional text-xs uppercase tracking-[0.2em] text-text-on-dark"
            >
              Descubrir

              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-transform duration-500 group-hover:translate-y-1"
              >
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Numeración editorial */}
      <div className="pointer-events-none absolute bottom-8 right-6 z-20 hidden font-functional text-[10px] uppercase tracking-[0.3em] text-text-muted-dark lg:block lg:right-10">
        01 / Inicio
      </div>
    </section>
  );
}