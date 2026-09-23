type EditProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProfilePage({
  params,
}: EditProfilePageProps) {
  const { id } = await params;

  return (
    <section className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <p className="font-functional text-xs uppercase tracking-[0.24em] text-brand-burgundy">
          Perfiles / Editar
        </p>

        <h1 className="mt-3 font-editorial text-5xl tracking-[-0.045em] md:text-6xl">
          Editar perfil {id}.
        </h1>

        <div className="mt-10 border border-black/10 bg-white p-8">
          <p className="font-functional leading-7 text-text-muted-light">
            Aquí irá el editor completo del perfil cuando conectemos la capa
            CRUD.
          </p>
        </div>
      </div>
    </section>
  );
}