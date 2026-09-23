import Link from "next/link";
export default function HomeClosing() {
  return (
    <>
      <section
        id="como-funciona"
        className="bg-brand-ivory px-6 py-20 text-brand-ink lg:px-10"
      >
        <div className="mx-auto grid max-w-350 gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Cómo funciona</p>
            <h2 className="mt-5 font-editorial text-5xl leading-tight">
              Primero,
              <br />
              la afinidad.
            </h2>
          </div>
          <ol className="divide-y divide-black/15">
            {[
              [
                "Elige el momento",
                "Una cena, unas copas, una salida. Empieza por lo que te apetece.",
              ],
              [
                "Conoce a la persona",
                "Explora su presentación, sus idiomas y las experiencias que comparte.",
              ],
              [
                "Decide a tu ritmo",
                "Revisa el perfil completo antes de dar el siguiente paso. Las solicitudes aún no están disponibles.",
              ],
            ].map(([title, copy], index) => (
              <li key={title} className="grid grid-cols-[32px_1fr] gap-5 py-6">
                <span className="pt-2 text-xs text-brand-burgundy">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-editorial text-2xl">{title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-text-muted-light">
                    {copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-brand-rose px-6 py-20 text-brand-burgundy lg:px-10">
        <div className="mx-auto max-w-350">
          <p className="eyebrow">Tu próximo plan</p>
          <h2 className="mt-5 max-w-4xl font-editorial text-5xl leading-[1.05] md:text-7xl">
            Quizá empiece
            <br />
            con un nombre.
          </h2>
          <Link className="editorial-link mt-9" href="/perfiles">
            Encontrar compañía →
          </Link>
        </div>
      </section>
    </>
  );
}
