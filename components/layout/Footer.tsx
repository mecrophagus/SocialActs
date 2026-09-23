import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-burgundy px-6 py-12 text-brand-ivory lg:px-10">
      <div className="mx-auto max-w-350">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Link href="/" aria-label="Lolitas — Inicio">
              <Image
                src="/brand/lolitas-logo-footer-negative.svg"
                width={220}
                height={80}
                alt="Lolitas"
                className="h-auto w-40"
              />
            </Link>
            <p className="mt-6 max-w-sm font-editorial text-2xl">
              Una conversación.
              <br />Y lo que el tiempo permita.
            </p>
          </div>
          <nav
            aria-label="Navegación del pie"
            className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm"
          >
            <Link className="py-3" href="/perfiles">
              Perfiles
            </Link>
            <Link className="py-3" href="/#experiencias">
              Experiencias
            </Link>
            <Link className="py-3" href="/#como-funciona">
              Cómo funciona
            </Link>
            <Link className="py-3" href="/acceso">
              Acceso
            </Link>
            <Link className="py-3" href="/registro">
              Registro
            </Link>
          </nav>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/25 pt-6 text-xs leading-6 text-brand-ivory/80">
          <p>© {new Date().getFullYear()} Lolitas · Madrid</p>
          <p>
            Mayores de 18 años · Versión de demostración, sin reservas activas.
          </p>
        </div>
      </div>
    </footer>
  );
}
