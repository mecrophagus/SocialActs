import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default function NotFound() {
  return (
    <>
      <main
        id="contenido"
        className="relative min-h-[75svh] bg-brand-burgundy px-6 pb-20 pt-40 text-brand-ivory"
      >
        <Navbar />
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-brand-rose">404 / Un cambio de planes</p>
          <h1 className="mt-6 font-editorial text-5xl md:text-7xl">
            Esta página
            <br />
            ya no está aquí.
          </h1>
          <p className="mt-7 max-w-md text-sm leading-7">
            Puede que el enlace haya cambiado o que el perfil no esté
            disponible.
          </p>
          <Link href="/perfiles" className="editorial-link mt-8">
            Volver a perfiles →
          </Link>
          <Link href="/" className="ml-6 inline-block py-4 text-sm underline">
            Ir al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
