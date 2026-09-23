"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const navigation = [
  { label: "Experiencias", href: "/#experiencias" },
  { label: "Perfiles", href: "/perfiles" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Acceso", href: "/acceso" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const opener = trigger.current;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    const wide = window.matchMedia("(min-width: 1024px)");
    const closeWide = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", closeWide);
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
      wide.removeEventListener("change", closeWide);
    };
  }, [open]);
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-6 pt-6 text-brand-ivory lg:px-10 lg:pt-8">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-350 items-center justify-between gap-5"
      >
        <Link href="/" aria-label="Lolitas — Inicio">
          <Image
            src="/brand/lolitas-logo-horizontal-white.svg"
            alt="Lolitas"
            width={220}
            height={80}
            className="h-auto w-30 md:w-33"
          />
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              className="py-3 text-xs uppercase tracking-widest"
              key={item.href}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/perfiles"
          className="hidden border-b border-brand-rose py-3 text-xs uppercase tracking-widest lg:block"
        >
          Explorar →
        </Link>
        <button
          ref={trigger}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="min-h-11 min-w-11 border-b border-brand-rose text-sm lg:hidden"
        >
          Menú +
        </button>
      </nav>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        aria-label="Menú de navegación"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-dvh w-screen max-w-none overflow-y-auto bg-brand-burgundy px-6 py-8 text-brand-ivory"
      >
        <div className="flex items-center justify-between">
          <p className="font-editorial text-3xl">Lolitas</p>
          <button
            onClick={() => setOpen(false)}
            className="min-h-11 px-3"
            aria-label="Cerrar menú"
          >
            Cerrar ×
          </button>
        </div>
        <nav aria-label="Navegación móvil" className="my-12">
          {navigation.map((item, i) => (
            <Link
              onClick={() => setOpen(false)}
              className="flex items-center gap-5 border-t border-white/25 py-6 font-editorial text-3xl"
              key={item.href}
              href={item.href}
            >
              <span className="font-functional text-xs text-brand-rose">
                0{i + 1}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          onClick={() => setOpen(false)}
          href="/registro"
          className="editorial-link"
        >
          Conocer el registro →
        </Link>
      </dialog>
    </header>
  );
}
