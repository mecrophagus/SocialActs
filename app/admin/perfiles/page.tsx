import Link from "next/link";
import { profiles } from "@/data/profiles";

const statusLabel = {
  draft: "Borrador",
  review: "En revisión",
  published: "Publicado",
  suspended: "Suspendido",
  archived: "Archivado",
};

export default function AdminProfilesPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-functional text-xs uppercase tracking-[0.24em] text-brand-burgundy">
              Administración
            </p>

            <h1 className="mt-3 font-editorial text-5xl tracking-[-0.045em] md:text-6xl">
              Perfiles.
            </h1>
          </div>

          <Link
            href="/admin/perfiles/nuevo"
            className="inline-flex w-fit bg-brand-burgundy px-5 py-3 font-functional text-xs uppercase tracking-[0.18em] text-brand-ivory"
          >
            Crear perfil
          </Link>
        </div>

        <div className="mt-10 overflow-hidden border border-black/10 bg-white">
          <div className="hidden grid-cols-[1.2fr_0.8fr_0.8fr_auto] gap-6 border-b border-black/10 bg-[#f7f4ef] px-6 py-4 md:grid">
            <span className="font-functional text-[10px] uppercase tracking-[0.2em] text-text-muted-light">
              Perfil
            </span>

            <span className="font-functional text-[10px] uppercase tracking-[0.2em] text-text-muted-light">
              Estado
            </span>

            <span className="font-functional text-[10px] uppercase tracking-[0.2em] text-text-muted-light">
              Verificación
            </span>

            <span className="font-functional text-[10px] uppercase tracking-[0.2em] text-text-muted-light">
              Acción
            </span>
          </div>

          {profiles.map((profile) => (
            <article
              key={profile.id}
              className="grid gap-5 border-b border-black/10 px-6 py-6 last:border-b-0 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto] md:items-center md:gap-6"
            >
              <div>
                <p className="font-functional font-medium">
                  {profile.displayName}
                </p>

                <p className="mt-1 font-functional text-xs text-text-muted-light">
                  /perfiles/{profile.slug}
                </p>
              </div>

              <div>
                <span className="inline-flex border border-black/10 px-3 py-1.5 font-functional text-xs">
                  {statusLabel[profile.status]}
                </span>
              </div>

              <p className="font-functional text-sm text-text-muted-light">
                {profile.verificationStatus}
              </p>

              <Link
                href={`/admin/perfiles/${profile.id}/editar`}
                className="font-functional text-xs uppercase tracking-[0.18em] text-brand-burgundy"
              >
                Editar →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}