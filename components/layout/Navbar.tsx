"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigation = [
  {
    id: "01",
    label: "Experiencias",
    href: "/#experiencias",
  },
  {
    id: "02",
    label: "Perfiles",
    href: "/perfiles",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  useEffect(() => {
    // Evitamos que la página del fondo siga desplazándose
    // mientras el menú fullscreen está abierto.
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    // Escape cierra el menú y devuelve el foco al botón.
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    // Focus trap básico para mantener la navegación
    // por teclado dentro del menú abierto.
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !menuRef.current) {
        return;
      }

      const focusableElements =
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Navegación global */}
      <header className="absolute inset-x-0 top-0 z-50 px-6 pt-6 lg:px-10 lg:pt-8">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex max-w-350 items-center justify-between"
        >
          {/* Logo oficial.
              Siempre vuelve a la Home independientemente
              de la página actual. */}
          <Link
            href="/"
            aria-label="Lolitas — Ir a la página de inicio"
            onClick={closeMenu}
            className="relative z-50 inline-flex shrink-0 items-center"
          >
            <Image
              src="/brand/lolitas-logo-horizontal-white.svg"
              alt="Lolitas"
              width={220}
              height={80}
              priority
              className="h-auto w-29.5 md:w-33"
            />
          </Link>

          {/* Navegación desktop */}
          <div className="hidden items-center gap-10 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="font-functional text-xs uppercase tracking-[0.16em] text-text-muted-dark transition-colors duration-300 hover:text-text-on-dark"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA desktop */}
          <Link
            href="/perfiles"
            className="group hidden items-center gap-3 border-b border-brand-rose/60 pb-1 font-functional text-xs uppercase tracking-[0.18em] text-text-on-dark transition-colors duration-300 hover:border-brand-rose lg:inline-flex"
          >
            Explorar

            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          {/* Botón mobile */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              isMenuOpen
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMenu}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-text-on-dark transition-colors duration-300 hover:border-brand-rose lg:hidden"
          >
            <span className="sr-only">
              {isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            </span>

            {/* Hamburguesa → X */}
            <span
              aria-hidden="true"
              className="relative block h-4 w-5"
            >
              <span
                className={`absolute left-0 top-1/2 block h-px w-5 bg-current transition-all duration-500 ${
                  isMenuOpen
                    ? "translate-y-0 rotate-45"
                    : "-translate-y-1.5 rotate-0"
                }`}
              />

              <span
                className={`absolute left-0 top-1/2 block h-px bg-current transition-all duration-500 ${
                  isMenuOpen
                    ? "w-5 translate-y-0 -rotate-45"
                    : "w-3 translate-y-1.5 rotate-0"
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Menú mobile fullscreen */}
      <div
        id="mobile-navigation"
        ref={menuRef}
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 overflow-hidden bg-brand-burgundy text-brand-ivory transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-full opacity-0"
        }`}
      >
        {/* Fondo editorial */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-y-0 left-6 w-px bg-white/10" />
          <div className="absolute inset-y-0 right-6 w-px bg-white/10" />

          <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-black/15 blur-3xl" />
        </div>

        <div className="relative flex min-h-dvh flex-col px-6 pb-8 pt-32">
          {/* Cabecera */}
          <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-5">
            <p className="font-functional text-[10px] uppercase tracking-[0.3em] text-brand-rose">
              Navegación
            </p>

            <p className="font-functional text-[10px] uppercase tracking-[0.3em] text-white/45">
              Madrid / 2026
            </p>
          </div>

          {/* Navegación mobile */}
          <div className="flex flex-1 flex-col justify-center">
            <div className="border-t border-white/15">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="group grid grid-cols-[42px_1fr_auto] items-center gap-3 border-b border-white/15 py-6"
                >
                  <span className="font-functional text-[10px] tracking-[0.24em] text-brand-rose">
                    {item.id}
                  </span>

                  <span className="font-editorial text-[clamp(2.4rem,11vw,4rem)] leading-none tracking-[-0.045em] text-brand-ivory transition-transform duration-500 group-hover:translate-x-2">
                    {item.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="font-functional text-lg text-brand-rose transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Acción principal */}
          <div className="mt-10">
            <Link
              href="/perfiles"
              onClick={closeMenu}
              tabIndex={isMenuOpen ? 0 : -1}
              className="group flex items-center justify-between border-b border-brand-rose pb-4"
            >
              <span className="font-functional text-xs uppercase tracking-[0.24em] text-brand-ivory">
                Explorar perfiles
              </span>

              <span
                aria-hidden="true"
                className="text-xl text-brand-rose transition-transform duration-500 group-hover:translate-x-2"
              >
                →
              </span>
            </Link>

            <div className="mt-6 flex items-center justify-between">
              <p className="max-w-48 font-functional text-xs leading-5 text-white/45">
                Experiencias y compañía para compartir tu tiempo de otra forma.
              </p>

              <span className="font-editorial text-3xl text-brand-rose">
                L
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}