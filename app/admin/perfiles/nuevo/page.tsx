export default function NewProfilePage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <p className="font-functional text-xs uppercase tracking-[0.24em] text-brand-burgundy">
          Perfiles / Nuevo
        </p>

        <h1 className="mt-3 font-editorial text-5xl tracking-[-0.045em] md:text-6xl">
          Crear perfil.
        </h1>

        <div className="mt-10 border border-black/10 bg-white p-8">
          <p className="font-functional leading-7 text-text-muted-light">
            El formulario de creación se conectará a la capa de datos en la
            siguiente fase.
          </p>
        </div>
      </div>
    </section>
  );
}