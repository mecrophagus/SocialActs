"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default function AuthView({ register = false }: { register?: boolean }) {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <main id="contenido" className="bg-brand-ivory text-brand-ink">
        <section className="relative bg-brand-burgundy px-6 pb-12 pt-36 text-brand-ivory">
          <Navbar />
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow text-brand-rose">Tu espacio en Lolitas</p>
            <h1 className="mt-5 font-editorial text-5xl md:text-7xl">
              {register ? "Un primer encuentro." : "Qué bien verte."}
            </h1>
          </div>
        </section>
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-editorial text-3xl">
              {register ? "Crear una cuenta" : "Acceder a tu cuenta"}
            </h2>
            <p id="auth-notice" className="mt-5 max-w-sm text-sm leading-7">
              Esta es una vista previa. El acceso y el registro todavía no están
              disponibles. No se envían ni guardan tus datos.
            </p>
            <Link href="/perfiles" className="editorial-link mt-7">
              Seguir explorando →
            </Link>
          </div>
          <form
            aria-describedby="auth-notice"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
              event.currentTarget.reset();
            }}
            className="space-y-6"
          >
            {register && (
              <label className="block text-sm">
                Nombre
                <input
                  name="name"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                  className="auth-input"
                />
              </label>
            )}
            <label className="block text-sm">
              Correo electrónico
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="auth-input"
              />
            </label>
            <label className="block text-sm">
              Contraseña
              <span className="mt-2 flex border-b border-black/30">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  minLength={register ? 8 : undefined}
                  autoComplete={register ? "new-password" : "current-password"}
                  required
                  className="min-h-12 min-w-0 flex-1 bg-transparent px-2"
                />
                <button
                  type="button"
                  aria-pressed={show}
                  className="min-h-12 px-3 text-xs"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Ocultar" : "Mostrar"}
                </button>
              </span>
            </label>
            {register && (
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  required
                  className="h-5 w-5 accent-brand-burgundy"
                />
                Confirmo que soy mayor de 18 años.
              </label>
            )}
            <button className="min-h-12 w-full bg-brand-burgundy px-5 py-3 text-brand-ivory">
              Probar {register ? "registro" : "acceso"} de demostración
            </button>
            <p role="status" className="text-sm leading-6">
              {submitted
                ? "Vista previa completada. No se ha creado ninguna cuenta ni iniciado una sesión."
                : "Puedes recorrer el formulario sin utilizar datos reales."}
            </p>
            <p className="text-sm">
              <Link
                className="underline underline-offset-4"
                href={register ? "/acceso" : "/registro"}
              >
                {register ? "Ver acceso" : "Ver registro"}
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
